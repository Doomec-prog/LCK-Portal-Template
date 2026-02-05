import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardTransitionContextType {
  isTransitioning: boolean;
  targetStep: number | null;
  goToStep: (step: number) => void;
  endTransition: () => void;
}

const WizardTransitionContext = createContext<WizardTransitionContextType | undefined>(undefined);

export const WizardTransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetStep, setTargetStep] = useState<number | null>(null);

  const goToStep = (step: number) => {
    setTargetStep(step);
    setIsTransitioning(true);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setTargetStep(null);
  };

  return (
    <WizardTransitionContext.Provider value={{ isTransitioning, targetStep, goToStep, endTransition }}>
      {children}
    </WizardTransitionContext.Provider>
  );
};

export const useWizardTransition = () => {
  const context = useContext(WizardTransitionContext);
  if (!context) {
    throw new Error('useWizardTransition must be used within a WizardTransitionProvider');
  }
  return context;
};