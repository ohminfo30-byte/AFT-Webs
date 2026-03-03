import { motion } from 'motion/react';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Post, Author } from '../types';
import { AUTHORS } from '../constants';

interface BlogCardProps {
  post: Post;
  isBookmarked?: boolean;
  onAuthorClick: (authorId: string) => void;
  onClick: () => void;
}

export default function BlogCard({ post, isBookmarked, onAuthorClick, onClick }: BlogCardProps) {
  const author = AUTHORS.find(a => a.id === post.authorId) as Author;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest font-bold text-afar-ink">
            {post.category}
          </span>
        </div>
        {isBookmarked && (
          <div className="absolute top-4 right-4">
            <div className="p-2 bg-afar-ochre text-white rounded-full shadow-lg">
              <Bookmark className="w-3 h-3 fill-current" />
            </div>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-8 h-8 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAuthorClick(author.id);
            }}
            className="text-xs font-medium text-black/60 uppercase tracking-wider hover:text-afar-ochre transition-colors"
          >
            {author.name}
          </button>
          <span className="text-black/20">•</span>
          <div className="flex items-center gap-1 text-black/40 text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-2xl font-serif mb-4 leading-tight group-hover:text-afar-ochre transition-colors">
          {post.title}
        </h3>
        
        <p className="text-black/60 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-afar-ochre font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
          Read Article <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
