import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Globe, LogIn, Sun, Moon } from 'lucide-react';

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
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && document.documentElement.classList.contains('dark'));
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'teal': return 'hover:text-teal-400 active-teal';
      case 'purple': return 'hover:text-purple-400 active-purple';
      case 'coral': return 'hover:text-coral-400 active-coral';
      default: return '';
    }
  };

  const getActiveBorder = (href: string, category: string) => {
    const path = location.pathname;
    const baseHref = href.split('#')[0];
    if (path === baseHref || (baseHref !== '/' && path.startsWith(baseHref))) {
      switch (category) {
        case 'teal': return 'border-b-2 border-teal-400';
        case 'purple': return 'border-b-2 border-purple-400';
        case 'coral': return 'border-b-2 border-[#F87171]';
        default: return 'border-b-2 border-brand-accent';
      }
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || hoveredLink ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-text/10 py-4' : 'bg-transparent py-8'
      }`}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center active:scale-95 transition-transform">
            <img src="https://i.postimg.cc/639Tm3L7/itzambialogo.png" alt="itSMF Zambia Logo" className="h-12 w-auto logo-light" />
            <img src="https://i.postimg.cc/kGSpknyY/itzambialogo-i.png" alt="itSMF Zambia Logo" className="h-12 w-auto logo-dark" />
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
                  className={`nav-link pb-1 transition-all text-[11px] font-black uppercase tracking-widest ${getCategoryColor(link.category)} ${getActiveBorder(link.href, link.category)} ${
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
                    ? 'bg-[#F87171] border-[#F87171] text-brand-dark' 
                    : 'border-[#F87171] text-[#F87171] hover:bg-[#F87171] hover:text-brand-bg'
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

      {/* Mega Dropdown */}
      <AnimatePresence>
        {hoveredLink && NAV_LINKS.find(l => l.name === hoveredLink)?.children && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-2xl border-b border-brand-text/10 pt-12 pb-20 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1">
                  <h3 className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em] mb-8 opacity-40">CHAPTER OVERVIEW</h3>
                  <p className="text-brand-muted text-sm uppercase font-bold tracking-widest leading-loose">
                    Discover our governance, international alignment, and the vision driving ICT service excellence in the Republic.
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
                  {NAV_LINKS.find(l => l.name === hoveredLink)?.children?.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="group flex flex-col"
                      onClick={() => setHoveredLink(null)}
                    >
                      <span className="text-brand-text text-lg font-bold uppercase tracking-tighter group-hover:text-brand-accent transition-colors">
                        {child.name}
                      </span>
                      <div className="h-px w-0 group-hover:w-full bg-brand-accent transition-all duration-500 mt-1 opacity-20"></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-brand-text/10 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-8 space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <Link
                    to={link.href}
                    className={`block py-4 text-xs font-black uppercase tracking-widest transition-colors border-b border-brand-text/5 ${
                      link.category === 'teal' ? 'hover:text-teal-400' : 'hover:text-purple-400'
                    } ${location.pathname === link.href ? (link.category === 'teal' ? 'text-teal-400' : 'text-purple-400') : 'text-brand-text'}`}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="pl-4 border-l border-brand-text/10 mt-2 space-y-3 pb-4">
                      {link.children.map(child => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] hover:text-brand-accent"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  to="/portal"
                  className="block text-center px-6 py-4 border border-[#F87171] text-[#F87171] text-xs font-black uppercase tracking-tighter hover:bg-[#F87171] hover:text-brand-bg transition-all"
                >
                  Member Portal Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-text/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-8">
              <img src="https://i.postimg.cc/639Tm3L7/itzambialogo.png" alt="itSMF Zambia Logo" className="h-16 w-auto logo-light" />
              <img src="https://i.postimg.cc/kGSpknyY/itzambialogo-i.png" alt="itSMF Zambia Logo" className="h-16 w-auto logo-dark" />
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
