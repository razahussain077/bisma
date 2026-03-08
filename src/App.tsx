import React, { useState } from 'react';
import { ShoppingBag, Search, User, Heart, Menu, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { categories, products, Product } from './data';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  
  const [view, setView] = useState<'home' | 'checkout' | 'success' | 'customer-service' | 'legal-privacy'>('home');
  const [placedOrder, setPlacedOrder] = useState<{items: Product[], total: number, orderId: string} | null>(null);

  const showToastMessage = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      showToastMessage("Removed from favorites");
    } else {
      setFavorites([...favorites, productId]);
      showToastMessage("Added to favorites");
    }
  };

  const handleContinueToCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setPlacedOrder({
      items: [...cart],
      total: total,
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
    });
    setCart([]);
    setView('success');
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setView('home');
    setActiveCategory(null);
    window.scrollTo(0, 0);
  };

  const filteredProducts = activeCategory 
    ? products.filter(p => p.category === activeCategory)
    : products;

  return (
    <div className="min-h-screen bg-white text-[#222] font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50 flex items-center text-sm font-medium animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
          {toast}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#f4eddd] text-center py-2 text-xs tracking-widest uppercase flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4">
        <span className="font-bold text-[#e50010]">Bisma Chand - 02-11231-012</span>
        <span className="hidden sm:inline">|</span>
        <span>Free shipping over $40 & free returns</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-gray-600 hover:text-black"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Left Nav */}
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => { setView('customer-service'); window.scrollTo(0,0); }} className="text-sm hover:underline">Customer Service</button>
              <button onClick={() => showToastMessage("Newsletter Signup")} className="text-sm hover:underline">Newsletter</button>
              <button onClick={() => showToastMessage("Store Locator")} className="text-sm hover:underline">Find a store</button>
            </nav>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <a href="#" onClick={(e) => { e.preventDefault(); navigateHome(); }} className="block">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" alt="H&M" className="h-8 md:h-10" />
              </a>
            </div>

            {/* Right Nav */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button onClick={() => showToastMessage("Sign in modal would open here")} className="hidden md:flex items-center text-sm hover:underline">
                <User className="w-5 h-5 mr-1" />
                Sign in
              </button>
              <button onClick={() => showToastMessage(`You have ${favorites.length} favorites`)} className="hidden md:flex items-center text-sm hover:underline">
                <Heart className="w-5 h-5 mr-1" />
                Favorites
              </button>
              <button 
                className="flex items-center text-sm hover:underline relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag className="w-5 h-5 md:mr-1" />
                <span className="hidden md:inline">Shopping bag ({cart.length})</span>
                {cart.length > 0 && (
                  <span className="md:hidden absolute -top-1 -right-1 bg-[#e50010] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden md:flex justify-center space-x-8 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setView('home');
                }}
                className={`text-sm uppercase tracking-wider hover:underline ${activeCategory === category && view === 'home' ? 'font-bold underline' : ''}`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <span className="text-2xl font-bold text-[#e50010] tracking-tighter">H&M</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <div className="mb-6">
              <button onClick={() => { showToastMessage("Sign in"); setIsMobileMenuOpen(false); }} className="flex items-center w-full py-3 text-lg border-b border-gray-100">
                <User className="w-5 h-5 mr-3" /> Sign in
              </button>
              <button onClick={() => { showToastMessage(`Favorites (${favorites.length})`); setIsMobileMenuOpen(false); }} className="flex items-center w-full py-3 text-lg border-b border-gray-100">
                <Heart className="w-5 h-5 mr-3" /> Favorites
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setView('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-lg uppercase tracking-wider flex justify-between items-center"
                >
                  {category}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold uppercase tracking-wider">Shopping bag</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-gray-500 flex flex-col items-center">
                  <ShoppingBag className="w-12 h-12 mb-4 text-gray-300" />
                  <p>Your shopping bag is empty</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setView('home'); }}
                    className="mt-6 border border-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-28 object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-sm pr-4">{item.name}</h3>
                          <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-black">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-bold mt-1">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-2">Color: Default</p>
                        <p className="text-xs text-gray-500">Size: M</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span>Order value</span>
                  <span>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleContinueToCheckout}
                  className="w-full bg-black text-white py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex justify-center items-center"
                >
                  Continue to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main>
        {/* HOME VIEW */}
        {view === 'home' && (
          <>
            {/* Hero Section (Only show on home) */}
            {!activeCategory && (
              <div className="relative w-full h-[70vh] bg-gray-100 mb-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80" 
                  alt="Spring Collection" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Spring Collection</h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto">Discover the new arrivals for the season. Fresh styles, sustainable materials.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setActiveCategory('Women')}
                  className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Shop Women
                </button>
                <button 
                  onClick={() => setActiveCategory('Men')}
                  className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Shop Men
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-wider">
              {activeCategory ? activeCategory : 'New Arrivals'}
            </h2>
            <button onClick={() => showToastMessage("Filters opened")} className="flex items-center text-sm cursor-pointer hover:underline font-medium">
              Filter & Sort <Menu className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-white px-2 py-1 text-[10px] uppercase font-bold tracking-wider">
                      New Arrival
                    </span>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-600 text-red-600' : 'text-black'}`} />
                  </button>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-sm text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full border border-black py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors active:scale-[0.98]"
                    >
                      Add to bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No products found in this category.</p>
              <button 
                onClick={() => setActiveCategory(null)}
                className="mt-4 underline hover:text-black"
              >
                View all products
              </button>
            </div>
          )}
        </div>
        </>
        )}

        {/* CHECKOUT VIEW */}
        {view === 'checkout' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-8">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">
                  {/* Shipping Details */}
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b">1. Shipping Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input required type="text" placeholder="First Name" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                      <input required type="text" placeholder="Last Name" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                      <input required type="email" placeholder="Email" className="border border-gray-300 p-3 w-full sm:col-span-2 focus:outline-none focus:border-black" />
                      <input required type="text" placeholder="Address" className="border border-gray-300 p-3 w-full sm:col-span-2 focus:outline-none focus:border-black" />
                      <input required type="text" placeholder="City" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                      <input required type="text" placeholder="Postal Code" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                    </div>
                  </div>
                  {/* Payment Details */}
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b">2. Payment Method</h2>
                    <div className="grid grid-cols-1 gap-4">
                      <input required type="text" placeholder="Card Number" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="MM/YY" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                        <input required type="text" placeholder="CVC" className="border border-gray-300 p-3 w-full focus:outline-none focus:border-black" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="lg:w-1/3">
                <div className="bg-gray-50 p-6 sticky top-24">
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-24 object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    {cart.length === 0 && (
                      <p className="text-gray-500 text-sm">Your cart is empty.</p>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order value</span>
                      <span>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    form="checkout-form"
                    disabled={cart.length === 0}
                    className="w-full bg-black text-white py-4 mt-8 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS VIEW */}
        {view === 'success' && placedOrder && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-wider mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-10">Your order <span className="font-bold text-black">#{placedOrder.orderId}</span> has been placed successfully.</p>
            
            <div className="bg-gray-50 p-6 sm:p-10 text-left mb-10 max-w-xl mx-auto border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 border-b border-gray-200 pb-4">Order Details</h2>
              <div className="space-y-6 mb-6">
                {placedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-200" />
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Qty: 1</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-6 flex justify-between font-bold text-xl">
                <span>Total Paid</span>
                <span>${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={navigateHome}
              className="bg-black text-white px-10 py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* CUSTOMER SERVICE VIEW */}
        {view === 'customer-service' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-8 text-center">Customer Service</h1>
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">How can we help you?</h2>
                <p className="text-gray-600 mb-4">Welcome to H&M Customer Service. We're here to help you with your university assignment project.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="border border-gray-200 p-6 text-center hover:border-black cursor-pointer transition-colors">
                    <h3 className="font-bold uppercase tracking-wider mb-2">Delivery</h3>
                    <p className="text-sm text-gray-500">Information about delivery options and tracking.</p>
                  </div>
                  <div className="border border-gray-200 p-6 text-center hover:border-black cursor-pointer transition-colors">
                    <h3 className="font-bold uppercase tracking-wider mb-2">Returns</h3>
                    <p className="text-sm text-gray-500">How to return or exchange an item.</p>
                  </div>
                  <div className="border border-gray-200 p-6 text-center hover:border-black cursor-pointer transition-colors">
                    <h3 className="font-bold uppercase tracking-wider mb-2">Payments</h3>
                    <p className="text-sm text-gray-500">Payment methods and security.</p>
                  </div>
                  <div className="border border-gray-200 p-6 text-center hover:border-black cursor-pointer transition-colors">
                    <h3 className="font-bold uppercase tracking-wider mb-2">Contact Us</h3>
                    <p className="text-sm text-gray-500">Get in touch with our support team.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* LEGAL & PRIVACY VIEW */}
        {view === 'legal-privacy' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-8 text-center">Legal & Privacy</h1>
            <div className="space-y-8 text-gray-600">
              <section>
                <h2 className="text-xl font-bold text-black mb-4">Privacy Notice</h2>
                <p className="mb-4">This is a simulated Privacy Notice for the university assignment of Bisma Chand (02-11231-012).</p>
                <p className="mb-4">At H&M, we are committed to protecting and respecting your privacy. This notice explains how we collect, use, and safeguard your personal information when you use our website.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-black mb-4">Terms & Conditions</h2>
                <p className="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>This is a clone website built for educational purposes.</li>
                  <li>No real transactions will be processed.</li>
                  <li>All product images are sourced from Unsplash.</li>
                  <li>The H&M logo and brand name are property of H & M Hennes & Mauritz AB.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-black mb-4">Copyright</h2>
                <p>The content of this site is copyright-protected and is the property of H & M Hennes & Mauritz AB.</p>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#e4e4e4] pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => {setActiveCategory('Women'); setView('home');}} className="hover:underline">Women</button></li>
                <li><button onClick={() => {setActiveCategory('Men'); setView('home');}} className="hover:underline">Men</button></li>
                <li><button onClick={() => {setActiveCategory('Baby'); setView('home');}} className="hover:underline">Baby</button></li>
                <li><button onClick={() => {setActiveCategory('Kids'); setView('home');}} className="hover:underline">Kids</button></li>
                <li><button onClick={() => {setActiveCategory('H&M HOME'); setView('home');}} className="hover:underline">H&M HOME</button></li>
                <li><button onClick={() => {setActiveCategory('Sport'); setView('home');}} className="hover:underline">Sport</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Corporate Info</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Career at H&M</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">About H&M group</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Sustainability</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Press</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Investor Relations</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Corporate Governance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Help</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => { setView('customer-service'); window.scrollTo(0,0); }} className="hover:underline">Customer Service</button></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">My Account</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Find a Store</a></li>
                <li><button onClick={() => { setView('legal-privacy'); window.scrollTo(0,0); }} className="hover:underline">Legal & Privacy</button></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Contact</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Become a member</h3>
              <p className="text-sm text-gray-600 mb-4">Join now and get 10% off your next purchase!</p>
              <button onClick={() => showToastMessage("Sign up modal would open here")} className="text-sm font-bold uppercase tracking-wider hover:underline flex items-center">
                Read more <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="text-center border-t border-gray-300 pt-8">
            <p className="text-xs text-gray-500 max-w-2xl mx-auto mb-6">
              The content of this site is copyright-protected and is the property of H & M Hennes & Mauritz AB. H&M's business concept is to offer fashion and quality at the best price in a sustainable way.
            </p>
            <div className="flex justify-center mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" alt="H&M" className="h-8" />
            </div>
            <p className="text-xs text-gray-500">Clone built for university assignment by Bisma Chand (02-11231-012)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
