import { useState, useEffect } from 'react';
import { 
  Palette, 
  Box, 
  User, 
  Trees, 
  Clock, 
  Droplets, 
  Sun, 
  Layout, 
  Camera, 
  Maximize, 
  Zap, 
  Globe, 
  Smile, 
  Layers, 
  Settings2,
  Video as VideoIcon,
  Film,
  Aperture,
  Wind,
  Sparkles,
  ChevronLeft,
  Copy,
  Check
} from 'lucide-react';
import { paintingCategories, videoCategories } from '@/data/categories';
import type { Category, GalleryItem } from '@/data/categories';
import { useLanguage } from '../App';
import { translations } from '../data/translations';

// Define the icon map
const iconMap: Record<string, any> = {
  styles: Palette,
  materials: Box,
  subjects: User,
  environments: Trees,
  scenes: Clock,
  colors: Droplets,
  lighting: Sun,
  composition: Layout,
  angles: Camera,
  ratios: Maximize,
  dynamics: Zap,
  cultures: Globe,
  emotions: Smile,
  details: Layers,
  techniques: Settings2,
  'v-styles': Film,
  'v-camera': Aperture,
  'v-movements': Wind,
  'v-lighting': Sun,
  'v-colors': Droplets,
  'v-composition': Layout,
  'v-dynamics': Zap,
  'v-transitions': Sparkles,
  'v-emotions': Smile,
  'v-subjects': User,
  'v-ratios': Maximize,
  'v-effects': Sparkles,
};

