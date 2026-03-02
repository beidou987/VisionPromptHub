import { useState, useEffect } from 'react';
import { Wand2, Copy, Check, RotateCcw, Palette, Video as VideoIcon, Lightbulb, X } from 'lucide-react';
import { paintingCategories, videoCategories } from '@/data/categories';
import { useLanguage } from '../App';
import { translations } from '../data/translations';

export default function PromptGenerator() {
  const [mode, setMode] = useState<'painting' | 'video'>('painting');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].generator;

  // Formula Data
  const formulaData = {
    painting: {
      title: lang === 'zh' ? 'AI绘画万能公式' : 'AI Painting Formula',
      full: lang === 'zh' ? '画风+材质+画面主题+环境+场景+色彩+灯光+构图+角度+图片比例/分辨率+动态效果+文化+情绪+感官体验+细节层次+叙事性+特殊技术' : 'Style + Material + Subject + Environment + Scene + Color + Light + Composition + Angle + Aspect Ratio/Resolution + Dynamics + Culture + Emotion + Sensory + Detail + Narrative + Technique',
      core: lang === 'zh' ? ['画风', '材质', '主体', '环境', '光影', '视角', '质感', '情绪', '技术'] : ['Style', 'Material', 'Subject', 'Env', 'Light', 'Angle', 'Texture', 'Emotion', 'Tech'],
      mnemonic: lang === 'zh' ? ['风格定调', '主体叙事', '光影造境', '视角构图', '质感细节', '情绪共鸣', '技术收尾'] : ['Style tone', 'Subject narrative', 'Light atmosphere', 'Angle composition', 'Texture detail', 'Emotion resonance', 'Tech finishing']
    },
    video: {
      title: lang === 'zh' ? 'AI视频万能公式' : 'AI Video Formula',
      full: lang === 'zh' ? '视频风格+视频主体+镜头运动+转场效果+视频特效+视频灯光+视频色调+视频构图+景别+画面比例+动态元素+情绪氛围' : 'Video Style + Subject + Camera Motion + Transition + VFX + Lighting + Color Grading + Composition + Shot Size + Aspect Ratio + Dynamics + Atmosphere',
      core: lang === 'zh' ? ['风格', '主体', '镜头', '光影', '构图', '动态', '情绪'] : ['Style', 'Subject', 'Camera', 'Light', 'Comp', 'Motion', 'Emotion'],
      mnemonic: lang === 'zh' ? ['风格定调', '主体呈现', '镜头语言', '光影氛围', '构图布局', '动态节奏', '情绪渲染'] : ['Style tone', 'Subject presence', 'Camera language', 'Light atmosphere', 'Layout', 'Motion rhythm', 'Emotion rendering']
    }
  };

  const currentFormula = mode === 'painting' ? formulaData.painting : formulaData.video;

  // Sync mode with hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#video-gallery' || hash === '#video-generator') {
        setMode('video');
      } else if (hash === '#painting-gallery' || hash === '#painting-generator') {
        setMode('painting');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Clear selections when mode changes
  useEffect(() => {
    setSelectedOptions({});
    setGeneratedPrompt('');
    setShowFormula(false);
  }, [mode]);

  const categories = mode === 'painting' ? paintingCategories : videoCategories;

  const toggleOption = (categoryId: string, itemId: string) => {
    setSelectedOptions(prev => {
      const current = prev[categoryId] || [];
      const updated = current.includes(itemId)
        ? current.filter(id => id !== itemId)
        : [...current, itemId];
      return { ...prev, [categoryId]: updated };
    });
  };

  const resetOptions = () => {
    setSelectedOptions({});
    setGeneratedPrompt('');
  };

  const generatePrompt = () => {
    const parts: string[] = [];
    
    categories.forEach(cat => {
      const selectedIds = selectedOptions[cat.id] || [];
      selectedIds.forEach(id => {
        const item = cat.items.find(i => i.id === id);
        if (item) {
          // Always use the name (Chinese label) as per user request
          // even in English mode, because the generated prompt is for 
          // visual selection/copying of labels.
          parts.push(lang === 'en' ? item.nameEn || item.name : item.name);
        }
      });
    });

    if (parts.length > 0) {
      setGeneratedPrompt(parts.join(', '));
    }
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="generator" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 border border-orange-200 mb-4">
            <Wand2 className="w-3 h-3 text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-widest">{t.badge}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
              {mode === 'painting' ? t.modePainting : t.modeVideo}
              <span className="text-orange-500">{t.title.replace(mode === 'painting' ? t.modePainting : t.modeVideo, '')}</span>
            </h2>
            
            {/* Formula Button */}
            <button
              onClick={() => setShowFormula(!showFormula)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                mode === 'painting'
                  ? 'text-orange-500 border-orange-100 bg-orange-50/50 hover:bg-orange-50'
                  : 'text-purple-500 border-purple-100 bg-purple-50/50 hover:bg-purple-50'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {t.formula}
            </button>
          </div>
          
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-medium">
            {t.subtitle}
          </p>

          {/* Formula Modal Overlay */}
          {showFormula && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-full max-w-2xl z-50 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-[#0f172a] rounded-[32px] p-6 shadow-2xl border border-slate-800 text-left relative overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${mode === 'painting' ? 'bg-orange-500/10 text-orange-500' : 'bg-purple-500/10 text-purple-500'}`}>
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <h3 className={`text-lg font-black ${mode === 'painting' ? 'text-orange-500' : 'text-purple-500'}`}>
                      {currentFormula.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setShowFormula(false)}
                    className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Part 1: Full Formula */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{lang === 'zh' ? '万能公式:' : 'Full Formula:'}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium italic">
                      {currentFormula.full}
                    </p>
                  </div>

                  {/* Part 2: Core Structure */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{lang === 'zh' ? '核心结构:' : 'Core Structure:'}</h4>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {currentFormula.core.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className={`text-xs font-black ${mode === 'painting' ? 'text-orange-400' : 'text-purple-400'}`}>{step}</span>
                          {idx < currentFormula.core.length - 1 && (
                            <span className="text-slate-600 text-[10px]">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 3: Mnemonic */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{lang === 'zh' ? '记忆版:' : 'Mnemonic:'}</h4>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {currentFormula.mnemonic.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-400">{step}</span>
                          {idx < currentFormula.mnemonic.length - 1 && (
                            <span className="text-slate-600 text-[10px]">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setMode('painting')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black transition-all ${
                mode === 'painting' 
                  ? 'bg-white text-orange-500 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              {t.modePainting}
            </button>
            <button
              onClick={() => setMode('video')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black transition-all ${
                mode === 'video' 
                  ? 'bg-white text-orange-500 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              {t.modeVideo}
            </button>
          </div>
        </div>

        {/* Generator Core */}
        <div className="flex flex-col gap-8">
          {/* Tags Cloud Area - Grouped by Category */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 relative z-10">
              {categories.map((category) => (
                <div key={category.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2.5">
                    <span className="w-1 h-5 bg-orange-500 rounded-full" />
                    {lang === 'en' ? category.nameEn || category.name : category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => {
                      const isSelected = (selectedOptions[category.id] || []).includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleOption(category.id, item.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-105'
                              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                          }`}
                        >
                          {lang === 'en' ? item.nameEn || item.name : item.name}
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action & Result */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-center mb-8">
              <button
                onClick={generatePrompt}
                className="group relative flex items-center justify-center gap-3 w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
              >
                {t.generateBtn}
              </button>
            </div>

            {/* Result Display */}
            {generatedPrompt && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg relative group">
                  <div className="flex flex-col gap-5">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                        {t.resultLabel}
                      </div>
                      <p className="text-lg sm:text-xl text-slate-900 leading-relaxed font-black tracking-tight">
                        {generatedPrompt}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all border ${
                          copied 
                            ? 'bg-green-500 text-white border-green-500' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {copied ? (
                          <><Check className="w-3.5 h-3.5" /> {t.copied}</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> {t.copy}</>
                        )}
                      </button>
                      <button
                        onClick={resetOptions}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black bg-white text-slate-400 border border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {t.reset}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
