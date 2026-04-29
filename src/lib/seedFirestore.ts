import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Default content for every page and section.
 * Call seedFirestore() once from the admin to bootstrap Firestore
 * with the current hardcoded site content.
 */
const SEED_DATA: Record<string, { title: string; path: string; status: string; sections: Record<string, Record<string, any>> }> = {
  home: {
    title: 'Home',
    path: '/',
    status: 'Published',
    sections: {
      hero: {
        headline_line1: 'Shaping',
        headline_line2: "Zambia's",
        headline_line3: 'Digital Future',
        mission_label: 'Our Mission',
        mission_text: '"To professionalize IT Service Management in Zambia through alignment with international standards and national digital transformation goals."',
        cta_primary_label: 'Join Chapter',
        cta_primary_url: '/membership',
        cta_secondary_label: 'View 2026 Summit',
        cta_secondary_url: '/events',
      },
      overview: {
        eyebrow: 'Foundations',
        headline: 'ACCELERATING SERVICE MATURITY.',
        body: 'As the authorized voice of ITSM in the Republic, we work at the intersection of international best practice and Zambian economic reality.',
        card_title: 'MEMBER DRIVEN',
        card_body: 'Governance is provided by a board elected directly by our corporate and individual members.',
        image_url: 'https://picsum.photos/seed/zambia-main/800/1000',
      },
      events: {
        event1_type: 'Summit',
        event1_title: 'National Conference Livingstone',
        event1_date: 'NOV 2026',
        event2_type: 'Workshop',
        event2_title: 'ITIL 4 Masterclass Lusaka',
        event2_date: 'JUNE 2026',
        event3_type: 'Webinar',
        event3_title: 'Future of ZNB Infrastructure',
        event3_date: 'MAY 2026',
      }
    }
  },
  about: {
    title: 'About',
    path: '/about',
    status: 'Published',
    sections: {
      top: { 
        headline_line1: 'OUR', 
        headline_line2: 'GENESIS', 
        body: 'itSMF Zambia is the leading professional body for Service Management, fostering excellence across the Republic since 2018.' 
      },
      vision: { 
        headline: 'VISION & CORE VALUES.', 
        vision_label: 'The Vision', 
        vision_text: 'To be the primary catalyst for IT Service Management maturity in Zambia, driving sustainable digital growth.', 
        mission_label: 'The Mission', 
        mission_text: '"Empowering IT professionals through certification pathways, structured mentorship, and international alignment to global ITSM standards."', 
        values: [
          { value: 'Integrity' },
          { value: 'Excellence' },
          { value: 'Collaboration' },
          { value: 'Innovation' }
        ] 
      },
      board: { 
        headline: 'THE BOARD.', 
        members: [
          { name: 'Dr. Chisenga', role: 'Chairperson', org: 'ICT Authority' },
          { name: 'Sarah Phiri', role: 'Vice-Chair', org: 'FinTech Solutions' },
          { name: 'Michael Banda', role: 'Secretary', org: 'National Bank' },
          { name: 'Kelvin Mwansa', role: 'Treasurer', org: 'Global Audit' }
        ] 
      },
      advisory: { 
        advisory_headline: 'ADVISORY COMMITTEE.', 
        advisory_intro: 'A non-voting body comprising industry veterans providing strategic oversight and mentorship to the board.', 
        advisors: [
          { title: 'Permanent Secretary (Ministry of Technology)' },
          { title: 'CEO (National Digital Agency)' },
          { title: 'Regional Director (UNDP ICT)' },
          { title: 'Dean of IT (University of Zambia)' }
        ],
        gov_headline: 'GOVERNANCE.', 
        gov_articles: [
          { title: 'Article 12: Elections', body: 'Elections are conducted biennially during the Annual General Meeting (AGM) to ensure continuity and fresh leadership perspectives.' },
          { title: 'Article 15: AGM Details', body: 'AGMs are held held in Q1 of each fiscal year. All voting members (Individual & Corporate) are required to attend.' }
        ]
      },
      intl: { 
        eyebrow: 'Global Network', 
        headline_line1: 'itSMF', 
        headline_line2: 'INTERNATIONAL', 
        body: 'itSMF Zambia is a proud member of the itSMF International federation, providing our members with direct access to global thought leadership and cross-chapter collaboration.', 
        chapters: [
          { name: 'UK' },
          { name: 'USA' },
          { name: 'Germany' },
          { name: 'Australia' }
        ] 
      },
      reports: { 
        headline: 'ANNUAL REPORTS.', 
        intro: 'Explore our commitment to transparency through yearly financial and impact audits.', 
        reports: [
          { year: '2025', title: 'Annual Impact Report', details: 'PDF // 12.4 MB' },
          { year: '2024', title: 'Annual Impact Report', details: 'PDF // 12.4 MB' },
          { year: '2023', title: 'Annual Impact Report', details: 'PDF // 12.4 MB' }
        ] 
      },
      contact: { 
        headline: 'CONTACT US.', 
        intro: 'For secretariat inquiries, sponsorship proposals, or governance clarifications.', 
        email: 'secretariat@itsmf.zm', 
        phone: '+260 970 000 000', 
        base_label: 'PHYSICAL BASE', 
        address: 'Innovation Hub,\nIndependence Avenue,\nLusaka, Zambia' 
      },
    }
  },
  membership: {
    title: 'Membership',
    path: '/membership',
    status: 'Published',
    sections: {
      hero: {
        headline_line1: 'JOIN THE',
        headline_line2: 'PRACTICE',
        body: 'itSMF Zambia offers three membership tiers designed for individual career growth, corporate service maturity, and student foundational learning.'
      },
      benefits: {
        headline: 'MEMBER BENEFITS.',
        benefits: [
          { title: 'INTERNATIONAL ALIGNMENT', desc: 'Direct participation in the global itSMF International community and ITIL working groups.' },
          { title: 'LOCAL CERTIFICATION', desc: 'Subsidized paths to ITIL Master and ISO/IEC 20000 Auditor certification within Lusaka.' },
          { title: 'GOVERNMENT NETWORKING', desc: 'Direct access to CIO roundtables involving the Ministry of Technology and Science.' }
        ],
        quote: '"Membership was the catalyst for our bank\'s 30% reduction in service downtime last year."',
        cite: 'Senior ITIL Lead // National Bank'
      },
      tiers: {
        headline: 'CATEGORIES.',
        subtitle: 'Transparent Pricing Schedules',
        tiers: [
          {
            tier: 'Individual',
            price: 'ZMW 800',
            desc: 'For single practitioners and ITIL practitioners looking for professional recognition.',
            features: 'Chapter voting rights\nAccess to gated resources\nMonthly webinar access'
          },
          {
            tier: 'Corporate',
            price: 'ZMW 6,000',
            desc: 'For organizations seeking to align full IT staff with itSMF international benchmarks.',
            features: '5 staff memberships\nRecruitment access\nBenchmarking Model priority'
          },
          {
            tier: 'Student',
            price: 'ZMW 300',
            desc: 'For undergraduate IT students building a foundation in service management.',
            features: 'Digital resources only\nMentorship matching\nStudent exam vouchers'
          }
        ]
      },
      corporate: {
        headline_line1: 'CORPORATE',
        headline_line2: 'VALUE',
        value_props: [
          { title: 'Global Recognition', desc: 'Direct mapping to itSMF International credentials.' },
          { title: 'Market Influence', desc: 'Shape the standards of the Zambian digital economy.' },
          { title: 'Member Portal', desc: 'Access to exclusive whitepapers and board archives.' }
        ],
        box_headline: 'ONBOARDING REQUEST',
        box_desc: 'Ready to professionalize your workforce? Connect with our Membership Registrar for executive-level onboarding.',
        email: 'registrar@itsmf.zm'
      },
      faq: {
        headline: 'MEMBERSHIP FAQ.',
        faqs: [
          { q: 'How do I renew?', a: 'Log in to the Member Portal using your chapter ID and click "Instant Renewal" in the Billing section.' },
          { q: 'Can I change tiers?', a: 'Yes, members can upgrade tiers at any time by paying the pro-rated difference in fees.' },
          { q: 'Are certification exams included?', a: 'Exam vouchers are included in Corporate and Student tiers. Individual members receive a 30% discount.' },
          { q: 'Who is eligible for Student Tier?', a: 'Full-time students in any ICT or Business relate degree program with a valid student ID.' }
        ]
      }
    }
  },
  events: {
    title: 'Events',
    path: '/events',
    status: 'Published',
    sections: {
      flagship: {
        eyebrow: 'November 2026',
        headline_line1: 'ANNUAL',
        headline_line2: 'SUMMIT',
        headline_line3: 'LIVINGSTONE',
        duration_label: 'Duration',
        duration_value: '24 — 26 Nov 2026',
        venue_label: 'Venue',
        venue_value: 'Avani Victoria Falls Resort',
        btn_label: 'Secure Delegate Pass'
      },
      calendar: {
        headline: 'CALENDAR.',
        events: [
          {
            title: 'ITSM Strategy Roundtable: Lusaka 2026',
            date: 'May 12, 2026',
            location: 'Taj Pamodzi, Lusaka',
            type: 'Roundtable',
            desc: 'An exclusive gathering for CIOs to discuss the impact of national AI policy on service delivery.',
            img: 'https://picsum.photos/seed/event1/600/400'
          },
          {
            title: 'ITIL 4 Foundation Fast-Track',
            date: 'June 4-6, 2026',
            location: 'Online Workshop',
            type: 'Workshop',
            desc: 'Intensive 3-day certification preparation led by accredited international trainers.',
            img: 'https://picsum.photos/seed/event2/600/400'
          },
          {
            title: 'Quarterly Member Webinar: ZNB Digital Core',
            date: 'July 15, 2026',
            location: 'Zoom Video Conference',
            type: 'Webinar',
            desc: 'Deep dive into the new ZNB digital architecture and ITSM integration points.',
            img: 'https://picsum.photos/seed/event3/600/400'
          }
        ]
      },
      sponsor: {
        headline: 'SPONSOR AN EVENT.',
        desc: "Strategic brand placement for organizations leading Zambia's tech agenda.",
        tiers: [
          {
            name: 'Bronze',
            price: 'ZMW 5,000',
            benefits: 'Logo on banners\nSocial media mention\n1 Delegate pass',
            color: 'bg-orange-400'
          },
          {
            name: 'Silver',
            price: 'ZMW 15,000',
            benefits: 'Exhibition space\n2 Delegate passes\nPresentation slot (10m)\nLogo on lanyards',
            color: 'bg-slate-400'
          },
          {
            name: 'Gold',
            price: 'ZMW 35,000',
            benefits: 'Prime exhibition spot\n5 Delegate passes\nKeynote slot (30m)\nFull-page program ad\nVIP Dinner access',
            color: 'bg-yellow-500'
          }
        ]
      },
      speakers: {
        headline_line1: 'CALL FOR',
        headline_line2: 'SPEAKERS.',
        desc: 'Share your expertise with the Zambian ITSM community. We are looking for practitioners to present on ITIL 4, ISO 20000, and AI Governance.',
        form_text: 'Submission Form 2026',
        policy_text: 'Speaker Compensation Policy',
        box_headline_line1: 'Elevate Your Practice',
        box_headline_line2: 'On The National Stage.',
        box_desc: 'itSMF Zambia speakers are globally recognized and receive full delegate access to our premium Livingstone summits.',
        btn_label: 'Register as Speaker'
      }
    }
  },
  resources: {
    title: 'Resources',
    path: '/resources',
    status: 'Published',
    sections: {
      hero: {
        eyebrow: 'Knowledge Repository',
        headline_line1: 'INTELLECTUAL',
        headline_line2: 'CAPITAL',
        body: 'Curated ITSM tools, regional benchmarks, and exclusive mentorship pathways for the Zambian tech elite.',
        watermark: 'ARCHIVE'
      },
      pathways: {
        headline: 'PATHWAYS.',
        paths: [
          { name: 'ITIL 4 Foundation', levels: 'Core Practitioner', time: '1-2 Months' },
          { name: 'ITIL Specialist', levels: 'Professional Strategic', time: '3-6 Months' },
          { name: 'ISO/IEC 20000', levels: 'Framework Lead', time: 'Fixed/Ongoing' },
          { name: 'VeriSM Specialist', levels: 'Active Management', time: '2-4 Months' }
        ]
      },
      blog: {
        headline: 'BLOG & ARTICLES',
        posts: [
          {
            title: 'Sustainable ITSM: The Green Frontier for ZNB Architecture',
            author: 'Isaac Banda',
            date: '12 MAR 2026',
            excerpt: 'Exploring how IT service frameworks can directly contribute to environmental sustainability goals in Zambia.'
          }
        ]
      },
      'thought-leadership': {
        headline: 'THOUGHT LEADERSHIP',
        posts: [
          {
            title: 'Beyond the Ticket: Human-Centric Service Design',
            author: 'Mary Kalinda',
            date: '28 FEB 2026',
            excerpt: 'Why empathy mapping is becoming the most critical tool for the modern Zambian service desk manager.'
          }
        ]
      },
      resources_list: {
        case_studies_headline: 'Featured Case Studies',
        whitepapers_headline: 'Whitepapers',
        resources: [
          {
            title: 'The Zambia ITSM Roadmap 2026',
            type: 'Guide',
            category: 'Certification',
            desc: 'A comprehensive pathway for IT professionals aligning with National Digital Strategy.'
          },
          {
            title: 'Incident Management in Banking',
            type: 'Case Study',
            category: 'Zambian Context',
            desc: 'How a leading commercial bank reduced downtime by 40% using ITIL v4 principles.'
          }
        ]
      },
      fellowship: {
        headline: 'FELLOWSHIP',
        desc: 'Connect with the veterans of the industry. Direct pathways to mentorship.',
        btn_label: 'Apply to Program'
      },
      vault: {
        glossary_headline: 'ITSM GLOSSARY.',
        glossary_desc: "Master the terminology of modern service management. From 'SLA' to 'Value Stream'.",
        glossary_btn: 'Open Dictionary',
        videos_headline: 'VIDEO LIBRARY.',
        videos_desc: 'Workshop recordings, webinars, and technical deep-dives from our international summits.',
        videos_btn: 'Browse media',
        newsletters_headline: 'NEWSLETTERS.',
        newsletters_desc: "The chapter's monthly intelligence briefing archive dating back to 2018.",
        newsletters_btn: 'Access Archive'
      },
      governance: {
        reports_headline: 'ANNUAL REPORTS.',
        reports_years: [
          { year: '2025' },
          { year: '2024' },
          { year: '2023' },
          { year: '2022' }
        ],
        bylaws_headline: 'CHAPTER BYLAWS.',
        bylaws_desc: 'Our governance framework regulates all member activities, ethical standards, and professional conduct across the chapter.',
        bylaws_docs: [
          { title: 'Code of Ethics 2026.PDF' },
          { title: 'Chapter Constitution v2.PDF' }
        ]
      }
    }
  },
  partners: {
    title: 'Partners',
    path: '/partners',
    status: 'Published',
    sections: {
      hero: {
        headline_line1: 'ALLIED',
        headline_line2: 'ECOSYSTEMS.',
        body: 'Strategic alignment with governance bodies, international standards, and private sector innovators.',
        watermark: 'SYSTEM'
      },
      categories: {
        categories_list: [
          {
            title: 'Training Partners (ATOs)',
            desc: 'Accredited organizations authorized to deliver official itSMF training and certifications.',
            partners: 'Exemplar Global\nPeopleCert\nAPMG International\nITSM Academy'
          },
          {
            title: 'Strategic Government & NGOs',
            desc: 'Institutional allies driving national policy and cross-sector digital transformation.',
            partners: 'Ministry of Technology\nZNBC\nUNDP Zambia\nGIZ Office Lusaka\nSMART Zambia'
          },
          {
            title: 'Corporate Sponsors',
            desc: 'Forward-thinking enterprises supporting the chapter through sustained investment.',
            partners: 'ZRA\nLiquid Intelligent\nAirtel Business\nStandard Chartered'
          }
        ]
      },
      international: {
        headline_line1: 'SHARED',
        headline_line2: 'GLOBAL VISION.',
        body: 'As a chartered member of itSMF International, we benchmark against Global 500 standards, ensuring our local ecosystem operates at the highest technical maturity level.',
        points: [
          {
            title: 'Accredited Standing',
            desc: 'Formally audited and chartered by the International Secretariat.'
          },
          {
            title: 'Global Portability',
            desc: 'Membership recognized across all major itSMF Global Nodes.'
          }
        ],
        btn_label: 'Visit Global Site'
      },
      become: {
        headline_line1: 'READY TO',
        headline_line2: 'INFLUENCE?',
        desc: 'Whether you are an ATO looking to certify or a corporation seeking strategic placement.',
        contact_email: 'partners@itsmf.zm'
      }
    }
  },
  services: {
    title: 'Services',
    path: '/services',
    status: 'Published',
    sections: {
      hero: {
        headline_line1: 'ELEVATING',
        headline_line2: 'STANDARDS.',
        body: 'Professional services designed to professionalize the Zambian ICT workforce and align local industry with global benchmarks.',
        watermark: 'OFFERING'
      },
      benchmarking: {
        eyebrow: 'Strategic Initiative',
        headline_line1: 'ITIL PERFORMANCE',
        headline_line2: 'BENCHMARKING.',
        body: 'The primary tool for measuring your organizational IT maturity against national and international peers.',
        btn_label: 'ENTER THE MODEL',
        year_watermark: '2026'
      },
      directory: {
        services_list: [
          {
            title: 'Certification Pathways',
            desc: 'Official itSMF-recognized pathways for ITIL 4, ISO/IEC 20000, and VeriSM certifications in Zambia.',
            category: 'Education'
          },
          {
            title: 'Community Education',
            desc: 'Free and subsidized monthly webinars and technical workshops for local practitioners.',
            category: 'Advocacy'
          },
          {
            title: 'ITSM Consultancy',
            desc: 'Strategic advisory for organizations looking to implement or refine their service management frameworks.',
            category: 'Consultancy'
          },
          {
            title: 'Mentorship Programme',
            desc: 'Connecting early-career professionals with industry veterans for structured career guidance.',
            category: 'Development'
          },
          {
            title: 'ATO Partner Directory',
            desc: 'Find Accredited Training Organizations authorized to deliver itSMF courses in Zambia.',
            category: 'Network'
          }
        ]
      },
      become: {
        headline: 'BECOME A PROVIDER.',
        desc: 'Are you an ATO or consultancy looking to be listed in our official services directory?',
        contact_email: 'strategic.partnerships@itsmf.zm'
      }
    }
  },
  portal: {
    title: 'Member Portal',
    path: '/portal',
    status: 'Published',
    sections: {
      auth: {
        eyebrow: 'Authorization Required',
        headline_line1: 'MEMBER',
        headline_line2: 'GATEWAY.',
        desc: 'Enter your credentials to access the itSMF Zambia intellectual assets.',
        btn_label: 'AUTHENTICATE',
        notice: 'Unauthorized access is logged.',
        cta_label: 'Apply for Tier'
      },
      dashboard: {
        status: 'STATUS: VALIDATED',
        welcome_line1: 'WELCOME BACK,',
        welcome_line2: 'PRACTITIONER.',
        terminate_btn: 'TERMINATE SESSION'
      },
      archives: {
        headline: 'Premium Archives',
        documents: [
          { title: 'ITIL 4 Implementation Toolkit', type: 'ZIP Archive', size: '25 MB' },
          { title: 'Service Desk SLA Templates', type: 'DOCX', size: '1.2 MB' },
          { title: 'National IT Governance Policy 2026', type: 'PDF', size: '5 MB' },
          { title: 'Agile ITSM Whitepaper', type: 'PDF', size: '2 MB' }
        ]
      },
      briefing: {
        headline: 'Executive Briefing',
        month: 'APR',
        day: '28',
        title: 'QUARTERLY OBSERVER SESSION',
        desc: 'Chapter leadership session on strategic maturity and fiscal pathways for 2026.',
        btn_label: 'REGISTER'
      },
      status: {
        headline: 'CERTIFIED STATUS',
        type: 'INDIVIDUAL',
        tier: 'Tier: Platinum Practitioner',
        fields: [
          { label: 'CHAPTER ID', value: 'ZM-2026-0042' },
          { label: 'MATURITY POINTS', value: '1,240 CPD' }
        ]
      },
      itinerary: {
        headline: 'Active Itinerary',
        events: [
          { text: 'LIVINGSTONE SUMMIT 2026 // DELEGATE PASS CONFIRMED' }
        ],
        footer_text: 'No further actions required at this time.'
      }
    }
  }
};

/** 
 * Seeds Firestore with the default site content.
 * Safe to run multiple times — uses setDoc with merge so it won't overwrite
 * fields that have already been edited.
 */
export async function seedFirestore(): Promise<void> {
  const writes: Promise<void>[] = [];

  for (const [pageId, pageData] of Object.entries(SEED_DATA)) {
    // Write the page metadata doc
    writes.push(
      setDoc(
        doc(db, 'pages', pageId),
        {
          title: pageData.title,
          path: pageData.path,
          status: pageData.status,
          lastEdited: serverTimestamp(),
        },
        { merge: true }
      )
    );

    // Write each section doc under pages/{pageId}/sections/{sectionId}
    for (const [sectionId, sectionContent] of Object.entries(pageData.sections)) {
      writes.push(
        setDoc(
          doc(db, 'pages', pageId, 'sections', sectionId),
          { content: sectionContent },
          { merge: true }
        )
      );
    }
  }

  await Promise.all(writes);
}
