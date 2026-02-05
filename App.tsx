import React, { useState } from 'react';
import { UserData, AppView, Language } from './types';
import { WizardFlow } from './components/Wizard/WizardFlow';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { Globe } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('wizard');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [lang, setLang] = useState<Language>('ru');

  const handleWizardComplete = (data: UserData) => {
    setUserData(data);
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('wizard');
    setUserData(null);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className="font-sans antialiased text-slate-200 selection:bg-gold-500/30 selection:text-gold-200 relative">
      {/* Language Switcher */}
      <button 
        onClick={toggleLang}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-slate-400 hover:text-white hover:border-gold-500 transition-all backdrop-blur-md"
      >
        <Globe size={14} />
        <span className={lang === 'en' ? 'text-gold-500' : ''}>EN</span>
        <span className="text-slate-600">/</span>
        <span className={lang === 'ru' ? 'text-gold-500' : ''}>RU</span>
      </button>

      {view === 'wizard' ? (
        <WizardFlow onComplete={handleWizardComplete} lang={lang} />
      ) : (
        <DashboardLayout 
          userData={userData!} 
          onLogout={handleLogout} 
          lang={lang}
        />
      )}
    </div>
  );
};

export default App;