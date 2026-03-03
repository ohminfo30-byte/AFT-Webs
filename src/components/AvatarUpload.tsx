import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface AvatarUploadProps {
  onUpload: (base64: string) => void;
  onClose: () => void;
  currentAvatar?: string;
}

export default function AvatarUpload({ onUpload, onClose, currentAvatar }: AvatarUploadProps) {
  const [mode, setMode] = useState<'selection' | 'camera'>('selection');
  const [preview, setPreview] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    setMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please check permissions.');
      setMode('selection');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setPreview(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (preview) {
      onUpload(preview);
      onClose();
    }
  };

  const handleCancel = () => {
    stopCamera();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-afar-ink/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-afar-sand w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl border border-white/20"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl">Update <span className="italic text-afar-ochre">Avatar</span></h3>
            <button onClick={handleCancel} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="aspect-square relative rounded-3xl overflow-hidden bg-black/5 border-2 border-dashed border-black/10 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.img
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={preview}
                  className="w-full h-full object-cover"
                />
              ) : mode === 'camera' ? (
                <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button
                      onClick={capturePhoto}
                      className="w-16 h-16 bg-white rounded-full border-4 border-afar-ochre flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <div className="w-12 h-12 bg-afar-ochre rounded-full" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8">
                  <div className="w-24 h-24 bg-afar-ochre/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-afar-ochre" />
                  </div>
                  <p className="text-sm text-black/40 font-medium">Choose a method to upload your photo</p>
                </motion.div>
              )}
            </AnimatePresence>
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="space-y-4">
            {!preview && mode === 'selection' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={startCamera}
                  className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-black/5 hover:border-afar-ochre hover:bg-afar-ochre/5 transition-all group"
                >
                  <Camera className="w-6 h-6 text-afar-ochre group-hover:scale-110 transition-transform" />
                  <span className="text-xs uppercase tracking-widest font-bold">Camera</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-black/5 hover:border-afar-ochre hover:bg-afar-ochre/5 transition-all group"
                >
                  <Upload className="w-6 h-6 text-afar-ochre group-hover:scale-110 transition-transform" />
                  <span className="text-xs uppercase tracking-widest font-bold">Gallery</span>
                </button>
              </div>
            )}

            {preview && (
              <div className="flex gap-4">
                <button
                  onClick={() => { setPreview(null); setMode('selection'); }}
                  className="flex-1 py-4 border border-black/10 rounded-2xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Retake
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-4 bg-afar-ink text-white rounded-2xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-afar-clay transition-colors"
                >
                  <Check className="w-4 h-4" /> Confirm
                </button>
              </div>
            )}
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </motion.div>
    </motion.div>
  );
}
