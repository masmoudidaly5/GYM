import { motion } from 'framer-motion';
import { Target, Timer, Users, Flame, Dumbbell, Zap } from 'lucide-react';
import { useState } from 'react';

const programsList = [
  {
    id: 1,
    title: 'Strength & Hypertrophy - 12 Weeks',
    duration: 'Mon, Wed, Fri',
    intensity: 'High',
    type: 'Bodybuilding',
    spots: '10 / 12 Members',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'HIIT Performance Lab',
    duration: 'Daily Sessions',
    intensity: 'Expert',
    type: 'Cardio & Fat Loss',
    spots: '5 / 15 Athletes',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    id: 3,
    title: 'Morning Yoga & Core',
    duration: 'Tue, Thu - 7 AM',
    intensity: 'Low - Med',
    type: 'Mind & Body',
    spots: '8 / 20 Yogis',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
    featured: false
  },
  {
    id: 4,
    title: 'Elite Powerlifting Protocol',
    duration: '4 Days / Week',
    intensity: 'Maximum',
    type: 'Strength',
    spots: '3 / 6 Members',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'Pilates Reformer Mastery',
    duration: 'Sat, Sun',
    intensity: 'Medium',
    type: 'Flexibility',
    spots: 'Open',
    image: 'https://images.unsplash.com/photo-1447023029226-ef8f6b52e3ea?q=80&w=1000&auto=format&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'Combat Fitness / Muay Thai',
    duration: 'Mon, Fri Night',
    intensity: 'High',
    type: 'MMA / Fitness',
    spots: '12 / 20 Fighters',
    image: 'https://images.unsplash.com/photo-1599058917232-d750c8227092?q=80&w=1000&auto=format&fit=crop',
    featured: false
  }
];

const Programs = () => {
  const [enrollingFor, setEnrollingFor] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">TRAINING <span className="text-emerald-500">PROGRAMS</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Master your craft with specialized training programs. From elite strength protocols to high-energy transformation camps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {programsList.map((program) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-neutral-900 border rounded-2xl overflow-hidden flex flex-col ${
              program.featured ? 'border-emerald-500 lg:col-span-2 lg:flex-row shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'border-gray-800'
            }`}
          >
            <div className={`relative ${program.featured ? 'lg:w-1/2' : 'w-full h-48'}`}>
              <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
              {program.featured && (
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                  <Flame className="w-3 h-3" /> FEATURED PROGRAM
                </div>
              )}
            </div>
            
            <div className={`p-6 flex flex-col justify-between ${program.featured ? 'lg:w-1/2' : ''}`}>
               <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                    {program.type}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2">{program.title}</h2>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Timer className="w-5 h-5 text-gray-500" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold text-amber-500">Intensity: {program.intensity}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span>{program.spots} spots</span>
                    </div>
                  </div>
               </div>

               {enrollingFor === program.id ? (
                 <div className="mt-4 p-4 bg-neutral-950 border border-emerald-500/50 rounded-xl animate-in fade-in zoom-in duration-200">
                   <h3 className="font-semibold mb-3 text-white text-sm">Enroll - {program.title}</h3>
                   <input type="text" placeholder="Full Name" className="w-full bg-neutral-900 border border-gray-700 rounded py-2 px-3 text-sm text-white mb-2 focus:border-emerald-500 outline-none" />
                   <input type="tel" placeholder="Phone Number" className="w-full bg-neutral-900 border border-gray-700 rounded py-2 px-3 text-sm text-white mb-3 focus:border-emerald-500 outline-none" />
                   <div className="flex gap-2">
                     <button onClick={() => setEnrollingFor(null)} className="flex-1 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
                     <button onClick={() => { setEnrollingFor(null); alert('Enrollment requested! Our coach will contact you soon.'); }} className="flex-1 py-2 bg-emerald-500 text-neutral-950 text-xs font-bold rounded shadow-[0_0_10px_rgba(16,185,129,0.4)]">Request Spot</button>
                   </div>
                 </div>
               ) : (
                 <button 
                  onClick={() => setEnrollingFor(program.id)}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    program.featured 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white glow-emerald' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                 >
                   Enroll in Program
                 </button>
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
