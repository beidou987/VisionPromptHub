import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../App';
import { translations } from '../data/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.addEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              {lang === 'zh' ? 'AI视觉提示词平台' : 'AI VisionPrompt Hub'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-10">
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
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-200"
            >
              {t.switch}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
