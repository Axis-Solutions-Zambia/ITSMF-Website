import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, Users, Calendar, FileText, Settings, 
  LogOut, LayoutDashboard, ChevronRight, Search, 
  Bell, Sun, Moon, Plus, ArrowUpRight, Download, MessageSquare
} from 'lucide-react';

import ContentManager from './admin/ContentManager';
import Messages from './admin/Messages';

// Mock Data
const METRICS = [
  { label: 'Total Members', value: '2,845', change: '+12%', isPositive: true },
  { label: 'Active Subscriptions', value: '1,420', change: '+5%', isPositive: true },
  { label: 'Pending Approvals', value: '34', change: '-2%', isPositive: false },
  { label: 'Event Registrations', value: '890', change: '+24%', isPositive: true },
];

const RECENT_ACTIVITY = [
  { user: 'Sarah Musonda', action: 'applied for Platinum Membership', time: '2 hours ago' },
  { user: 'Admin', action: 'published new whitepaper "Agile ITSM"', time: '4 hours ago' },
  { user: 'System', action: 'processed 45 subscription renewals', time: '5 hours ago' },
  { user: 'David Chanda', action: 'registered for Livingstone Summit 2026', time: 'Yesterday' },
];

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-bg p-12 shadow-2xl border border-brand-text/10 w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-brand-dark border-2 border-brand-accent flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-brand-accent" />
          </div>
          <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Restricted Access</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-center">COMMAND<br/>CENTER.</h1>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Admin ID</label>
            <input 
              type="text" 
              placeholder="SYS-ADMIN-01" 
              className="w-full px-4 py-4 bg-brand-dark border border-brand-text/10 text-xs font-black uppercase tracking-widest focus:border-brand-accent outline-none transition-all"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Master Key</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-4 bg-brand-dark border border-brand-text/10 text-xs font-black uppercase tracking-widest focus:border-brand-accent outline-none transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-8 bg-brand-accent text-brand-dark py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-text hover:text-brand-bg transition-all flex items-center justify-center"
          >
            INITIALIZE <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">SYSTEM <br />OVERVIEW.</h2>
          <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">Live metrics and recent activity across the platform.</p>
        </div>
        <button className="bg-brand-dark border border-brand-text/10 text-brand-text px-6 py-3 font-black text-[10px] uppercase tracking-[0.3em] hover:border-brand-accent transition-all flex items-center">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((metric, i) => (
          <div key={i} className="bg-brand-dark p-8 border border-brand-text/5 hover:border-brand-accent/50 transition-all group">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-6">{metric.label}</div>
            <div className="text-4xl font-black tracking-tighter mb-2">{metric.value}</div>
            <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change} vs Last Month
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions & Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-brand-dark border border-brand-text/5 p-8">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-text/10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-accent">Active Campaigns & Events</h3>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand-accent transition-colors flex items-center">
                View All <ArrowUpRight className="ml-1 w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Livingstone Tech Summit 2026', status: 'Active', tickets: '450/500' },
                { name: 'ITIL Foundation Masterclass', status: 'Draft', tickets: '0/50' },
                { name: 'Q2 Executive Briefing', status: 'Active', tickets: '120/150' },
              ].map((event, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-brand-bg border border-brand-text/5 hover:border-brand-text/20 transition-all cursor-pointer">
                  <div className="mb-4 sm:mb-0">
                    <div className="text-xs font-black uppercase tracking-widest mb-1">{event.name}</div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted font-mono">Reg: {event.tickets}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest ${event.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-brand-text/10 text-brand-muted'}`}>
                      {event.status}
                    </span>
                    <button className="text-brand-muted hover:text-brand-text"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-8">
          <div className="bg-brand-dark border border-brand-text/5 p-8 h-full">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-accent mb-8 pb-4 border-b border-brand-text/10">Recent Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-text/10 before:to-transparent">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-brand-bg bg-brand-accent text-brand-dark shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-1/2 transform"></div>
                  {/* Card */}
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded bg-brand-bg border border-brand-text/5 ml-8 md:ml-0">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1">{activity.user}</div>
                    <div className="text-[9px] font-bold text-brand-muted mb-2 leading-relaxed">{activity.action}</div>
                    <div className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-brand-accent/60">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Sync theme with global state for the admin view
    const isDarkStored = localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkStored);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Calendar, label: 'Events', path: '/admin/events' },
    { icon: Users, label: 'Members', path: '/admin/members' },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row font-sans text-brand-text transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-dark border-r border-brand-text/5 flex flex-col z-20">
        <div className="p-6 border-b border-brand-text/5">
          <Link to="/" className="flex items-center" title="Return to Main Site">
            <ShieldCheck className="w-8 h-8 text-brand-accent mr-3" />
            <div>
              <div className="text-sm font-black tracking-tighter uppercase leading-none">itSMF Zambia</div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-muted mt-1">Admin Portal</div>
            </div>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${
                  isActive 
                    ? 'bg-brand-accent/10 text-brand-accent' 
                    : 'text-brand-muted hover:bg-brand-text/5 hover:text-brand-text'
                }`}
              >
                <item.icon className={`w-4 h-4 mr-4 ${isActive ? 'text-brand-accent' : 'group-hover:text-brand-text'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-brand-text/5">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4 mr-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-brand-bg/95 backdrop-blur-xl border-b border-brand-text/5 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center bg-brand-dark border border-brand-text/10 px-4 py-2 w-64 focus-within:border-brand-accent transition-colors">
            <Search className="w-4 h-4 text-brand-muted mr-3" />
            <input 
              type="text" 
              placeholder="SEARCH..." 
              className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full text-brand-text placeholder-brand-muted/50"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-brand-muted hover:text-brand-accent transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={toggleTheme}
              className="text-brand-muted hover:text-brand-accent transition-colors p-1"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-px h-8 bg-brand-text/10"></div>
            <div className="flex items-center cursor-pointer group">
              <div className="w-8 h-8 bg-brand-accent text-brand-dark flex items-center justify-center font-black text-xs mr-3">
                SA
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-brand-accent transition-colors">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-grow p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/events" element={<div className="p-8 border border-brand-text/10 border-dashed text-center text-brand-muted font-black uppercase tracking-[0.3em] text-xs">Events Management Module (Placeholder)</div>} />
                <Route path="/members" element={<div className="p-8 border border-brand-text/10 border-dashed text-center text-brand-muted font-black uppercase tracking-[0.3em] text-xs">Member Directory Module (Placeholder)</div>} />
                <Route path="/content/*" element={<ContentManager />} />
                <Route path="/settings" element={<div className="p-8 border border-brand-text/10 border-dashed text-center text-brand-muted font-black uppercase tracking-[0.3em] text-xs">System Settings (Placeholder)</div>} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
