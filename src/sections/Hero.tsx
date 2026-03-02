import { Sparkles, Palette, Video } from 'lucide-react';
import { useLanguage } from '../App';
import { translations } from '../data/translations';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  const handleNavigate = (hash: string) => {
    window.location.hash = hash;
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12 md:pt-20">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-10 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 md:w-4 h-4 text-orange-400" />
          <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-[0.15em] md:tracking-[0.2em]">{t.badge}</span>
        </div>

        {/* Main Title with Gradient */}
        <h1 className="text-4xl sm:text-7xl lg:text-9xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1.1] md:leading-[0.9]">
          {t.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">{t.title2}</span><br />
          {t.title3}
        </h1>

        {/* Subtitle with spacing */}
        <p className="text-base sm:text-2xl font-medium text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          {t.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center mb-16 md:mb-24 px-4">
          <button
            onClick={() => handleNavigate('painting-gallery')}
            className="w-full sm:w-auto group relative px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base md:text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3"
          >
            <Palette className="w-5 h-5 md:w-6 md:h-6" />
            {t.btnPainting}
          </button>
          <button
            onClick={() => handleNavigate('video-gallery')}
            className="w-full sm:w-auto group px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-base md:text-lg border border-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-xl flex items-center justify-center gap-3"
          >
            <Video className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            {t.btnVideo}
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto pt-8 md:pt-12 border-t border-white/5 px-4">
          <div>
            <div className="text-2xl md:text-3xl font-black text-white mb-1">28+</div>
            <div className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t.statCategories}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white mb-1">300+</div>
            <div className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t.statExamples}</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white mb-1">∞</div>
            <div className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t.statPossibilities}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
