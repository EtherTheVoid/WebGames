import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronRight, Star, Shield, Smartphone, Zap, Sun, Ruler, Check, ArrowRight, Home } from 'lucide-react';

// --- Mock Data ---

const PRODUCTS = [
  {
    id: 1,
    name: "Motorized Zebra Blinds",
    tagline: "Light filtering & privacy control",
    basePrice: 159,
    rating: 4.8,
    reviews: 1240,
    imageColor: "from-stone-100 to-stone-200",
    features: ["Dual Layer", "Light Filtering", "Privacy"],
    description: "Our most popular option. Control light and privacy simultaneously with alternating sheer and solid fabric bands. Compatible with Alexa and Google Home."
  },
  {
    id: 2,
    name: "Blackout Roller Shades",
    tagline: "100% Light Blocking",
    basePrice: 139,
    rating: 4.9,
    reviews: 856,
    imageColor: "from-slate-700 to-slate-800",
    features: ["100% Blackout", "Thermal Insulation", "UV Protection"],
    description: "Perfect for bedrooms and media rooms. High-quality fabric blocks 100% of incoming light and provides excellent thermal insulation."
  },
  {
    id: 3,
    name: "Solar Shades 5%",
    tagline: "UV Protection with a View",
    basePrice: 149,
    rating: 4.7,
    reviews: 430,
    imageColor: "from-blue-50 to-blue-100",
    features: ["Glare Reduction", "See-through", "UV Blocking"],
    description: "Reduce glare and heat without losing your view. Blocks 95% of UV rays, protecting your furniture and flooring from fading."
  },
  {
    id: 4,
    name: "Shangri-La Sheer Shades",
    tagline: "Elegant & Soft",
    basePrice: 189,
    rating: 4.9,
    reviews: 312,
    imageColor: "from-orange-50 to-orange-100",
    features: ["Soft Glow", "Elegant Design", "Privacy"],
    description: "Fabric vanes float between two layers of soft sheers. Close them for privacy or open them to let in a soft, diffused light."
  }
];

const FABRICS = [
  { name: 'White', class: 'bg-white border-gray-200' },
  { name: 'Grey', class: 'bg-gray-400 border-gray-400' },
  { name: 'Beige', class: 'bg-[#E1C699] border-[#E1C699]' },
  { name: 'Charcoal', class: 'bg-gray-700 border-gray-700' },
  { name: 'Navy', class: 'bg-blue-900 border-blue-900' },
];

const MOTORS = [
  { id: 'battery', name: 'Rechargeable Battery Motor', price: 0, desc: 'Standard remote control, 6-month battery life.' },
  { id: 'solar', name: 'Solar Panel Kit', price: 35, desc: 'Includes solar panel for continuous charging.' },
  { id: 'smart', name: 'Smart Zigbee Motor', price: 60, desc: 'Direct Alexa/Google integration (Echo Plus required).' },
];

// --- Components ---

