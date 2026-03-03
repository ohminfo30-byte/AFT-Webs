import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogCard from './components/BlogCard';
import ArticleView from './components/ArticleView';
import AvatarUpload from './components/AvatarUpload';
import ProfileView from './components/ProfileView';
import Footer from './components/Footer';
import { POSTS, AUTHORS } from './constants';
import { Post, Category, UserProfile, Comment } from './types';
import { Sparkles, ArrowRight, Filter, X } from 'lucide-react';

export default function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    bio: '',
    avatar: null
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Fallback for old avatar-only state
      const savedAvatar = localStorage.getItem('user_avatar');
      if (savedAvatar) setUserProfile(prev => ({ ...prev, avatar: savedAvatar }));
    }

    const savedBookmarks = localStorage.getItem('user_bookmarks');
    if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));

    const savedComments = localStorage.getItem('user_comments');
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  const handleProfileSave = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
    // Also update legacy avatar key for compatibility
    if (newProfile.avatar) localStorage.setItem('user_avatar', newProfile.avatar);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('user_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const addComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      postId,
      userName: userProfile.name || 'Anonymous',
      userAvatar: userProfile.avatar,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('user_comments', JSON.stringify(updatedComments));
  };

  const deleteComment = (commentId: string) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem('user_comments', JSON.stringify(updatedComments));
  };

  const handleAvatarUpload = (base64: string) => {
    const newProfile = { ...userProfile, avatar: base64 };
    setUserProfile(newProfile);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
    localStorage.setItem('user_avatar', base64);
  };

  const categories: Category[] = ['All', 'Philosophy', 'Culture', 'Science', 'Politics'];

  let filteredPosts = activeCategory === 'All' 
    ? POSTS 
    : POSTS.filter(post => post.category === activeCategory);

  if (selectedAuthorId) {
    filteredPosts = filteredPosts.filter(post => post.authorId === selectedAuthorId);
  }

  // Add a "Saved" virtual category logic
  const allCategories: (Category | 'Saved')[] = [...categories, 'Saved'];

  if (activeCategory === ('Saved' as any)) {
    filteredPosts = POSTS.filter(post => bookmarkedIds.includes(post.id));
    if (selectedAuthorId) {
      filteredPosts = filteredPosts.filter(post => post.authorId === selectedAuthorId);
    }
  }

  const selectedAuthor = AUTHORS.find(a => a.id === selectedAuthorId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        userAvatar={userProfile.avatar} 
        onAvatarClick={() => setIsProfileOpen(true)} 
      />
      
      <main className="flex-grow">
        <Hero />

        {/* Featured Section */}
        <section id="articles" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:row items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <span className="text-afar-ochre font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                {selectedAuthorId ? `Articles by ${selectedAuthor?.name}` : 'The Digital Archive'}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                {selectedAuthorId ? <span className="italic">Author Archive</span> : <>Latest <span className="italic">Reflections</span></>}
              </h2>
              {selectedAuthorId && (
                <button 
                  onClick={() => setSelectedAuthorId(null)}
                  className="mt-4 text-xs uppercase tracking-widest font-bold text-afar-ochre hover:text-afar-clay flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Clear Author Filter
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-afar-ink text-white shadow-lg scale-105' 
                      : 'bg-white text-black/40 hover:bg-black/5 border border-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                isBookmarked={bookmarkedIds.includes(post.id)}
                onAuthorClick={(id) => {
                  setSelectedAuthorId(id);
                  document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onClick={() => setSelectedPost(post)} 
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-black/40 italic font-serif text-xl">No articles found in this category yet. More coming soon.</p>
            </div>
          )}
        </section>

        {/* Mission Section */}
        <section id="about" className="py-24 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/mission/1000/1000" 
                alt="Afar Community" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-afar-ochre/10 mix-blend-multiply" />
            </div>

            <div className="space-y-8">
              <span className="text-afar-ochre font-bold text-xs uppercase tracking-[0.3em]">Our Mission</span>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                Empowering the <span className="italic">Afar Diaspora</span> through Independent Thought
              </h2>
              <p className="text-lg text-black/60 leading-relaxed font-light">
                Afar Free Thinkers is more than a blog; it's a movement. We provide a platform for voices that are often marginalized, 
                encouraging critical thinking and intellectual exploration within the Afar community worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="font-serif text-3xl text-afar-ochre mb-2">12k+</h4>
                  <p className="text-xs uppercase tracking-widest font-bold text-black/40">Monthly Readers</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl text-afar-ochre mb-2">50+</h4>
                  <p className="text-xs uppercase tracking-widest font-bold text-black/40">Active Contributors</p>
                </div>
              </div>

              <button className="flex items-center gap-3 px-8 py-4 bg-afar-ink text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-afar-clay transition-all group">
                Join the Movement <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Authors Section */}
        <section id="authors" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-afar-ochre font-bold text-xs uppercase tracking-[0.3em] mb-4 block">The Minds Behind the Words</span>
            <h2 className="text-5xl md:text-6xl font-serif">Featured <span className="italic">Authors</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {AUTHORS.map((author) => (
              <motion.div 
                key={author.id}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-3xl hover:bg-white transition-all duration-500"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 p-2 bg-afar-ochre rounded-full text-white shadow-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-serif text-2xl mb-2">{author.name}</h4>
                <p className="text-xs uppercase tracking-widest text-afar-ochre font-bold mb-4">{author.role}</p>
                <p className="text-sm text-black/60 leading-relaxed italic mb-6">
                  "{author.bio}"
                </p>
                <button 
                  onClick={() => {
                    setSelectedAuthorId(author.id);
                    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs uppercase tracking-widest font-bold text-afar-ink hover:text-afar-ochre transition-colors"
                >
                  View Articles
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <ArticleView 
            post={selectedPost} 
            isBookmarked={bookmarkedIds.includes(selectedPost.id)}
            onToggleBookmark={() => toggleBookmark(selectedPost.id)}
            onAuthorClick={(id) => {
              setSelectedAuthorId(id);
              setSelectedPost(null);
              document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
            }}
            userProfile={userProfile}
            comments={comments.filter(c => c.postId === selectedPost.id)}
            onAddComment={(content) => addComment(selectedPost.id, content)}
            onDeleteComment={deleteComment}
            onClose={() => setSelectedPost(null)} 
          />
        )}
      </AnimatePresence>

      {/* Avatar Upload Modal */}
      <AnimatePresence>
        {isAvatarModalOpen && (
          <AvatarUpload
            onUpload={handleAvatarUpload}
            onClose={() => setIsAvatarModalOpen(false)}
            currentAvatar={userProfile.avatar || undefined}
          />
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <ProfileView
            profile={userProfile}
            onSave={handleProfileSave}
            onClose={() => setIsProfileOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
