import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-afar-ink text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/danakil/1920/1080?blur=2"
          alt="Afar Landscape"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-afar-ink/20 via-transparent to-afar-ink" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-[0.3em] mb-8 text-afar-ochre font-medium">
            Independent Voices from the Horn
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 tracking-tighter">
            Where Tradition Meets <br />
            <span className="italic text-afar-ochre">Free Thought</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            A digital sanctuary for the Afar diaspora and local thinkers. 
            Exploring the intersection of nomadic heritage, modern philosophy, and regional progress.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-afar-ochre text-afar-ink font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105">
              Explore Articles
            </button>
            <button className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300">
              Meet the Authors
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
