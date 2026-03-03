import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Save, User as UserIcon, Edit3 } from 'lucide-react';
import { UserProfile } from '../types';
import AvatarUpload from './AvatarUpload';

interface ProfileViewProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export default function ProfileView({ profile, onSave, onClose }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-afar-sand overflow-y-auto"
    >
      <div className="sticky top-0 z-10 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="font-serif italic text-afar-ochre">Your Profile</span>
        </div>
        {isEditing ? (
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-afar-ochre text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-afar-clay transition-colors"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2 bg-afar-ink text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-afar-clay transition-colors"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-afar-ochre/10">
              {editedProfile.avatar ? (
                <img 
                  src={editedProfile.avatar} 
                  alt={editedProfile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-afar-ochre/30" />
                </div>
              )}
            </div>
            {isEditing && (
              <button 
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-2 right-2 p-3 bg-afar-ochre text-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
          <h2 className="text-4xl font-serif mt-6">{profile.name || 'Anonymous Thinker'}</h2>
          <p className="text-afar-ochre uppercase tracking-widest text-xs font-bold mt-2">Member of the Afar Diaspora</p>
        </div>

        <div className="space-y-8 bg-white p-10 rounded-[2.5rem] shadow-sm border border-black/5">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-black/40 ml-1">Display Name</label>
            {isEditing ? (
              <input 
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full bg-afar-sand border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-afar-ochre transition-colors font-serif text-xl"
                placeholder="Enter your name"
              />
            ) : (
              <p className="text-2xl font-serif px-1">{profile.name || 'Not set'}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-black/40 ml-1">Your Bio</label>
            {isEditing ? (
              <textarea 
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="w-full bg-afar-sand border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-afar-ochre transition-colors font-serif text-lg min-h-[150px] resize-none"
                placeholder="Tell us about your journey and thoughts..."
              />
            ) : (
              <p className="text-lg text-black/60 leading-relaxed italic px-1">
                {profile.bio || 'No bio shared yet.'}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="pt-8 border-t border-black/5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-serif text-2xl text-afar-ochre mb-1">0</h4>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Articles Published</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-afar-ochre mb-1">0</h4>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Comments Made</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isAvatarModalOpen && (
          <AvatarUpload
            onUpload={(base64) => setEditedProfile({ ...editedProfile, avatar: base64 })}
            onClose={() => setIsAvatarModalOpen(false)}
            currentAvatar={editedProfile.avatar || undefined}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
