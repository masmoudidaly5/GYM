import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Dumbbell } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md bg-neutral-900 border border-gray-800 rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <Dumbbell className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">
            {isLogin ? 'ATHLETE LOGIN' : 'START YOUR EVOLUTION'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Access your dashboard and training schedule.' : 'Join the elite community of O-ZONE Premium Gym.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-neutral-950 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="email" 
                    placeholder="athlete@example.com" 
                    className="w-full bg-neutral-950 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Access PIN</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-neutral-950 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">Recover Access PIN?</a>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-black uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {isLogin ? 'Enter Portal' : 'Apply Membership'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Not an athlete yet? " : "Already an athlete? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-amber-500 font-bold hover:text-amber-400 underline underline-offset-4"
            >
              {isLogin ? 'Apply Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
