import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Timer, Flame, Apple, ArrowRight, Zap, Target, Users, Activity } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/effect-coverflow';

const Home = () => {
  const tiers = [
    {
      name: 'EVOLVE',
      price: '$49/mo',
      features: ['Full Gym Access', 'Locker Room & Showers', 'Standard Equipment', '1 Guest Pass/mo'],
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
      color: 'emerald'
    },
    {
      name: 'ELITE',
      price: '$79/mo',
      features: ['24/7 Access', 'All Group Classes', 'Sauna & Steam Room', 'Recovery Zone Access'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
      color: 'amber'
    },
    {
      name: 'PERFORMANCE',
      price: '$129/mo',
      features: ['Personal Trainer (2x/mo)', 'Custom Nutrition Plan', 'Physiotherapy Consult', 'Priority Booking'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop',
      color: 'emerald'
    },
    {
      name: 'ULTIMATE',
      price: '$199/mo',
      features: ['Unlimited PT Sessions', 'Private Suite Access', 'Biohacking Lab', 'Full Spa Access'],
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0fdb567?q=80&w=1000&auto=format&fit=crop',
      color: 'amber'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/gym_hero.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/80 to-bg-neutral-950" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            ELEVATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-500 text-glow-emerald">PERFORMANCE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light"
          >
            Experience the pinnacle of fitness. High-end strength equipment, expert-led classes, and a recovery suite designed for champions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/reservation" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg glow-emerald transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Free Trial <Zap className="w-5 h-5" />
            </Link>
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              View Memberships <Target className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 px-4 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">FORGED FOR <span className="text-emerald-400">EXCELLENCE</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Premium facilities designed to push your limits and achieve your goals.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Strength Card */}
            <motion.div variants={itemVariants} className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Dumbbell className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Strength Lab</h3>
              <p className="text-gray-400 text-sm mb-6">World-class plate-loaded equipment, Olympic platforms, and custom-cabled machines.</p>
              <Link to="/reservation?type=strength" className="text-emerald-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Book a Session <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Classes Card */}
            <motion.div variants={itemVariants} className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/50 transition-colors group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Timer className="text-amber-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Dynamic HIIT</h3>
              <p className="text-gray-400 text-sm mb-6">High-energy boutique classes led by elite instructors. Transform your physique.</p>
              <Link to="/events" className="text-amber-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View Classes <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Yoga Card */}
            <motion.div variants={itemVariants} className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Flame className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Mind & Flow</h3>
              <p className="text-gray-400 text-sm mb-6">Dedicated yoga and pilates studio. Enhance your flexibility, core strength, and focus.</p>
              <Link to="/reservation?type=yoga" className="text-emerald-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Book Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Nutrition Card */}
            <motion.div variants={itemVariants} className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/50 transition-colors group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Apple className="text-amber-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Fuel & Recovery</h3>
              <p className="text-gray-400 text-sm mb-6">Precision nutrition coaching and cold-pressed juices to optimize your recovery.</p>
              <Link to="/menu" className="text-amber-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Performance Lab <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Swiper Section */}
      <section className="py-24 px-4 bg-neutral-900 overflow-hidden border-y border-gray-800">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">MEMBERSHIP <span className="text-amber-500">TIERS</span></h2>
          <p className="text-gray-400">Investing in yourself is the best ROI. Choose the plan that fuels your transformation.</p>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="pricing-swiper !pb-16"
          >
            {tiers.map((tier, index) => (
              <SwiperSlide key={index} className="!w-[300px] sm:!w-[400px]">
                <div className={`bg-neutral-950 border-2 ${tier.color === 'emerald' ? 'border-emerald-500/30' : 'border-amber-500/30'} rounded-3xl overflow-hidden group hover:border-${tier.color}-500 transition-all duration-500`}>
                  <div className="relative h-64 overflow-hidden">
                    <img src={tier.image} alt={tier.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                    <div className={`absolute bottom-4 left-6 px-4 py-1 rounded-full bg-${tier.color}-500 text-black font-black text-sm`}>
                      {tier.price}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className={`text-3xl font-black mb-6 tracking-tighter ${tier.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tier.name}
                    </h3>
                    
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <Zap className={`w-4 h-4 ${tier.color === 'emerald' ? 'text-emerald-500' : 'text-amber-500'}`} />
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to={`/auth?tier=${tier.name.toLowerCase()}`}
                      className={`block w-full py-4 rounded-xl text-center font-bold text-black ${tier.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-400 glow-emerald' : 'bg-amber-500 hover:bg-amber-400 glow-amber'} transition-all transform hover:scale-[1.02]`}
                    >
                      JOIN {tier.name}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Performance Lab & Recovery Sections */}
      <section className="py-24 px-4 bg-neutral-950 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Nutrition Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full -z-10 group-hover:bg-amber-500/30 transition-all duration-700" />
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop" alt="Cold pressed juice and healthy meal" className="w-full h-auto rounded-3xl shadow-[0_0_40px_rgba(251,191,36,0.15)] transform group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-bold uppercase tracking-wider">
                <Apple className="w-4 h-4" /> Performance Lab
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Inner Fire</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Workouts are only half the battle. Our in-house Performance Lab provides designer protein shakes, cold-pressed vitality juices, and pre-prepped macro-nutrient balanced meals. Everything you need to recover faster and perform better.
              </p>
              <Link 
                to="/menu" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white font-bold rounded-lg transition-all"
              >
                View Plans <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Recovery Section (formerly Cinema) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-16"
          >
             <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full -z-10 group-hover:bg-emerald-500/30 transition-all duration-700" />
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop" alt="Luxury Spa and Recovery Area" className="w-full h-auto rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.15)] transform group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4" /> Elite Recovery
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Recovery Suite</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Optimize your downtime with our luxury recovery facilities. Featuring infra-red saunas, cryotherapy chambers, and dedicated compression therapy zones. We don't just help you train; we help you evolve.
              </p>
              <Link 
                to="/reservation?type=recovery" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-bold rounded-lg glow-emerald transition-all"
              >
                Book a Session <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Mini Gallery/Community Section */}
      <section className="py-24 px-4 bg-neutral-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">JOIN OUR <span className="text-amber-500">TRIBE</span></h2>
            <p className="text-gray-400 mb-8 text-lg">O-ZONE is more than a gym; it's a movement. Connect with like-minded athletes, share your progress, and be part of the most exclusive fitness community.</p>
            <div className="flex flex-wrap items-center gap-6 mt-6">
               <Link 
                 to="/gallery" 
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium transition-colors"
               >
                 <Users className="w-5 h-5" /> Success Stories
               </Link>
               
               <div className="flex items-center space-x-3 sm:border-l sm:border-gray-800 sm:pl-6">
                 <a href="#" target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110" aria-label="Facebook">
                   <FaFacebook className="w-5 h-5" />
                 </a>
                 <a href="#" target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-pink-600/10 text-pink-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all transform hover:scale-110" aria-label="Instagram">
                   <FaInstagram className="w-5 h-5" />
                 </a>
                 <a href="#" target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all transform hover:scale-110" aria-label="WhatsApp">
                   <FaWhatsapp className="w-5 h-5" />
                 </a>
               </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" alt="Athlete training" className="w-full h-48 object-cover rounded-xl" />
                <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop" alt="Gym interior" className="w-full h-64 object-cover rounded-xl" />
             </div>
             <div className="space-y-4 pt-8">
                <img src="https://images.unsplash.com/photo-1599058917232-d750c8227092?q=80&w=1000&auto=format&fit=crop" alt="Yoga session" className="w-full h-64 object-cover rounded-xl" />
                <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop" alt="Weightlifting" className="w-full h-48 object-cover rounded-xl" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
