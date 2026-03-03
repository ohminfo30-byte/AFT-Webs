import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, User as UserIcon, Trash2 } from 'lucide-react';
import { Comment, UserProfile } from '../types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  userProfile: UserProfile;
  onAddComment: (content: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export default function CommentSection({ postId, comments, userProfile, onAddComment, onDeleteComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-16 pt-16 border-t border-black/5">
      <div className="flex items-center gap-3 mb-10">
        <MessageSquare className="w-6 h-6 text-afar-ochre" />
        <h3 className="text-3xl font-serif">Community <span className="italic">Dialogue</span></h3>
        <span className="px-3 py-1 bg-afar-ochre/10 text-afar-ochre rounded-full text-xs font-bold">
          {comments.length}
        </span>
      </div>

      {/* Comment Form */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 mb-12">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-afar-ochre/10 flex-shrink-0">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-afar-ochre/30" />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex-grow space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={userProfile.name ? `Join the discussion, ${userProfile.name}...` : "Sign in to join the discussion..."}
              className="w-full bg-afar-sand border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-afar-ochre transition-colors font-serif text-lg min-h-[120px] resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim() || !userProfile.name}
                className="flex items-center gap-2 px-8 py-3 bg-afar-ink text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-afar-clay transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Post Comment <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            {!userProfile.name && (
              <p className="text-xs text-afar-ochre italic">Please set your name in your profile to post comments.</p>
            )}
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        <AnimatePresence initial={false}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-6 p-6 rounded-3xl hover:bg-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-afar-ochre/10 flex-shrink-0">
                  {comment.userAvatar ? (
                    <img src={comment.userAvatar} alt={comment.userName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-afar-ochre/30" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-serif text-lg">{comment.userName}</h4>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-black/30">{comment.date}</span>
                    </div>
                    {comment.userName === userProfile.name && (
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="p-2 text-black/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-black/70 leading-relaxed font-serif text-lg">
                    {comment.content}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-black/30 italic font-serif text-xl">No thoughts shared yet. Be the first to contribute.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
