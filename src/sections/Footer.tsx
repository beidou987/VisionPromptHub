import { Sparkles } from 'lucide-react';
import { useLanguage } from '../App';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="py-12 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-black text-white block leading-none mb-1">
                {lang === 'zh' ? 'AI视觉提示词平台' : 'AI VisionPrompt Hub'}
              </span>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col md:items-end gap-2">
            <p className="text-slate-500 text-sm font-medium">
              {lang === 'zh' ? '@ 2026 AI视觉提示词平台版权所有' : '© 2026 AI VisionPrompt Hub. All Rights Reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
