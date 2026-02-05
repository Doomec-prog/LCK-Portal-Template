import React, { useState } from 'react';
import { UserData, Language } from '../../types';
import { translations } from '../../translations';
import { 
  CreditCard, 
  User, 
  Download, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  QrCode, 
  Clapperboard, 
  Calendar,
  ShieldCheck,
  Users,
  Gavel,
  FileText,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Button } from '../UI';

interface DashboardProps {
  userData: UserData;
  onLogout: () => void;
  lang: Language;
}

export const DashboardLayout: React.FC<DashboardProps> = ({ userData, onLogout, lang }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const t = translations[lang].dashboard;

  // --- Premium Sidebar ---
  const Sidebar = () => (
    <div className="w-20 lg:w-24 bg-[#05060a] border-r border-gold-500/20 flex flex-col items-center py-8 h-full fixed left-0 top-0 z-50">
      <div className="mb-12">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
           <Clapperboard size={24} className="text-slate-900" />
        </div>
      </div>

      <nav className="flex-1 space-y-8 w-full flex flex-col items-center">
        {[
          { id: 'overview', icon: LayoutDashboard },
          { id: 'profile', icon: User },
          { id: 'dues', icon: CreditCard },
          { id: 'resources', icon: FileText },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative group p-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-gold-500/10 text-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                : 'text-slate-500 hover:text-gold-400 hover:bg-slate-900'
            }`}
          >
            {activeTab === item.id && (
               <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-1 h-8 bg-gold-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
            )}
            <item.icon size={24} />
          </button>
        ))}
        
        <div className="pt-4 border-t border-slate-800 w-12 mx-auto"></div>
        <button className="text-slate-600 hover:text-gold-500 transition-colors"><Settings size={24} /></button>
      </nav>

      <div className="mt-auto">
        <button onClick={onLogout} className="text-slate-600 hover:text-red-400 transition-colors p-3">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );

  // --- Widget Components ---
  
  // 1. Digital Member Card (The Hero)
  const MemberCardWidget = () => (
    <div className="col-span-1 lg:col-span-2 relative group h-full min-h-[280px]">
       <div className="absolute -inset-[1px] bg-gradient-to-r from-gold-500 via-gold-300 to-gold-600 rounded-2xl opacity-70 blur-sm group-hover:opacity-100 transition duration-1000"></div>
       <div className="relative h-full bg-[#0F111A] rounded-2xl p-6 lg:p-8 flex flex-col justify-between overflow-hidden">
          
          {/* Background Texture */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

          {/* Header */}
          <div className="flex justify-between items-start relative z-10">
             <h3 className="text-gold-400 text-lg font-medium tracking-wide border-b border-gold-500/30 pb-1 mb-4 inline-block">
               {t.widgets.memberCard.title}
             </h3>
             <div className="bg-gold-500/10 border border-gold-500/50 p-2 rounded-lg">
                <Clapperboard className="text-gold-500" size={24} />
             </div>
          </div>

          {/* Content */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 relative z-10 mt-2">
             {/* Avatar */}
             <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-gold-500 p-1 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <img 
                    src={`https://picsum.photos/seed/${userData.fullName.replace(' ', '')}/200`} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#0F111A] rounded-full flex items-center justify-center border border-gold-500">
                   <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
             </div>

             {/* Details */}
             <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{t.widgets.memberCard.id}: <span className="text-white font-mono text-sm">92104567</span></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{userData.fullName}</h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                   <span className="text-gold-500 font-bold tracking-wider text-sm uppercase">{t.widgets.memberCard.status}: {t.widgets.memberCard.active}</span>
                   <ShieldCheck size={16} className="text-gold-500" />
                </div>
             </div>
             
             {/* QR */}
             <div className="hidden sm:block bg-white/90 p-2 rounded-lg shrink-0">
               <QrCode size={48} className="text-black" />
             </div>
          </div>

          {/* Valid Through Bar */}
          <div className="mt-8 relative z-10">
             <div className="flex justify-between text-[10px] uppercase tracking-wider text-gold-500/70 mb-2">
               <span>{t.widgets.memberCard.valid}: DEC 2025</span>
             </div>
             <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
               <div className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 w-3/4 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
             </div>
          </div>

       </div>
    </div>
  );

  const SmallWidget = ({ title, sub, mainText, icon: Icon, color = "gold", onClick }: any) => (
    <div 
      className="col-span-1 bg-gradient-to-b from-[#151720] to-[#0b0c10] border border-gold-500/20 hover:border-gold-500/60 rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-gold-100 font-semibold text-lg">{title}</h4>
          <p className="text-slate-500 text-xs mt-1">{sub}</p>
        </div>
        <div className={`p-2 rounded-lg ${color === 'gold' ? 'bg-gold-500/10 text-gold-500' : 'bg-slate-800 text-slate-400'} group-hover:scale-110 transition-transform`}>
           <Icon size={22} />
        </div>
      </div>
      <div>
         <p className="text-white font-medium flex items-center gap-2">
           {mainText}
           <ChevronRight size={16} className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0" />
         </p>
      </div>
    </div>
  );

  const OverviewView = () => (
    <div className="animate-fadeIn pb-12">
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8 pl-2 border-b border-slate-800/50 pb-6">
         <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400 drop-shadow-sm">
              {t.title}
            </h1>
            <p className="text-gold-600/60 text-sm font-medium tracking-[0.2em] mt-1 uppercase">{t.membersOnly}</p>
         </div>
         <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
               <Bell size={20} />
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="hidden md:block text-right">
               <p className="text-white text-sm font-medium">{userData.fullName}</p>
               <p className="text-slate-500 text-xs">{userData.role}</p>
            </div>
         </div>
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
         
         {/* Row 1: Member Card (2 cols) + Profile (1 col) */}
         <MemberCardWidget />
         
         <div className="col-span-1 flex flex-col gap-6">
            <SmallWidget 
              title={t.widgets.profile.title} 
              sub={t.widgets.profile.sub}
              mainText={t.widgets.profile.status}
              icon={User}
              onClick={() => setActiveTab('profile')}
            />
            <SmallWidget 
              title={t.widgets.dues.title}
              sub={t.widgets.dues.sub}
              mainText={t.widgets.dues.next}
              icon={CreditCard}
              onClick={() => setActiveTab('dues')}
            />
         </div>

         {/* Row 2 */}
         <SmallWidget 
            title={t.widgets.networking.title}
            sub={t.widgets.networking.sub}
            mainText={t.widgets.networking.count}
            icon={Users}
         />
          <SmallWidget 
            title={t.widgets.legal.title}
            sub={t.widgets.legal.sub}
            mainText={t.widgets.legal.pending}
            icon={Gavel}
         />
          <SmallWidget 
            title={t.widgets.events.title}
            sub={t.widgets.events.sub}
            mainText={t.widgets.events.event}
            icon={Calendar}
         />
      </div>
    </div>
  );

  const ResourcesView = () => (
    <div className="space-y-6 animate-fadeIn p-4">
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">{t.resources.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(t.resources.items).map((title, i) => (
          <div key={i} className="group bg-[#11131a] border border-slate-800 hover:border-gold-500/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-gold-900/10 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-800 p-3 rounded-lg group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                <FileText size={24} />
              </div>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2 group-hover:text-gold-400">{title}</h3>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/50">
              <span className="text-xs text-slate-500">PDF • 2.4 MB</span>
              <button className="text-gold-500/80 hover:text-gold-400 flex items-center gap-1 text-sm font-medium">
                {t.resources.download} <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-[#06070a] text-white flex font-sans">
      <Sidebar />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-[#06070a]/90 backdrop-blur border-b border-slate-800 z-40 px-4 py-4 flex justify-between items-center">
        <span className="font-bold text-gold-500 tracking-wider">LEAGUE</span>
        <button onClick={onLogout}><LogOut size={20} className="text-slate-400" /></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 pl-0 md:pl-24 p-6 md:p-10 pt-20 md:pt-10 min-h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1c29] via-[#06070a] to-[#06070a]">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'resources' && <ResourcesView />}
          {activeTab === 'dues' && <div className="flex items-center justify-center h-[50vh] text-slate-600">Dues Module Placeholder</div>}
          {activeTab === 'profile' && <div className="flex items-center justify-center h-[50vh] text-slate-600">Profile Module Placeholder</div>}
        </div>
      </main>
    </div>
  );
};