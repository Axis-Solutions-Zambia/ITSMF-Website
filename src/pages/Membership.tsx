import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
import { PageSkeleton } from '@/src/components/PageSkeleton';
import { useState, useEffect, useRef } from 'react';

function GravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let mouse = { x: -1000, y: -1000, radius: 150 };
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles();
      }
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x += directionX;
          this.y += directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      if (!canvas) return;
      const numberOfParticles = (canvas.width * canvas.height) / 6000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const parent = canvas.parentElement;
    const handleMouseMove = (e: MouseEvent) => {
      if (parent) {
        const rect = parent.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      resize();
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
    />
  );
}

function TypewriterText({ line1, line2 }: { line1: string, line2: string }) {
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [isLine1Done, setIsLine1Done] = useState(false);

  useEffect(() => {
    setDisplayedLine1('');
    setDisplayedLine2('');
    setIsLine1Done(false);
  }, [line1, line2]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayedLine1.length < line1.length) {
      timeout = setTimeout(() => {
        setDisplayedLine1(line1.slice(0, displayedLine1.length + 1));
      }, 70);
    } else {
      setIsLine1Done(true);
      if (displayedLine2.length < line2.length) {
        timeout = setTimeout(() => {
          setDisplayedLine2(line2.slice(0, displayedLine2.length + 1));
        }, 70);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedLine1, displayedLine2, line1, line2]);

  return (
    <>
      <span>{displayedLine1}</span>
      {!isLine1Done && <span className="animate-pulse border-r-4 border-brand-accent inline-block h-[0.9em] ml-2 translate-y-1"></span>}
      {isLine1Done && <br />}
      <span className="text-brand-text">{displayedLine2}</span>
      {isLine1Done && <span className="animate-pulse border-r-4 border-brand-accent inline-block h-[0.9em] ml-2 translate-y-1"></span>}
    </>
  );
}

// ─── Default content (Firestore fallback) ────────────────────────────────────
const HERO_DEFAULTS = {
  headline_line1: 'JOIN THE',
  headline_line2: 'PRACTICE',
  body: 'itSMF Zambia offers three membership tiers designed for individual career growth, corporate service maturity, and student foundational learning.'
};

const BENEFITS_DEFAULTS = {
  headline: 'MEMBER BENEFITS.',
  benefits: [
    { title: 'KNOWLEDGE SHARING', desc: 'Exchange practical service management experience with peers in Zambia.' },
    { title: 'PROFESSIONAL DEVELOPMENT', desc: 'Explore learning opportunities and guidance on service management qualifications.' },
    { title: 'COMMUNITY CONNECTIONS', desc: 'Connect with professionals interested in improving IT services.' }
  ],
  quote: '',
  cite: ''
};

const TIERS_DEFAULTS = {
  headline: 'CATEGORIES.',
  subtitle: 'Contact us for founding membership rates and current benefits',
  tiers: [
    { tier: 'Individual', price: 'Contact us', desc: 'For practitioners developing their service management skills and professional network.', features: 'Knowledge sharing\nCommunity participation' },
    { tier: 'Corporate', price: 'Contact us', desc: 'For organisations supporting service management development across their teams.', features: 'Team learning opportunities\nProfessional connections' },
    { tier: 'Student', price: 'Contact us', desc: 'For students building a foundation in service management.', features: 'Peer learning\nProfessional development guidance' }
  ]
};

const CORPORATE_DEFAULTS = {
  headline_line1: 'CORPORATE',
  headline_line2: 'VALUE',
  value_props: [
    { title: 'Shared Learning', desc: 'Exchange practical ideas with other organisations.' },
    { title: 'Professional Community', desc: 'Build connections with service management practitioners in Zambia.' },
    { title: 'Team Development', desc: 'Discuss membership opportunities that support your team.' }
  ],
  box_headline: 'MEMBERSHIP ENQUIRY',
  box_desc: 'Contact us to discuss corporate membership, current benefits and founding membership rates.',
  email: 'hello@itsmf.org.zm'
};

const FAQ_DEFAULTS = {
  headline: 'MEMBERSHIP FAQ.',
  faqs: [
    { q: 'How do I renew?', a: 'Contact us for current membership renewal details and rates.' },
    { q: 'Can I change tiers?', a: 'Contact us to discuss the membership category that best suits your needs.' },
    { q: 'Are certification exams included?', a: 'Certification exams and vouchers are not included in membership. Contact us for information about learning opportunities; training providers confirm their own fees and terms.' },
    { q: 'Who is eligible for Student membership?', a: 'Students in an ICT or business-related programme can contact us to confirm eligibility and the required documentation.' }
  ]
};

