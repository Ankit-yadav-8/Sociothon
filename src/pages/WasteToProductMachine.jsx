import { useState, useEffect } from 'react';
import {
  Cpu, Zap, Factory, Recycle, ArrowRight, CheckCircle2,
  AlertTriangle, RefreshCw, Layers, Award, IndianRupee,
  Leaf, Package, Sparkles, Scale, Truck, Building2, Flame,
  Check, ChevronRight, Download, Sliders, ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

// Available Machine Input Waste Recipes and Output Useful Products
const SYNTHESIS_RECIPES = [
  {
    id: 'pet_filament',
    inputName: '5x PET Plastic Water Bottles (250g)',
    inputCategory: 'Rigid PET (RIC-1)',
    inputIcon: '🧴',
    productName: '3D Printing Filament Spool (rPET)',
    productDesc: '1kg spool of 1.75mm high-tensile recycled 3D printing filament for engineering prototyping.',
    productValue: 850,
    co2Saved: 2.4,
    processTimeSec: 4,
    processTemp: '245°C Melt Extrusion',
    stages: [
      'Dual-shaft shredding into 3mm micro-flakes',
      'Desiccant drying & pneumatic contaminant removal',
      'Screw-driven melt extrusion through 1.75mm brass nozzle',
      'Automated spooling with laser diameter calibration'
    ],
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'hdpe_paver',
    inputName: '3x HDPE Opaque Detergent Jugs (400g)',
    inputCategory: 'Rigid HDPE (RIC-2)',
    inputIcon: '🧼',
    productName: 'High-Density Interlocking Eco-Paver Block',
    productDesc: 'Heavy-duty exterior paving tile with 40MPa compressive strength for municipal footpaths and gardens.',
    productValue: 75,
    co2Saved: 3.1,
    processTimeSec: 4,
    processTemp: '190°C Hydraulic Compression',
    stages: [
      'Hot-wash decontamination of chemical remnants',
      'Granulation into coarse 5mm aggregate chips',
      'Blended with 20% recycled glass sand matrix',
      'Hydraulic thermal press at 15-ton pressure into hexagonal mold'
    ],
    img: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'organic_fertilizer',
    inputName: '3.0 kg Kitchen Food & Mess Scraps',
    inputCategory: 'Kitchen Organic Biomass',
    inputIcon: '🍲',
    productName: 'Micro-Dried Organic Bio-Pellet Fertilizer (1 kg)',
    productDesc: 'Odorless, pathogen-free organic NPK fertilizer pellets for agriculture and campus landscaping.',
    productValue: 55,
    co2Saved: 4.2,
    processTimeSec: 3,
    processTemp: '85°C Mill Thermomechanical Shear',
    stages: [
      'Mechanical shear grinding of fibrous bones & vegetable peels',
      'Controlled vacuum thermal dehydration (80% moisture evaporated)',
      'High-pressure rotary pelletization',
      'Air-cooling and automated packaging into compostable paper sacks'
    ],
    img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'paper_seedbook',
    inputName: '2.0 kg Office Shredded Paper & Cardboard',
    inputCategory: 'Cellulose Kraft Fiber',
    inputIcon: '📄',
    productName: 'Plantable Seed Paper Notebook & Stationery',
    productDesc: 'Handmade recycled notebook embedded with marigold & basil seeds that sprout when planted in soil.',
    productValue: 140,
    co2Saved: 1.8,
    processTimeSec: 3,
    processTemp: '40°C Hydraulic Sheet Former',
    stages: [
      'Chemical-free water hydra-pulping & fiber de-inking',
      'Infusion of non-GMO organic flowering seeds',
      'Mesh deckle vacuum sheet extraction',
      'Solar drying, spine stitching & laser-cut wooden cover binding'
    ],
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'mlp_planter',
    inputName: '40x Metallized Snack Packets (MLP)',
    inputCategory: 'Flexible Foil Film (RIC-7)',
    inputIcon: '🥨',
    productName: 'All-Weather Modular Architectural Planter Pot',
    productDesc: 'UV-resistant, waterproof structural composite planter pot replacing virgin fiberglass containers.',
    productValue: 260,
    co2Saved: 2.8,
    processTimeSec: 4,
    processTemp: '210°C Thermal Compression',
    stages: [
      'Cryogenic hammer-mill pulverization into fine flakes',
      'Thermal homogenization with recycled LDPE binder',
      'Rotational mold compression at 210°C',
      'Quench cooling and CNC surface finishing'
    ],
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80'
  }
];

// Verified Industrial Recycler Companies seeking Feedstock
const VERIFIED_RECYCLERS = [
  {
    id: 'REC-01',
    company: 'Reliance Industries Circular (R-Elan)',
    stream: 'Clear PET Flakes (rPET Grade A)',
    buyingPrice: '₹48.50 / kg',
    minVolumeKg: 500,
    cpcbCert: 'CPCB-REG-PET-2024-9821',
    destination: 'Dahej Textile & Polyester Yarn Complex',
    status: 'Actively Buying',
    capacityTonsPerDay: 45
  },
  {
    id: 'REC-02',
    company: 'Supreme Industries Ltd.',
    stream: 'HDPE Colored Regrind & Pallets',
    buyingPrice: '₹42.00 / kg',
    minVolumeKg: 250,
    cpcbCert: 'CPCB-REG-HDPE-2023-4412',
    destination: 'Noida Agricultural Pipe Extrusion Plant',
    status: 'Actively Buying',
    capacityTonsPerDay: 30
  },
  {
    id: 'REC-03',
    company: 'Dalmia Bharat Cement Ltd.',
    stream: 'Non-Recyclable Multilayer Film (RDF Co-processing)',
    buyingPrice: '₹8.50 / kg',
    minVolumeKg: 1000,
    cpcbCert: 'CPCB-COPROCESS-2025-1109',
    destination: 'Ariyalur Cement Kiln Clean Thermal Substitution',
    status: 'Actively Buying',
    capacityTonsPerDay: 120
  },
  {
    id: 'REC-04',
    company: 'Attero Recycling Ltd.',
    stream: 'PCB Motherboards & Lithium-Ion Black Mass',
    buyingPrice: '₹380.00 / kg',
    minVolumeKg: 50,
    cpcbCert: 'CPCB-EWASTE-R2-2024-0098',
    destination: 'Roorkee Urban Ore Hydro-metallurgical Facility',
    status: 'Actively Buying',
    capacityTonsPerDay: 15
  },
  {
    id: 'REC-05',
    company: 'GreenJams Bio-Crete Infrastructure',
    stream: 'Kitchen Organic Dehydrated Biomass',
    buyingPrice: '₹14.00 / kg',
    minVolumeKg: 200,
    cpcbCert: 'MSW-BIO-UPCYCLE-2024-7714',
    destination: 'Visakhapatnam Carbon-Negative Eco-Brick Plant',
    status: 'Actively Buying',
    capacityTonsPerDay: 25
  }
];

// Smart Garbage Collection Hubs
const GARBAGE_HUBS = [
  { id: 'HUB-01', name: 'Ward 3 Municipal Waste Bank (Potheri)', fillPct: 88, status: 'Compaction Required', priority: 'High', wasteStockKg: 1850 },
  { id: 'HUB-02', name: 'Hauz Khas Commercial Recovery Station', fillPct: 54, status: 'Normal Operational', priority: 'Medium', wasteStockKg: 940 },
  { id: 'HUB-03', name: 'Pune Electronic Scrap & Urban Safe', fillPct: 92, status: 'Ready for Dispatch', priority: 'Critical', wasteStockKg: 2150 },
  { id: 'HUB-04', name: 'Dwarka Sector 4 Resident Collection Hub', fillPct: 38, status: 'Normal Operational', priority: 'Low', wasteStockKg: 460 }
];

export default function WasteToProductMachine() {
  const [activeTab, setActiveTab] = useState('synthesizer'); // 'synthesizer' | 'optimizer'

  // Machine State
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const [dispensedProduct, setDispensedProduct] = useState(null);
  const [totalProductsCreated, setTotalProductsCreated] = useState(14);
  const [totalCashGenerated, setTotalCashGenerated] = useState(4850);
  const [totalCo2AbatedKg, setTotalCo2AbatedKg] = useState(62.8);

  const activeRecipe = SYNTHESIS_RECIPES[selectedRecipeIndex];

  // Recycler Dispatch Simulation
  const [dispatchedContracts, setDispatchedContracts] = useState({});

  const handleStartMachine = () => {
    setIsProcessing(true);
    setProcessStage(0);
    setDispensedProduct(null);

    // Stage 1: Shred
    setTimeout(() => setProcessStage(1), 1000);
    // Stage 2: Thermal melt/dehydration
    setTimeout(() => setProcessStage(2), 2200);
    // Stage 3: Mold & dispense
    setTimeout(() => setProcessStage(3), 3400);

    // Complete
    setTimeout(() => {
      setIsProcessing(false);
      setDispensedProduct(activeRecipe);
      setTotalProductsCreated(prev => prev + 1);
      setTotalCashGenerated(prev => prev + activeRecipe.productValue);
      setTotalCo2AbatedKg(prev => +(prev + activeRecipe.co2Saved).toFixed(1));
      toast.success(`Transformation Complete! ${activeRecipe.productName} synthesized on the spot!`);
    }, 4500);
  };

  const handleContractDispatch = (recId) => {
    setDispatchedContracts(prev => ({ ...prev, [recId]: true }));
    toast.success('B2B Logistics Order Dispatched! Transport manifested with CPCB EPR ledger.');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '3rem' }}>
      
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.5rem' }}>
            <Factory size={14} /> Circular Micro-Factory & Recycler Network
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>
            Waste-to-Product Machine & Recycler Optimizer
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Deposit raw garbage into the on-site transformation machine to synthesize usable products, or 
            connect bulk municipal waste hubs directly to verified industrial recycling companies.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setActiveTab('synthesizer')}
            className="modern-btn"
            style={{
              background: activeTab === 'synthesizer' ? 'var(--accent-green-subtle)' : 'transparent',
              color: activeTab === 'synthesizer' ? 'var(--accent-green)' : 'var(--text-secondary)',
              borderColor: activeTab === 'synthesizer' ? 'var(--accent-green)' : 'transparent',
              padding: '0.6rem 1.2rem',
              fontWeight: 700
            }}
          >
            <Cpu size={16} /> EcoSynthesizer Machine
          </button>
          <button
            onClick={() => setActiveTab('optimizer')}
            className="modern-btn"
            style={{
              background: activeTab === 'optimizer' ? 'var(--accent-green-subtle)' : 'transparent',
              color: activeTab === 'optimizer' ? 'var(--accent-green)' : 'var(--text-secondary)',
              borderColor: activeTab === 'optimizer' ? 'var(--accent-green)' : 'transparent',
              padding: '0.6rem 1.2rem',
              fontWeight: 700
            }}
          >
            <Building2 size={16} /> Recycler Connect & Hub Optimizer
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MODULE 1: ECOSYNTHESIZER (WASTE-TO-PRODUCT MACHINE)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'synthesizer' && (
        <div>
          
          {/* Machine Telemetry Bar */}
          <div className="responsive-grid-4" style={{ marginBottom: '2rem' }}>
            <div className="modern-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>MACHINE STATUS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="pulse-led" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-green)' }}></span>
                ONLINE • READY
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Barrel: {activeRecipe.processTemp}</div>
            </div>

            <div className="modern-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRODUCTS SYNTHESIZED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {totalProductsCreated} Items
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginTop: '0.25rem' }}>+100% Circular Upcycling</div>
            </div>

            <div className="modern-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>VALUE CREATED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '0.25rem' }}>
                ₹{totalCashGenerated.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Direct Product Utility</div>
            </div>

            <div className="modern-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>GREENHOUSE AVOIDED</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-blue)', marginTop: '0.25rem' }}>
                {totalCo2AbatedKg} kg CO₂e
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Zero Incineration Footprint</div>
            </div>
          </div>

          <div className="responsive-split" style={{ alignItems: 'start' }}>
            
            {/* Left: Input Selection & Machine Chamber */}
            <div className="modern-card modern-card-lg">
              <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                Step 01: Select Raw Waste Input
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Choose Waste Feedstock for Machine Processing
              </h2>

              {/* Recipe Selector Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {SYNTHESIS_RECIPES.map((recipe, idx) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      if (!isProcessing) {
                        setSelectedRecipeIndex(idx);
                        setDispensedProduct(null);
                      }
                    }}
                    style={{
                      padding: '1.15rem',
                      borderRadius: '14px',
                      background: selectedRecipeIndex === idx ? 'var(--accent-green-subtle)' : 'var(--bg-tertiary)',
                      border: selectedRecipeIndex === idx ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.8rem' }}>{recipe.inputIcon}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {recipe.inputName}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          Yields: <strong style={{ color: 'var(--accent-green)' }}>{recipe.productName}</strong>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--accent-green)' }}>
                        ₹{recipe.productValue}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Market Value</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Machine Chamber Simulation */}
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    MACHINE CHAMBER: {activeRecipe.processTemp}
                  </div>
                  <span className="modern-badge neo-badge-blue">
                    {isProcessing ? 'Processing Active' : 'Standby Idle'}
                  </span>
                </div>

                {/* 3-Stage Progress Display */}
                <div className="responsive-grid-3" style={{ marginBottom: '1.5rem' }}>
                  {[
                    { name: '1. Shredding', desc: 'Dual-shaft shear' },
                    { name: '2. Thermal Melt', desc: 'Moisture/extrusion' },
                    { name: '3. Mold Extrude', desc: 'Finished product' }
                  ].map((st, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '10px',
                        background: processStage >= i + 1 ? 'var(--accent-green-subtle)' : 'var(--bg-tertiary)',
                        border: processStage >= i + 1 ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: processStage >= i + 1 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                        {st.name}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{st.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Process stages bullet list */}
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  <strong>Tooling Sequence:</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
                    {activeRecipe.stages.map((st, idx) => (
                      <li key={idx} style={{ marginBottom: '0.2rem' }}>{st}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleStartMachine}
                  disabled={isProcessing}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
                >
                  {isProcessing ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <RefreshCw size={18} className="spin-animation" /> Processing Feedstock ({processStage}/3)...
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Flame size={18} /> Feed Garbage & Synthesize Product
                    </span>
                  )}
                </button>
              </div>

            </div>

            {/* Right: Dispensed Product Card */}
            <div>
              <div className="modern-card modern-card-lg" style={{ position: 'sticky', top: '90px' }}>
                <span className="modern-badge neo-badge-green" style={{ marginBottom: '0.75rem' }}>
                  Output: Upcycled Finished Good
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Synthesized Product Output
                </h3>

                {dispensedProduct ? (
                  <div>
                    <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.25rem', position: 'relative' }}>
                      <img src={dispensedProduct.img} alt={dispensedProduct.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent-green)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                        READY FOR DISPENSE
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {dispensedProduct.productName}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                      {dispensedProduct.productDesc}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <div className="yield-box">
                        <div className="yield-amount">₹{dispensedProduct.productValue}</div>
                        <div className="yield-sublabel">Market Retail Worth</div>
                      </div>
                      <div className="yield-box">
                        <div className="yield-amount">-{dispensedProduct.co2Saved} kg</div>
                        <div className="yield-sublabel">CO₂ Abated</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => toast.success('Product Dispense Gate Opened! Collect from Machine Bay 01.')}
                        className="modern-btn modern-btn-primary"
                        style={{ flex: 1, padding: '0.85rem' }}
                      >
                        Claim Product
                      </button>
                      <button
                        onClick={() => toast.success(`Listed on EcoLoop B2B Marketplace for ₹${dispensedProduct.productValue}!`)}
                        className="modern-btn"
                        style={{ flex: 1, padding: '0.85rem' }}
                      >
                        Sell for ₹{dispensedProduct.productValue}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', border: '2px dashed var(--border-medium)', borderRadius: '16px' }}>
                    <Package size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                      Awaiting Feedstock Transformation
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '280px', margin: '0.35rem auto 0' }}>
                      Select a waste feedstock recipe on the left and click "Feed Garbage" to synthesize physical products on the spot.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODULE 2: GARBAGE HUB OPTIMIZER & RECYCLER B2B CONNECT
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'optimizer' && (
        <div>
          
          {/* Hub Status Overview */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Municipal Garbage Collection Hub Optimization
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Live IoT bin fill levels, autonomous baling compaction alerts, and predictive hauler route scheduling.
                </p>
              </div>
              <button
                onClick={() => toast.success('Route Optimization Engine Recomputed! Saved 14.8 km fleet travel distance.')}
                className="modern-btn modern-btn-primary"
              >
                <Zap size={16} /> Optimize Fleet Routes
              </button>
            </div>

            <div className="responsive-grid-4">
              {GARBAGE_HUBS.map(hub => (
                <div key={hub.id} className="modern-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className={`modern-badge ${hub.priority === 'Critical' ? 'neo-badge-red' : hub.priority === 'High' ? 'neo-badge-orange' : 'neo-badge-green'}`}>
                      {hub.priority} Priority
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{hub.id}</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {hub.name}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                    <span>Fill Level:</span>
                    <strong style={{ color: hub.fillPct > 80 ? 'var(--accent-red)' : 'var(--accent-green)' }}>{hub.fillPct}%</strong>
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '8px', background: 'var(--border-medium)', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <div style={{ width: `${hub.fillPct}%`, height: '100%', background: hub.fillPct > 80 ? 'var(--accent-red)' : 'var(--accent-green)' }}></div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Stock: {hub.wasteStockKg} kg</span>
                    <span>{hub.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Verified Recycler Marketplace (Waste-to-Company Matching) */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="modern-badge neo-badge-blue" style={{ marginBottom: '0.5rem' }}>
                <Building2 size={14} /> Direct B2B Industrial Supply Contracts
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Connect Sorted Waste to Verified Recycling Companies
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Directly channel sorted waste streams from community hubs into verified manufacturing recyclers with legal CPCB contracts.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {VERIFIED_RECYCLERS.map(rec => (
                <div key={rec.id} className="modern-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', padding: '1.5rem 1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-green-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)' }}>
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{rec.company}</h4>
                        <span className="modern-badge neo-badge-green">Verified CPCB</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Seeking: <strong style={{ color: 'var(--accent-green)' }}>{rec.stream}</strong> • Min: {rec.minVolumeKg} kg
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Plant: {rec.destination} • Lic: {rec.cpcbCert}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                        {rec.buyingPrice}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Offered Purchase Rate</div>
                    </div>

                    <button
                      onClick={() => handleContractDispatch(rec.id)}
                      disabled={dispatchedContracts[rec.id]}
                      className="modern-btn modern-btn-primary"
                      style={{ padding: '0.75rem 1.4rem' }}
                    >
                      {dispatchedContracts[rec.id] ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Check size={16} /> Dispatched & Contracted
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Truck size={16} /> Dispatch Feedstock
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