export default function Gallery() {
  const { lang } = useLanguage();
  const t = translations[lang].gallery;
  const [mode, setMode] = useState<'painting' | 'video'>('painting');
  const [selectedCategory, setSelectedCategory] = useState<Category>(paintingCategories[0]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync selectedCategory when mode changes
  useEffect(() => {
    if (mode === 'painting') {
      setSelectedCategory(paintingCategories[0]);
    } else {
      setSelectedCategory(videoCategories[0]);
    }
    setSelectedItem(null);
  }, [mode]);

  // Handle section jumping and mode switching from Hero
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#video-gallery') {
        setMode('video');
      } else if (hash === '#painting-gallery') {
        setMode('painting');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = mode === 'painting' ? paintingCategories : videoCategories;

  const getResolutionFilter = (itemId: string) => {
    if (selectedCategory.id !== 'resolution') return '';
    switch (itemId) {
      case 'res-2k': return 'contrast(1) saturate(1)';
      case 'res-4k': return 'contrast(1.05) saturate(1.05) brightness(1.02)';
      case 'res-8k': return 'contrast(1.1) saturate(1.1) brightness(1.05)';
      case 'res-16k': return 'contrast(1.15) saturate(1.15) brightness(1.08) drop-shadow(0 0 8px rgba(255,255,255,0.2))';
      default: return '';
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mode Switcher Tabs - Hide when in detail view for cleaner look, or keep for nav */}
        {!selectedItem && (
          <div className="flex justify-center mb-10 md:mb-16">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl md:rounded-2xl">
              <button
                onClick={() => setMode('painting')}
                className={`flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all ${
                  mode === 'painting' 
                    ? 'bg-white text-orange-500 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Palette className="w-3.5 h-3.5 md:w-4 h-4" />
                {t.modePainting}
              </button>
              <button
                onClick={() => setMode('video')}
                className={`flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all ${
                  mode === 'video' 
                    ? 'bg-white text-orange-500 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <VideoIcon className="w-3.5 h-3.5 md:w-4 h-4" />
                {t.modeVideo}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Sidebar Navigation - Styled like the screenshot */}
          {!selectedItem && (
            <aside className="w-full lg:w-72 flex-shrink-0 overflow-x-auto lg:overflow-visible">
              <div className="lg:sticky lg:top-24 bg-white border border-slate-100 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden min-w-[300px] lg:min-w-0">
                <div className="p-6 pb-2">
                  <h3 className="text-lg font-black text-slate-900">
                    {mode === 'painting' ? t.catPainting : t.catVideo}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">
                    {categories.length}{t.dimensions}
                  </p>
                </div>
                
                <div className="py-4 space-y-0.5 max-h-[600px] overflow-y-auto scrollbar-hide">
                  {categories.map((category) => {
                    const Icon = iconMap[category.id] || Box;
                    const isActive = selectedCategory.id === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedItem(null);
                        }}
                        className={`group relative flex items-center gap-4 px-6 py-4 w-full text-left transition-all ${
                          isActive
                            ? 'bg-orange-50/50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Active Indicator Line */}
                        {isActive && (
                          <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-orange-500" />
                        )}
                        
                        <div className={`w-6 h-6 flex items-center justify-center transition-colors ${
                          isActive ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className={`text-sm font-black tracking-tight ${isActive ? 'text-orange-500' : 'text-slate-700'}`}>
                            {lang === 'en' ? category.nameEn || category.name : category.name}
                          </div>
                          <div className={`text-[10px] font-bold ${isActive ? 'text-orange-300' : 'text-slate-400'}`}>
                            {lang === 'en' ? category.descriptionEn || category.description : category.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          {/* Main Content Area */}
          <div className="flex-1">
            {selectedItem ? (
              /* Detail View - Matching Screenshot */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="group flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold text-sm mb-8 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  {t.back}{lang === 'en' ? selectedCategory.nameEn || selectedCategory.name : selectedCategory.name}
                </button>

                <div className="bg-white border border-slate-100 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Large Image View */}
                    <div className="w-full md:w-1/2 p-8">
                      <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 shadow-2xl">
                        <img 
                          src={selectedItem.image} 
                          alt={lang === 'en' ? selectedItem.nameEn || selectedItem.name : selectedItem.name} 
                            className="w-full h-full object-cover"
                            style={{ filter: getResolutionFilter(selectedItem.id) }}
                          />
                      </div>
                    </div>

                    {/* Right: Content & Prompts */}
                    <div className="w-full md:w-1/2 p-8 md:pl-0 flex flex-col">
                      <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                          {lang === 'en' ? selectedCategory.nameEn || selectedCategory.name : selectedCategory.name} · {t.detailTitle}
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                          {lang === 'en' ? selectedItem.nameEn || selectedItem.name : selectedItem.name}
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                          {lang === 'en' ? selectedItem.descEn || selectedItem.desc : selectedItem.desc}
                        </p>
                      </div>

                      {/* Prompt Box */}
                      <div className="mt-auto">
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative group">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.promptExample}</span>
                            <button 
                              onClick={() => handleCopy(selectedItem.prompt || '')}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                copied 
                                  ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                                  : 'bg-white text-slate-600 hover:text-orange-500 shadow-sm border border-slate-100 hover:border-orange-100'
                              }`}
                            >
                              {copied ? (
                                <><Check className="w-3 h-3" /> {t.copied}</>
                              ) : (
                                <><Copy className="w-3 h-3" /> {t.copyPrompt}</>
                              )}
                            </button>
                          </div>
                          <div className="text-sm font-mono text-slate-600 leading-relaxed break-words bg-white/50 p-4 rounded-2xl border border-slate-100/50">
                            {selectedItem.prompt || 'No prompt data available'}
                          </div>
                        </div>
                        
                        <div className="mt-6 flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                            ))}
                          </div>
                          <p className="text-xs text-slate-400 font-bold">{t.userStats}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Grid Content */
              <>
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-slate-900 mb-1">{lang === 'en' ? selectedCategory.nameEn || selectedCategory.name : selectedCategory.name}</h2>
                  <p className="text-sm text-slate-400 font-bold">
                    {lang === 'en' ? selectedCategory.descriptionEn || selectedCategory.description : selectedCategory.description} · {selectedCategory.items.length}{t.examples}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {selectedCategory.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="group bg-white rounded-3xl overflow-hidden border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    >
                      {/* Image on Top */}
                      <div className="relative aspect-[4/3] m-2 rounded-2xl overflow-hidden bg-slate-50">
                        <img
                          src={item.image}
                          alt={lang === 'en' ? item.nameEn || item.name : item.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          style={{ filter: getResolutionFilter(item.id) }}
                        />
                      </div>
                      
                      {/* Text at Bottom */}
                      <div className="p-5 pt-3">
                        <h4 className="text-lg font-black text-slate-900 mb-1.5 tracking-tight group-hover:text-orange-500 transition-colors">
                          {lang === 'en' ? item.nameEn || item.name : item.name}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                          {lang === 'en' ? item.descEn || item.desc : item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
