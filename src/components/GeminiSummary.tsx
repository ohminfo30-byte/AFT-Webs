import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GeminiSummaryProps {
  content: string;
}

export default function GeminiSummary({ content }: GeminiSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the following article from a 'Free Thinker' perspective, focusing on its cultural or philosophical implications within the Afar context. Keep the summary to 2-3 impactful sentences. Article content: ${content}`,
      });
      
      setSummary(response.text || 'No summary generated.');
    } catch (err) {
      console.error('Gemini Error:', err);
      setError('Failed to generate AI insights. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8 p-6 bg-afar-ochre/5 border border-afar-ochre/20 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-afar-ochre">
          <Sparkles className="w-5 h-5" />
          <span className="font-serif italic font-bold">AI Insights</span>
        </div>
        {!summary && !isLoading && (
          <button
            onClick={generateSummary}
            className="text-xs uppercase tracking-widest font-bold px-4 py-2 bg-afar-ochre text-white rounded-full hover:bg-afar-clay transition-colors"
          >
            Generate Summary
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 text-afar-ochre/60 italic text-sm"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Consulting the digital oracle...
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm italic"
          >
            {error}
          </motion.div>
        ) : summary ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-afar-ink/80 text-sm leading-relaxed italic border-l-2 border-afar-ochre pl-4"
          >
            {summary}
          </motion.div>
        ) : (
          <p className="text-black/40 text-xs italic">
            Get an AI-powered summary of this article's core philosophy.
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}
