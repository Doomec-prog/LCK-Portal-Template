import React, { useState, useEffect } from 'react';
import { UserData, WizardStep, Language } from '../../types';
import { Button, Input } from '../UI';
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, FileText, BadgeCheck, Loader2, Download, AlertCircle } from 'lucide-react';
import { translations } from '../../translations';
import { WizardTransitionProvider, useWizardTransition } from './WizardTransitionContext';
import { Clapperboard } from './Clapperboard';

interface WizardFlowProps {
  onComplete: (data: UserData) => void;
  lang: Language;
}

const initialData: UserData = {
  fullName: '',
  city: '',
  email: '',
  phone: '',
  role: '',
  education: '',
  imdbLink: '',
  documents: []
};

// Internal component to consume Context properly
const WizardContent: React.FC<{ 
  step: WizardStep; 
  setStep: (s: WizardStep) => void; 
  formData: UserData;
  setFormData: React.Dispatch<React.SetStateAction<UserData>>;
  onComplete: (data: UserData) => void;
  lang: Language;
}> = ({ step, setStep, formData, setFormData, onComplete, lang }) => {
  const { goToStep } = useWizardTransition();
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const t = translations[lang].wizard;

  // Smooth scroll and animation trigger
  useEffect(() => {
    setAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  const updateData = (key: keyof UserData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < WizardStep.REVIEW) {
      // Trigger cinematic transition
      goToStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > WizardStep.PERSONAL) {
       // Optional: Could use transition here too, but immediate back often feels better. 
       // Let's use transition for consistency.
       goToStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete(formData);
    }, 2000);
  };

   // --- Premium Stepper Component ---
   const renderPremiumStepper = () => {
    const steps = [
      { id: 1, label: t.steps.personal },
      { id: 2, label: t.steps.professional },
      { id: 3, label: t.steps.documents },
      { id: 4, label: t.steps.review },
    ];

    return (
      <div className="w-full max-w-3xl mx-auto mb-16 relative">
        <div className="flex justify-between items-center relative z-10">
          {steps.map((s, idx) => {
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            
            return (
              <div key={s.id} className="flex flex-col items-center gap-3 w-32">
                {/* Circle */}
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 border-2 relative
                    ${isActive 
                      ? 'bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 border-gold-200 text-slate-950 scale-125 shadow-[0_0_35px_rgba(251,191,36,0.8)]' 
                      : isCompleted 
                        ? 'bg-slate-800 border-gold-600 text-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                        : 'bg-slate-900 border-slate-700 text-slate-600'}
                  `}
                >
                  {/* Inner glow pulse for active step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
                  )}
                  <span className="relative z-10">
                    {isCompleted ? <CheckCircle2 size={24} /> : s.id}
                  </span>
                </div>
                
                {/* Label */}
                <span className={`text-[10px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-300 text-center
                  ${isActive ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] scale-110' : 'text-slate-500'}
                `}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Connecting Lines */}
        <div className="absolute top-6 left-0 w-full h-[2px] bg-slate-800 -z-0 rounded-full overflow-hidden">
             <div 
                className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
             ></div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (step) {
      case WizardStep.PERSONAL:
        return (
          <>
            <h2 className="text-xl font-medium text-white mb-6 pl-1 border-l-4 border-gold-500 leading-none">{t.headers.personal}</h2>
            <div className="space-y-5">
              <Input 
                label={t.fields.fullName} 
                placeholder="Christopher Nolan" 
                value={formData.fullName} 
                onChange={e => updateData('fullName', e.target.value)} 
                autoFocus
              />
              <Input 
                label={t.fields.city} 
                placeholder="Los Angeles, CA" 
                value={formData.city} 
                onChange={e => updateData('city', e.target.value)} 
              />
              <Input 
                label={t.fields.email} 
                type="email"
                placeholder="you@studio.com"
                value={formData.email} 
                onChange={e => updateData('email', e.target.value)} 
              />
               <Input 
                label={t.fields.phone} 
                placeholder="+1 (555) 000-0000"
                value={formData.phone} 
                onChange={e => updateData('phone', e.target.value)} 
              />
            </div>
          </>
        );

      case WizardStep.PROFESSIONAL:
        return (
          <>
            <h2 className="text-xl font-medium text-white mb-6 pl-1 border-l-4 border-gold-500 leading-none">{t.headers.professional}</h2>
            <div className="space-y-5">
              <Input 
                label={t.fields.role} 
                placeholder="Director of Photography" 
                value={formData.role} 
                onChange={e => updateData('role', e.target.value)} 
              />
              <Input 
                label={t.fields.education} 
                placeholder="NYU Tisch" 
                value={formData.education} 
                onChange={e => updateData('education', e.target.value)} 
              />
              <Input 
                label={t.fields.imdb} 
                placeholder="https://imdb.com/name/..." 
                value={formData.imdbLink} 
                onChange={e => updateData('imdbLink', e.target.value)} 
              />
            </div>
          </>
        );

      case WizardStep.DOCUMENTS:
        return (
          <>
            <h2 className="text-xl font-medium text-white mb-6 pl-1 border-l-4 border-gold-500 leading-none">{t.headers.documents}</h2>
            
            {/* Requirements Card */}
            <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
               <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={18} className="text-gold-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">{t.fields.requirementsTitle}</h3>
               </div>
               
               <ul className="space-y-3 mb-6">
                  {t.fields.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                       <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                       <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
               </ul>

               <Button 
                variant="outline" 
                className="w-full justify-center border-dashed"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '#';
                  link.click();
                }}
              >
                <Download size={18} /> {t.buttons.downloadTemplate}
              </Button>
            </div>

            <div className="space-y-6">
               <div 
                className="border-2 border-dashed border-slate-700 bg-slate-900/30 rounded-xl py-12 flex flex-col items-center justify-center text-center hover:border-gold-500 hover:bg-slate-900/60 transition-all cursor-pointer group"
                onClick={() => {
                  const mockFile = { name: "Application_Package_2024.zip", size: 1024 * 1024 * 5 } as File;
                  updateData('documents', [mockFile]);
                }}
              >
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all border border-slate-800 group-hover:border-gold-500/50">
                  <Upload size={24} className="text-slate-500 group-hover:text-gold-500 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-gold-400 transition-colors">{t.fields.uploadTitle}</h3>
                <p className="text-slate-500 mt-1 text-xs">{t.fields.uploadDesc}</p>
              </div>

              {formData.documents.length > 0 && (
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-gold-500/30 rounded-xl p-4 flex items-center gap-4 shadow-lg">
                  <div className="bg-gold-500/20 text-gold-500 p-3 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white tracking-wide">{formData.documents[0].name}</p>
                    <p className="text-xs text-gold-500/80">{t.fields.ready}</p>
                  </div>
                  <CheckCircle2 size={24} className="text-gold-500" />
                </div>
              )}
            </div>
          </>
        );

      case WizardStep.REVIEW:
        return (
          <>
            <h2 className="text-xl font-medium text-white mb-6 pl-1 border-l-4 border-gold-500 leading-none">{t.headers.review}</h2>
            <div className="space-y-4">
              <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800 hover:border-gold-500/30 transition-colors">
                <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-4">{t.steps.personal}</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">{t.fields.labels.name}</label>
                    <div className="text-white font-medium">{formData.fullName || '—'}</div>
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">{t.fields.labels.city}</label>
                    <div className="text-white font-medium">{formData.city || '—'}</div>
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">{t.fields.labels.email}</label>
                    <div className="text-white font-medium">{formData.email || '—'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800 hover:border-gold-500/30 transition-colors">
                <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-4">{t.steps.professional}</h3>
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">{t.fields.labels.role}</label>
                    <div className="text-white font-medium">{formData.role || '—'}</div>
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">{t.fields.labels.education}</label>
                    <div className="text-white font-medium">{formData.education || '—'}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gold-500 blur-2xl opacity-20 animate-pulse"></div>
          <Loader2 className="animate-spin text-gold-500 relative z-10" size={80} />
        </div>
        <h2 className="text-3xl font-bold text-white mt-8 mb-2">{t.loading.title}</h2>
        <p className="text-slate-400">{t.loading.desc}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-6 md:p-12 font-sans selection:bg-gold-500/30">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {renderPremiumStepper()}
        
        {/* Main Card Container with Premium Glow */}
        <div className="relative group">
          {/* Animated Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-gold-500 to-slate-900 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-1000"></div>
          
          <div className="relative bg-[#0B1221] border border-gold-500/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_-10px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            
            <div className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {renderContent()}
            </div>

            <div className="flex justify-between items-center mt-12 pt-8">
               <div className="w-32">
                {step > 1 && (
                  <Button 
                    variant="ghost" 
                    onClick={handleBack} 
                    className="text-slate-500 hover:text-gold-400 px-0"
                  >
                    <ArrowLeft size={18} /> {t.buttons.back}
                  </Button>
                )}
              </div>
              
              <Button 
                onClick={step === WizardStep.REVIEW ? handleSubmit : handleNext} 
                className="w-48 shadow-lg shadow-gold-900/20"
              >
                {step === WizardStep.REVIEW ? t.buttons.submit : t.buttons.next} <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper to provide context
export const WizardFlow: React.FC<WizardFlowProps> = (props) => {
  const [step, setStep] = useState<WizardStep>(WizardStep.PERSONAL);
  const [formData, setFormData] = useState<UserData>(initialData);

  const commitStepChange = (target: number) => {
    setStep(target as WizardStep);
  }

  return (
    <WizardTransitionProvider>
       <WizardContent 
          step={step} 
          setStep={setStep} 
          formData={formData} 
          setFormData={setFormData}
          onComplete={props.onComplete}
          lang={props.lang}
       />
       <Clapperboard onCommit={commitStepChange} />
    </WizardTransitionProvider>
  );
}