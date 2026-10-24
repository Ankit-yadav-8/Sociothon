// ═══════════════════════════════════════════════════════════
// LoopIIT / EcoLoop - Unified Platform Store & Backend Service
// End-to-End State, Volunteer IDs, Proposals, Approvals,
// Recycler Logistics, Reward Calculations, and Email Automation
// ═══════════════════════════════════════════════════════════

const STORAGE_KEY_PREFIX = 'loopiit_platform_';

// ─── Initial Waste Category Reward Rates (Managed by Admin) ───
export const INITIAL_REWARD_RATES = [
  { id: 'plastic_pet', name: 'PET Clear Rigid Bottles', ratePerKg: 18.00, unit: 'kg', icon: '🧴', description: 'Clean drinking water & beverage bottles with caps separated' },
  { id: 'plastic_hdpe', name: 'HDPE Rigid Containers', ratePerKg: 14.00, unit: 'kg', icon: '🧼', description: 'Detergent, shampoo, and dairy opaque jugs' },
  { id: 'multilayer_film', name: 'Flexible Multilayer Film (MLP)', ratePerKg: 8.00, unit: 'kg', icon: '🍫', description: 'Chips packets, foil pouches, and laminated wrappers' },
  { id: 'food_organic', name: 'Kitchen & Mess Organic Waste', ratePerKg: 4.50, unit: 'kg', icon: '🍲', description: 'Hostel mess surplus, vegetable trimmings, coffee grounds' },
  { id: 'ewaste', name: 'E-Waste & Li-Ion Batteries', ratePerKg: 120.00, unit: 'kg', icon: '💻', description: 'Circuit boards, old phone components, lithium batteries' },
  { id: 'paper_cardboard', name: 'Corrugated Cardboard & Paper', ratePerKg: 10.00, unit: 'kg', icon: '📦', description: 'Dry delivery cartons, notebooks, and office paper' },
  { id: 'metal_cans', name: 'Aluminium Cans & Steel Scrap', ratePerKg: 35.00, unit: 'kg', icon: '🥫', description: 'Beverage cans, tin boxes, and clean scrap hardware' }
];

// ─── Initial Recycling Partner Companies (Managed by Admin) ───
export const INITIAL_RECYCLERS = [
  {
    id: 'REC-001',
    name: 'Reliance Industries Circular (R-Elan)',
    facility: 'Dahej Polyester Fiber Complex, Gujarat',
    cpcbReg: 'CPCB/EPR/2026/PL-08491',
    categories: ['plastic_pet'],
    rateMultiplier: 1.15,
    contact: 'procurement@reliancerecycle.com',
    status: 'ACTIVE'
  },
  {
    id: 'REC-002',
    name: 'Supreme Industries Ltd.',
    facility: 'Greater Noida Molded Products Yard, UP',
    cpcbReg: 'CPCB/EPR/2026/HD-19042',
    categories: ['plastic_hdpe', 'multilayer_film'],
    rateMultiplier: 1.10,
    contact: 'intake@supreme.co.in',
    status: 'ACTIVE'
  },
  {
    id: 'REC-003',
    name: 'Attero Recycling Ltd.',
    facility: 'Roorkee Urban Mining & E-Waste Refinery, Uttarakhand',
    cpcbReg: 'CPCB/EPR/2026/EW-99120',
    categories: ['ewaste'],
    rateMultiplier: 1.25,
    contact: 'refinery@attero.com',
    status: 'ACTIVE'
  },
  {
    id: 'REC-004',
    name: 'Dalmia Bharat Cement (Kiln Co-Processing)',
    facility: 'Haridwar Alternative Fuel Facility, Uttarakhand',
    cpcbReg: 'CPCB/EPR/2026/AF-44109',
    categories: ['multilayer_film'],
    rateMultiplier: 1.05,
    contact: 'coprocessing@dalmiacement.com',
    status: 'ACTIVE'
  },
  {
    id: 'REC-005',
    name: 'LoopIIT Campus Bio-Digester & Composting Hub',
    facility: 'North Campus Bio-Energy Center, IIT Roorkee',
    cpcbReg: 'IITR/GREEN/2026/ORG-01',
    categories: ['food_organic'],
    rateMultiplier: 1.20,
    contact: 'greenoffice@iitr.ac.in',
    status: 'ACTIVE'
  }
];

// ─── Seed Users ───
export const INITIAL_USERS = [
  {
    id: 'usr_admin_01',
    name: 'Priya Sharma',
    email: 'admin@ecoloop.in',
    role: 'admin',
    isEmailVerified: true,
    volunteerId: null,
    avatar: 'PS',
    phone: '+91 98110 01100',
    joinedAt: '2026-01-15'
  },
  {
    id: 'usr_col_01',
    name: 'Ramesh Kumar',
    email: 'collector@ecoloop.in',
    role: 'collector',
    isEmailVerified: true,
    collectorId: 'COL-2026-KABADI-01',
    vehicleNo: 'UK-08-EV-4421',
    ward: 'IIT Roorkee Campus & Civil Lines',
    avatar: 'RK',
    phone: '+91 98234 56789',
    joinedAt: '2026-02-01'
  },
  {
    id: 'usr_vol_01',
    name: 'Ananya Deshmukh',
    email: 'volunteer@ecoloop.in',
    role: 'volunteer',
    isEmailVerified: true,
    volunteerId: 'VOL-2026-E47A91BC',
    address: 'Room 204, Sarojini Bhawan, IIT Roorkee',
    avatar: 'AD',
    phone: '+91 98401 23456',
    upiId: 'ananya@okhdfcbank',
    joinedAt: '2026-02-10'
  },
  {
    id: 'usr_vol_02',
    name: 'Arjun Patel',
    email: 'arjun@iitr.ac.in',
    role: 'volunteer',
    isEmailVerified: true,
    volunteerId: 'VOL-2026-B812F40D',
    address: 'Govind Bhawan Room 112, IIT Roorkee',
    avatar: 'AP',
    phone: '+91 98765 43210',
    upiId: 'arjunpatel@okaxis',
    joinedAt: '2026-02-18'
  },
  {
    id: 'usr_hostel_01',
    name: 'Rajendra Bhawan Mess Manager',
    email: 'hostel@ecoloop.in',
    role: 'hostel',
    isEmailVerified: true,
    volunteerId: 'VOL-2026-H992A01F',
    avatar: 'RB',
    phone: '+91 98990 12345',
    joinedAt: '2026-01-20'
  },
  {
    id: 'usr_ngo_01',
    name: 'Green Earth Foundation',
    email: 'ngo@ecoloop.in',
    role: 'ngo',
    isEmailVerified: true,
    volunteerId: 'VOL-2026-NGO7712E',
    avatar: 'GE',
    phone: '+91 98100 99887',
    joinedAt: '2026-01-10'
  },
  {
    id: 'usr_rec_01',
    name: 'Reliance Circular Industries',
    email: 'recycler@ecoloop.in',
    role: 'recycler',
    isEmailVerified: true,
    recyclerId: 'REC-001',
    facility: 'Dahej Polyester Fiber Complex, Gujarat',
    cpcbReg: 'CPCB/EPR/2026/PL-08491',
    avatar: 'RC',
    phone: '+91 99000 11223',
    joinedAt: '2026-01-10'
  }
];

