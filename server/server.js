import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { User } from './models/User.js';
import { Collection } from './models/Collection.js';
import { AuditLog } from './models/AuditLog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'LoopIIT Smart Waste Management Platform',
    database: 'MongoDB Atlas Connected',
    timestamp: new Date().toISOString()
  });
});

// ─── Get All Collections ───
app.get('/api/collections', async (req, res) => {
  try {
    const { volunteerId, collectorId, status } = req.query;
    const filter = {};
    if (volunteerId) filter.volunteerId = volunteerId;
    if (collectorId) filter.collectorId = collectorId;
    if (status) filter.status = status;

    const collections = await Collection.find(filter).sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Create Collection Proposal (Collector -> Volunteer) ───
app.post('/api/collections/proposal', async (req, res) => {
  try {
    const { volunteerId, collectorId, collectorName, category, categoryName, ratePerKg, proposedWeightKg, location, wastePhoto } = req.body;
    
    // Look up volunteer with case-insensitive / email fallback
    let volunteer = await User.findOne({ volunteerId });
    if (!volunteer && volunteerId) {
      volunteer = await User.findOne({
        $or: [
          { volunteerId: new RegExp(`^${volunteerId.trim()}$`, 'i') },
          { email: volunteerId.trim().toLowerCase() }
        ]
      });
    }
    if (!volunteer && volunteerId) {
      // Auto-register demo account in Mongo
      volunteer = new User({
        name: 'Verified Contributor',
        email: `${volunteerId.toLowerCase().replace(/[^a-z0-9]/g, '')}@ecoloop.in`,
        role: 'volunteer',
        volunteerId: volunteerId.trim().toUpperCase(),
        isEmailVerified: true
      });
      await volunteer.save();
    }

    const estReward = parseFloat((parseFloat(proposedWeightKg) * parseFloat(ratePerKg)).toFixed(2));
    const newId = `COL-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProposal = new Collection({
      id: newId,
      volunteerId: volunteer.volunteerId,
      volunteerName: volunteer.name,
      volunteerEmail: volunteer.email,
      collectorId: collectorId || 'COL-2026-KABADI-01',
      collectorName: collectorName || 'Ramesh Kumar',
      category,
      categoryName,
      ratePerKg: parseFloat(ratePerKg),
      proposedWeightKg: parseFloat(proposedWeightKg),
      estimatedReward: estReward,
      location: location || volunteer.address || 'Campus Node',
      wastePhoto: wastePhoto || 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
      status: 'PROPOSED',
      history: [{
        status: 'PROPOSED',
        note: `Collector ${collectorName} sent proposal for ${proposedWeightKg} kg ${categoryName} (Est: ₹${estReward})`
      }]
    });

    await newProposal.save();
    res.status(201).json(newProposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Volunteer Responds to Proposal (Accept / Reject) ───
app.post('/api/collections/:id/respond', async (req, res) => {
  try {
    const { isAccepted, volunteerName } = req.body;
    const item = await Collection.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ error: 'Collection not found' });

    if (item.status !== 'PROPOSED') {
      return res.status(400).json({ error: `Cannot respond to proposal in status: ${item.status}` });
    }

    item.status = isAccepted ? 'VOLUNTEER_ACCEPTED' : 'VOLUNTEER_REJECTED';
    item.history.push({
      status: item.status,
      note: isAccepted
        ? `Volunteer ${volunteerName || 'Donor'} accepted collection proposal. Doorstep pickup unlocked.`
        : `Volunteer rejected collection proposal.`
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Collector Finalizes Tare Weight Pickup ───
app.post('/api/collections/:id/collect', async (req, res) => {
  try {
    const { actualMeasuredWeightKg, scaleEvidencePhoto, collectorName } = req.body;
    const item = await Collection.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ error: 'Collection not found' });

    if (item.status !== 'VOLUNTEER_ACCEPTED') {
      return res.status(400).json({ error: 'Integrity Lock: Volunteer must accept proposal first.' });
    }

    const weight = parseFloat(actualMeasuredWeightKg);
    item.actualWeightKg = weight;
    item.status = 'COLLECTED';
    if (scaleEvidencePhoto) item.wastePhoto = scaleEvidencePhoto;
    item.estimatedReward = parseFloat((weight * item.ratePerKg).toFixed(2));
    
    item.history.push({
      status: 'COLLECTED',
      note: `Collector ${collectorName || 'Kabadiwala'} measured ${weight} kg on scale. Submitted to Admin.`
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Recyclable Company Confirms Secure Handover ───
app.post('/api/collections/:id/recycler-confirm', async (req, res) => {
  try {
    const { recyclerName, verifiedNetWeightKg, purityPercentage, intakeSlipNo, inspectorName, notes } = req.body;
    const item = await Collection.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ error: 'Collection not found' });

    const netWeight = parseFloat(verifiedNetWeightKg) || item.actualWeightKg;
    const slipNo = intakeSlipNo || `IN-SLIP-${Math.floor(100000 + Math.random() * 900000)}`;

    item.status = 'DELIVERY_VERIFIED';
    item.actualWeightKg = netWeight;
    item.finalReward = parseFloat((netWeight * item.ratePerKg).toFixed(2));
    item.recyclerIntake = {
      confirmedAt: new Date(),
      recyclerName: recyclerName || item.assignedRecycler?.name || 'Recycling Partner',
      intakeSlipNo: slipNo,
      verifiedNetWeightKg: netWeight,
      purityPercentage: parseFloat(purityPercentage) || 98.0,
      inspectorName: inspectorName || 'Intake Officer',
      notes: notes || 'All garbage delivered securely and verified in full.',
      handoverHash: `SHA256:0x${Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('')}`
    };

    item.history.push({
      status: 'DELIVERY_VERIFIED',
      note: `Recyclable Company (${item.recyclerIntake.recyclerName}) confirmed secure intake of all garbage (${netWeight} kg, ${purityPercentage}% purity). Updated Admin for payment release.`
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin Approves Payment & Disburses UPI ───
app.post('/api/collections/:id/disburse-payment', async (req, res) => {
  try {
    const { transactionUtr, adminName } = req.body;
    const item = await Collection.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ error: 'Collection not found' });

    const utr = transactionUtr || `UPI/2026/${Math.floor(100000000 + Math.random() * 900000000)}`;
    const payoutAmount = item.finalReward || item.estimatedReward;

    item.status = 'PAID';
    item.payment = {
      utr,
      method: 'Instant UPI Auto-Credit',
      amount: payoutAmount,
      paidAt: new Date(),
      status: 'SUCCESS'
    };

    item.history.push({
      status: 'PAID',
      note: `Admin ${adminName || 'Priya Sharma'} approved payment of ₹${payoutAmount} via UPI UTR: ${utr}`
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Volunteer ID Search ───
app.get('/api/users/volunteer/:volunteerId', async (req, res) => {
  try {
    const vId = req.params.volunteerId.trim();
    let volunteer = await User.findOne({
      $or: [
        { volunteerId: vId.toUpperCase() },
        { volunteerId: new RegExp(`^${vId}$`, 'i') },
        { email: vId.toLowerCase() }
      ]
    });
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found.' });
    }
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Database Seed Endpoint ───
app.post('/api/seed', async (req, res) => {
  try {
    // Check if users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany([
        {
          name: 'Priya Sharma',
          email: 'admin@ecoloop.in',
          role: 'admin',
          volunteerId: 'VOL-2026-ADM9901A',
          isEmailVerified: true,
          avatar: 'PS'
        },
        {
          name: 'Ramesh Kumar',
          email: 'collector@ecoloop.in',
          role: 'collector',
          collectorId: 'COL-2026-KABADI-01',
          volunteerId: 'VOL-2026-COL4421K',
          vehicleNo: 'UK-08-EV-4421',
          isEmailVerified: true,
          avatar: 'RK'
        },
        {
          name: 'Ananya Deshmukh',
          email: 'volunteer@ecoloop.in',
          role: 'volunteer',
          volunteerId: 'VOL-2026-E47A91BC',
          address: 'Room 204, Sarojini Bhawan, IIT Roorkee',
          isEmailVerified: true,
          avatar: 'AD'
        },
        {
          name: 'Rajendra Bhawan Mess Manager',
          email: 'hostel@ecoloop.in',
          role: 'hostel',
          volunteerId: 'VOL-2026-H992A01F',
          address: 'Rajendra Bhawan Dining Hall & Kitchen, IIT Roorkee',
          isEmailVerified: true,
          avatar: 'RB'
        },
        {
          name: 'Green Earth Foundation',
          email: 'ngo@ecoloop.in',
          role: 'ngo',
          volunteerId: 'VOL-2026-NGO7712E',
          address: 'Civil Lines Sector 4, Roorkee',
          isEmailVerified: true,
          avatar: 'GE'
        },
        {
          name: 'Reliance Circular Industries',
          email: 'recycler@ecoloop.in',
          role: 'recycler',
          recyclerId: 'REC-001',
          volunteerId: 'VOL-2026-REC08491',
          address: 'Dahej Polyester Fiber Complex, Gujarat',
          isEmailVerified: true,
          avatar: 'RC'
        }
      ]);
    }

    res.json({ message: 'MongoDB Atlas database successfully initialized and seeded!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start Server ───
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[LoopIIT Backend Server] Running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();