const Navbar = ({ cartCount, onCartClick, onLogoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={onLogoClick}>
            <div className="w-8 h-8 bg-teal-500 rounded-md flex items-center justify-center mr-2 text-white font-bold">Y</div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">California Shades<span className="text-teal-500">.</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <button onClick={onLogoClick} className="text-gray-600 hover:text-teal-600 font-medium transition">Products</button>
            <button className="text-gray-600 hover:text-teal-600 font-medium transition">Smart Home</button>
            <button className="text-gray-600 hover:text-teal-600 font-medium transition">Inspiration</button>
            <button className="text-gray-600 hover:text-teal-600 font-medium transition">Support</button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer hover:text-teal-600 transition" onClick={onCartClick}>
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="px-4 py-2 space-y-1">
            <button onClick={() => { onLogoClick(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-md">Products</button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-md">Smart Home</button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-md">Inspiration</button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-md">Support</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onShopClick }) => (
  <div className="relative bg-stone-50 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 bg-stone-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Smart blinds for a</span>{' '}
              <span className="block text-teal-600 xl:inline">smarter home</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Custom made-to-order motorized shades. Compatible with Alexa, Google Home, and more. Upgrade your lifestyle with just one touch.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <button
                  onClick={onShopClick}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg transition-all"
                >
                  Shop Now
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg transition-all">
                  How it Works
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-200 flex items-center justify-center overflow-hidden">
      {/* Abstract representation of a smart living room */}
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 relative">
        <div className="absolute top-20 right-20 w-3/4 h-3/4 bg-white shadow-2xl rounded-tl-3xl border-l-8 border-t-8 border-teal-500/20">
           {/* Window Simulation */}
           <div className="w-full h-full p-8 flex flex-col space-y-4">
              <div className="w-full h-1/2 bg-gradient-to-b from-teal-50 to-transparent border border-gray-200 shadow-inner rounded relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQgMEgwIDQwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-50"></div>
                 <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-teal-700 shadow flex items-center gap-1">
                   <Zap size={12} /> Motorized
                 </div>
              </div>
              <div className="flex-1 bg-stone-100 rounded"></div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const FeatureSection = () => (
  <div className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Why California Shades?</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Smart shading made simple
        </p>
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {[
            {
              name: 'Custom Fit',
              description: 'Every blind is cut precisely to your window measurements for a perfect fit.',
              icon: Ruler,
            },
            {
              name: 'Smart Integration',
              description: 'Works with Alexa, Google Assistant, and Siri Shortcuts seamlessly.',
              icon: Smartphone,
            },
            {
              name: 'Quality Materials',
              description: 'Premium fabrics ranging from light filtering to 100% blackout options.',
              icon: Shield,
            },
          ].map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onClick }) => (
  <div 
    className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    onClick={() => onClick(product)}
  >
    <div className={`h-64 bg-gradient-to-b ${product.imageColor} group-hover:opacity-90 transition-opacity flex items-center justify-center`}>
       {/* Mock Product Visual */}
       <div className="w-3/4 h-3/4 bg-white shadow-xl rounded-md relative flex flex-col border-t-8 border-gray-300">
          <div className="w-full h-2/3 bg-gray-100 relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-transparent"></div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Motorized
          </div>
       </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
           <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
           <p className="text-sm text-gray-500 mt-1">{product.tagline}</p>
        </div>
        <div className="flex items-center bg-green-50 px-2 py-1 rounded">
           <Star className="w-3 h-3 text-green-600 fill-current" />
           <span className="text-xs font-bold text-green-700 ml-1">4.8</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.features.slice(0, 2).map((feat, i) => (
          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{feat}</span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold text-gray-900">From ${product.basePrice}</p>
        <button className="text-teal-600 font-medium text-sm hover:underline flex items-center">
          Customize <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const ProductList = ({ onProductSelect }) => (
  <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Explore Our Collection</h2>
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} onClick={onProductSelect} />
      ))}
    </div>
  </div>
);

const ProductConfigurator = ({ product, onBack, onAddToCart }) => {
  const [width, setWidth] = useState(24);
  const [height, setHeight] = useState(36);
  const [fabric, setFabric] = useState(FABRICS[0]);
  const [motor, setMotor] = useState(MOTORS[0]);
  const [mount, setMount] = useState('inside');

  // Dynamic price calculation
  const areaPrice = (width * height) / 144 * 10; // Simple logic: $10 per sq ft
  const totalPrice = Math.round(product.basePrice + areaPrice + motor.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-900 mb-6">
        <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back to products
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        {/* Left Column: Visualizer */}
        <div className="flex flex-col gap-4">
          <div className={`w-full aspect-[3/4] rounded-2xl bg-gradient-to-b ${product.imageColor} relative flex items-center justify-center p-8 shadow-inner overflow-hidden`}>
             {/* Window Frame */}
             <div className="w-full max-w-md h-3/4 bg-white border-[16px] border-stone-100 shadow-2xl relative">
                {/* The Blind */}
                <div 
                  className={`absolute top-0 left-0 right-0 transition-all duration-700 ease-in-out border-b-8 border-gray-300 shadow-md ${fabric.class}`}
                  style={{ 
                    height: '80%', 
                    opacity: 0.9,
                    backgroundColor: fabric.name === 'White' ? '#fff' : 
                                     fabric.name === 'Grey' ? '#9ca3af' :
                                     fabric.name === 'Beige' ? '#E1C699' :
                                     fabric.name === 'Charcoal' ? '#374151' : '#1e3a8a'
                  }}
                >
                  {/* Texture lines for blinds */}
                  <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,#000_20px)]"></div>
                </div>
                {/* Window Pane (Behind blind) */}
                <div className="w-full h-full bg-blue-100 z-[-1]"></div>
             </div>

             <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="inline-block bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-700">
                  Preview: {fabric.name} Fabric &bull; {width}" x {height}"
                </span>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-4 rounded-xl">
               <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold"><Shield className="w-4 h-4 text-teal-500"/> Warranty</div>
               <p className="text-xs text-gray-500">2-year warranty on motors and controls.</p>
             </div>
             <div className="bg-gray-50 p-4 rounded-xl">
               <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold"><Zap className="w-4 h-4 text-teal-500"/> Shipping</div>
               <p className="text-xs text-gray-500">Free shipping within 7-10 business days.</p>
             </div>
          </div>
        </div>

        {/* Right Column: Configurator Form */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${totalPrice}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            {/* 1. Fabric Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">1. Select Fabric Color</h3>
              <div className="flex items-center space-x-3">
                {FABRICS.map((fab) => (
                  <button
                    key={fab.name}
                    onClick={() => setFabric(fab)}
                    className={`relative w-10 h-10 rounded-full border-2 focus:outline-none ${fabric.name === fab.name ? 'ring-2 ring-offset-2 ring-teal-500 border-transparent' : 'border-gray-300'}`}
                    style={{ backgroundColor: fab.name === 'Beige' ? '#E1C699' : fab.name.toLowerCase() }}
                    title={fab.name}
                  >
                     {fabric.name === fab.name && <Check className="w-5 h-5 text-white absolute inset-0 m-auto drop-shadow-md" />}
                  </button>
                ))}
                <span className="ml-3 text-sm font-medium text-gray-900">{fabric.name}</span>
              </div>
            </div>

            {/* 2. Measurements */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">2. Measurements (Inches)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Width</label>
                  <div className="flex items-center border border-gray-300 rounded-md bg-white">
                    <input 
                      type="number" 
                      value={width} 
                      onChange={(e) => setWidth(Math.max(10, Math.min(100, Number(e.target.value))))}
                      className="w-full p-2 rounded-l-md focus:ring-teal-500 focus:border-teal-500 border-none"
                    />
                    <span className="px-3 text-gray-400 text-sm">in</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" max="98" 
                    value={width} 
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full mt-2 accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Height</label>
                  <div className="flex items-center border border-gray-300 rounded-md bg-white">
                    <input 
                      type="number" 
                      value={height} 
                      onChange={(e) => setHeight(Math.max(10, Math.min(120, Number(e.target.value))))}
                      className="w-full p-2 rounded-l-md focus:ring-teal-500 focus:border-teal-500 border-none"
                    />
                    <span className="px-3 text-gray-400 text-sm">in</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" max="118" 
                    value={height} 
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full mt-2 accent-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* 3. Mount Type */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">3. Mount Type</h3>
              <div className="grid grid-cols-2 gap-3">
                 {['Inside Mount', 'Outside Mount'].map((type) => {
                   const val = type.split(' ')[0].toLowerCase();
                   return (
                     <div 
                       key={val}
                       onClick={() => setMount(val)}
                       className={`border rounded-lg p-3 cursor-pointer flex items-center justify-center text-sm font-medium transition-all ${mount === val ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                     >
                        {type}
                     </div>
                   );
                 })}
              </div>
            </div>

            {/* 4. Motor Selection */}
            <div className="mb-8">
               <h3 className="text-sm font-medium text-gray-900 mb-3">4. Select Motor</h3>
               <div className="space-y-3">
                 {MOTORS.map((m) => (
                   <div 
                     key={m.id}
                     onClick={() => setMotor(m)}
                     className={`relative border rounded-lg p-4 cursor-pointer flex justify-between items-center transition-all ${motor.id === m.id ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500' : 'border-gray-200 hover:border-gray-300'}`}
                   >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className={`block text-sm font-medium ${motor.id === m.id ? 'text-teal-900' : 'text-gray-900'}`}>{m.name}</span>
                          {m.id === 'smart' && <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">Popular</span>}
                        </div>
                        <span className={`block text-xs mt-1 ${motor.id === m.id ? 'text-teal-700' : 'text-gray-500'}`}>{m.desc}</span>
                      </div>
                      <div className="font-semibold text-sm text-gray-900">
                        {m.price > 0 ? `+$${m.price}` : 'Incl.'}
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            <button
              onClick={() => onAddToCart({ product, width, height, fabric, motor, mount, price: totalPrice })}
              className="mt-8 w-full bg-teal-600 border border-transparent rounded-md py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors shadow-lg"
            >
              Add to Cart - ${totalPrice}
            </button>
            <p className="mt-4 text-xs text-center text-gray-500">
              Custom orders typically ship within 5-7 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemove }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="mt-8">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-gray-500">Your cart is empty</p>
                    <button onClick={onClose} className="mt-4 text-teal-600 font-medium hover:underline">Start Shopping</button>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cart.map((item, index) => (
                        <li key={index} className="py-6 flex">
                          <div className={`flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden bg-gradient-to-br ${item.product.imageColor}`}></div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.product.name}</h3>
                                <p className="ml-4">${item.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.fabric.name} Fabric</p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <p className="text-gray-500">{item.width}" W x {item.height}" H &bull; {item.motor.name.split(' ')[0]} Motor</p>
                              <button onClick={() => onRemove(index)} className="font-medium text-teal-600 hover:text-teal-500">Remove</button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${total}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Products</h3>
          <ul className="mt-4 space-y-4">
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Zebra Blinds</a></li>
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Roller Shades</a></li>
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Cellular Shades</a></li>
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
          <ul className="mt-4 space-y-4">
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Installation Guides</a></li>
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Measurement Guide</a></li>
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Warranty</a></li>
            <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
           <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Smart Home</h3>
           <ul className="mt-4 space-y-4">
             <li><a href="#" className="text-base text-gray-300 hover:text-white">Alexa Setup</a></li>
             <li><a href="#" className="text-base text-gray-300 hover:text-white">Google Home</a></li>
             <li><a href="#" className="text-base text-gray-300 hover:text-white">Zigbee Hub</a></li>
           </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Newsletter</h3>
          <p className="mt-4 text-base text-gray-300">Subscribe for special offers.</p>
          <form className="mt-4 sm:flex sm:max-w-md">
             <input type="email" required className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400" placeholder="Enter your email" />
             <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
               <button type="submit" className="w-full bg-teal-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500">
                 Subscribe
               </button>
             </div>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
        <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; 2025 California Shades. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [view, setView] = useState('home'); // 'home', 'product-detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setView('product-detail');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    setView('home');
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const scrollToProducts = () => {
    const section = document.getElementById('products');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => setView('home')}
      />

      {view === 'home' && (
        <>
          <Hero onShopClick={scrollToProducts} />
          <FeatureSection />
          <ProductList onProductSelect={handleProductSelect} />
        </>
      )}

      {view === 'product-detail' && selectedProduct && (
        <ProductConfigurator 
          product={selectedProduct} 
          onBack={() => setView('home')}
          onAddToCart={handleAddToCart}
        />
      )}

      <Footer />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;