// ─── Initial Collections / Proposals ───
export const INITIAL_COLLECTIONS = [
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
    createdAt: '2026-10-23T09:30:00Z',
    status: 'PAID', // PROPOSED -> VOLUNTEER_ACCEPTED -> COLLECTED -> ADMIN_APPROVED -> RECYCLER_ASSIGNED -> DELIVERED -> DELIVERY_VERIFIED -> REWARD_APPROVED -> PAYMENT_PENDING -> PAID
    wastePhoto: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
    assignedRecycler: INITIAL_RECYCLERS[0],
    deliveryProof: {
      receiptNo: 'REC-REL-2026-8819',
      deliveryDate: '2026-10-23T14:15:00Z',
      weighbridgeGrossKg: 12.4,
      notes: 'Passed 96.4% optical purity test at intake hopper'
    },
    recyclerIntake: {
      confirmedAt: '2026-10-23T14:30:00Z',
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
      paidAt: '2026-10-23T16:00:00Z',
      status: 'SUCCESS'
    },
    history: [
      { timestamp: '2026-10-23T09:30:00Z', status: 'PROPOSED', note: 'Collector Ramesh Kumar issued pickup proposal' },
      { timestamp: '2026-10-23T10:15:00Z', status: 'VOLUNTEER_ACCEPTED', note: 'Volunteer Ananya accepted proposal' },
      { timestamp: '2026-10-23T11:00:00Z', status: 'COLLECTED', note: 'Collector weighed 12.4 kg on calibrated scale' },
      { timestamp: '2026-10-23T12:00:00Z', status: 'ADMIN_APPROVED', note: 'Admin verified PET Grade A' },
      { timestamp: '2026-10-23T12:30:00Z', status: 'RECYCLER_ASSIGNED', note: 'Assigned to Reliance Industries Circular' },
      { timestamp: '2026-10-23T14:15:00Z', status: 'DELIVERED', note: 'Weighbridge slip uploaded' },
      { timestamp: '2026-10-23T14:30:00Z', status: 'DELIVERY_VERIFIED', note: 'Recycler confirmed secure intake of all garbage' },
      { timestamp: '2026-10-23T15:00:00Z', status: 'REWARD_APPROVED', note: '₹223.20 reward authorized' },
      { timestamp: '2026-10-23T16:00:00Z', status: 'PAID', note: 'UPI settlement completed via IMPS' }
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
    createdAt: '2026-10-24T08:15:00Z',
    status: 'DELIVERY_VERIFIED', // Recycler confirmed secure intake! Awaiting Admin payment approval!
    wastePhoto: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
    assignedRecycler: INITIAL_RECYCLERS[1],
    deliveryProof: {
      receiptNo: 'REC-SUP-2026-4412',
      deliveryDate: '2026-10-24T12:00:00Z',
      weighbridgeGrossKg: 8.5,
      notes: 'Collector delivered HDPE jug lot to Supreme intake gate 3'
    },
    recyclerIntake: {
      confirmedAt: '2026-10-24T12:30:00Z',
      recyclerName: 'Supreme Industries Ltd.',
      intakeSlipNo: 'IN-SUP-2026-9912',
      verifiedNetWeightKg: 8.5,
      purityPercentage: 97.8,
      inspectorName: 'Vikram Joshi (Gate Officer)',
      notes: 'All garbage received in full. Verified 8.5 kg HDPE rigid opaque containers.'
    },
    payment: null,
    history: [
      { timestamp: '2026-10-24T08:15:00Z', status: 'PROPOSED', note: 'Proposal created for 8.5 kg HDPE detergent bottles' },
      { timestamp: '2026-10-24T09:00:00Z', status: 'VOLUNTEER_ACCEPTED', note: 'Volunteer confirmed pickup' },
      { timestamp: '2026-10-24T10:10:00Z', status: 'COLLECTED', note: 'Collector picked up 8.5 kg measured tare' },
      { timestamp: '2026-10-24T11:20:00Z', status: 'ADMIN_APPROVED', note: 'Admin verified HDPE quality.' },
      { timestamp: '2026-10-24T11:30:00Z', status: 'RECYCLER_ASSIGNED', note: 'Routed to Supreme Industries Ltd.' },
      { timestamp: '2026-10-24T12:00:00Z', status: 'DELIVERED', note: 'Collector delivered lot to plant' },
      { timestamp: '2026-10-24T12:30:00Z', status: 'DELIVERY_VERIFIED', note: 'Supreme Industries confirmed secure intake of all garbage. Updated Admin for payment approval.' }
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
    finalReward: null,
    location: 'Govind Bhawan Main Porch, IIT Roorkee',
    createdAt: '2026-10-24T11:00:00Z',
    status: 'PROPOSED', // Awaiting volunteer acceptance
    wastePhoto: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80',
    assignedRecycler: null,
    deliveryProof: null,
    payment: null,
    history: [
      { timestamp: '2026-10-24T11:00:00Z', status: 'PROPOSED', note: 'Proposal sent to Volunteer Arjun Patel for 3.2 kg PCB / old laptop parts' }
    ]
  },
  {
    id: 'COL-REQ-1004',
    volunteerId: 'VOL-2026-H992A01F',
    volunteerName: 'Rajendra Bhawan Mess Manager',
    volunteerEmail: 'hostel@ecoloop.in',
    collectorId: 'COL-2026-KABADI-01',
    collectorName: 'Ramesh Kumar',
    category: 'food_organic',
    categoryName: 'Kitchen & Mess Organic Waste',
    ratePerKg: 4.50,
    proposedWeightKg: 45.0,
    actualWeightKg: 45.0,
    estimatedReward: 202.50,
    finalReward: 202.50,
    location: 'Rajendra Bhawan Mess Back Kitchen, IIT Roorkee',
    createdAt: '2026-10-24T07:00:00Z',
    status: 'DELIVERED', // Collector delivered, awaiting Recyclable Company confirmation!
    wastePhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    assignedRecycler: INITIAL_RECYCLERS[4],
    deliveryProof: {
      receiptNo: 'REC-BIO-2026-7714',
      deliveryDate: '2026-10-24T11:45:00Z',
      weighbridgeGrossKg: 45.0,
      notes: 'Delivered 45 kg breakfast organic waste to Campus Bio-Digester intake hopper'
    },
    payment: null,
    history: [
      { timestamp: '2026-10-24T07:00:00Z', status: 'PROPOSED', note: 'Scheduled breakfast surplus collection' },
      { timestamp: '2026-10-24T07:30:00Z', status: 'VOLUNTEER_ACCEPTED', note: 'Mess supervisor confirmed' },
      { timestamp: '2026-10-24T08:00:00Z', status: 'COLLECTED', note: 'Collected 45.0 kg fresh organic waste' },
      { timestamp: '2026-10-24T08:30:00Z', status: 'ADMIN_APPROVED', note: 'Admin verified and approved' },
      { timestamp: '2026-10-24T08:45:00Z', status: 'RECYCLER_ASSIGNED', note: 'Assigned to LoopIIT Campus Bio-Digester & Composting Hub' },
      { timestamp: '2026-10-24T11:45:00Z', status: 'DELIVERED', note: 'Collector delivered 45 kg to Bio-Digester hopper. Awaiting Recycler confirmation.' }
    ]
  },
  {
    id: 'COL-REQ-1005',
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
    createdAt: '2026-10-24T09:00:00Z',
    status: 'DELIVERED', // Delivered to Reliance Circular, ready for Recycler to verify!
    wastePhoto: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
    assignedRecycler: INITIAL_RECYCLERS[0],
    deliveryProof: {
      receiptNo: 'REC-REL-2026-9041',
      deliveryDate: '2026-10-24T13:00:00Z',
      weighbridgeGrossKg: 18.0,
      notes: 'Collector Ramesh Kumar delivered 18.0 kg segregated PET bottles'
    },
    payment: null,
    history: [
      { timestamp: '2026-10-24T09:00:00Z', status: 'PROPOSED', note: 'Proposal created for 18.0 kg PET' },
      { timestamp: '2026-10-24T09:30:00Z', status: 'VOLUNTEER_ACCEPTED', note: 'Volunteer Ananya accepted' },
      { timestamp: '2026-10-24T10:15:00Z', status: 'COLLECTED', note: 'Weighed 18.0 kg on scale' },
      { timestamp: '2026-10-24T11:00:00Z', status: 'ADMIN_APPROVED', note: 'Admin verified PET Lot' },
      { timestamp: '2026-10-24T11:30:00Z', status: 'RECYCLER_ASSIGNED', note: 'Assigned to Reliance Industries Circular' },
      { timestamp: '2026-10-24T13:00:00Z', status: 'DELIVERED', note: 'Collector delivered to Reliance intake gate. Awaiting Recycler signoff.' }
    ]
  }
];

// ─── Initial Email Notification Logs ───
export const INITIAL_EMAIL_LOGS = [
  {
    id: 'EML-901',
    to: 'volunteer@ecoloop.in',
    recipientName: 'Ananya Deshmukh',
    volunteerId: 'VOL-2026-E47A91BC',
    subject: 'Welcome to LoopIIT! Your Unique Volunteer ID is VOL-2026-E47A91BC',
    event: 'ACCOUNT_REGISTRATION',
    status: 'DELIVERED',
    sentAt: '2026-02-10T10:00:00Z',
    preview: 'Your account has been created. Your permanent identification code is VOL-2026-E47A91BC.'
  },
  {
    id: 'EML-902',
    to: 'volunteer@ecoloop.in',
    recipientName: 'Ananya Deshmukh',
    volunteerId: 'VOL-2026-E47A91BC',
    subject: 'Action Required: Verify Your LoopIIT Email Address',
    event: 'EMAIL_VERIFICATION',
    status: 'DELIVERED',
    sentAt: '2026-02-10T10:02:00Z',
    preview: 'Click the secure link to verify your email address and unlock doorstep collection pickups.'
  },
  {
    id: 'EML-903',
    to: 'volunteer@ecoloop.in',
    recipientName: 'Ananya Deshmukh',
    volunteerId: 'VOL-2026-E47A91BC',
    subject: 'New Waste Collection Proposal Created: #COL-REQ-1002 (8.5 kg HDPE)',
    event: 'PROPOSAL_CREATED',
    status: 'DELIVERED',
    sentAt: '2026-10-24T08:15:00Z',
    preview: 'Collector Ramesh Kumar submitted a collection proposal for 8.5 kg HDPE Containers. Review and Accept.'
  },
  {
    id: 'EML-904',
    to: 'volunteer@ecoloop.in',
    recipientName: 'Ananya Deshmukh',
    volunteerId: 'VOL-2026-E47A91BC',
    subject: 'Payment Credited! ₹223.20 deposited to your UPI Wallet for #COL-REQ-1001',
    event: 'PAYMENT_CREDITED',
    status: 'DELIVERED',
    sentAt: '2026-10-23T16:00:00Z',
    preview: 'Your contribution of 12.4 kg PET bottles was successfully recycled. ₹223.20 has been credited.'
  }
];

// ─── Initial Audit Logs ───
export const INITIAL_AUDIT_LOGS = [
  { id: 'AUD-01', timestamp: '2026-10-23T12:00:00Z', actor: 'Priya Sharma (Admin)', action: 'APPROVE_COLLECTION', target: 'COL-REQ-1001', notes: 'Approved 12.4 kg PET at ₹18.00/kg' },
  { id: 'AUD-02', timestamp: '2026-10-23T14:45:00Z', actor: 'Priya Sharma (Admin)', action: 'VERIFY_DELIVERY', target: 'COL-REQ-1001', notes: 'Verified weighbridge proof REC-REL-2026-8819' },
  { id: 'AUD-03', timestamp: '2026-10-23T16:00:00Z', actor: 'System Auto-Escrow', action: 'DISBURSE_PAYMENT', target: 'COL-REQ-1001', notes: 'Disbursed ₹223.20 via UPI instant payout' },
  { id: 'AUD-04', timestamp: '2026-10-24T11:20:00Z', actor: 'Priya Sharma (Admin)', action: 'APPROVE_COLLECTION', target: 'COL-REQ-1002', notes: 'Approved 8.5 kg HDPE' }
];

// ═══════════════════════════════════════════════════════════
// PLATFORM STORE CLASS
// ═══════════════════════════════════════════════════════════
class PlatformStore {
  constructor() {
    this.initStore();
  }

  getStorage(key, defaultValue) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      if (!saved || saved === 'null' || saved === 'undefined') {
        return defaultValue;
      }
      const parsed = JSON.parse(saved);
      if (parsed === null || parsed === undefined) {
        return defaultValue;
      }
      if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
        return defaultValue;
      }
      return parsed;
    } catch (e) {
      console.warn('Storage read failed:', key, e);
      return defaultValue;
    }
  }

  setStorage(key, value) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write failed:', key, e);
    }
  }

  initStore() {
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'users')) {
      this.setStorage('users', INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'collections')) {
      this.setStorage('collections', INITIAL_COLLECTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'rates')) {
      this.setStorage('rates', INITIAL_REWARD_RATES);
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'recyclers')) {
      this.setStorage('recyclers', INITIAL_RECYCLERS);
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'email_logs')) {
      this.setStorage('email_logs', INITIAL_EMAIL_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'audit_logs')) {
      this.setStorage('audit_logs', INITIAL_AUDIT_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'tokens')) {
      this.setStorage('tokens', {});
    }
  }

  // ─── 1. UNIQUE VOLUNTEER ID GENERATION & VALIDATION ───
  generateUniqueVolunteerId() {
    const users = this.getUsers();
    const existingIds = new Set(users.map(u => u.volunteerId).filter(Boolean));
    let newId = '';
    let attempts = 0;

    do {
      // 8 collision-resistant uppercase alphanumeric chars
      const randomSegment = Math.random().toString(36).substring(2, 10).toUpperCase();
      newId = `VOL-2026-${randomSegment}`;
      attempts++;
    } while (existingIds.has(newId) && attempts < 100);

    return newId;
  }

  findVolunteerById(volunteerId) {
    if (!volunteerId) return null;
    const cleanId = volunteerId.trim().toUpperCase();
    return this.getUsers().find(u => u.volunteerId === cleanId && u.role === 'volunteer');
  }

  getAllVolunteers() {
    return this.getUsers().filter(u => u.role === 'volunteer');
  }

  getAllCollectors() {
    return this.getUsers().filter(u => u.role === 'collector');
  }

  // ─── 2. USERS & AUTHENTICATION ───
  getUsers() {
    return this.getStorage('users', INITIAL_USERS);
  }

  getUserByEmail(email) {
    if (!email) return null;
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  registerUser({ name, email, password, role = 'volunteer', phone, address }) {
    const existing = this.getUserByEmail(email);
    if (existing) {
      throw new Error(`An account with email ${email} already exists.`);
    }

    const assignedVolunteerId = role === 'volunteer' ? this.generateUniqueVolunteerId() : null;
    const assignedCollectorId = role === 'collector' ? `COL-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}` : null;

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // In a full backend this is argon2/bcrypt hashed
      role,
      isEmailVerified: false, // New accounts start in UNVERIFIED state
      volunteerId: assignedVolunteerId,
      collectorId: assignedCollectorId,
      phone: phone || '',
      address: address || '',
      avatar: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      joinedAt: new Date().toISOString()
    };

    const users = this.getUsers();
    users.push(newUser);
    this.setStorage('users', users);

    // Generate Verification Token
    const token = this.createEmailVerificationToken(newUser.email);

    // Send Registration & Verification Emails
    this.sendAutomatedEmail({
      to: newUser.email,
      recipientName: newUser.name,
      volunteerId: newUser.volunteerId,
      subject: `Verify Your Email Address - LoopIIT Smart Waste Platform`,
      event: 'EMAIL_VERIFICATION',
      data: {
        verificationLink: `${window.location.origin}${window.location.pathname}#/verify-email?token=${token}`,
        volunteerId: newUser.volunteerId
      }
    });

    if (newUser.volunteerId) {
      this.sendAutomatedEmail({
        to: newUser.email,
        recipientName: newUser.name,
        volunteerId: newUser.volunteerId,
        subject: `Your Official LoopIIT Permanent Volunteer ID: ${newUser.volunteerId}`,
        event: 'VOLUNTEER_ID_GENERATED',
        data: {
          volunteerId: newUser.volunteerId,
          role: newUser.role
        }
      });
    }

    this.logAudit({
      actor: `${newUser.name} (${newUser.role})`,
      action: 'USER_REGISTERED',
      target: newUser.id,
      notes: `Registered with Volunteer ID ${newUser.volunteerId || 'N/A'}`
    });

    return newUser;
  }

  // ─── 3. EMAIL VERIFICATION & TOKEN WORKFLOW ───
  createEmailVerificationToken(email) {
    const tokens = this.getStorage('tokens', {});
    const token = 'vtok_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    tokens[token] = {
      email: email.toLowerCase(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      createdAt: Date.now()
    };
    this.setStorage('tokens', tokens);
    return token;
  }

  verifyEmailToken(token) {
    const tokens = this.getStorage('tokens', {});
    const record = tokens[token];
    if (!record) {
      return { success: false, error: 'Invalid or already consumed verification token.' };
    }
    if (Date.now() > record.expiresAt) {
      delete tokens[token];
      this.setStorage('tokens', tokens);
      return { success: false, error: 'Verification token has expired. Please request a new verification email.' };
    }

    // Mark user verified
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === record.email.toLowerCase());
    if (userIndex === -1) {
      return { success: false, error: 'Associated user account not found.' };
    }

    users[userIndex].isEmailVerified = true;
    this.setStorage('users', users);

    // Consume single-use token
    delete tokens[token];
    this.setStorage('tokens', tokens);

    this.logAudit({
      actor: users[userIndex].name,
      action: 'EMAIL_VERIFIED',
      target: users[userIndex].id,
      notes: `Email ${record.email} verified successfully`
    });

    return {
      success: true,
      user: users[userIndex],
      message: 'Email verified successfully! All verified portal features unlocked.'
    };
  }

  resendVerificationEmail(email) {
    const user = this.getUserByEmail(email);
    if (!user) throw new Error('User account not found.');
    if (user.isEmailVerified) throw new Error('Email is already verified.');

    const token = this.createEmailVerificationToken(user.email);
    this.sendAutomatedEmail({
      to: user.email,
      recipientName: user.name,
      volunteerId: user.volunteerId,
      subject: `Verify Your Email Address - LoopIIT Smart Waste Platform`,
      event: 'EMAIL_VERIFICATION',
      data: {
        verificationLink: `${window.location.origin}${window.location.pathname}#/verify-email?token=${token}`,
        volunteerId: user.volunteerId
      }
    });

    return true;
  }

  // ─── 4. REWARD RATES CONFIGURATION (Admin Managed) ───
  getRewardRates() {
    return this.getStorage('rates', INITIAL_REWARD_RATES);
  }

  updateRewardRate(categoryId, newRatePerKg, adminName = 'Admin') {
    const rates = this.getRewardRates();
    const idx = rates.findIndex(r => r.id === categoryId);
    if (idx === -1) throw new Error('Category not found');
    const oldRate = rates[idx].ratePerKg;
    rates[idx].ratePerKg = parseFloat(newRatePerKg);
    this.setStorage('rates', rates);

    this.logAudit({
      actor: adminName,
      action: 'UPDATE_REWARD_RATE',
      target: categoryId,
      notes: `Updated ${rates[idx].name} rate from ₹${oldRate}/kg to ₹${newRatePerKg}/kg`
    });
    return rates;
  }

  calculateEstimatedReward(categoryId, weightKg) {
    const rates = this.getRewardRates();
    const cat = rates.find(r => r.id === categoryId);
    if (!cat) return 0;
    return parseFloat(((parseFloat(weightKg) || 0) * cat.ratePerKg).toFixed(2));
  }

  // ─── 5. RECYCLER COMPANIES (Admin Managed) ───
  getRecyclers() {
    return this.getStorage('recyclers', INITIAL_RECYCLERS);
  }

  addRecycler(recyclerData, adminName = 'Admin') {
    const recyclers = this.getRecyclers();
    const newRecycler = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      ...recyclerData,
      status: 'ACTIVE'
    };
    recyclers.push(newRecycler);
    this.setStorage('recyclers', recyclers);
    this.logAudit({
      actor: adminName,
      action: 'ADD_RECYCLER',
      target: newRecycler.id,
      notes: `Onboarded recycler ${newRecycler.name}`
    });
    return newRecycler;
  }

  // ─── 6. 10-STAGE GARBAGE COLLECTION & PROPOSAL WORKFLOW ───
  getCollections() {
    const list = this.getStorage('collections', INITIAL_COLLECTIONS);
    return Array.isArray(list) ? list : INITIAL_COLLECTIONS;
  }

  getCollectionsForVolunteer(volunteerId) {
    if (!volunteerId) return [];
    const list = this.getCollections();
    return Array.isArray(list) ? list.filter(c => c && c.volunteerId === volunteerId) : [];
  }

  getCollectionsForCollector(collectorId) {
    if (!collectorId) return [];
    const list = this.getCollections();
    return Array.isArray(list) ? list.filter(c => c && c.collectorId === collectorId) : [];
  }

  getCollectionById(id) {
    const list = this.getCollections();
    return Array.isArray(list) ? list.find(c => c && c.id === id) : null;
  }

  // Step 2: Collector creates proposal
  createProposal({ volunteerId, collectorId, collectorName, category, weightKg, location, wastePhoto }) {
    const volunteer = this.findVolunteerById(volunteerId);
    if (!volunteer) {
      throw new Error(`Volunteer with ID "${volunteerId}" not found in verified registry.`);
    }

    const rates = this.getRewardRates();
    const catObj = rates.find(r => r.id === category);
    if (!catObj) throw new Error('Invalid waste category.');

    const estReward = parseFloat((parseFloat(weightKg) * catObj.ratePerKg).toFixed(2));
    const newId = `COL-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProposal = {
      id: newId,
      volunteerId: volunteer.volunteerId,
      volunteerName: volunteer.name,
      volunteerEmail: volunteer.email,
      collectorId: collectorId || 'COL-2026-KABADI-01',
      collectorName: collectorName || 'Ramesh Kumar',
      category: catObj.id,
      categoryName: catObj.name,
      ratePerKg: catObj.ratePerKg,
      proposedWeightKg: parseFloat(weightKg),
      actualWeightKg: null,
      estimatedReward: estReward,
      finalReward: null,
      location: location || volunteer.address || 'Campus Node',
      createdAt: new Date().toISOString(),
      status: 'PROPOSED', // State 1
      wastePhoto: wastePhoto || 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
      assignedRecycler: null,
      deliveryProof: null,
      payment: null,
      history: [
        {
          timestamp: new Date().toISOString(),
          status: 'PROPOSED',
          note: `Collector ${collectorName} sent proposal for ${weightKg} kg ${catObj.name} (Est: ₹${estReward})`
        }
      ]
    };

    const collections = this.getCollections();
    collections.unshift(newProposal);
    this.setStorage('collections', collections);

    // Automated Email to Volunteer
    this.sendAutomatedEmail({
      to: volunteer.email,
      recipientName: volunteer.name,
      volunteerId: volunteer.volunteerId,
      subject: `New Waste Collection Proposal #${newId} from Collector ${collectorName}`,
      event: 'PROPOSAL_CREATED',
      data: {
        proposalId: newId,
        categoryName: catObj.name,
        proposedWeightKg: weightKg,
        estimatedReward: estReward,
        collectorName,
        actionUrl: `${window.location.origin}${window.location.pathname}#/dashboard/volunteer`
      }
    });

    this.logAudit({
      actor: collectorName,
      action: 'CREATE_PROPOSAL',
      target: newId,
      notes: `Sent proposal to ${volunteer.name} (${volunteer.volunteerId}) for ${weightKg} kg ${catObj.name}`
    });

    return newProposal;
  }

  // Step 3: Volunteer Accepts or Rejects Proposal
  respondToProposal(collectionId, isAccepted, volunteerName = 'Volunteer') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');
    if (item.status !== 'PROPOSED') {
      throw new Error(`Cannot respond to collection in status: ${item.status}`);
    }

    const nextStatus = isAccepted ? 'VOLUNTEER_ACCEPTED' : 'VOLUNTEER_REJECTED';
    item.status = nextStatus;
    item.history.push({
      timestamp: new Date().toISOString(),
      status: nextStatus,
      note: isAccepted
        ? `Volunteer ${volunteerName} accepted collection proposal. Doorstep pickup unlocked.`
        : `Volunteer ${volunteerName} rejected collection proposal.`
    });

    this.setStorage('collections', collections);

    // Notify Collector
    const collector = this.getUserByEmail('collector@ecoloop.in');
    if (collector) {
      this.sendAutomatedEmail({
        to: collector.email,
        recipientName: collector.name,
        volunteerId: item.volunteerId,
        subject: `Proposal #${collectionId} ${isAccepted ? 'ACCEPTED' : 'REJECTED'} by Volunteer ${volunteerName}`,
        event: isAccepted ? 'PROPOSAL_ACCEPTED' : 'PROPOSAL_REJECTED',
        data: {
          proposalId: collectionId,
          volunteerName,
          status: nextStatus
        }
      });
    }

    this.logAudit({
      actor: volunteerName,
      action: isAccepted ? 'ACCEPT_PROPOSAL' : 'REJECT_PROPOSAL',
      target: collectionId,
      notes: `Volunteer ${isAccepted ? 'accepted' : 'rejected'} proposal ${collectionId}`
    });

    return item;
  }

  // Step 4: Collector Finalizes Physical Collection (Only allowed if VOLUNTEER_ACCEPTED)
  finalizeCollection(collectionId, actualMeasuredWeightKg, scaleEvidencePhoto, collectorName = 'Collector') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'VOLUNTEER_ACCEPTED') {
      throw new Error('Integrity Lock: Collector cannot finalize collection until the volunteer accepts the proposal.');
    }

    const weight = parseFloat(actualMeasuredWeightKg);
    if (isNaN(weight) || weight <= 0) {
      throw new Error('Please enter a valid measured weight.');
    }

    item.actualWeightKg = weight;
    item.status = 'COLLECTED'; // Step 4
    if (scaleEvidencePhoto) {
      item.wastePhoto = scaleEvidencePhoto;
    }

    const recalculatedEst = parseFloat((weight * item.ratePerKg).toFixed(2));
    item.estimatedReward = recalculatedEst;

    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'COLLECTED',
      note: `Collector ${collectorName} completed physical pickup. Measured tare weight: ${weight} kg. Submitted to Admin.`
    });

    this.setStorage('collections', collections);

    // Notify Volunteer and Admin
    this.sendAutomatedEmail({
      to: item.volunteerEmail,
      recipientName: item.volunteerName,
      volunteerId: item.volunteerId,
      subject: `Waste Collected: #${collectionId} (${weight} kg verified on tare scale)`,
      event: 'COLLECTION_FINALIZED',
      data: {
        proposalId: collectionId,
        actualWeight: weight,
        collectorName
      }
    });

    this.logAudit({
      actor: collectorName,
      action: 'COLLECT_WASTE',
      target: collectionId,
      notes: `Measured ${weight} kg on digital scale for ${item.volunteerId}`
    });

    return item;
  }

  // Step 5 & 6: Administrator Verifies & Approves Contribution (Computes final reward)
  adminReviewCollection(collectionId, isApproved, rejectionReason = '', adminName = 'Admin') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'COLLECTED') {
      throw new Error(`Cannot review collection currently in status ${item.status}`);
    }

    if (isApproved) {
      item.status = 'ADMIN_APPROVED';
      item.finalReward = parseFloat((item.actualWeightKg * item.ratePerKg).toFixed(2));
      item.history.push({
        timestamp: new Date().toISOString(),
        status: 'ADMIN_APPROVED',
        note: `Admin ${adminName} verified category ${item.categoryName} and approved weight ${item.actualWeightKg} kg. Final Reward: ₹${item.finalReward}`
      });
    } else {
      item.status = 'ADMIN_REJECTED';
      item.history.push({
        timestamp: new Date().toISOString(),
        status: 'ADMIN_REJECTED',
        note: `Admin ${adminName} rejected collection. Reason: ${rejectionReason}`
      });
    }

    this.setStorage('collections', collections);

    this.sendAutomatedEmail({
      to: item.volunteerEmail,
      recipientName: item.volunteerName,
      volunteerId: item.volunteerId,
      subject: `Collection #${collectionId} ${isApproved ? 'Approved by Admin' : 'Flagged for Review'}`,
      event: isApproved ? 'CONTRIBUTION_APPROVED' : 'CONTRIBUTION_REJECTED',
      data: {
        proposalId: collectionId,
        isApproved,
        finalReward: item.finalReward,
        rejectionReason
      }
    });

    this.logAudit({
      actor: adminName,
      action: isApproved ? 'APPROVE_COLLECTION' : 'REJECT_COLLECTION',
      target: collectionId,
      notes: isApproved ? `Approved ₹${item.finalReward}` : `Rejected: ${rejectionReason}`
    });

    return item;
  }

  // Step 7: Administrator Assigns Recycling Company
  assignRecycler(collectionId, recyclerId, instructions = '', adminName = 'Admin') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'ADMIN_APPROVED') {
      throw new Error('Can only assign recycling company to ADMIN_APPROVED collections.');
    }

    const recycler = this.getRecyclers().find(r => r.id === recyclerId);
    if (!recycler) throw new Error('Recycling company not found.');

    item.assignedRecycler = recycler;
    item.status = 'RECYCLER_ASSIGNED';
    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'RECYCLER_ASSIGNED',
      note: `Admin ${adminName} routed lot to ${recycler.name} (${recycler.facility}). Instructions: ${instructions || 'Direct delivery to processing bay'}`
    });

    this.setStorage('collections', collections);

    // Notify Collector to deliver
    const collector = this.getUserByEmail('collector@ecoloop.in');
    if (collector) {
      this.sendAutomatedEmail({
        to: collector.email,
        recipientName: collector.name,
        volunteerId: item.volunteerId,
        subject: `Delivery Order: Take Lot #${collectionId} to ${recycler.name}`,
        event: 'RECYCLER_ASSIGNED',
        data: {
          proposalId: collectionId,
          recyclerName: recycler.name,
          facility: recycler.facility,
          instructions
        }
      });
    }

    this.logAudit({
      actor: adminName,
      action: 'ASSIGN_RECYCLER',
      target: collectionId,
      notes: `Assigned lot to ${recycler.name}`
    });

    return item;
  }

  // Step 8: Collector Delivers to Recycler & Uploads Proof
  submitDeliveryProof(collectionId, { receiptNo, weighbridgeGrossKg, proofPhotoUrl, notes }, collectorName = 'Collector') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'RECYCLER_ASSIGNED') {
      throw new Error('Can only upload delivery proof for collections with assigned recyclers.');
    }

    item.deliveryProof = {
      receiptNo: receiptNo || `RCP-${Math.floor(10000 + Math.random() * 90000)}`,
      weighbridgeGrossKg: parseFloat(weighbridgeGrossKg) || item.actualWeightKg,
      proofPhotoUrl: proofPhotoUrl || item.wastePhoto,
      notes: notes || 'Delivered to intake gate',
      deliveryDate: new Date().toISOString()
    };

    item.status = 'DELIVERED';
    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'DELIVERED',
      note: `Collector ${collectorName} uploaded proof: Receipt #${item.deliveryProof.receiptNo}, Gross: ${item.deliveryProof.weighbridgeGrossKg} kg`
    });

    this.setStorage('collections', collections);

    this.logAudit({
      actor: collectorName,
      action: 'SUBMIT_DELIVERY_PROOF',
      target: collectionId,
      notes: `Uploaded receipt #${item.deliveryProof.receiptNo}`
    });

    return item;
  }

  // Step 8b: Administrator Confirms Delivery Proof
  confirmDeliveryVerification(collectionId, adminName = 'Admin') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'DELIVERED') {
      throw new Error('Can only verify delivery after delivery proof is uploaded.');
    }

    item.status = 'DELIVERY_VERIFIED';
    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'DELIVERY_VERIFIED',
      note: `Admin ${adminName} verified weighbridge receipt and recycler intake seal.`
    });

    this.setStorage('collections', collections);

    this.logAudit({
      actor: adminName,
      action: 'VERIFY_DELIVERY',
      target: collectionId,
      notes: `Verified receipt for ${item.assignedRecycler?.name}`
    });

    return item;
  }

  // Step 8c: Recyclable Company Confirms Secure Handover of All Garbage
  recyclerConfirmIntake(collectionId, {
    recyclerName = 'Recycler Partner',
    verifiedNetWeightKg,
    purityPercentage = 98.0,
    intakeSlipNo,
    inspectorName = 'Intake Gate Officer',
    notes = 'Securely inspected and accepted all collected recyclable materials'
  } = {}) {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'DELIVERED' && item.status !== 'RECYCLER_ASSIGNED') {
      throw new Error(`Cannot verify intake for shipment in status: ${item.status}`);
    }

    const netWeight = parseFloat(verifiedNetWeightKg) || item.actualWeightKg || item.proposedWeightKg;
    const slipNo = intakeSlipNo || `IN-SLIP-${Math.floor(100000 + Math.random() * 900000)}`;

    item.status = 'DELIVERY_VERIFIED';
    item.actualWeightKg = netWeight;
    item.finalReward = parseFloat((netWeight * item.ratePerKg).toFixed(2));
    item.recyclerIntake = {
      confirmedAt: new Date().toISOString(),
      recyclerName: recyclerName || item.assignedRecycler?.name || 'Recycling Partner',
      intakeSlipNo: slipNo,
      verifiedNetWeightKg: netWeight,
      purityPercentage: parseFloat(purityPercentage) || 98.0,
      inspectorName,
      notes,
      handoverHash: `SHA256:0x${Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('')}`
    };

    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'DELIVERY_VERIFIED',
      note: `Recyclable Company (${item.recyclerIntake.recyclerName}) verified all garbage handed over securely. Net weight: ${netWeight} kg (${purityPercentage}% optical purity). Updated Admin console for payment release.`
    });

    this.setStorage('collections', collections);

    // Automated Email to Admin
    this.sendAutomatedEmail({
      to: 'admin@ecoloop.in',
      recipientName: 'Platform Administrator',
      volunteerId: item.volunteerId,
      subject: `Recycler Confirmed Secure Handover for Lot #${collectionId} - Payment Approval Needed`,
      event: 'RECYCLER_INTAKE_VERIFIED',
      data: {
        collectionId,
        recyclerName: item.recyclerIntake.recyclerName,
        verifiedNetWeightKg: netWeight,
        finalReward: item.finalReward,
        intakeSlipNo: slipNo
      }
    });

    this.logAudit({
      actor: `${item.recyclerIntake.recyclerName} (${inspectorName})`,
      action: 'RECYCLER_CONFIRM_INTAKE',
      target: collectionId,
      notes: `Confirmed intake of ${netWeight} kg (Purity ${purityPercentage}%, Slip #${slipNo})`
    });

    return item;
  }

  getCollectionsForRecycler(recyclerId) {
    const list = this.getCollections();
    if (!Array.isArray(list)) return [];
    if (!recyclerId) return list.filter(c => c && (c.status === 'DELIVERED' || c.status === 'RECYCLER_ASSIGNED' || c.status === 'DELIVERY_VERIFIED'));
    return list.filter(c => c && (c.assignedRecycler?.id === recyclerId || c.status === 'DELIVERED' || c.status === 'RECYCLER_ASSIGNED' || c.status === 'DELIVERY_VERIFIED'));
  }

  // Step 9 & 10: Authorize Reward & Execute Payment (Instant UPI Payout)
  authorizeAndDisbursePayment(collectionId, { transactionUtr, paymentMethod = 'Instant UPI Auto-Credit' }, adminName = 'Admin') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    if (item.status !== 'DELIVERY_VERIFIED' && item.status !== 'ADMIN_APPROVED') {
      throw new Error('Cannot authorize payment without verified delivery or admin approval.');
    }

    const utr = transactionUtr || `UPI/2026/${Math.floor(100000000 + Math.random() * 900000000)}`;

    item.status = 'PAID';
    item.payment = {
      utr,
      method: paymentMethod,
      amount: item.finalReward || item.estimatedReward,
      paidAt: new Date().toISOString(),
      status: 'SUCCESS'
    };

    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'PAID',
      note: `Admin ${adminName} finalized disbursement of ₹${item.payment.amount} via UTR: ${utr}`
    });

    this.setStorage('collections', collections);

    // Automated Email to Volunteer
    this.sendAutomatedEmail({
      to: item.volunteerEmail,
      recipientName: item.volunteerName,
      volunteerId: item.volunteerId,
      subject: `Payment Confirmed: ₹${item.payment.amount} Credited to Your UPI Account!`,
      event: 'PAYMENT_CREDITED',
      data: {
        proposalId: collectionId,
        amount: item.payment.amount,
        utr,
        volunteerId: item.volunteerId
      }
    });

    this.logAudit({
      actor: adminName,
      action: 'DISBURSE_PAYMENT',
      target: collectionId,
      notes: `Disbursed ₹${item.payment.amount} (UTR: ${utr}) to ${item.volunteerId}`
    });

    return item;
  }

  // Auditable Correction Request (Collectors cannot alter approved data without audit trail)
  submitCorrectionRequest(collectionId, { revisedWeightKg, revisedCategoryId, reason }, collectorName = 'Collector') {
    const collections = this.getCollections();
    const item = collections.find(c => c.id === collectionId);
    if (!item) throw new Error('Collection record not found.');

    const oldWeight = item.actualWeightKg || item.proposedWeightKg;
    item.correctionRequest = {
      requestedBy: collectorName,
      timestamp: new Date().toISOString(),
      oldWeight,
      revisedWeightKg: parseFloat(revisedWeightKg),
      revisedCategoryId,
      reason: reason.trim(),
      status: 'PENDING_ADMIN_AUDIT'
    };

    item.history.push({
      timestamp: new Date().toISOString(),
      status: 'CORRECTION_REQUESTED',
      note: `Collector ${collectorName} requested audit correction: Change weight from ${oldWeight}kg to ${revisedWeightKg}kg. Reason: "${reason}"`
    });

    this.setStorage('collections', collections);

    this.logAudit({
      actor: collectorName,
      action: 'REQUEST_CORRECTION',
      target: collectionId,
      notes: `Requested change to ${revisedWeightKg}kg: ${reason}`
    });

    return item;
  }

  // ─── 7. EMAIL AUTOMATION LOGS & DISPATCHER ───
  getEmailLogs() {
    return this.getStorage('email_logs', INITIAL_EMAIL_LOGS);
  }

  sendAutomatedEmail({ to, recipientName, volunteerId, subject, event, data = {} }) {
    const logs = this.getEmailLogs();
    const newEmail = {
      id: `EML-${Math.floor(1000 + Math.random() * 9000)}`,
      to,
      recipientName: recipientName || 'Valued User',
      volunteerId: volunteerId || 'N/A',
      subject,
      event,
      status: 'DELIVERED', // In simulated environment; will log errors if configured
      sentAt: new Date().toISOString(),
      preview: this.renderEmailPreview(event, data),
      meta: data
    };

    logs.unshift(newEmail);
    this.setStorage('email_logs', logs);
    return newEmail;
  }

  renderEmailPreview(event, data) {
    switch (event) {
      case 'EMAIL_VERIFICATION':
        return `Please click the secure link to verify your LoopIIT account and activate your permanent Volunteer ID: ${data.volunteerId || 'VOL-2026-...'}`;
      case 'VOLUNTEER_ID_GENERATED':
        return `Congratulations! Your official LoopIIT permanent Volunteer ID is ${data.volunteerId}. Use this code for all doorstep and hub pickups.`;
      case 'PROPOSAL_CREATED':
        return `Collector ${data.collectorName} sent you a collection proposal for ${data.proposedWeightKg} kg of ${data.categoryName} (Est. reward: ₹${data.estimatedReward}).`;
      case 'PROPOSAL_ACCEPTED':
        return `Volunteer ${data.volunteerName} accepted your pickup proposal for Lot #${data.proposalId}. You may now proceed with physical collection.`;
      case 'PROPOSAL_REJECTED':
        return `Volunteer ${data.volunteerName} declined collection proposal #${data.proposalId}.`;
      case 'COLLECTION_FINALIZED':
        return `Physical collection complete: ${data.actualWeight} kg logged on calibrated scale by Collector ${data.collectorName}.`;
      case 'CONTRIBUTION_APPROVED':
        return `Admin approved your waste contribution #${data.proposalId}! Final reward: ₹${data.finalReward}. Ready for recycler transfer.`;
      case 'CONTRIBUTION_REJECTED':
        return `Your collection #${data.proposalId} was flagged for review. Admin note: ${data.rejectionReason || 'Non-compliant batch'}.`;
      case 'RECYCLER_ASSIGNED':
        return `Delivery Order: Transfer Lot #${data.proposalId} to certified recycler ${data.recyclerName} at ${data.facility}.`;
      case 'PAYMENT_CREDITED':
        return `₹${data.amount} successfully credited via UPI (UTR: ${data.utr}) for verified recyclable contribution. Thank you for closing the loop!`;
      default:
        return `Notification from LoopIIT Smart Waste Recovery System regarding status update.`;
    }
  }

  // ─── 8. AUDIT LOGS ───
  getAuditLogs() {
    return this.getStorage('audit_logs', INITIAL_AUDIT_LOGS);
  }

  logAudit({ actor, action, target, notes }) {
    const logs = this.getAuditLogs();
    const entry = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      target,
      notes
    };
    logs.unshift(entry);
    this.setStorage('audit_logs', logs);
  }

  // ─── 9. METRICS & SUMMARY FOR DASHBOARDS ───
  getVolunteerMetrics(volunteerId) {
    const list = this.getCollectionsForVolunteer(volunteerId);
    let totalDivertedKg = 0;
    let totalEarnings = 0;
    let pendingEarnings = 0;
    let completedCount = 0;

    list.forEach(c => {
      const kg = c.actualWeightKg || c.proposedWeightKg || 0;
      if (['ADMIN_APPROVED', 'RECYCLER_ASSIGNED', 'DELIVERED', 'DELIVERY_VERIFIED', 'PAID'].includes(c.status)) {
        totalDivertedKg += kg;
      }
      if (c.status === 'PAID') {
        totalEarnings += c.finalReward || c.estimatedReward || 0;
        completedCount++;
      } else if (['ADMIN_APPROVED', 'RECYCLER_ASSIGNED', 'DELIVERED', 'DELIVERY_VERIFIED'].includes(c.status)) {
        pendingEarnings += c.finalReward || c.estimatedReward || 0;
      }
    });

    return {
      totalDivertedKg: parseFloat(totalDivertedKg.toFixed(2)),
      totalEarnings: parseFloat(totalEarnings.toFixed(2)),
      pendingEarnings: parseFloat(pendingEarnings.toFixed(2)),
      completedCount,
      totalProposals: list.length,
      greenKarmaPoints: Math.round(totalDivertedKg * 10)
    };
  }

  getPlatformStats() {
    const users = Array.isArray(this.getUsers()) ? this.getUsers() : [];
    const collections = Array.isArray(this.getCollections()) ? this.getCollections() : [];
    const volunteers = users.filter(u => u && u.role === 'volunteer');
    const collectors = users.filter(u => u && u.role === 'collector');
    const emailLogs = Array.isArray(this.getEmailLogs()) ? this.getEmailLogs() : [];

    let totalWeightCollectedKg = 0;
    let totalPaymentsDisbursed = 0;
    let pendingApprovalsCount = 0;

    collections.forEach(c => {
      if (!c) return;
      const kg = c.actualWeightKg || c.proposedWeightKg || 0;
      totalWeightCollectedKg += kg;
      if (c.status === 'PAID' && c.payment) {
        totalPaymentsDisbursed += c.payment.amount || 0;
      }
      if (c.status === 'COLLECTED' || c.status === 'DELIVERED') {
        pendingApprovalsCount++;
      }
    });

    const verifiedUsersCount = users.filter(u => u && u.isEmailVerified).length;
    const verificationRate = users.length > 0 ? Math.round((verifiedUsersCount / users.length) * 100) : 0;

    return {
      totalVolunteers: volunteers.length,
      totalCollectors: collectors.length,
      totalUsers: users.length,
      verifiedUsersCount,
      verificationRate,
      totalWeightCollectedKg: parseFloat(totalWeightCollectedKg.toFixed(1)),
      totalPaymentsDisbursed: parseFloat(totalPaymentsDisbursed.toFixed(2)),
      pendingApprovalsCount,
      totalCollections: collections.length,
      emailsSent: emailLogs.length
    };
  }
}

export const platformStore = new PlatformStore();
