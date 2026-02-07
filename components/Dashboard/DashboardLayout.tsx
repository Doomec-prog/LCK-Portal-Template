
import React, { useState, useRef, useEffect } from 'react';
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
  Bell,
  Play,
  Film,
  Camera,
  CheckCircle,
  Wifi,
  History,
  Map,
  Briefcase,
  Bot,
  Search,
  MapPin,
  Send,
  ShoppingBag,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { Button, Input } from '../UI';

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

      <nav className="flex-1 space-y-6 w-full flex flex-col items-center">
        {[
          { id: 'overview', icon: LayoutDashboard, label: t.nav.dashboard },
          { id: 'market', icon: Briefcase, label: t.nav.market },
          { id: 'locations', icon: Map, label: t.nav.locations },
          { id: 'ai', icon: Bot, label: t.nav.ai },
          { id: 'profile', icon: User, label: t.nav.profile },
          { id: 'dues', icon: CreditCard, label: t.nav.dues },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative group p-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-gold-500/10 text-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                : 'text-slate-500 hover:text-gold-400 hover:bg-slate-900'
            }`}
            title={item.label}
          >
            {activeTab === item.id && (
               <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-1 h-8 bg-gold-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
            )}
            <item.icon size={24} />
          </button>
        ))}
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

  // --- VIEWS ---

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
            icon={Briefcase}
            onClick={() => setActiveTab('market')}
         />
          <SmallWidget 
            title={t.widgets.legal.title}
            sub={t.widgets.legal.sub}
            mainText={t.widgets.legal.pending}
            icon={Bot}
            onClick={() => setActiveTab('ai')}
         />
          <SmallWidget 
            title={t.widgets.events.title}
            sub={t.widgets.events.sub}
            mainText={t.widgets.events.event}
            icon={Map}
            onClick={() => setActiveTab('locations')}
         />
      </div>
    </div>
  );

  // --- Marketplace View ---
  const MarketplaceView = () => {
    const mt = t.market;
    const [marketTab, setMarketTab] = useState('jobs');

    return (
      <div className="animate-fadeIn p-2 md:p-4 space-y-6">
        <h2 className="text-3xl font-bold text-white mb-2">{mt.title}</h2>
        
        {/* Market Tabs */}
        <div className="flex gap-4 border-b border-slate-800 pb-2 mb-6 overflow-x-auto">
          {[
            { id: 'jobs', label: mt.tabs.jobs, icon: Briefcase },
            { id: 'talent', label: mt.tabs.talent, icon: Users },
            { id: 'rental', label: mt.tabs.rental, icon: ShoppingBag }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMarketTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${marketTab === tab.id ? 'text-gold-500 border-b-2 border-gold-500' : 'text-slate-400 hover:text-white'}`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Mock Data based on active tab */}
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="bg-[#11131a] border border-slate-800 rounded-xl p-5 hover:border-gold-500/50 transition-all group cursor-pointer">
               <div className="flex justify-between items-start mb-4">
                 <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 font-bold uppercase tracking-wider border border-slate-700">
                   {marketTab === 'jobs' ? 'CREW CALL' : marketTab === 'rental' ? 'RENTAL' : 'TALENT'}
                 </span>
                 <span className="text-slate-500 text-xs">2h ago</span>
               </div>
               <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gold-400 transition-colors">
                 {marketTab === 'jobs' ? (i % 2 === 0 ? mt.cards.job1 : mt.cards.job2) :
                  marketTab === 'rental' ? (i % 2 === 0 ? mt.cards.gear1 : mt.cards.gear2) :
                  "Available for Projects"}
               </h3>
               <p className="text-slate-400 text-sm mb-4">
                 Almaty, Kazakhstan • Full Shift
               </p>
               <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                 <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
                    <User size={14} className="text-slate-400" />
                 </div>
                 <div className="text-xs">
                   <p className="text-white font-medium">Production House {i}</p>
                   <p className="text-gold-500 flex items-center gap-1"><ShieldCheck size={10} /> Verified Member</p>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // --- Locations View ---
  const LocationsView = () => {
    const lt = t.locations;
    return (
      <div className="animate-fadeIn p-2 md:p-4 h-[calc(100vh-100px)] flex flex-col">
        <div className="mb-6">
           <h2 className="text-3xl font-bold text-white mb-1">{lt.title}</h2>
           <p className="text-slate-400">{lt.subtitle}</p>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
           {/* Map Area (Simulated) */}
           <div className="lg:col-span-2 bg-[#0F111A] rounded-2xl border border-slate-800 relative overflow-hidden group">
             {/* Fake Map Image - Using a gradient and grid to simulate a tech map */}
             <div className="absolute inset-0 bg-[#0F111A]">
                {/* CSS Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.3)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                {/* Simulated Terrain using CSS Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e293b] to-slate-900 opacity-80"></div>
                {/* A glowing orb to represent Almaty */}
                <div className="absolute top-[60%] right-[30%] w-32 h-32 bg-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
             </div>
             
             {/* Pins */}
             <div className="absolute top-[60%] right-[30%] group/pin cursor-pointer">
                <MapPin size={32} className="text-gold-500 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-bounce" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900/90 px-3 py-1 rounded text-xs text-gold-500 border border-gold-500/30 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                   Almaty City
                </div>
             </div>
             <div className="absolute top-[40%] right-[20%] group/pin cursor-pointer">
                <MapPin size={24} className="text-slate-400 hover:text-gold-400 transition-colors" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 px-2 py-1 rounded text-xs text-white border border-slate-700 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                   Charyn Canyon
                </div>
             </div>
              <div className="absolute top-[50%] left-[40%] group/pin cursor-pointer">
                <MapPin size={24} className="text-slate-400 hover:text-gold-400 transition-colors" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 px-2 py-1 rounded text-xs text-white border border-slate-700 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                   Bozjyra Tract
                </div>
             </div>

             <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Coordinates</div>
                <div className="text-xs font-mono text-gold-500">43.2551° N, 76.9126° E</div>
             </div>
           </div>

           {/* Location List */}
           <div className="bg-[#11131a] border border-slate-800 rounded-2xl p-6 overflow-y-auto">
             <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">{lt.listHeader}</h3>
             <div className="space-y-4">
                {lt.places.map((place: any, i: number) => (
                  <div key={i} className="group cursor-pointer hover:bg-slate-800/50 p-3 rounded-lg transition-colors border border-transparent hover:border-gold-500/20">
                     <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white group-hover:text-gold-400">{place.name}</h4>
                        <span className="text-[10px] uppercase bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">{place.type}</span>
                     </div>
                     <p className="text-xs text-slate-500 mt-1 line-clamp-2">{place.desc}</p>
                     <div className="mt-2 flex items-center text-xs text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ChevronRight size={12} />
                     </div>
                  </div>
                ))}
             </div>
             <Button variant="outline" className="w-full mt-6 text-sm py-2">Suggest Location</Button>
           </div>
        </div>
      </div>
    );
  };

  // --- UPDATED: AI Lawyer View (Simulated Logic) ---
  const AILawyerView = () => {
     const at = t.ai;
     const [messages, setMessages] = useState([
        { role: 'ai', text: at.welcome }
     ]);
     const [inputValue, setInputValue] = useState('');
     const [isTyping, setIsTyping] = useState(false);
     const scrollRef = useRef<HTMLDivElement>(null);

     // Auto scroll
     useEffect(() => {
        if(scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
     }, [messages, isTyping]);

     const handleSend = (text: string = inputValue) => {
        if (!text.trim()) return;
        
        // Add user message
        setMessages(prev => [...prev, { role: 'user', text: text }]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI delay and response
        setTimeout(() => {
           setIsTyping(false);
           // Mock responses
           let response = "That is an excellent question. Based on the 2024 Law on Cinematography, you are eligible for a 30% tax rebate if your production budget exceeds 500 million KZT. Shall I draft a preliminary application?";
           if (text.includes("grant") || text.includes("грант")) {
              response = "For GSCP grants, the submission window opens on March 1st. You will need a detailed script, a production budget, and a letter of intent from a distributor.";
           } else if (text.includes("permit") || text.includes("разрешен")) {
              response = "Filming permits for public locations in Almaty typically take 5 business days. For the Charyn Canyon, you need a special ecological permit.";
           }

           setMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5s delay
     };

     return (
        <div className="animate-fadeIn p-2 md:p-4 h-[calc(100vh-100px)] flex flex-col max-w-5xl mx-auto">
           <div className="mb-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                 <Bot size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{at.title}</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">{at.subtitle}</p>
           </div>

           {/* Chat Window */}
           <div ref={scrollRef} className="flex-1 bg-[#0F111A] border border-slate-800 rounded-2xl p-6 overflow-y-auto mb-4 flex flex-col gap-4 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
              
              {messages.map((msg, i) => (
                 <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} max-w-3xl ${msg.role === 'user' ? 'self-end' : ''} z-10 animate-fadeIn`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-700 text-white'}`}>
                       {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                       msg.role === 'ai' 
                       ? 'bg-slate-900 border border-slate-700 text-slate-200' 
                       : 'bg-gold-500 text-slate-950 font-medium'
                    }`}>
                       {msg.text}
                    </div>
                 </div>
              ))}
              
              {isTyping && (
                 <div className="flex gap-4 max-w-3xl z-10 animate-fadeIn">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                       <Bot size={20} />
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center gap-2">
                       <Loader2 size={16} className="animate-spin text-indigo-400" />
                       <span className="text-xs text-slate-500">Processing legal database...</span>
                    </div>
                 </div>
              )}
           </div>

           {/* Input Area */}
           <div className="relative">
              <input 
                 type="text" 
                 placeholder={at.inputPlaceholder}
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 className="w-full bg-[#151720] border border-slate-700 rounded-xl pl-6 pr-14 py-4 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all shadow-xl"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-3 top-3 p-2 bg-gold-500 hover:bg-gold-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 rounded-lg transition-colors"
              >
                 <Send size={18} />
              </button>
           </div>
           
           <div className="mt-4 flex gap-2 justify-center flex-wrap">
              <button 
                 onClick={() => handleSend(at.exampleQ)}
                 disabled={isTyping}
                 className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors border border-slate-700"
              >
                 "{at.exampleQ}"
              </button>
           </div>
        </div>
     );
  };

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

  // --- Profile View (IMDb Pro Style) ---
  const ProfileView = () => {
    const pt = t.profile;
    const mockCredits = [
      { year: '2023', title: 'Midnight Echo', role: 'Director of Photography', type: 'Feature' },
      { year: '2022', title: 'The Last Train', role: 'Camera Operator', type: 'Short' },
      { year: '2021', title: 'Neon Dreams', role: 'DoP', type: 'Commercial' },
      { year: '2020', title: 'Silence', role: 'DoP', type: 'Feature' },
    ];

    return (
      <div className="animate-fadeIn p-2 md:p-4 space-y-8">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">{t.widgets.profile.title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Showreel Section */}
            <div className="bg-[#11131a] border border-slate-800 rounded-2xl overflow-hidden group">
               <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     <Film className="text-gold-500" size={20} /> {pt.headers.showreel}
                  </h3>
               </div>
               {/* Video Placeholder */}
               <div className="relative aspect-video bg-slate-900 w-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt="Showreel Cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <button className="w-16 h-16 bg-gold-500/90 hover:bg-gold-400 rounded-full flex items-center justify-center pl-1 text-slate-900 transition-all hover:scale-110 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                        <Play size={32} fill="currentColor" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Credits List */}
            <div className="bg-[#11131a] border border-slate-800 rounded-2xl overflow-hidden">
               <div className="p-6 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     <Clapperboard className="text-gold-500" size={20} /> {pt.headers.credits}
                  </h3>
               </div>
               <div>
                  <div className="grid grid-cols-12 px-6 py-3 bg-slate-900/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                     <div className="col-span-2">{pt.table.year}</div>
                     <div className="col-span-5">{pt.table.project}</div>
                     <div className="col-span-3">{pt.table.role}</div>
                     <div className="col-span-2 text-right">{pt.table.type}</div>
                  </div>
                  {mockCredits.map((credit, idx) => (
                     <div key={idx} className="grid grid-cols-12 px-6 py-4 border-b border-slate-800/50 hover:bg-white/5 transition-colors items-center text-sm">
                        <div className="col-span-2 text-gold-500 font-mono">{credit.year}</div>
                        <div className="col-span-5 font-medium text-white">{credit.title}</div>
                        <div className="col-span-3 text-slate-400">{credit.role}</div>
                        <div className="col-span-2 text-right">
                           <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">{credit.type}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

          </div>

          {/* Sidebar Info (Right Col) */}
          <div className="space-y-6">
             {/* Bio */}
             <div className="bg-[#11131a] border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{pt.headers.about}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                   {pt.mockBio}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                   <div>
                      <span className="block text-xs text-slate-500 uppercase">Location</span>
                      <span className="text-white text-sm">{userData.city}</span>
                   </div>
                   <div>
                      <span className="block text-xs text-slate-500 uppercase">Union Status</span>
                      <span className="text-gold-500 text-sm font-bold flex items-center gap-1"><CheckCircle size={12}/> Active</span>
                   </div>
                </div>
             </div>

             {/* Skills */}
             <div className="bg-[#11131a] border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                   <Camera className="text-gold-500" size={18} /> {pt.headers.skills}
                </h3>
                <div className="flex flex-wrap gap-2">
                   {pt.skills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-gold-500/50 hover:text-white transition-colors cursor-default">
                         {skill}
                      </span>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    );
  };

  // --- Dues View (Premium Banking Style) ---
  const DuesView = () => {
    const dt = t.dues;
    const transactions = [
       { date: '15 Jan 2024', desc: 'Annual Membership Fee 2024', amount: '$200.00', status: 'Completed' },
       { date: '15 Jan 2023', desc: 'Annual Membership Fee 2023', amount: '$200.00', status: 'Completed' },
       { date: '10 Nov 2022', desc: 'Legal Consultation Fee', amount: '$50.00', status: 'Completed' },
    ];

    return (
      <div className="animate-fadeIn p-2 md:p-4 space-y-8 max-w-5xl mx-auto">
         <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">{dt.title}</h2>
         
         <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* The Golden Card */}
            <div className="w-full lg:w-[420px] shrink-0">
               <div className="aspect-[1.586/1] rounded-2xl relative overflow-hidden shadow-2xl shadow-gold-900/30 group transition-transform hover:scale-[1.02] duration-500">
                  {/* Card Background (CSS Only) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d97706] via-[#fbbf24] to-[#78350f]"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 blur-3xl rounded-full"></div>
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between text-slate-900">
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                           {/* Chip */}
                           <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md border border-yellow-600/30 flex items-center justify-center overflow-hidden relative">
                              <div className="absolute w-[1px] h-full bg-black/10 left-1/3"></div>
                              <div className="absolute w-[1px] h-full bg-black/10 right-1/3"></div>
                              <div className="absolute h-[1px] w-full bg-black/10 top-1/3"></div>
                              <div className="absolute h-[1px] w-full bg-black/10 bottom-1/3"></div>
                           </div>
                           <Wifi size={20} className="text-slate-900/70 rotate-90" />
                        </div>
                        <span className="font-bold tracking-widest text-sm opacity-70">UNION ID</span>
                     </div>

                     <div className="text-center">
                        <div className="text-xl font-mono font-bold tracking-[0.2em] drop-shadow-sm opacity-90">9210 4567 8821</div>
                     </div>

                     <div className="flex justify-between items-end">
                        <div>
                           <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Member Name</div>
                           <div className="font-bold tracking-wide uppercase">{userData.fullName}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Valid Thru</div>
                           <div className="font-mono font-bold">12/25</div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="mt-6 bg-[#11131a] border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                     <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{dt.paidUntil}</p>
                     <p className="text-white font-bold text-lg">Dec 31, 2025</p>
                  </div>
                  <div className="text-right">
                     <div className="flex items-center gap-2 text-green-500 text-xs font-bold mb-1 justify-end">
                        <CheckCircle size={14} /> Active
                     </div>
                     <p className="text-slate-500 text-xs">{dt.autoRenew}</p>
                  </div>
               </div>
            </div>

            {/* Transaction History */}
            <div className="flex-1 w-full bg-[#11131a] border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full min-h-[400px]">
               <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     <History className="text-gold-500" size={20} /> {dt.history}
                  </h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-900/50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                           <th className="px-6 py-4">{dt.table.date}</th>
                           <th className="px-6 py-4">{dt.table.desc}</th>
                           <th className="px-6 py-4">{dt.table.amount}</th>
                           <th className="px-6 py-4 text-right">{dt.table.status}</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800/50">
                        {transactions.map((tr, i) => (
                           <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 text-sm text-slate-300 whitespace-nowrap">{tr.date}</td>
                              <td className="px-6 py-4 text-sm text-white font-medium">{tr.desc}</td>
                              <td className="px-6 py-4 text-sm text-white font-mono">{tr.amount}</td>
                              <td className="px-6 py-4 text-right">
                                 <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                                    {tr.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="mt-auto p-4 border-t border-slate-800 text-center">
                   <Button variant="ghost" className="text-xs">Load More</Button>
               </div>
            </div>

         </div>
      </div>
    );
  }

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
          {activeTab === 'market' && <MarketplaceView />}
          {activeTab === 'locations' && <LocationsView />}
          {activeTab === 'ai' && <AILawyerView />}
          {activeTab === 'resources' && <ResourcesView />}
          {activeTab === 'dues' && <DuesView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>
      </main>
    </div>
  );
};
