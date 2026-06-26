import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Code, 
  Cpu, 
  Layers, 
  Eye, 
  Play, 
  Check, 
  Star, 
  Tag, 
  ChevronRight, 
  Info, 
  X, 
  ArrowRight, 
  Lock, 
  RotateCcw,
  Smartphone,
  Laptop,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from './products';
import { codeSnippets } from './codeSnippets';
import { CartItem, Product, CodeSnippet } from './types';

export default function App() {
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Flagship product simulator state
  const [isAncActive, setIsAncActive] = useState(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  
  // Selected code snippet
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('fone-bluetooth-premium');
  const [activeSnippetTab, setActiveSnippetTab] = useState<number>(1); // Index in codeSnippets array

  // DOM Step-by-Step Simulation state
  const [isSimulatingDOM, setIsSimulatingDOM] = useState(false);
  const [domSimulationStep, setDomSimulationStep] = useState(0);
  const [simulationExplanation, setSimulationExplanation] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' }[]>([]);

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Add toast helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Mais um ${product.name} adicionado ao carrinho!`);
        return prevCart.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`${product.name} adicionado ao carrinho!`);
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === productId);
      if (existing) {
        showToast(`${existing.product.name} removido do carrinho.`, 'info');
      }
      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) {
            return null; // Will filter out below
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  // Cart total math
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 19.90;
  const cartTotal = cartSubtotal + shippingCost;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Simulated Battery drain when playing sound demo
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingDemo) {
      timer = setInterval(() => {
        setBatteryLevel((prev) => {
          if (prev <= 1) {
            setIsPlayingDemo(false);
            showToast('Bateria descarregada! Conecte o carregador.', 'info');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingDemo]);

  // DOM Simulation Steps Runner
  const startDOMSimulation = () => {
    if (isSimulatingDOM) return;
    setIsSimulatingDOM(true);
    setDomSimulationStep(1);
    setSimulationExplanation('Passo 1: Criando o cabeçalho h1 usando document.createElement("h1")');
    showToast('Iniciando simulação de montagem do DOM...', 'info');
  };

  useEffect(() => {
    if (!isSimulatingDOM) return;
    
    let timer: NodeJS.Timeout;
    
    if (domSimulationStep === 1) {
      timer = setTimeout(() => {
        setDomSimulationStep(2);
        setSimulationExplanation('Passo 2: Definindo o ID para "titulo" e definindo o texto de boas-vindas.');
      }, 3000);
    } else if (domSimulationStep === 2) {
      timer = setTimeout(() => {
        setDomSimulationStep(3);
        setSimulationExplanation('Passo 3: Criando o container principal do produto (.produto-card) via createElement("div")');
      }, 3000);
    } else if (domSimulationStep === 3) {
      timer = setTimeout(() => {
        setDomSimulationStep(4);
        setSimulationExplanation('Passo 4: Criando os elementos filhos: Nome do produto (h2), Descrição (p) e Preço (p)');
      }, 3000);
    } else if (domSimulationStep === 4) {
      timer = setTimeout(() => {
        setDomSimulationStep(5);
        setSimulationExplanation('Passo 5: Aplicando estilos (fontWeight bold no preço) e injetando as strings de conteúdo.');
      }, 3000);
    } else if (domSimulationStep === 5) {
      timer = setTimeout(() => {
        setDomSimulationStep(6);
        setSimulationExplanation('Passo 6: Organizando a hierarquia com appendChild() e anexando tudo ao corpo da página!');
      }, 3500);
    } else if (domSimulationStep === 6) {
      timer = setTimeout(() => {
        setIsSimulatingDOM(false);
        setDomSimulationStep(0);
        setSimulationExplanation('');
        showToast('Simulação do DOM concluída com sucesso!');
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [isSimulatingDOM, domSimulationStep]);

  const runCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutOpen(false);
      setCheckoutComplete(false);
      showToast('Compra realizada com sucesso! Obrigado.', 'success');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Toast System */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              className={`p-4 rounded-xl shadow-xl flex items-center gap-3 border pointer-events-auto ${
                toast.type === 'success' 
                  ? 'bg-emerald-900 text-emerald-50 border-emerald-800' 
                  : 'bg-slate-900 text-slate-100 border-slate-800'
              }`}
            >
              <div className="w-2 h-2 rounded-full animate-ping bg-current" />
              <p className="text-sm font-medium">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dynamic DOM Simulator Overlay Bar */}
      {isSimulatingDOM && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 inset-x-0 bg-blue-600 text-white py-3 px-4 z-50 shadow-lg text-center font-medium flex items-center justify-between"
        >
          <div className="flex items-center gap-3 mx-auto text-sm md:text-base">
            <Cpu className="w-5 h-5 animate-spin" />
            <span>
              <strong>[CONSTRUTOR DOM]</strong> {simulationExplanation}
            </span>
          </div>
          <button 
            onClick={() => { setIsSimulatingDOM(false); setDomSimulationStep(0); }}
            className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
            title="Cancelar Simulação"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-slate-950">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span>Minha<span className="text-blue-600">Loja</span></span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#produtos" className="hover:text-blue-600 transition-colors">Produtos</a>
            <a href="#flagship" className="hover:text-blue-600 transition-colors">Destaque Premium</a>
            <a href="#bastidores" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <Code className="w-4 h-4 text-blue-500" />
              Bastidores do Código
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Free shipping counter preview */}
            <div className="hidden lg:flex flex-col items-end text-right text-xs text-slate-500 mr-2">
              {cartSubtotal >= freeShippingThreshold ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Ganhou Frete Grátis!
                </span>
              ) : (
                <span>
                  Faltam <strong className="text-slate-800">R$ {(freeShippingThreshold - cartSubtotal).toFixed(2).replace('.', ',')}</strong> para frete grátis
                </span>
              )}
              <div className="w-36 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min((cartSubtotal / freeShippingThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Cart Button */}
            <button 
              id="shopping-cart-button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span 
                  key={totalItems}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Welcome Section / Hero Header */}
        <section className="text-center py-8 md:py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-blue-50/50 via-transparent to-transparent -z-10 pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Tecnologia de Ponta
            </span>
            
            {/* H1 element explicitly matching ID "titulo" and welcome message */}
            <h1 
              id="titulo" 
              className={`font-display text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 transition-all duration-500 ${
                domSimulationStep === 1 || domSimulationStep === 2 
                  ? 'ring-4 ring-emerald-500 ring-offset-4 rounded-xl bg-emerald-50/50 scale-105 px-4 py-2' 
                  : ''
              }`}
            >
              Bem-vindo à nossa Loja Online!
            </h1>
            
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Descubra acessórios premium que elevam sua rotina. Design minimalista, 
              performance impecável e total liberdade sem fios.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={startDOMSimulation}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-slate-950/10 transition-all active:scale-95 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-blue-400" />
                Ver Simulação do DOM
              </button>
              <a
                href="#flagship"
                className="inline-flex items-center gap-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Ver Produto Principal
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </section>

        {/* Flagship Product Showcase (Fone de Ouvido Bluetooth Premium) */}
        {/* Identifies as the container that maps to the user's .produto-card class description */}
        <section id="flagship" className="scroll-mt-20">
          <div className="text-center md:text-left mb-6">
            <h2 className="font-display text-2xl font-bold text-slate-900">Flagship em Destaque</h2>
            <p className="text-sm text-slate-500">Nosso produto mais completo, agora com simulação de áudio imersiva.</p>
          </div>

          <div 
            id="flagship-product-card"
            className={`produto-card bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden transition-all duration-500 ${
              domSimulationStep >= 3 
                ? 'ring-4 ring-emerald-500 ring-offset-4 scale-[1.01] bg-emerald-50/10' 
                : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Product Visual Area */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex flex-col justify-between relative overflow-hidden min-h-[350px] lg:min-h-auto text-white">
                {/* Visual background rings */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e3a8a_0%,transparent_60%)] opacity-30" />
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-widest rounded-full">
                    Premium Áudio
                  </span>
                  
                  {/* Battery Simulator UI */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Bateria: {batteryLevel}%</span>
                  </div>
                </div>

                {/* Animated Headphone Graphic */}
                <div className="my-auto py-8 flex flex-col items-center justify-center relative z-10">
                  <div className="relative">
                    {/* Glowing pulse rings under the headphones */}
                    <AnimatePresence>
                      {isPlayingDemo && (
                        <>
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                            className="absolute inset-0 bg-blue-500/25 rounded-full filter blur-md"
                          />
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0.4 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeOut" }}
                            className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md"
                          />
                        </>
                      )}
                    </AnimatePresence>

                    {/* Outer glow if ANC is on */}
                    <div className={`absolute inset-0 rounded-full bg-sky-400/10 blur-xl transition-all duration-500 ${isAncActive ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`} />

                    <motion.div
                      animate={isPlayingDemo ? {
                        y: [0, -6, 0],
                        rotate: [-1, 1, -1]
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                      className="p-8 bg-slate-950/40 rounded-full border border-white/10 backdrop-blur-sm relative shadow-2xl"
                    >
                      {/* Beautiful headphone icon */}
                      <Volume2 className={`w-24 h-24 text-blue-400 transition-transform duration-500 ${isAncActive ? 'scale-110 text-cyan-400' : ''}`} />
                    </motion.div>
                  </div>

                  {/* Sound Wave Animation if playing or ANC is on */}
                  <div className="h-6 flex items-center gap-1 mt-6">
                    {isPlayingDemo ? (
                      [...Array(9)].map((_, i) => (
                        <motion.span 
                          key={i}
                          animate={{ 
                            height: i % 2 === 0 ? [8, 24, 8] : [14, 6, 14] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.5 + (i * 0.1),
                            ease: "easeInOut"
                          }}
                          className={`w-1 rounded-full ${isAncActive ? 'bg-cyan-400' : 'bg-blue-400'}`}
                        />
                      ))
                    ) : isAncActive ? (
                      // Calm, anti-noise counter wave
                      <div className="text-xs text-cyan-300 font-mono tracking-wide flex items-center gap-1.5">
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>ANC Ativo: Isolamento de Ruído Ligado</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Modo de áudio padrão</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 z-10">
                  <div className="text-xs text-slate-300 flex items-center justify-between">
                    <span>Demonstração de Áudio</span>
                    <span>{isPlayingDemo ? "Tocando..." : "Pausado"}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isPlayingDemo 
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      {isPlayingDemo ? 'Pausar Teste' : 'Ouvir Demonstração'}
                    </button>
                    <button 
                      onClick={() => setIsAncActive(!isAncActive)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAncActive 
                          ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' 
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      {isAncActive ? 'Desativar ANC' : 'Ativar ANC'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info / Cart Actions */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white relative">
                {/* Background highlighters for the DOM builder simulation */}
                <div className="space-y-6">
                  {/* Category & Badge */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                      {products[0].category}
                    </span>
                    {products[0].badge && (
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-xs font-bold rounded-md uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {products[0].badge}
                      </span>
                    )}
                    <div className="flex items-center gap-1 ml-auto text-amber-500 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{products[0].rating}</span>
                      <span className="text-slate-400 text-xs">({products[0].reviewsCount} avaliações)</span>
                    </div>
                  </div>

                  {/* Product Title matching h2 requested */}
                  <h2 
                    className={`font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight transition-all duration-500 ${
                      domSimulationStep === 4 
                        ? 'ring-4 ring-emerald-500 ring-offset-2 rounded-lg bg-emerald-50/50 p-1.5' 
                        : ''
                    }`}
                  >
                    {products[0].name}
                  </h2>

                  {/* Product Description matching p requested */}
                  <p 
                    className={`text-slate-600 leading-relaxed text-base md:text-lg transition-all duration-500 ${
                      domSimulationStep === 4 
                        ? 'ring-4 ring-emerald-500 ring-offset-2 rounded-lg bg-emerald-50/50 p-1.5' 
                        : ''
                    }`}
                  >
                    {products[0].description}
                  </p>

                  {/* Bullet Spec Highlights */}
                  <div className="border-t border-b border-slate-100 py-4 grid grid-cols-2 gap-3 text-xs md:text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Cancelamento Ativo (ANC)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Bateria de até 30 horas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Almofadas Ultra Soft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Estojo de Viagem incluso</span>
                    </div>
                  </div>

                  {/* Technical details accordion list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ficha Técnica</h4>
                    <ul className="text-xs text-slate-500 space-y-1">
                      {products[0].features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing and Actions container */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Preço à vista</span>
                    
                    {/* Price element matching user price text formatting */}
                    <p 
                      className={`text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight transition-all duration-500 ${
                        domSimulationStep === 4 || domSimulationStep === 5
                          ? 'ring-4 ring-emerald-500 ring-offset-2 rounded-lg bg-emerald-50/50 p-1.5' 
                          : ''
                      }`}
                      style={{ fontWeight: 'bold' }} // explicit styling requested
                    >
                      Preço: R$ 299,90
                    </p>
                    
                    <span className="text-[11px] text-emerald-600 font-semibold block mt-1 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      Ou 10x de R$ 29,99 sem juros
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => addToCart(products[0])}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/10 active:scale-95 cursor-pointer hover:shadow-xl group"
                    >
                      <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog of other curated items */}
        <section id="produtos" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Nosso Catálogo Completo</h2>
              <p className="text-sm text-slate-500">Explore outros periféricos de altíssimo nível para o seu setup.</p>
            </div>
            
            <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg inline-block self-start">
              Exibindo {products.length} itens Premium
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(1).map((prod) => (
              <motion.div 
                key={prod.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="p-5 space-y-4">
                  {/* Category and badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      {prod.category}
                    </span>
                    {prod.badge && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  {/* Icon representation of the product image */}
                  <div className="h-44 bg-slate-50 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100/80 transition-colors">
                    {prod.id === 'teclado-mecanico-rgb' && (
                      <Laptop className="w-16 h-16 text-slate-400 group-hover:text-blue-500 transition-colors group-hover:scale-105 duration-300" />
                    )}
                    {prod.id === 'magsafe-pro-powerbank' && (
                      <Smartphone className="w-16 h-16 text-slate-400 group-hover:text-blue-500 transition-colors group-hover:scale-105 duration-300" />
                    )}
                    {prod.id === 'smartwatch-sport-active' && (
                      <Sparkles className="w-16 h-16 text-slate-400 group-hover:text-blue-500 transition-colors group-hover:scale-105 duration-300" />
                    )}
                    
                    {/* Tiny floating specs badge */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600 shadow-xs border border-slate-100">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Preço</span>
                    <strong className="text-slate-900 font-extrabold text-base">
                      R$ {prod.price.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200/80 hover:border-blue-600 text-slate-700 transition-all active:scale-95 cursor-pointer"
                    title="Adicionar ao carrinho"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DOM Construction & Vanilla JS Code Behind the Scenes Section */}
        <section id="bastidores" className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-800 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Explanatory Context */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900/40 border border-blue-800 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                <Code className="w-3.5 h-3.5" />
                Educação & Tecnologia
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Como os elementos são desenhados na tela?
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Você pode criar e posicionar elementos na web de duas formas principais: de forma declarativa (utilizando frameworks como React) ou imperativa (com manipulação direta do DOM via JavaScript Vanilla).
              </p>

              <div className="space-y-3 pt-2 text-xs md:text-sm text-slate-300">
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p>
                    <strong className="text-white">Método Simples:</strong> Criação de nós de forma isolada, definindo propriedades fundamentais como `id` e `innerText` diretamente.
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p>
                    <strong className="text-white">Método Complexo:</strong> Organização hierárquica. Criamos um container (`div.produto-card`) e acoplamos os filhos (`h2`, `p`, `p`) utilizando `appendChild()` antes de injetar no corpo da página.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={startDOMSimulation}
                  disabled={isSimulatingDOM}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-950/20 active:scale-95 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  Simular Montagem Imperativa
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Isso aplicará outlines nas áreas correspondentes do cabeçalho e do produto!</span>
                </div>
              </div>
            </div>

            {/* Code Snippet Viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {codeSnippets.map((snippet, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSnippetTab(idx)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold tracking-tight transition-all text-center cursor-pointer ${
                      activeSnippetTab === idx
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
                    }`}
                  >
                    {idx === 0 ? "Método Simples" : idx === 1 ? "Método Complexo" : "HTML Estrutural"}
                  </button>
                ))}
              </div>

              {/* Code Box container */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-[11px] md:text-xs">
                {/* Simulated Header */}
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-[10px] text-slate-500 font-mono">
                      {codeSnippets[activeSnippetTab].language === 'javascript' ? 'script.js' : 'index.html'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeSnippets[activeSnippetTab].code);
                      showToast('Código copiado para a área de transferência!');
                    }}
                    className="hover:text-white transition-colors text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-850 cursor-pointer active:scale-95"
                  >
                    Copiar
                  </button>
                </div>

                {/* Snippet Code block */}
                <div className="p-4 overflow-x-auto max-h-[340px] leading-relaxed text-slate-300 scrollbar-thin select-all">
                  <pre>
                    <code>{codeSnippets[activeSnippetTab].code}</code>
                  </pre>
                </div>
                
                {/* Bottom explanation card */}
                <div className="p-3 bg-slate-900/70 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Contexto:</strong> {codeSnippets[activeSnippetTab].description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-[10px]">
              ML
            </div>
            <span className="font-semibold text-slate-800">Minha Loja Virtual © 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Desenvolvido de forma moderna com React 19 & Tailwind v4</span>
            <a href="#bastidores" className="hover:text-blue-600 font-semibold transition-colors flex items-center gap-1">
              <Code className="w-3 h-3" /> Ver Código Original
            </a>
          </div>
        </div>
      </footer>

      {/* SHOPPING CART DRAWER (Slide-over overlay) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <h2 className="font-display font-bold text-lg text-slate-900">Seu Carrinho</h2>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                      <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">Seu carrinho está vazio</h3>
                        <p className="text-xs text-slate-500 max-w-[240px] mx-auto mt-1">
                          Adicione produtos de nosso catálogo para iniciar sua experiência.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs text-blue-600 font-semibold hover:text-blue-700 underline"
                      >
                        Continuar Comprando
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative group">
                        {/* Static Thumbnail representation based on product type */}
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-slate-200/60 flex-shrink-0">
                          {item.product.id === 'fone-bluetooth-premium' && <Volume2 className="w-7 h-7 text-blue-500" />}
                          {item.product.id === 'teclado-mecanico-rgb' && <Laptop className="w-7 h-7 text-slate-500" />}
                          {item.product.id === 'magsafe-pro-powerbank' && <Smartphone className="w-7 h-7 text-slate-500" />}
                          {item.product.id === 'smartwatch-sport-active' && <Sparkles className="w-7 h-7 text-slate-500" />}
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-xs text-slate-900 leading-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 block font-medium mt-0.5">
                              Unidade: R$ {item.product.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                              <button 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Row Total */}
                            <strong className="text-xs text-slate-950">
                              R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                            </strong>
                          </div>
                        </div>

                        {/* Quick Trash button */}
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom Summary Panel */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-slate-100 space-y-4 bg-slate-50/50">
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium text-slate-950">R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          Frete
                          {shippingCost === 0 && <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1 rounded">Grátis</span>}
                        </span>
                        <span className="font-medium text-slate-950">
                          {shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                        </span>
                      </div>
                      <div className="h-px bg-slate-200 my-2" />
                      <div className="flex justify-between text-sm">
                        <strong className="text-slate-900 font-bold">Total estimado</strong>
                        <strong className="text-blue-600 font-extrabold text-base">R$ {cartTotal.toFixed(2).replace('.', ',')}</strong>
                      </div>
                    </div>

                    <button 
                      onClick={runCheckout}
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/15 active:scale-98 transition-all cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-blue-200" />
                      Fechar Pedido
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-medium">
                      Simulação segura. Nenhum dado de pagamento real é exigido.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL SIMULATOR */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!checkoutComplete) setIsCheckoutOpen(false); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 relative z-10 p-6 space-y-6"
            >
              {checkoutComplete ? (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-md">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Pedido Recebido!</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      Seu pedido simulado foi enviado com sucesso. Como esta é uma aplicação modelo, nenhuma cobrança real foi feita.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 max-w-xs mx-auto text-[11px] text-slate-500 font-mono">
                    Código da transação: ML-{Math.random().toString(36).substring(3, 9).toUpperCase()}
                  </div>
                  <p className="text-xs text-slate-400 animate-pulse">Fechando tela automaticamente...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-display font-bold text-base text-slate-900">Simulação de Pagamento</h3>
                    <button 
                      onClick={() => setIsCheckoutOpen(false)}
                      className="p-1 hover:bg-slate-100 text-slate-400 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                    <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium uppercase">Valor Total</span>
                        <strong className="text-slate-900 font-extrabold text-base">
                          R$ {cartTotal.toFixed(2).replace('.', ',')}
                        </strong>
                      </div>
                      <span className="text-[10px] font-semibold text-blue-600 bg-white border border-blue-100 px-2 py-0.5 rounded-md">
                        {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Nome no Cartão</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Ex: Maria S. Oliveira"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-500 font-semibold mb-1">Número do Cartão (Simulado)</label>
                          <input 
                            type="text" 
                            maxLength={19}
                            required 
                            placeholder="4000 1234 5678 9010"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 font-semibold mb-1">Código CVV</label>
                          <input 
                            type="text" 
                            maxLength={3}
                            required 
                            placeholder="123"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setIsCheckoutOpen(false)}
                        className="flex-1 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-center active:scale-98 transition-all"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-center active:scale-98 transition-all shadow-md shadow-emerald-600/10"
                      >
                        Confirmar Pagamento
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
