import mongoose from 'mongoose';
import { User } from './models/User.js';
import { Collection } from './models/Collection.js';
import { AuditLog } from './models/AuditLog.js';

const uri = 'mongodb+srv://ankityadav08022008_db_user:XzdzmSqkOomiGQ9D@cluster0.z9eb8ev.mongodb.net/loopiit?retryWrites=true&w=majority';

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB Atlas...');

    // Clear existing collections if needed
    await User.deleteMany({});
    await Collection.deleteMany({});
    await AuditLog.deleteMany({});

    // 1. Seed Users
    const users = await User.insertMany([
      {
        name: 'Priya Sharma',
        email: 'admin@ecoloop.in',
        role: 'admin',
        isEmailVerified: true,
        avatar: 'PS',
        phone: '+91 98110 01100'
      },
      {
        name: 'Ramesh Kumar',
        email: 'collector@ecoloop.in',
        role: 'collector',
        collectorId: 'COL-2026-KABADI-01',
        vehicleNo: 'UK-08-EV-4421',
        isEmailVerified: true,
        avatar: 'RK',
        phone: '+91 98234 56789'
      },
      {
        name: 'Ananya Deshmukh',
        email: 'volunteer@ecoloop.in',
        role: 'volunteer',
        volunteerId: 'VOL-2026-E47A91BC',
        address: 'Room 204, Sarojini Bhawan, IIT Roorkee',
        isEmailVerified: true,
        avatar: 'AD',
        phone: '+91 98401 23456',
        upiId: 'ananya@okhdfcbank'
      },
      {
        name: 'Arjun Patel',
        email: 'arjun@iitr.ac.in',
        role: 'volunteer',
        volunteerId: 'VOL-2026-B812F40D',
        address: 'Govind Bhawan Room 112, IIT Roorkee',
        isEmailVerified: true,
        avatar: 'AP',
        phone: '+91 98765 43210',
        upiId: 'arjunpatel@okaxis'
      },
      {
        name: 'Reliance Circular Industries',
        email: 'recycler@ecoloop.in',
        role: 'recycler',
        recyclerId: 'REC-001',
        address: 'Dahej Polyester Fiber Complex, Gujarat',
        isEmailVerified: true,
        avatar: 'RC',
        phone: '+91 99000 11223'
      }
    ]);
    console.log(`[Seed] Created ${users.length} users in MongoDB Atlas.`);

    // 2. Seed Collections across the complete lifecycle
    const collections = await Collection.insertMany([
      {
        id: 'COL-REQ-1001',
        volunteerId: 'VOL-2026-E47A91BC',
        volunteerName: 'Ananya Deshmukh',
        volunteerEmail: 'volunteer@ecoloop.in',
        collectorId: 'COL-2026-KABADI-01',
        collectorName: 'Ramesh Kumar',
        category: 'plastic_pet',
        categoryName: 'PET Clear Rigid Bottles',
        ratePerKg: 18.00,
        proposedWeightKg: 12.5,
        actualWeightKg: 12.4,
        estimatedReward: 223.20,
        finalReward: 223.20,
        location: 'Sarojini Bhawan Front Gate, IIT Roorkee',
        status: 'PAID',
        wastePhoto: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
        assignedRecycler: {
          id: 'REC-001',
          name: 'Reliance Industries Circular (R-Elan)',
          facility: 'Dahej Polyester Fiber Complex, Gujarat',
          cpcbReg: 'CPCB/EPR/2026/PL-08491'
        },
        deliveryProof: {
          receiptNo: 'REC-REL-2026-8819',
          deliveryDate: new Date('2026-10-23T14:15:00Z'),
          weighbridgeGrossKg: 12.4,
          notes: 'Passed 96.4% optical purity test at intake hopper'
        },
        recyclerIntake: {
          confirmedAt: new Date('2026-10-23T14:30:00Z'),
          recyclerName: 'Reliance Industries Circular (R-Elan)',
          intakeSlipNo: 'IN-REL-2026-8819',
          verifiedNetWeightKg: 12.4,
          purityPercentage: 98.2,
          inspectorName: 'Sanjay Verma (Intake Gate)',
          notes: 'Inspected and certified Grade A clean PET bottles'
        },
        payment: {
          utr: 'UPI/2026/894102914',
          method: 'Instant UPI to ananya@okhdfcbank',
          amount: 223.20,
          paidAt: new Date('2026-10-23T16:00:00Z'),
          status: 'SUCCESS'
        },
        history: [
          { status: 'PROPOSED', note: 'Collector Ramesh Kumar issued pickup proposal' },
          { status: 'VOLUNTEER_ACCEPTED', note: 'Volunteer Ananya accepted proposal' },
          { status: 'COLLECTED', note: 'Collector weighed 12.4 kg on calibrated scale' },
          { status: 'ADMIN_APPROVED', note: 'Admin verified PET Grade A' },
          { status: 'RECYCLER_ASSIGNED', note: 'Assigned to Reliance Industries Circular' },
          { status: 'DELIVERED', note: 'Weighbridge slip uploaded' },
          { status: 'DELIVERY_VERIFIED', note: 'Recycler confirmed secure intake of all garbage' },
          { status: 'PAID', note: 'Admin Priya Sharma finalized payment of ₹223.20 via UPI' }
        ]
      },
      {
        id: 'COL-REQ-1002',
        volunteerId: 'VOL-2026-E47A91BC',
        volunteerName: 'Ananya Deshmukh',
        volunteerEmail: 'volunteer@ecoloop.in',
        collectorId: 'COL-2026-KABADI-01',
        collectorName: 'Ramesh Kumar',
        category: 'plastic_hdpe',
        categoryName: 'HDPE Rigid Containers',
        ratePerKg: 14.00,
        proposedWeightKg: 8.5,
        actualWeightKg: 8.5,
        estimatedReward: 119.00,
        finalReward: 119.00,
        location: 'Sarojini Bhawan Room 204, IIT Roorkee',
        status: 'DELIVERY_VERIFIED', // Recycler confirmed! Ready for Admin to approve payment!
        wastePhoto: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
        assignedRecycler: {
          id: 'REC-002',
          name: 'Supreme Industries Ltd.',
          facility: 'Greater Noida Molded Products Yard, UP',
          cpcbReg: 'CPCB/EPR/2026/HD-19042'
        },
        deliveryProof: {
          receiptNo: 'REC-SUP-2026-4412',
          deliveryDate: new Date(),
          weighbridgeGrossKg: 8.5,
          notes: 'Collector delivered HDPE jug lot to Supreme intake gate'
        },
        recyclerIntake: {
          confirmedAt: new Date(),
          recyclerName: 'Supreme Industries Ltd.',
          intakeSlipNo: 'IN-SUP-2026-9912',
          verifiedNetWeightKg: 8.5,
          purityPercentage: 97.8,
          inspectorName: 'Vikram Joshi (Gate Officer)',
          notes: 'All garbage received in full. Verified 8.5 kg HDPE rigid opaque containers.'
        },
        history: [
          { status: 'PROPOSED', note: 'Proposal created for 8.5 kg HDPE detergent bottles' },
          { status: 'VOLUNTEER_ACCEPTED', note: 'Volunteer confirmed pickup' },
          { status: 'COLLECTED', note: 'Collector picked up 8.5 kg measured tare' },
          { status: 'ADMIN_APPROVED', note: 'Admin verified HDPE quality.' },
          { status: 'RECYCLER_ASSIGNED', note: 'Routed to Supreme Industries Ltd.' },
          { status: 'DELIVERED', note: 'Collector delivered lot to plant' },
          { status: 'DELIVERY_VERIFIED', note: 'Supreme Industries confirmed secure intake of all garbage. Ready for Admin payment approval.' }
        ]
      },
      {
        id: 'COL-REQ-1004',
        volunteerId: 'VOL-2026-E47A91BC',
        volunteerName: 'Ananya Deshmukh',
        volunteerEmail: 'volunteer@ecoloop.in',
        collectorId: 'COL-2026-KABADI-01',
        collectorName: 'Ramesh Kumar',
        category: 'plastic_pet',
        categoryName: 'PET Clear Rigid Bottles',
        ratePerKg: 18.00,
        proposedWeightKg: 18.0,
        actualWeightKg: 18.0,
        estimatedReward: 324.00,
        finalReward: 324.00,
        location: 'Sarojini Bhawan, IIT Roorkee',
        status: 'DELIVERED', // Delivered to Recycler, awaiting Recycler confirmation!
        wastePhoto: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
        assignedRecycler: {
          id: 'REC-001',
          name: 'Reliance Industries Circular (R-Elan)',
          facility: 'Dahej Polyester Fiber Complex, Gujarat',
          cpcbReg: 'CPCB/EPR/2026/PL-08491'
        },
        deliveryProof: {
          receiptNo: 'REC-REL-2026-9041',
          deliveryDate: new Date(),
          weighbridgeGrossKg: 18.0,
          notes: 'Collector Ramesh Kumar delivered 18.0 kg segregated PET bottles'
        },
        history: [
          { status: 'PROPOSED', note: 'Proposal created for 18.0 kg PET' },
          { status: 'VOLUNTEER_ACCEPTED', note: 'Volunteer accepted' },
          { status: 'COLLECTED', note: 'Weighed 18.0 kg on scale' },
          { status: 'ADMIN_APPROVED', note: 'Admin verified PET Lot' },
          { status: 'RECYCLER_ASSIGNED', note: 'Assigned to Reliance Industries Circular' },
          { status: 'DELIVERED', note: 'Collector delivered to Reliance intake gate. Awaiting Recycler signoff.' }
        ]
      },
      {
        id: 'COL-REQ-1003',
        volunteerId: 'VOL-2026-B812F40D',
        volunteerName: 'Arjun Patel',
        volunteerEmail: 'arjun@iitr.ac.in',
        collectorId: 'COL-2026-KABADI-01',
        collectorName: 'Ramesh Kumar',
        category: 'ewaste',
        categoryName: 'E-Waste & Li-Ion Batteries',
        ratePerKg: 120.00,
        proposedWeightKg: 3.2,
        actualWeightKg: null,
        estimatedReward: 384.00,
        location: 'Govind Bhawan Main Porch, IIT Roorkee',
        status: 'PROPOSED', // Awaiting Volunteer acceptance
        wastePhoto: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80',
        history: [
          { status: 'PROPOSED', note: 'Proposal sent to Volunteer Arjun Patel for 3.2 kg PCB / laptop parts' }
        ]
      }
    ]);
    console.log(`[Seed] Created ${collections.length} collections in MongoDB Atlas.`);

    // 3. Seed Audit Logs
    await AuditLog.insertMany([
      { actor: 'Priya Sharma (Admin)', action: 'APPROVE_COLLECTION', target: 'COL-REQ-1001', notes: 'Approved 12.4 kg PET at ₹18.00/kg' },
      { actor: 'Supreme Industries Ltd.', action: 'RECYCLER_CONFIRM_INTAKE', target: 'COL-REQ-1002', notes: 'Confirmed secure intake of 8.5 kg HDPE (Slip #IN-SUP-2026-9912)' },
      { actor: 'System Auto-Escrow', action: 'DISBURSE_PAYMENT', target: 'COL-REQ-1001', notes: 'Disbursed ₹223.20 via UPI instant payout' }
    ]);
    console.log('[Seed] Created audit trail in MongoDB Atlas.');

    await mongoose.disconnect();
    console.log('[Seed] All done! MongoDB Atlas cluster initialized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error:', err.message);
    process.exit(1);
  }
}

seed();
