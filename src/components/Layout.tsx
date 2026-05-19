import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Globe, LogIn, Sun, Moon, Home, Info, Users, Calendar, Briefcase, Folder, Handshake, ChevronRight } from 'lucide-react';
import logo from '../assests/itsmf-logo-zm.png';
import logoDark from '../assests/itsmf-logo-zm_1.png';

const NAV_LINKS = [
  { name: 'Home', href: '/', category: 'teal' },
  { 
    name: 'About', 
    href: '/about', 
    category: 'purple',
    children: [
      { name: 'About itSMF Zambia', href: '/about#top' },
      { name: 'Vision, mission, values', href: '/about#vision' },
      { name: 'Our story', href: '/about#story' },
      { name: 'Board of Directors', href: '/about#board' },
      { name: 'Advisory Committee', href: '/about#advisory' },
      { name: 'Governance', href: '/about#governance' },
      { name: 'itSMF International', href: '/about#intl' },
      { name: 'Annual reports', href: '/about#reports' },
      { name: 'Contact us', href: '/about#contact' },
    ]
  },
  { 
    name: 'Membership', 
    href: '/membership', 
    category: 'purple',
    children: [
      { name: 'Why join', href: '/membership#why-join' },
      { name: 'Categories and fees', href: '/membership#tiers' },
      { name: 'Member benefits', href: '/membership#benefits' },
      { name: 'Join / Apply online', href: '/membership#apply' },
      { name: 'Corporate enquiry', href: '/membership#corporate' },
      { name: 'Member portal login', href: '/portal' },
      { name: 'FAQ', href: '/membership#faq' },
    ]
  },
  { 
    name: 'Events', 
    href: '/events', 
    category: 'purple',
    children: [
      { name: 'Upcoming events', href: '/events#calendar' },
      { name: 'Sponsor an event', href: '/events#sponsor' },
      { name: 'Call for speakers', href: '/events#speakers' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services', 
    category: 'purple',
    children: [
      { name: 'Certification pathways', href: '/services#certification-pathways' },
      { name: 'Community education', href: '/services#community-education' },
      { name: 'ITSM consultancy', href: '/services#itsm-consultancy' },
      { name: 'Mentorship programme', href: '/services#mentorship-programme' },
      { name: 'ITIL Benchmarking Model', href: '/services/benchmarking' },
      { name: 'ATO partner directory', href: '/services#ato-partner-directory' },
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources', 
    category: 'purple',
    children: [
      { name: 'Blog & articles', href: '/resources#blog' },
      { name: 'Thought leadership', href: '/resources#thought-leadership' },
      { name: 'Case studies', href: '/resources#case-studies' },
      { name: 'Whitepapers', href: '/resources#whitepapers' },
      { name: 'Certification guides', href: '/resources#certification-guides' },
      { name: 'ITSM glossary', href: '/resources#glossary' },
      { name: 'Video library', href: '/resources#videos' },
      { name: 'Newsletter archive', href: '/resources#newsletters' },
    ]
  },
  { 
    name: 'Partners', 
    href: '/partners', 
    category: 'purple',
    children: [
      { name: 'Partners overview', href: '/partners#overview' },
      { name: 'ATO directory', href: '/partners#atos' },
      { name: 'Corporate sponsors', href: '/partners#sponsors' },
      { name: 'Government & NGOs', href: '/partners#ngo' },
      { name: 'Become a partner', href: '/partners#become' },
    ]
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkStored);
    if (isDarkStored) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

  const getCategoryColor = () => {
    return 'hover:text-brand-accent';
  };

  const getActiveBorder = (href: string) => {
    const path = location.pathname;
    const baseHref = href.split('#')[0];
    if (path === baseHref || (baseHref !== '/' && path.startsWith(baseHref))) {
      return 'border-b-2 border-brand-accent';
    }
    return 'border-b-2 border-transparent';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHoveredLink(null);
  }, [location]);

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || hoveredLink ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-text/10 py-4' : 'bg-transparent py-8'
      }`}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center active:scale-95 transition-transform">
            <img src={logo} alt="itSMF Zambia Logo" className="h-12 w-auto logo-light" />
            <img src={logoDark} alt="itSMF Zambia Logo" className="h-12 w-auto logo-dark" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div 
                key={link.name} 
                className="relative flex items-center h-full"
                onMouseEnter={() => setHoveredLink(link.name)}
              >
                <Link
                  to={link.href}
                  className={`nav-link pb-1 transition-all text-[11px] font-black uppercase tracking-widest ${getCategoryColor()} ${getActiveBorder(link.href)} ${
                    location.pathname === link.href ? 'text-brand-text' : 'text-brand-text/60'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className="text-brand-text/60 hover:text-brand-accent transition-colors p-1"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to="/portal"
                className={`px-6 py-2 border transition-all text-[10px] font-black uppercase tracking-tighter ${
                  location.pathname.startsWith('/portal') 
                    ? 'bg-brand-accent border-brand-accent text-brand-dark' 
                    : 'border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-bg'
                }`}
              >
                Member Portal
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="text-brand-text hover:text-brand-accent p-2"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-text hover:text-brand-accent p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Compact Apple-style Dropdown */}
      <AnimatePresence>
        {hoveredLink && NAV_LINKS.find(l => l.name === hoveredLink)?.children && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 right-0 bg-brand-dark/97 backdrop-blur-2xl border-b border-brand-text/10 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
              <div className="grid grid-cols-2 gap-x-12 gap-y-0 max-w-sm">
                {NAV_LINKS.find(l => l.name === hoveredLink)?.children?.map((child) => (
                  <Link
                    key={child.name}
                    to={child.href}
                    className="group flex items-center gap-1 py-[7px] border-b border-brand-text/5 last:border-0"
                    onClick={() => setHoveredLink(null)}
                  >
                    <span className="text-[11px] font-semibold text-brand-text/70 group-hover:text-brand-accent transition-colors duration-150 tracking-wide leading-none">
                      {child.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

      {/* Mobile Sidebar Menu (Google Contacts Style) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 z-[60] bg-brand-dark/40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-[70] w-[80vw] max-w-sm bg-brand-bg shadow-2xl flex flex-col"
            >
              <div className="flex items-center p-4 pl-6 border-b border-brand-text/5 shrink-0">
                <span className="text-xl font-display font-black tracking-tight text-brand-text">itSMF Zambia</span>
              </div>
              
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                  
                  const getIcon = (name: string) => {
                    switch (name) {
                      case 'Home': return <Home className="w-5 h-5 mr-4" />;
                      case 'About': return <Info className="w-5 h-5 mr-4" />;
                      case 'Membership': return <Users className="w-5 h-5 mr-4" />;
                      case 'Events': return <Calendar className="w-5 h-5 mr-4" />;
                      case 'Services': return <Briefcase className="w-5 h-5 mr-4" />;
                      case 'Resources': return <Folder className="w-5 h-5 mr-4" />;
                      case 'Partners': return <Handshake className="w-5 h-5 mr-4" />;
                      default: return <ChevronRight className="w-5 h-5 mr-4" />;
                    }
                  };

                  return (
                    <div key={link.name} className="flex flex-col mb-2">
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-full transition-colors ${
                          isActive 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 font-bold' 
                            : 'text-brand-text hover:bg-brand-text/5 font-medium'
                        }`}
                      >
                        {getIcon(link.name)}
                        <span className="text-base">{link.name}</span>
                      </Link>
                      
                      {link.children && isActive && (
                        <div className="flex flex-col space-y-1 mt-1 pl-[3.25rem] pr-4 pb-2">
                          {link.children.map(child => (
                            <Link
                              key={child.name}
                              to={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 text-sm text-brand-muted hover:text-brand-text font-medium transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 shrink-0">
                <Link
                  to="/portal"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-3 bg-brand-accent text-brand-dark rounded-full text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Member Portal Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-text/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-8">
              <img src={logo} alt="itSMF Zambia Logo" className="h-16 w-auto logo-light" />
              <img src={logoDark} alt="itSMF Zambia Logo" className="h-16 w-auto logo-dark" />
            </Link>
            <p className="text-brand-muted max-w-sm text-sm uppercase tracking-wider font-bold leading-relaxed mb-8 opacity-80">
              Advancing IT Service Management and Digital Transformation across the Republic of Zambia.
            </p>
            <div className="flex space-x-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent/60">Strategic Partners</span>
              <div className="flex flex-wrap gap-4 opacity-50 font-black text-[10px] uppercase tracking-tighter">
                <span>Min of Tech</span>
                <span>UNDP</span>
                <span>itSMF-I</span>
                <span>GIZ</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-brand-accent">Information</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-brand-muted">
              <li><Link to="/about" className="hover:text-brand-text transition-colors">Vision & Mission</Link></li>
              <li><Link to="/membership" className="hover:text-brand-text transition-colors">Membership Fees</Link></li>
              <li><Link to="/events" className="hover:text-brand-text transition-colors">Conference 2026</Link></li>
              <li><Link to="/resources" className="hover:text-brand-text transition-colors">Certification Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-brand-accent">Connect</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-brand-muted">
              <li><a href="#" className="hover:text-brand-text transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand-text transition-colors">Twitter @itSMFZambia</a></li>
              <li><a href="#" className="hover:text-brand-text transition-colors">Secretariat Portal</a></li>
              <li><a href="#" className="hover:text-brand-text transition-colors">Contact Chapter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-brand-text/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-brand-muted/40">
          <p>© {new Date().getFullYear()} itSMF Zambia. Standardizing Service.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-text transition-colors">Ethics Code</a>
            <a href="#" className="hover:text-brand-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-text transition-colors">Bylaws</a>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 text-[10vw] font-black text-brand-text/5 uppercase select-none pointer-events-none -mb-4 mr-4">
        Zambia
      </div>
    </footer>
  );
}
