import { motion } from 'motion/react';
import { X, Calendar, User, Tag, Share2, Bookmark } from 'lucide-react';
import { Post, Author, UserProfile, Comment } from '../types';
import { AUTHORS } from '../constants';
import GeminiSummary from './GeminiSummary';
import CommentSection from './CommentSection';

interface ArticleViewProps {
  post: Post;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onAuthorClick: (authorId: string) => void;
  userProfile: UserProfile;
  comments: Comment[];
  onAddComment: (content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onClose: () => void;
}

export default function ArticleView({ 
  post, 
  isBookmarked, 
  onToggleBookmark, 
  onAuthorClick, 
  userProfile,
  comments,
  onAddComment,
  onDeleteComment,
  onClose 
}: ArticleViewProps) {
  const author = AUTHORS.find(a => a.id === post.authorId) as Author;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-afar-sand overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="hidden md:block font-serif italic text-afar-ochre">
            {post.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleBookmark}
            className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-afar-ochre text-white' : 'hover:bg-black/5'}`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-xs uppercase tracking-[0.2em] font-bold text-black/40">
          <div className="flex items-center gap-2"><Tag className="w-3 h-3" /> {post.category}</div>
          <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {post.date}</div>
          <div className="flex items-center gap-2 text-afar-ochre">
            <User className="w-3 h-3" />
            <button 
              onClick={() => onAuthorClick(author.id)}
              className="hover:underline decoration-afar-ochre underline-offset-4"
            >
              {author.name}
            </button>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif mb-12 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
          <div className="prose prose-lg max-w-none">
            <GeminiSummary content={post.content} />
            
            <div className="font-serif text-xl leading-relaxed text-afar-ink/90 whitespace-pre-wrap">
              {post.content}
            </div>

            <CommentSection 
              postId={post.id}
              comments={comments}
              userProfile={userProfile}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
            />
          </div>

          <aside className="space-y-12">
            {/* Author Sidebar */}
            <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover mb-6 grayscale"
                referrerPolicy="no-referrer"
              />
              <h4 
                className="font-serif text-xl mb-2 cursor-pointer hover:text-afar-ochre transition-colors"
                onClick={() => onAuthorClick(author.id)}
              >
                {author.name}
              </h4>
              <p className="text-xs uppercase tracking-widest text-afar-ochre font-bold mb-4">{author.role}</p>
              <p className="text-sm text-black/60 leading-relaxed italic">
                "{author.bio}"
              </p>
              <button 
                onClick={() => onAuthorClick(author.id)}
                className="mt-6 w-full py-3 border border-black/10 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-afar-ink hover:text-white transition-all"
              >
                View Profile
              </button>
            </div>

            {/* Newsletter */}
            <div className="p-8 bg-afar-ink text-white rounded-3xl shadow-xl">
              <h4 className="font-serif text-xl mb-4">Join the Thinkers</h4>
              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                Receive weekly insights and regional updates directly in your inbox.
              </p>
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-afar-ochre transition-colors"
              />
              <button className="w-full py-3 bg-afar-ochre text-afar-ink font-bold rounded-xl text-xs uppercase tracking-widest">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
