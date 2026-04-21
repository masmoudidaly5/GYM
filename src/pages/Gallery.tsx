import { motion } from 'framer-motion';
import { Play, TrendingUp } from 'lucide-react';

const mediaItems = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop', span: 'col-span-2 row-span-2' },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 3, type: 'video', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop', span: 'col-span-2 row-span-1' },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1599058917232-d750c8227092?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
];

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase">SUCCESS <span className="text-emerald-500">STORIES</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Transformations, milestones, and daily victories at O-ZONE. 
          Tag us on Instagram with <span className="text-amber-500 font-semibold cursor-pointer">#OZONEFIT</span> to be featured.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {mediaItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-xl overflow-hidden group cursor-pointer ${item.span}`}
          >
            <div className="absolute inset-0 bg-neutral-900 border border-gray-800 rounded-xl" />
            <img 
              src={item.url} 
              alt="Success story gallery item"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              {item.type === 'video' ? (
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 backdrop-blur flex items-center justify-center">
                   <Play className="text-white w-8 h-8 ml-1" fill="white" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp className="text-emerald-400 w-8 h-8" />
                  <span className="text-white font-semibold">View Transformation</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-transparent border-2 border-gray-700 hover:border-emerald-500 text-white font-bold rounded-lg transition-colors">
          Load More Journeys
        </button>
      </div>
    </div>
  );
};

export default Gallery;
