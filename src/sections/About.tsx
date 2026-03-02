import { BookOpen, Image, Wand2, Eye } from 'lucide-react';
import { useLanguage } from '../App';
import { translations } from '../data/translations';

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const features = [
    { 
      icon: BookOpen, 
      title: t.featurePainting, 
      description: t.featurePaintingDesc 
    },
    { 
      icon: Eye, 
      title: t.featureVideo, 
      description: t.featureVideoDesc 
    },
    { 
      icon: Image, 
      title: t.featureVisual, 
      description: t.featureVisualDesc 
    },
    { 
      icon: Wand2, 
      title: t.featureGenerator, 
      description: t.featureGeneratorDesc 
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6">
              {t.academy}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
              {t.title1}<br />
              <span className="text-orange-500">{t.title2}</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-xl">
              {t.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-black text-white mb-1">28+</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t.statCategories}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">300+</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t.statExamples}</div>
              </div>
            </div>
          </div>

          {/* Right: Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-8 duration-700">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-white/[0.08] transition-all duration-500 group backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:bg-orange-500 transition-all border border-white/10">
                  <feature.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-black text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
