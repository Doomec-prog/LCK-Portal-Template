import React, { useEffect, useState } from 'react';
import { useWizardTransition } from './WizardTransitionContext';

interface ClapperboardProps {
  onCommit: (targetStep: number) => void;
}

export const Clapperboard: React.FC<ClapperboardProps> = ({ onCommit }) => {
  const { isTransitioning, targetStep, endTransition } = useWizardTransition();
  const [visible, setVisible] = useState(false);
  const [isClapped, setIsClapped] = useState(false);

  useEffect(() => {
    if (isTransitioning && targetStep !== null) {
      // 1. Start sequence: Make visible
      setVisible(true);
      setIsClapped(false);

      // 2. The CLAP (Action)
      const clapTimer = setTimeout(() => {
        setIsClapped(true);
        // Play sound effect here if desired
      }, 800);

      // 3. Commit the state change (while screen is obscured/focused on board)
      const commitTimer = setTimeout(() => {
        onCommit(targetStep);
      }, 950); // Slightly after the clap hits

      // 4. End sequence: Hide and reset
      const cleanupTimer = setTimeout(() => {
        setVisible(false);
        endTransition();
      }, 2000);

      return () => {
        clearTimeout(clapTimer);
        clearTimeout(commitTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [isTransitioning, targetStep]);

  if (!isTransitioning && !visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="relative transform scale-75 md:scale-100 drop-shadow-2xl">
        
        {/* Top Arm (The moving part) */}
        <div 
          className="h-16 w-80 bg-[#1a1a1a] border-2 border-white/10 rounded-t-sm absolute top-[-60px] left-0 origin-bottom-left z-20 transition-transform duration-150 ease-in"
          style={{ 
            transform: isClapped ? 'rotate(0deg)' : 'rotate(-25deg)',
            backgroundImage: 'repeating-linear-gradient(135deg, #1a1a1a 0, #1a1a1a 20px, #fbbf24 20px, #fbbf24 40px)'
          }}
        >
          {/* Hinge screw */}
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-slate-400 rounded-full shadow-inner"></div>
        </div>

        {/* Bottom Slate (Static) */}
        <div className="w-80 h-64 bg-[#0a0a0a] border-2 border-slate-800 rounded-b-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Top Stripes of bottom slate */}
          <div className="h-4 w-full" 
            style={{ 
               backgroundImage: 'repeating-linear-gradient(135deg, #1a1a1a 0, #1a1a1a 20px, #fbbf24 20px, #fbbf24 40px)' 
            }}
          ></div>

          {/* Slate Content */}
          <div className="p-6 text-white font-mono flex flex-col h-full relative">
            
            {/* Cinematic Dust Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 pointer-events-none"></div>

            <div className="border-b-2 border-white/20 pb-2 mb-4 flex justify-between items-end">
              <div className="text-left">
                <span className="block text-[10px] text-slate-500 tracking-widest uppercase">Production</span>
                <span className="text-sm font-bold tracking-wider text-gold-500">FILMMAKERS LEAGUE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="border border-white/10 p-2 relative">
                <span className="absolute top-1 left-2 text-[8px] text-slate-500 uppercase">Scene</span>
                <div className="flex items-center justify-center h-full text-4xl font-bold mt-1">
                  {targetStep ? `0${targetStep}` : '--'}
                </div>
              </div>
              <div className="border border-white/10 p-2 relative">
                <span className="absolute top-1 left-2 text-[8px] text-slate-500 uppercase">Take</span>
                <div className="flex items-center justify-center h-full text-4xl font-bold mt-1">
                  1
                </div>
              </div>
            </div>

            <div className="mt-4 border-t-2 border-white/20 pt-2 flex justify-between items-end">
               <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Date</span>
                  <span className="text-xs">{new Date().toLocaleDateString()}</span>
               </div>
               <div>
                  <span className="block text-[10px] text-slate-500 uppercase text-right">Director</span>
                  <span className="text-xs text-right block">User Agent</span>
               </div>
            </div>

          </div>
        </div>

        {/* Flash Effect on Clap */}
        <div className={`absolute inset-0 bg-white mix-blend-overlay transition-opacity duration-75 ${isClapped ? 'opacity-30' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};