export default function Membership() {
  const { content: hero, loading: heroLoading } = usePageContent('membership', 'hero', HERO_DEFAULTS);
  const { content: benefits, loading: benefitsLoading } = usePageContent('membership', 'benefits', BENEFITS_DEFAULTS as any);
  const { content: tiers, loading: tiersLoading } = usePageContent('membership', 'tiers', TIERS_DEFAULTS as any);
  const { content: corporate, loading: corporateLoading } = usePageContent('membership', 'corporate', CORPORATE_DEFAULTS as any);
  const { content: faq, loading: faqLoading } = usePageContent('membership', 'faq', FAQ_DEFAULTS as any);

  const isLoading = heroLoading || benefitsLoading || tiersLoading || corporateLoading || faqLoading;

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div id="top" className="pt-20">
      {/* Hero */}
      <EditableSection pageId="membership" sectionId="hero">
<section id="why-join" className="bg-brand-dark py-16 md:py-32 border-b border-brand-text/5 relative overflow-hidden group">
        <GravityCanvas />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {(hero['_hide_headline_line1'] !== 'true' || hero['_hide_headline_line2'] !== 'true') && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-10 uppercase tracking-tighter italic">
                <TypewriterText
                  line1={hero['_hide_headline_line1'] !== 'true' ? String(hero.headline_line1) : ''}
                  line2={hero['_hide_headline_line2'] !== 'true' ? hero.headline_line2 + '.' : ''}
                />
              </h1>
            )}
            {hero['_hide_body'] !== 'true' && <p className="text-lg text-brand-muted max-w-2xl leading-relaxed">{String(hero.body)}</p>}
            <Link to="/enquire?type=membership" className="inline-flex items-center gap-2 mt-8 px-6 py-4 bg-brand-accent text-brand-dark font-bold">Enquire about membership <ArrowUpRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
      </section>
      </EditableSection>

      {/* Member Benefits */}
      <EditableSection pageId="membership" sectionId="benefits">
