import React, { ReactNode } from 'react';

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyle = "px-8 py-3 rounded-lg font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Screenshot style: Gold gradient, dark text, slight glow
    primary: "bg-gradient-to-b from-gold-400 to-gold-600 text-slate-950 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-110 active:scale-95",
    secondary: "bg-slate-800 text-white border border-slate-700 hover:border-gold-500/50 hover:bg-slate-700",
    outline: "border-2 border-gold-500 text-gold-500 hover:bg-gold-500/10 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800/50"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Inputs ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', error, ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-sm font-medium text-slate-400 mb-2 ml-1 group-focus-within:text-gold-400 transition-colors">{label}</label>}
      <div className="relative">
        <input 
          className={`w-full bg-slate-950/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 
            focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 
            hover:border-slate-600 transition-all duration-300 ${className}`}
          {...props}
        />
        {/* Optional decorative corner glow could go here */}
      </div>
      {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

// --- Cards ---
export const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);