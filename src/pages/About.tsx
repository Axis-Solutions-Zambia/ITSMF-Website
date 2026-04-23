import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Globe, Shield, Scale, Users, Building, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BOARD_MEMBERS = [
  { name: 'Dr. Chisenga', role: 'Chairperson', org: 'ICT Authority' },
  { name: 'Sarah Phiri', role: 'Vice-Chair', org: 'FinTech Solutions' },
  { name: 'Michael Banda', role: 'Secretary', org: 'National Bank' },
  { name: 'Kelvin Mwansa', role: 'Treasurer', org: 'Global Audit' }
];

export default function About() {
  return (
    <div id="top" className="pt-20">
      {/* Hero */}
      <section id="story" className="bg-brand-dark py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-[8vw] font-black leading-[0.8] mb-10 uppercase tracking-tighter italic">OUR <br /><span className="text-transparent text-stroke">GENESIS</span>.</h1>
            <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
              itSMF Zambia is the leading professional body for Service Management, fostering excellence across the Republic since 2018.
            </p>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 text-[20vw] font-black text-white/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          STORY
        </div>
      </section>

      {/* Detail Sections Navigation (Simulated Children) */}
      <section className="py-24 bg-brand-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-4 border border-white/5 p-4 uppercase font-black text-[9px] tracking-widest text-brand-muted">
            <a href="#vision" className="hover:text-brand-accent transition-colors">Vision-Values</a>
            <span className="opacity-20">//</span>
            <a href="#board" className="hover:text-brand-accent transition-colors">Board</a>
            <span className="opacity-20">//</span>
            <a href="#advisory" className="hover:text-brand-accent transition-colors">Advisory</a>
            <span className="opacity-20">//</span>
            <a href="#governance" className="hover:text-brand-accent transition-colors">Governance</a>
            <span className="opacity-20">//</span>
            <a href="#intl" className="hover:text-brand-accent transition-colors">International</a>
            <span className="opacity-20">//</span>
            <a href="#reports" className="hover:text-brand-accent transition-colors">Reports</a>
            <span className="opacity-20">//</span>
            <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section id="vision" className="py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">VISION & <br />CORE VALUES.</h2>
              <div className="space-y-12">
                <div>
                  <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] mb-4">The Vision</h4>
                  <p className="text-xs text-brand-muted uppercase font-bold leading-loose tracking-widest decoration-white/10 underline underline-offset-4">To be the primary catalyst for IT Service Management maturity in Zambia, driving sustainable digital growth.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['Integrity', 'Excellence', 'Collaboration', 'Innovation'].map(val => (
                    <div key={val} className="p-6 border border-white/5 bg-brand-dark flex items-center space-x-4">
                      <div className="w-1.5 h-1.5 bg-brand-accent"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-brand-dark p-12 border border-white/5 relative">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] mb-8 italic">The Mission</h4>
              <p className="text-sm font-black uppercase tracking-widest leading-loose italic font-serif">
                "Empowering IT professionals through certification pathways, structured mentorship, and international alignment to global ITSM standards."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section id="board" className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-end mb-24 border-l-4 border-brand-accent pl-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic font-serif leading-none">THE BOARD.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {BOARD_MEMBERS.map((member, i) => (
              <div key={i} className="bg-brand-dark p-8 group relative overflow-hidden">
                <div className="aspect-[4/5] bg-brand-bg rounded-none mb-6 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 border border-white/5"></div>
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">{member.name}</h4>
                <p className="text-brand-accent font-black text-[10px] uppercase tracking-[0.2em] mb-4">{member.role}</p>
                <p className="text-[9px] text-brand-muted font-bold uppercase tracking-widest leading-none">{member.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory & Governance */}
      <section id="advisory" className="py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif">ADVISORY <br />COMMITTEE.</h2>
              <p className="text-xs text-brand-muted uppercase font-bold tracking-widest leading-loose mb-12">
                A non-voting body comprising industry veterans providing strategic oversight and mentorship to the board.
              </p>
              <div className="space-y-4">
                {[
                  'Permanent Secretary (Ministry of Technology)',
                  'CEO (National Digital Agency)',
                  'Regional Director (UNDP ICT)',
                  'Dean of IT (University of Zambia)'
                ].map(advisor => (
                  <div key={advisor} className="p-6 bg-brand-dark border-r-2 border-brand-accent text-[9px] font-black uppercase tracking-[0.2em]">
                    {advisor}
                  </div>
                ))}
              </div>
            </div>
            <div id="governance">
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif">GOVERNANCE.</h2>
              <div className="bg-brand-dark p-12 border border-white/5 space-y-8">
                <div>
                  <h4 className="text-brand-accent font-black text-[10px] uppercase tracking-widest mb-2 font-mono">Article 12: Elections</h4>
                  <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-relaxed">
                    Elections are conducted biennially during the Annual General Meeting (AGM) to ensure continuity and fresh leadership perspectives.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-accent font-black text-[10px] uppercase tracking-widest mb-2 font-mono">Article 15: AGM Details</h4>
                  <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-relaxed">
                    AGMs are held held in Q1 of each fiscal year. All voting members (Individual & Corporate) are required to attend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International & Contact */}
      <section id="intl" className="py-32 bg-brand-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">Global Network</span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic font-serif leading-none mb-12">itSMF <br /><span className="text-transparent text-stroke italic">INTERNATIONAL</span>.</h2>
          <p className="max-w-2xl mx-auto text-xs text-brand-muted uppercase tracking-[0.2em] font-bold leading-loose mb-16">
            itSMF Zambia is a proud member of the itSMF International federation, providing our members with direct access to global thought leadership and cross-chapter collaboration.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {['UK', 'USA', 'Germany', 'Australia'].map(ch => (
              <div key={ch} className="p-8 bg-brand-dark text-xs font-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity">
                Chapter: {ch}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section id="reports" className="py-32 bg-brand-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif">ANNUAL <br />REPORTS.</h2>
            <p className="text-[10px] text-brand-muted uppercase font-black tracking-widest leading-loose max-w-sm text-right">
              Explore our commitment to transparency through yearly financial and impact audits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[2025, 2024, 2023].map(year => (
              <div key={year} className="p-8 border border-white/5 bg-brand-dark group cursor-pointer hover:border-brand-accent transition-all">
                <div className="flex justify-between items-start mb-12">
                   <span className="text-4xl font-black font-serif italic text-brand-accent">{year}</span>
                   <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-brand-accent transition-colors" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Annual Impact Report</h4>
                <p className="text-[9px] text-brand-muted uppercase font-bold tracking-widest">PDF // 12.4 MB</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
             <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif">CONTACT US.</h2>
             <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
               For secretariat inquiries, sponsorship proposals, or governance clarifications.
             </p>
             <div className="space-y-6 text-brand-text font-black text-xl uppercase tracking-tighter">
               <div className="border-b-2 border-brand-accent inline-block pb-1">secretariat@itsmf.zm</div>
               <br />
               <div className="border-b-2 border-brand-accent inline-block pb-1">+260 970 000 000</div>
             </div>
          </div>
          <div className="w-full md:w-96 bg-brand-accent p-12 text-brand-dark">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">PHYSICAL BASE</h4>
             <p className="text-xs font-black uppercase tracking-widest leading-loose">
               Innovation Hub, <br />
               Independence Avenue, <br />
               Lusaka, Zambia
             </p>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 text-[15vw] font-black text-white/5 uppercase select-none pointer-events-none -mb-10 ml-4">
          CONTACT
        </div>
      </section>
    </div>
  );
}