<section id="benefits" className="py-16 md:py-32 bg-brand-bg text-brand-text border-b border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              {benefits['_hide_headline'] !== 'true' && (
                <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">
                  {String(benefits.headline).split(' ').reduce<any[]>((acc, word, idx, arr) => {
                     return [...acc, word, idx === arr.length - 2 ? <br key={idx}/> : ' '];
                  }, [])}
                </h2>
              )}
              {benefits['_hide_benefits'] !== 'true' && (
                <div className="space-y-12">
                  {(benefits.benefits as unknown as any[]).map((benefit, i) => (
                    <div key={i} className="group relative">
                      <div className="absolute -left-6 top-0 w-1 h-full bg-brand-accent opacity-20 group-hover:opacity-100 transition-opacity"></div>
                      <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-4 italic leading-none">{benefit.title}</h4>
                      <p className="text-xs text-brand-muted uppercase font-bold leading-loose tracking-widest leading-relaxed pr-8">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {((benefits.quote && benefits['_hide_quote'] !== 'true') || (benefits.cite && benefits['_hide_cite'] !== 'true')) && (
              <div className="relative">
                <div className="aspect-[4/3] bg-brand-dark border border-brand-text/5 p-12 lg:p-20 flex flex-col justify-center">
                  {benefits['_hide_quote'] !== 'true' && (
                    <blockquote className="text-2xl font-black uppercase tracking-tighter italic font-serif leading-tight text-brand-text mb-8">
                      {benefits.quote}
                    </blockquote>
                  )}
                  {benefits['_hide_cite'] !== 'true' && <cite className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">{benefits.cite}</cite>}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Categories & Fees (Tiers) */}
      <EditableSection pageId="membership" sectionId="tiers">
<section id="tiers" className="py-16 md:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            {tiers['_hide_headline'] !== 'true' && <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">{tiers.headline}</h2>}
            {tiers['_hide_subtitle'] !== 'true' && <p className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em] mt-4">{tiers.subtitle}</p>}
          </div>
          {tiers['_hide_tiers'] !== 'true' && (
            <div id="apply" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-text/5 border border-brand-text/5">
              {(tiers.tiers as unknown as any[]).map((tier, i) => {
                const featuresList = (tier.features || '').split('\n').filter((f: string) => f.trim().length > 0);
                const highlight = tier.tier.toLowerCase() === 'corporate';
                return (
                  <div key={i} className={`bg-brand-dark p-12 lg:p-16 flex flex-col ${highlight ? 'border-t-4 lg:border-t-0 lg:border-l-4 border-brand-accent' : ''}`}>
                    <div className="mb-12">
                       <h3 className="text-xs font-black uppercase tracking-[0.4em] text-brand-accent mb-6 font-mono">{tier.tier} Tier</h3>
                       <div className="text-3xl font-bold mb-8 leading-tight">{tier.price}{/^\s*(?:ZMW\s*|K\s*)?\d[\d,]*(?:\.\d{1,2})?\s*$/i.test(tier.price || '') && <span className="text-xs font-black not-italic tracking-widest opacity-60 ml-2">/YR</span>}</div>
                       <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12 min-h-[60px]">{tier.desc}</p>
                    </div>
                    <ul className="space-y-6 mb-16 text-[10px] font-black uppercase tracking-widest leading-relaxed flex-grow">
                      {featuresList.map((f: string, j: number) => (
                        <li key={j} className="flex items-center space-x-3 text-brand-text opacity-70">
                          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0"></div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/enquire?type=membership" className={`block text-center w-full py-5 font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${
                      highlight ? 'bg-brand-accent text-brand-dark hover:bg-brand-text' : 'border border-brand-text/10 text-brand-text hover:border-brand-accent hover:text-brand-accent'
                    }`}>
                      JOIN NOW
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      </EditableSection>

      {/* Corporate Enquiry */}
      <EditableSection pageId="membership" sectionId="corporate">
<section id="corporate" className="py-16 md:py-32 bg-brand-bg overflow-hidden relative border-y border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              {(corporate['_hide_headline_line1'] !== 'true' || corporate['_hide_headline_line2'] !== 'true') && (
                <h2 className="text-3xl md:text-5xl font-black mb-12 italic text-brand-text uppercase">
                  {corporate['_hide_headline_line1'] !== 'true' && <>{corporate.headline_line1} <br/></>}
                  {corporate['_hide_headline_line2'] !== 'true' && corporate.headline_line2}
                </h2>
              )}
              {corporate['_hide_value_props'] !== 'true' && (
                <div className="space-y-12">
                  {(corporate.value_props as unknown as any[]).map((item, i) => (
                    <div key={i} className="accent-border p-1 group">
                      <div className="bg-brand-bg p-6 border border-brand-text/5 group-hover:border-brand-accent transition-all">
                        <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-2 italic">{item.title}</h4>
                        <p className="text-[11px] text-brand-muted uppercase tracking-widest font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {(corporate['_hide_box_headline'] !== 'true' || corporate['_hide_box_desc'] !== 'true' || corporate['_hide_email'] !== 'true') && (
              <div className="bg-brand-dark p-12 border border-brand-text/10 relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent"></div>
                {corporate['_hide_box_headline'] !== 'true' && <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">{corporate.box_headline}</h3>}
                {corporate['_hide_box_desc'] !== 'true' && (
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-12 leading-loose">
                    {corporate.box_desc}
                  </p>
                )}
                {corporate['_hide_email'] !== 'true' && (
                  <a href={`mailto:${corporate.email}`} className="text-xl font-bold text-brand-accent border-b-2 border-brand-accent inline-block pb-1 break-all hover:text-brand-text transition-all">{String(corporate.email)}</a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      </EditableSection>

      {/* FAQ */}
      <EditableSection pageId="membership" sectionId="faq">
<section id="faq" className="py-16 md:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {faq['_hide_headline'] !== 'true' && <h2 className="text-4xl font-black mb-16 uppercase tracking-tighter italic font-serif">{faq.headline}</h2>}
          {faq['_hide_faqs'] !== 'true' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-text/5 border border-brand-text/5">
              {(faq.faqs as unknown as any[]).map((f, i) => (
                <div key={i} className="bg-brand-dark p-12 border border-brand-text/5">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-brand-accent mb-4 italic leading-tight">{f.q}</h4>
                  <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest leading-loose">{f.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
