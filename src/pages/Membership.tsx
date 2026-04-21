import { motion } from 'framer-motion';
import { Target, Zap, Activity, Dumbbell, Apple, Timer } from 'lucide-react';

const planCategories = [
  { category: 'Monthly Memberships', icon: Target, items: [
    { name: 'EVOLVE Monthly', desc: 'Unlimited access during standard hours. All basic equipment included.', price: '$49.00' },
    { name: 'ELITE 24/7', desc: 'Full round-the-clock access + sauna and steam room privileges.', price: '$79.00' },
    { name: 'PERFORMANCE VIP', desc: 'All ELITE perks + daily recovery lab access and priority booking.', price: '$129.00' },
    { name: 'Corporate Plan', desc: 'Special rates for groups of 10+. Contact for details.', price: 'Custom' },
  ]},
  { category: 'Personal Training', icon: Dumbbell, items: [
    { name: 'Foundation Pack', desc: '4 sessions per month with a junior coach. Perfect for beginners.', price: '$160.00' },
    { name: 'Transformation Pack', desc: '8 sessions per month with a senior coach + weekly body scans.', price: '$300.00' },
    { name: 'Elite Performance', desc: '12 sessions per month with a master coach + custom programming.', price: '$420.00' },
    { name: 'Single Consultation', desc: 'One-hour deep dive into your goals and current routine.', price: '$55.00' },
  ]},
  { category: 'Performance Lab', icon: Apple, items: [
    { name: 'Bio-Scan Pro', desc: 'Advanced body composition analysis with precision reporting.', price: '$25.00' },
    { name: 'Customized Macros', desc: 'Monthly tailored nutrition coaching and meal planning.', price: '$45.00' },
    { name: 'Recovery Pass', desc: 'Access to cryotherapy, infrared sauna, and compression.', price: '$35.00' },
    { name: 'Precision Supplementation', desc: 'Monthly supply of pre-workout, whey, and vitamins.', price: '$85.00' },
  ]},
];

const Membership = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 min-h-[80vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">MEMBERSHIP <span className="text-emerald-500">PLANS</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Invest in your evolution. We offer a range of flexible plans designed to support every level of fitness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planCategories.map((menu, index) => {
          const Icon = menu.icon;
          return (
            <motion.div 
              key={menu.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-neutral-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="bg-neutral-950 px-6 py-4 border-b border-gray-800 flex items-center gap-3">
                <Icon className="text-emerald-400 w-6 h-6" />
                <h2 className="text-xl font-bold text-white">{menu.category}</h2>
              </div>
              <div className="p-6 space-y-6">
                {menu.items.map((item) => (
                  <div key={item.name} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-medium text-gray-200 group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                      <span className="text-amber-400 font-bold ml-4">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-16 text-center bg-neutral-900/50 rounded-xl p-8 border border-gray-800 border-dashed">
         <p className="text-gray-300">
           <strong className="text-emerald-400 text-xl block mb-2">Join via the O-ZONE App!</strong>
           Download our mobile app to manage your membership, book classes, and track your progress in real-time.
         </p>
      </div>
    </div>
  );
};

export default Membership;
