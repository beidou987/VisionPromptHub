import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { useLanguage } from '../App';
import { translations } from '../data/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className={`text-base md:text-xl font-bold tracking-tight ${isScrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`}>
              {lang === 'zh' ? 'AI视觉提示词平台' : 'AI VisionPrompt Hub'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => {
                window.location.hash = 'painting-gallery';
                scrollToSection('gallery');
              }}
              className={`font-medium transition-colors text-sm ${isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-slate-200 hover:text-white'}`}
            >
              {t.painting}
            </button>
            <button
              onClick={() => {
                window.location.hash = 'video-gallery';
                scrollToSection('gallery');
              }}
              className={`font-medium transition-colors text-sm ${isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-slate-200 hover:text-white'}`}
            >
              {t.video}
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className={`font-medium transition-colors text-sm ${isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-slate-200 hover:text-white'}`}
            >
              {t.generator}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`font-medium transition-colors text-sm ${isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-slate-200 hover:text-white'}`}
            >
              {t.about}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              {t.switch}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-bold shadow-sm"
            >
              {t.switch}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled || isMenuOpen ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-6 flex flex-col gap-4">
            <button
              onClick={() => {
                window.location.hash = 'painting-gallery';
                scrollToSection('gallery');
              }}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm active:bg-slate-100 transition-colors"
            >
              {t.painting}
              <div className="w-2 h-2 rounded-full bg-orange-500" />
            </button>
            <button
              onClick={() => {
                window.location.hash = 'video-gallery';
                scrollToSection('gallery');
              }}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm active:bg-slate-100 transition-colors"
            >
              {t.video}
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm active:bg-slate-100 transition-colors"
            >
              {t.generator}
              <div className="w-2 h-2 rounded-full bg-purple-500" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm active:bg-slate-100 transition-colors"
            >
              {t.about}
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
