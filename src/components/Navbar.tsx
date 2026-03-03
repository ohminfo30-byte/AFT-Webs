import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  userAvatar: string | null;
  onAvatarClick: () => void;
}

export default function Navbar({ userAvatar, onAvatarClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Articles', href: '#articles' },
    { name: 'Authors', href: '#authors' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-afar-ochre" />
          <span className="font-serif text-xl font-bold tracking-tight">
            Afar <span className="text-afar-ochre italic">Free Thinkers</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-afar-ochre transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={onAvatarClick}
            className="flex items-center gap-2 px-4 py-2 bg-afar-ink text-white rounded-full text-sm font-medium hover:bg-afar-clay transition-colors overflow-hidden"
          >
            {userAvatar ? (
              <img src={userAvatar} alt="User Avatar" className="w-6 h-6 rounded-full object-cover -ml-2" />
            ) : (
              <User className="w-4 h-4" />
            )}
            {userAvatar ? 'Profile' : 'Sign In'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-afar-sand border-b border-black/5 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-serif italic hover:text-afar-ochre"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-black/5" />
            <button 
              onClick={() => { onAvatarClick(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-afar-ink text-white rounded-xl text-sm font-medium"
            >
              {userAvatar ? (
                <img src={userAvatar} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4" />
              )}
              {userAvatar ? 'Update Avatar' : 'Sign In'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
