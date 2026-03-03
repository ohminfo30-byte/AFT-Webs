import { Globe, X, Facebook, Instagram, Youtube, Send, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-afar-ink text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-8 h-8 text-afar-ochre" />
              <span className="font-serif text-2xl font-bold tracking-tight">
                Afar <span className="text-afar-ochre italic">Free Thinkers</span>
              </span>
            </div>
            <p className="text-white/50 max-w-md leading-relaxed mb-8">
              A global platform dedicated to the intellectual empowerment of the Afar people. 
              We believe in the power of independent thought to shape a better future for the Horn of Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-afar-ochre transition-colors" title="X (Twitter)"><X className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-afar-ochre transition-colors" title="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-afar-ochre transition-colors" title="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-afar-ochre transition-colors" title="YouTube"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-afar-ochre transition-colors" title="Telegram"><Send className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-afar-ochre transition-colors" title="Mail"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Explore</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Latest Articles</a></li>
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Featured Authors</a></li>
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Cultural Archive</a></li>
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Philosophy Series</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Community</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-afar-ochre transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Write for Us</a></li>
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Support the Project</a></li>
              <li><a href="#" className="hover:text-afar-ochre transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4 text-white/30 text-xs uppercase tracking-widest font-bold">
          <p>© 2026 Afar Free Thinkers. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
