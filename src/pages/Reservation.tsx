import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  User, 
  LogOut, 
  ChevronDown, 
  Calendar, 
  CheckCircle,
  Eye,
  Settings,
  Grid,
  Wallet,
  Activity,
  Target,
  Flame,
  Clock
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { 
  SiPaypal, 
  SiVisa, 
  SiWise, 
  SiBitcoin
} from 'react-icons/si';
import { FaBitcoin } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const zones = [
  { name: 'Strength', color: 'text-emerald-500' },
  { name: 'Cardio', color: 'text-amber-500' },
  { name: 'Yoga/Flow', color: 'text-blue-500' },
  { name: 'Recovery', color: 'text-purple-500' },
  { name: 'Combat', color: 'text-red-500' },
  { name: 'Performance', color: 'text-white' },
];

const Reservation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTab, setAuthTab] = useState<'auth' | 'reg'>('auth');
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [duration, setDuration] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal' | 'wise' | 'bybit' | 'crypto'>('card');
  const [step, setStep] = useState(1); // 1: Booking, 2: Payment, 3: Success
  const [userBalance, setUserBalance] = useState(-10.00);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'checkout' | 'topup'>('checkout');

  const debtAmount = userBalance < 0 ? Math.abs(userBalance) : 0;
  const topUpRequested = parseFloat(customAmount) || 0;
  const finalTopUpCharge = topUpRequested + debtAmount;

  const [servicesState, setServicesState] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: i < 5 ? 'Power Rack' : i < 10 ? 'Elite Cardio' : 'Yoga Studio',
      type: i < 5 ? 'strength' : i < 10 ? 'cardio' : 'flow',
      status: Math.random() > 0.2 ? ('available' as const) : ('unavailable' as const),
      zone: i < 5 ? 'Strength' : i < 10 ? 'Cardio' : 'Yoga/Flow',
      remainingSeconds: i === 0 
        ? 900 // 15 min
        : i === 1 
          ? 2100 // 35 min
          : Math.random() > 0.2 ? 0 : Math.floor(Math.random() * 5400) + 600
    }))
  );

  const currentService = servicesState.find(s => s.id === selectedService);
  const originalRate15 = currentService?.type === 'strength' ? 15.0 : 12.5; 
  const discountedRate15 = currentService?.type === 'strength' ? 12.0 : 10.0; 
  const blocks = duration * 4; // number of 15-min blocks
  const totalPrice = discountedRate15 * blocks;
  const depositAmount = totalPrice.toFixed(2);

  useEffect(() => {
    setServicesState(prev => prev.map((s, i) => {
        if (i === 0) return { ...s, status: 'unavailable', remainingSeconds: 900 };
        if (i === 1) return { ...s, status: 'unavailable', remainingSeconds: 2100 };
        if (i === 9) return { ...s, status: 'unavailable', remainingSeconds: 2580 }; 
        return s;
    }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setServicesState(prev => prev.map(s => {
        if (s.status === 'unavailable' && s.remainingSeconds > 0) {
          return { ...s, remainingSeconds: s.remainingSeconds - 1 };
        }
        if (s.status === 'unavailable' && s.remainingSeconds === 0) {
          return { ...s, status: 'available' };
        }
        return s;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Authorization View
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0 bg-center bg-cover opacity-20" 
             style={{ backgroundImage: 'url("/images/gym_hero.png")' }} />
        
        <div className="w-full max-w-[500px] bg-[#1a1a1a] shadow-2xl relative z-10 border border-gray-800 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-800">
            <button 
              onClick={() => setAuthTab('auth')}
              className={`flex-1 py-5 text-sm font-bold uppercase tracking-wider transition-colors ${authTab === 'auth' ? 'text-white border-b-2 border-emerald-600' : 'text-gray-500'}`}
            >
              Member Portal
            </button>
            <button 
              onClick={() => setAuthTab('reg')}
              className={`flex-1 py-5 text-sm font-bold uppercase tracking-wider transition-colors ${authTab === 'reg' ? 'text-white border-b-2 border-emerald-600' : 'text-gray-500'}`}
            >
              New Athlete
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Membership ID or Email" 
                  className="w-full bg-transparent border border-gray-700 p-3 text-white focus:border-emerald-600 outline-none transition-colors rounded-md"
                />
              </div>
              <div className="relative flex items-center">
                <input 
                  type="password" 
                  placeholder="Access Pin" 
                  className="w-full bg-transparent border border-gray-700 p-3 text-white focus:border-emerald-600 outline-none transition-colors rounded-md pr-10"
                />
                <Eye className="absolute right-3 text-gray-500 w-5 h-5 cursor-pointer hover:text-white" />
              </div>
            </div>

            <button className="block text-xs text-center w-full text-gray-300 hover:text-white underline">
              Forgot your access code?
            </button>

            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest transition-all rounded-md shadow-lg shadow-emerald-900/20"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-gray-300 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1a1a] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="text-white font-black text-xl tracking-tighter uppercase flex items-center gap-2">
          <Dumbbell className="text-emerald-500" /> O-ZONE FITNESS
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
            <Grid className="w-4 h-4" /> My Bookings
          </button>
          <div className="flex items-center gap-2 border-l border-gray-700 pl-6 cursor-pointer group">
            <span className="text-sm font-medium group-hover:text-white">athlete_fit_zone@ozone.com</span>
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Book a Session</h3>
            <div className="space-y-4">
              <div className="relative">
                <select className="w-full bg-[#0d0d0d] border border-gray-700 p-2.5 text-sm appearance-none outline-none focus:border-emerald-600">
                  <option>Main HQ - Elite Facility</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500">Scheduled Date</label>
                <div className="relative">
                  <button 
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="w-full bg-[#0d0d0d] border border-gray-700 p-2.5 text-sm text-left flex justify-between items-center"
                  >
                    {format(selectedDate, 'dd/MM/yyyy')}
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </button>
                  {isCalendarOpen && (
                    <div className="absolute top-full left-0 z-50 mt-2 bg-neutral-900 border border-gray-800 shadow-2xl p-2 rounded-sm">
                      <DayPicker mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)} />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Pick Time</label>
                  <div className="relative">
                    <input 
                      type="time" 
                      value={startTime} 
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-gray-700 p-2 text-sm text-center outline-none focus:border-emerald-600" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Duration</label>
                  <select 
                    value={duration} 
                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                    className="w-full bg-[#0d0d0d] border border-gray-700 p-2 text-sm"
                  >
                    <option value={0.5}>30 min</option>
                    <option value={1}>60 min</option>
                    <option value={1.5}>90 min</option>
                    <option value={2}>120 min</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Facility Zones:</h3>
            <ul className="space-y-3">
              {zones.map(z => (
                <li key={z.name} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-1.5 h-1.5 rounded-full ${z.color.replace('text-', 'bg-')}`} />
                  <span className={`text-sm tracking-tight hover:text-white ${z.color}`}>{z.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
              <div className="w-2.5 h-2.5 rounded-full border border-emerald-500 flex items-center justify-center">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
              </div>
              <span className="text-gray-500">- available</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
              <div className="w-2.5 h-2.5 bg-gray-700 rounded-full" />
              <span className="text-gray-500">- in use</span>
            </div>
          </div>
        </aside>

        {/* Center Section: Floor Map */}
        <main className="flex-1 bg-[#0a0a0a] p-10 overflow-auto flex flex-col items-center">
          <div className="text-xl font-bold mb-10 text-white uppercase tracking-widest flex items-center gap-3">
             <Target className="text-emerald-500" /> ELITE PERFORMANCE FLOOR
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-12 gap-y-16 max-w-5xl mx-auto text-center">
            {servicesState.map(service => {
              const Icon = service.type === 'strength' ? Dumbbell : service.type === 'cardio' ? Activity : Flame;
              
              return (
                <div 
                  key={service.id} 
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => service.status === 'available' && setSelectedService(service.id === selectedService ? null : service.id)}
                >
                  <div className="relative">
                    <Icon className={`w-20 h-20 transition-all duration-300 ${
                      service.status === 'unavailable' 
                        ? 'text-amber-600 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]' 
                        : selectedService === service.id 
                          ? 'text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.6)] scale-110' 
                          : 'text-emerald-400/80 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)] group-hover:text-emerald-400 group-hover:scale-105'
                    }`} />
                    
                    {service.status === 'available' && (
                      <div className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full transition-all ${
                        selectedService === service.id ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-emerald-900/40'
                      }`} />
                    )}
                  </div>
                  <div className="flex flex-col select-none">
                    <span className={`text-sm font-black leading-none mb-2 uppercase ${
                        service.status === 'unavailable' ? 'text-amber-900/60' : 'text-emerald-900/60'
                    }`}>
                      {service.name} {service.id}
                    </span>
                    {service.status === 'available' && (
                      <span className="text-xs font-bold text-emerald-400 animate-pulse uppercase tracking-tight drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]">
                        READY
                      </span>
                    )}
                    {service.status === 'unavailable' && (
                      <span className="text-xs font-bold text-amber-500 animate-pulse uppercase tracking-tight drop-shadow-[0_0_5px_rgba(251,191,36,0.4)]">
                        FREE IN: {formatTime(service.remainingSeconds)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Right Sidebar: Summary */}
        <aside className="w-72 bg-[#1a1a1a] border-l border-gray-800 flex flex-col shrink-0">
          <div className="p-6 flex-1 overflow-y-auto space-y-8">
            {selectedService ? (() => {
               const Icon = currentService?.type === 'strength' ? Dumbbell : currentService?.type === 'cardio' ? Activity : Flame;
               return (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-emerald-900/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <Icon className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                           {currentService?.name}
                           <span className="bg-emerald-500 text-black text-[8px] px-1 py-0.5 rounded-sm font-black">ELITE ACCESS</span>
                        </div>
                        <div className="text-xl text-white font-black mt-1">
                          <s className="text-gray-500 text-base">{originalRate15.toFixed(0)}</s>
                          <span className="text-emerald-400 ml-2">{discountedRate15.toFixed(0)}</span>
                          <span className="text-[10px] text-gray-500 ml-1">USD / Per Session</span>
                        </div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedService(null)} className="text-gray-500 hover:text-white mb-auto mt-2 text-xl">×</button>
                </div>
                
                <div className="bg-[#0c0c0c] border border-gray-800 p-5 rounded-lg space-y-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Appointment</span>
                    <span className="text-white font-black">{format(selectedDate, 'MM/dd/yyyy')}, {startTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Duration</span>
                    <span className="text-white font-black text-sm">
                      {duration * 60} minutes
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Base Rate</span>
                    <span className="text-3xl font-black text-white glow-text">{depositAmount} <span className="text-xs text-gray-500">USD</span></span>
                  </div>
                </div>

                <div className="mt-10 space-y-6 pt-6 border-t border-gray-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-xs text-gray-500 font-black uppercase tracking-widest">Wallet:</span>
                    <span className={`font-black text-lg ${userBalance >= 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                      {userBalance.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500 font-black uppercase tracking-widest">Amount Due:</span>
                    <span className="text-white font-black text-3xl">{depositAmount} <span className="text-xs font-bold text-gray-500">USD</span></span>
                  </div>
                  <div className="flex justify-between items-center py-6 border-y border-gray-800">
                    <span className="text-xs text-gray-500 font-black uppercase tracking-widest">Final Total:</span>
                    <span className="text-white font-black text-4xl glow-text">{depositAmount} <span className="text-xs text-gray-400">USD</span></span>
                  </div>
                </div>
                </div>
               );
            })() : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-10">
                <Clock className="w-12 h-12 mb-4" />
                <p className="text-xs font-medium uppercase tracking-widest leading-relaxed">Select a station to initialize your booking</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#141414] border-t border-gray-800 flex gap-2">
            <button 
              onClick={() => {
                if (userBalance <= 0) {
                  setPaymentMode('topup');
                  setStep(2);
                } else {
                  alert("Confirmed from wallet balance!");
                  setUserBalance(prev => prev - parseFloat(depositAmount));
                }
              }}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                userBalance > 0 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                  : 'bg-[#2a2a2a] text-gray-500 hover:bg-[#333] hover:text-gray-300'
              }`}
            >
              {userBalance > 0 ? 'Use Wallet' : 'Add Credit'}
            </button>
            <button 
              disabled={!selectedService}
              onClick={() => {
                setPaymentMode('checkout');
                setStep(2);
              }}
              className="flex-1 py-4 bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md transition-colors disabled:opacity-50"
            >
              Complete Checkout
            </button>
          </div>
        </aside>
      </div>

      {/* Payment Overlay */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <div className="w-full max-w-xl bg-[#1a1a1a] border border-gray-800 p-8 rounded-lg relative">
              <button 
                onClick={() => setStep(1)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl"
              >×</button>
              
              <div className="text-center mb-8">
                <Wallet className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {paymentMode === 'topup' ? 'Increase Credit' : 'Secure Checkout'}
                </h2>
                
                <div className="mt-2 text-emerald-500 font-bold text-sm tracking-widest uppercase">
                  Charge Amount: {paymentMode === 'topup' ? customAmount || '0.00' : depositAmount} USD
                </div>
              </div>

              {/* Method Selection */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-8">
                {[
                  { id: 'card', icon: SiVisa, label: 'Card' },
                  { id: 'paypal', icon: SiPaypal, label: 'PayPal' },
                  { id: 'wise', icon: SiWise, label: 'Wise' },
                  { id: 'crypto', icon: FaBitcoin, label: 'Crypto' }
                ].map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id as any)}
                    className={`flex flex-col items-center justify-center p-4 border rounded-md transition-all ${
                      selectedMethod === m.id 
                        ? 'border-emerald-600 bg-emerald-600/10 text-white' 
                        : 'border-gray-800 hover:border-gray-600 text-gray-500'
                    }`}
                  >
                    <m.icon className="w-6 h-6 mb-2" />
                    <span className="text-[10px] font-bold uppercase">{m.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Cardholder Name" className="w-full bg-transparent border border-gray-700 p-3 text-sm text-white focus:border-emerald-600 outline-none rounded-md" />
                <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-gray-700 p-3 text-sm text-white focus:border-emerald-600 outline-none rounded-md" />
              </div>

              <button 
                onClick={() => {
                  if (paymentMode === 'topup') {
                    setUserBalance(topUpRequested);
                    setStep(1);
                    setCustomAmount('');
                    alert(`Credit added successfully!`);
                  } else {
                    setStep(3);
                  }
                }}
                className="w-full py-4 bg-emerald-700 text-white font-black uppercase tracking-widest transition-all hover:bg-emerald-600 rounded-md"
              >
                Approve {paymentMode === 'topup' ? finalTopUpCharge.toFixed(2) : depositAmount} USD
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[110] bg-[#0d0d0d] flex items-center justify-center p-4"
          >
            <div className="text-center max-w-sm">
              <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
              <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">CONFIRMED!</h2>
              <div className="bg-white p-6 rounded-lg inline-block mb-8">
                <QRCode value={`ZONE-FIT-AUTH-${selectedService}`} size={160} />
              </div>
              <p className="text-gray-500 text-sm mb-10 italic">Your session is booked. Scan this code at the turnstile to enter.</p>
              <button 
                onClick={() => { setStep(1); setSelectedService(null); setIsLoggedIn(false); }}
                className="w-full py-4 border border-emerald-900/50 text-emerald-500 font-bold uppercase tracking-widest hover:bg-emerald-950 transition-colors rounded-md"
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Stat Bar */}
      <footer className="h-10 bg-[#0d0d0d] border-t border-gray-800 flex items-center justify-between px-6 text-[10px] font-bold tracking-tight text-gray-500 shrink-0">
        <div className="flex items-center gap-6">
          <span>&copy; 2026 O-ZONE FITNESS. All rights reserved.</span>
          <span className="text-emerald-900">Premium Performance Network</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
          <button className="hover:text-emerald-400 transition-colors">Membership Rules</button>
        </div>
      </footer>
    </div>
  );
};

export default Reservation;
