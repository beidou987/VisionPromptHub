import { useState, createContext, useContext } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import PromptGenerator from './sections/PromptGenerator';
import About from './sections/About';
import Footer from './sections/Footer';
import './App.css';

type Language = 'zh' | 'en';
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
}>({ lang: 'zh', setLang: () => {} });

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [lang, setLang] = useState<Language>('zh');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <main>
          <Hero />
          <Gallery />
          <PromptGenerator />
          <About />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
