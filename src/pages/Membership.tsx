import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Membership() {
  return (
    <div id="top" className="pt-20">
      {/* Hero */}
      <section id="why-join" className="bg-brand-dark py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-[8vw] font-black leading-[0.8] mb-10 uppercase tracking-tighter italic">JOIN THE <br /><span className="text-transparent text-stroke italic">PRACTICE</span>.</h1>
            <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
              itSMF Zambia offers three membership tiers designed for individual career growth, corporate service maturity, and student foundational learning.
            </p>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 text-[10vw] font-black text-white/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          NETWORK
        </div>
      </section>

      {/* Member Benefits */}
      <section id="benefits" className="py-32 bg-brand-bg text-brand-text border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">MEMBER <br />BENEFITS.</h2>
              <div className="space-y-12">
                {[
                  { title: 'INTERNATIONAL ALIGNMENT', desc: 'Direct participation in the global itSMF International community and ITIL working groups.' },
                  { title: 'LOCAL CERTIFICATION', desc: 'Subsidized paths to ITIL Master and ISO/IEC 20000 Auditor certification within Lusaka.' },
                  { title: 'GOVERNMENT NETWORKING', desc: 'Direct access to CIO roundtables involving the Ministry of Technology and Science.' }
                ].map((benefit, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -left-6 top-0 w-1 h-full bg-brand-accent opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-4 italic leading-none">{benefit.title}</h4>
                    <p className="text-xs text-brand-muted uppercase font-bold leading-loose tracking-widest leading-relaxed pr-8">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-brand-dark border border-white/5 p-12 lg:p-20 flex flex-col justify-center">
                <blockquote className="text-2xl font-black uppercase tracking-tighter italic font-serif leading-tight text-white mb-8">
                  "Membership was the catalyst for our bank's 30% reduction in service downtime last year."
                </blockquote>
                <cite className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Senior ITIL Lead // National Bank</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Fees (Tiers) */}
      <section id="tiers" className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">CATEGORIES.</h2>
            <p className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em] mt-4">Transparent Pricing Schedules</p>
          </div>
          <div id="apply" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              {
                tier: 'Individual',
                price: 'ZMW 800',
                desc: 'For single practitioners and ITIL practitioners looking for professional recognition.',
                features: ['Chapter voting rights', 'Access to gated resources', 'Monthly webinar access']
              },
              {
                tier: 'Corporate',
                price: 'ZMW 6,000',
                desc: 'For organizations seeking to align full IT staff with itSMF international benchmarks.',
                features: ['5 staff memberships', 'Recruitment access', 'Benchmarking Model priority'],
                highlight: true
              },
              {
                tier: 'Student',
                price: 'ZMW 300',
                desc: 'For undergraduate IT students building a foundation in service management.',
                features: ['Digital resources only', 'Mentorship matching', 'Student exam vouchers']
              }
            ].map((tier, i) => (
              <div key={i} className={`bg-brand-dark p-12 lg:p-16 flex flex-col ${tier.highlight ? 'border-t-4 lg:border-t-0 lg:border-l-4 border-brand-accent' : ''}`}>
                <div className="mb-12">
                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-brand-accent mb-6 font-mono">{tier.tier} Tier</h3>
                   <div className="text-5xl font-black italic font-serif mb-8 leading-none tracking-tighter">{tier.price}<span className="text-xs font-black not-italic tracking-widest opacity-40 ml-2">/YR</span></div>
                   <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12 min-h-[60px]">{tier.desc}</p>
                </div>
                <ul className="space-y-6 mb-16 text-[10px] font-black uppercase tracking-widest leading-relaxed flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center space-x-3 text-brand-text opacity-70">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0"></div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${
                  tier.highlight ? 'bg-brand-accent text-brand-dark hover:bg-white' : 'border border-white/10 text-white hover:border-brand-accent hover:text-brand-accent'
                }`}>
                  JOIN NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Enquiry */}
      <section id="corporate" className="py-32 bg-brand-bg overflow-hidden relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-12 italic text-transparent text-stroke uppercase">CORPORATE <br/>VALUE</h2>
              <div className="space-y-12">
                {[
                  { title: 'Global Recognition', desc: 'Direct mapping to itSMF International credentials.' },
                  { title: 'Market Influence', desc: 'Shape the standards of the Zambian digital economy.' },
                  { title: 'Member Portal', desc: 'Access to exclusive whitepapers and board archives.' }
                ].map((item, i) => (
                  <div key={i} className="accent-border p-1 group">
                    <div className="bg-brand-bg p-6 border border-white/5 group-hover:border-brand-accent transition-all">
                      <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-2 italic">{item.title}</h4>
                      <p className="text-[11px] text-brand-muted uppercase tracking-widest font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-dark p-12 border border-white/10 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent"></div>
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">ONBOARDING REQUEST</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-12 leading-loose">
                Ready to professionalize your workforce? Connect with our Membership Registrar for executive-level onboarding.
              </p>
              <div className="text-xl font-black text-brand-accent border-b-2 border-brand-accent inline-block pb-1 cursor-pointer hover:text-white hover:border-white transition-all">
                registrar@itsmf.zm
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-4xl font-black mb-16 uppercase tracking-tighter italic font-serif">MEMBERSHIP FAQ.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {[
              { q: 'How do I renew?', a: 'Log in to the Member Portal using your chapter ID and click "Instant Renewal" in the Billing section.' },
              { q: 'Can I change tiers?', a: 'Yes, members can upgrade tiers at any time by paying the pro-rated difference in fees.' },
              { q: 'Are certification exams included?', a: 'Exam vouchers are included in Corporate and Student tiers. Individual members receive a 30% discount.' },
              { q: 'Who is eligible for Student Tier?', a: 'Full-time students in any ICT or Business relate degree program with a valid student ID.' }
            ].map((faq, i) => (
              <div key={i} className="bg-brand-dark p-12 border border-white/5">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-brand-accent mb-4 italic leading-tight">{faq.q}</h4>
                <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest leading-loose">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
