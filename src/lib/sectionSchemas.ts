/**
 * SECTION SCHEMAS
 * Defines the editable fields for each section across all pages.
 * Each field has: key (used as Firestore field name), label, type, and optional placeholder.
 */

export type FieldType = 'text' | 'textarea' | 'url' | 'email' | 'tel' | 'list' | 'image';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
  itemFields?: FieldDef[]; // Only used when type === 'list'
}

export interface SectionSchema {
  name: string;
  description?: string;
  fields: FieldDef[];
}

// Map of pageId -> sectionId -> SectionSchema
export const SECTION_SCHEMAS: Record<string, Record<string, SectionSchema>> = {

  // ─── HOME ───────────────────────────────────────────────────────────────────
  home: {
    hero: {
      name: 'Hero Section',
      description: 'The full-screen hero at the top of the homepage.',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text', placeholder: 'Shaping' },
        { key: 'headline_line2', label: 'Headline Line 2 (outline text)', type: 'text', placeholder: "Zambia's" },
        { key: 'headline_line3', label: 'Headline Line 3', type: 'text', placeholder: 'Digital Future' },
        { key: 'mission_label', label: 'Mission Label', type: 'text', placeholder: 'Our Mission' },
        { key: 'mission_text', label: 'Mission Statement', type: 'textarea', placeholder: '"To professionalize IT Service Management…"' },
        { key: 'cta_primary_label', label: 'Primary CTA Label', type: 'text', placeholder: 'Join Chapter' },
        { key: 'cta_primary_url', label: 'Primary CTA URL', type: 'text', placeholder: '/membership' },
        { key: 'cta_secondary_label', label: 'Secondary CTA Label', type: 'text', placeholder: 'View 2026 Summit' },
        { key: 'cta_secondary_url', label: 'Secondary CTA URL', type: 'text', placeholder: '/events' },
        { 
          key: 'stats', 
          label: 'Statistics', 
          type: 'list', 
          itemFields: [
            { key: 'value', label: 'Value', type: 'text', placeholder: '82%' },
            { key: 'label', label: 'Label', type: 'text', placeholder: 'Certification Gap' }
          ]
        }
      ]
    },
    hero_media: {
      name: 'Hero Marquee Images',
      description: 'Images that scroll in the background of the hero section.',
      fields: [
        { key: 'top_images', label: 'Top Row Images', type: 'list', itemFields: [
          { key: 'image', label: 'Image', type: 'image' }
        ] },
        { key: 'bottom_images', label: 'Bottom Row Images', type: 'list', itemFields: [
          { key: 'image', label: 'Image', type: 'image' }
        ] }
      ]
    },
    overview: {
      name: 'Chapter Overview',
      description: 'The two-column feature section beneath the hero.',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text', placeholder: 'Significant others.' },
        { 
          key: 'accordion_items', 
          label: 'Accordion Items', 
          type: 'list', 
          itemFields: [
            { key: 'title', label: 'Title', type: 'text', placeholder: 'iPhone and Mac' },
            { key: 'content', label: 'Content', type: 'textarea', placeholder: 'With iPhone Mirroring, you can view...' },
            { key: 'image', label: 'Image', type: 'image' }
          ]
        }
      ]
    },
    events: {
      name: 'Call to Events',
      description: 'The horizontal scrolling events carousel.',
      fields: [
        { 
          key: 'event_list', 
          label: 'Events List', 
          type: 'list', 
          itemFields: [
            { key: 'eyebrow', label: 'Eyebrow / Category', type: 'text', placeholder: 'Summit' },
            { key: 'title', label: 'Title', type: 'text', placeholder: 'National Conference' },
            { key: 'desc', label: 'Description', type: 'textarea', placeholder: 'Join us in Livingstone...' },
            { key: 'image', label: 'Image', type: 'image' },
            { key: 'link', label: 'Link URL', type: 'text', placeholder: '/events' }
          ]
        }
      ]
    }
  },

  // ─── ABOUT ──────────────────────────────────────────────────────────────────
  about: {
    top: {
      name: 'About itSMF Zambia (Hero)',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2 (outline text)', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
      ]
    },
    vision: {
      name: 'Vision, Mission, Values',
      fields: [
        { key: 'headline', label: 'Headline', type: 'text' },
        { key: 'vision_label', label: 'Vision Label', type: 'text' },
        { key: 'vision_text', label: 'Vision Statement', type: 'textarea' },
        { key: 'mission_label', label: 'Mission Label', type: 'text' },
        { key: 'mission_text', label: 'Mission Statement', type: 'textarea' },
        { key: 'values', label: 'Core Values', type: 'list', itemFields: [
          { key: 'value', label: 'Value', type: 'text' }
        ] },
      ]
    },
    board: {
      name: 'Board of Directors',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'members', label: 'Board Members', type: 'list', itemFields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'org', label: 'Organization', type: 'text' }
        ] },
      ]
    },
    advisory: {
      name: 'Advisory & Governance',
      fields: [
        { key: 'advisory_headline', label: 'Advisory Headline', type: 'text' },
        { key: 'advisory_intro', label: 'Advisory Intro Text', type: 'textarea' },
        { key: 'advisors', label: 'Advisors', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' }
        ] },
        { key: 'gov_headline', label: 'Governance Headline', type: 'text' },
        { key: 'gov_articles', label: 'Governance Articles', type: 'list', itemFields: [
          { key: 'title', label: 'Article Title', type: 'text' },
          { key: 'body', label: 'Article Body', type: 'textarea' }
        ] },
      ]
    },
    intl: {
      name: 'itSMF International',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
        { key: 'chapters', label: 'Global Chapters', type: 'list', itemFields: [
          { key: 'name', label: 'Country Name', type: 'text' }
        ] },
      ]
    },
    reports: {
      name: 'Annual Reports',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'intro', label: 'Intro Text', type: 'textarea' },
        { key: 'reports', label: 'Reports', type: 'list', itemFields: [
          { key: 'year', label: 'Year', type: 'text' },
          { key: 'title', label: 'Report Title', type: 'text' },
          { key: 'details', label: 'Details', type: 'text' }
        ] },
      ]
    },
    contact: {
      name: 'Contact Us',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'intro', label: 'Intro Text', type: 'textarea' },
        { key: 'email', label: 'Contact Email', type: 'email' },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'base_label', label: 'Location Label', type: 'text' },
        { key: 'address', label: 'Mailing Address (use \\n for newlines)', type: 'textarea' },
      ]
    }
  },

  // ─── MEMBERSHIP ─────────────────────────────────────────────────────────────
  membership: {
    hero: {
      name: 'Membership Hero',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
      ]
    },
    benefits: {
      name: 'Member Benefits',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'benefits', label: 'Benefits List', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' }
        ] },
        { key: 'quote', label: 'Quote Text', type: 'textarea' },
        { key: 'cite', label: 'Quote Citation', type: 'text' },
      ]
    },
    tiers: {
      name: 'Membership Categories',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'tiers', label: 'Tiers', type: 'list', itemFields: [
          { key: 'tier', label: 'Tier Name', type: 'text' },
          { key: 'price', label: 'Price', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' },
          { key: 'features', label: 'Features (one per line)', type: 'textarea' }
        ] },
      ]
    },
    corporate: {
      name: 'Corporate Enquiry',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'value_props', label: 'Value Propositions', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' }
        ] },
        { key: 'box_headline', label: 'Box Headline', type: 'text' },
        { key: 'box_desc', label: 'Box Description', type: 'textarea' },
        { key: 'email', label: 'Email', type: 'email' },
      ]
    },
    faq: {
      name: 'FAQ',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'faqs', label: 'FAQs', type: 'list', itemFields: [
          { key: 'q', label: 'Question', type: 'text' },
          { key: 'a', label: 'Answer', type: 'textarea' }
        ] },
      ]
    }
  },

  // ─── EVENTS ─────────────────────────────────────────────────────────────────
  events: {
    flagship: {
      name: 'Flagship Event (Hero)',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'headline_line3', label: 'Headline Line 3', type: 'text' },
        { key: 'duration_label', label: 'Duration Label', type: 'text' },
        { key: 'duration_value', label: 'Duration Value', type: 'text' },
        { key: 'venue_label', label: 'Venue Label', type: 'text' },
        { key: 'venue_value', label: 'Venue Value', type: 'text' },
        { key: 'btn_label', label: 'Button Label', type: 'text' }
      ]
    },
    calendar: {
      name: 'Calendar',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'events', label: 'Upcoming Events', type: 'list', itemFields: [
          { key: 'title', label: 'Event Title', type: 'text' },
          { key: 'date', label: 'Date', type: 'text' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'type', label: 'Event Type', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' },
          { key: 'img', label: 'Event Image', type: 'image' }
        ] }
      ]
    },
    sponsor: {
      name: 'Sponsor an Event',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'tiers', label: 'Sponsorship Tiers', type: 'list', itemFields: [
          { key: 'name', label: 'Tier Name', type: 'text' },
          { key: 'price', label: 'Price', type: 'text' },
          { key: 'benefits', label: 'Benefits (one per line)', type: 'textarea' },
          { key: 'color', label: 'Tailwind Color Class', type: 'text' }
        ] }
      ]
    },
    speakers: {
      name: 'Call for Speakers',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'form_text', label: 'Form Link Text', type: 'text' },
        { key: 'policy_text', label: 'Policy Link Text', type: 'text' },
        { key: 'box_headline_line1', label: 'Box Headline Line 1', type: 'text' },
        { key: 'box_headline_line2', label: 'Box Headline Line 2', type: 'text' },
        { key: 'box_desc', label: 'Box Description', type: 'textarea' },
        { key: 'btn_label', label: 'Button Label', type: 'text' }
      ]
    }
  },

  // ─── RESOURCES ──────────────────────────────────────────────────────────────
  resources: {
    hero: {
      name: 'Hero Section',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
        { key: 'watermark', label: 'Background Watermark', type: 'text' }
      ]
    },
    pathways: {
      name: 'Certification Pathways',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'paths', label: 'Pathways', type: 'list', itemFields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'levels', label: 'Levels', type: 'text' },
          { key: 'time', label: 'Estimated Time', type: 'text' }
        ] }
      ]
    },
    blog: {
      name: 'Blog & Articles',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'posts', label: 'Posts', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'author', label: 'Author', type: 'text' },
          { key: 'date', label: 'Date', type: 'text' },
          { key: 'excerpt', label: 'Excerpt', type: 'textarea' }
        ] }
      ]
    },
    'thought-leadership': {
      name: 'Thought Leadership',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'posts', label: 'Posts', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'author', label: 'Author', type: 'text' },
          { key: 'date', label: 'Date', type: 'text' },
          { key: 'excerpt', label: 'Excerpt', type: 'textarea' }
        ] }
      ]
    },
    resources_list: {
      name: 'Case Studies & Whitepapers',
      fields: [
        { key: 'case_studies_headline', label: 'Case Studies Headline', type: 'text' },
        { key: 'whitepapers_headline', label: 'Whitepapers Headline', type: 'text' },
        { key: 'resources', label: 'Resources', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'type', label: 'Type (Guide or Case Study)', type: 'text' },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' }
        ] }
      ]
    },
    fellowship: {
      name: 'Fellowship',
      fields: [
        { key: 'headline', label: 'Headline', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'btn_label', label: 'Button Label', type: 'text' }
      ]
    },
    vault: {
      name: 'Knowledge Vault',
      fields: [
        { key: 'glossary_headline', label: 'Glossary Headline', type: 'text' },
        { key: 'glossary_desc', label: 'Glossary Description', type: 'textarea' },
        { key: 'glossary_btn', label: 'Glossary Button Label', type: 'text' },
        { key: 'videos_headline', label: 'Videos Headline', type: 'text' },
        { key: 'videos_desc', label: 'Videos Description', type: 'textarea' },
        { key: 'videos_btn', label: 'Videos Button Label', type: 'text' },
        { key: 'newsletters_headline', label: 'Newsletters Headline', type: 'text' },
        { key: 'newsletters_desc', label: 'Newsletters Description', type: 'textarea' },
        { key: 'newsletters_btn', label: 'Newsletters Button Label', type: 'text' }
      ]
    },
    governance: {
      name: 'Governance & Reports',
      fields: [
        { key: 'reports_headline', label: 'Reports Headline', type: 'text' },
        { key: 'reports_years', label: 'Report Years', type: 'list', itemFields: [
          { key: 'year', label: 'Year', type: 'text' }
        ] },
        { key: 'bylaws_headline', label: 'Bylaws Headline', type: 'text' },
        { key: 'bylaws_desc', label: 'Bylaws Description', type: 'textarea' },
        { key: 'bylaws_docs', label: 'Bylaw Documents', type: 'list', itemFields: [
          { key: 'title', label: 'Document Title', type: 'text' }
        ] }
      ]
    }
  },

  // ─── PARTNERS ────────────────────────────────────────────────────────────────
  partners: {
    hero: {
      name: 'Hero Section',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
        { key: 'watermark', label: 'Background Watermark', type: 'text' }
      ]
    },
    categories: {
      name: 'Partner Categories',
      fields: [
        { key: 'categories_list', label: 'Categories', type: 'list', itemFields: [
          { key: 'title', label: 'Category Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' },
          { key: 'partners', label: 'Partners (One per line)', type: 'textarea' }
        ] }
      ]
    },
    international: {
      name: 'International Relationship',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
        { key: 'points', label: 'Relationship Points', type: 'list', itemFields: [
          { key: 'title', label: 'Point Title', type: 'text' },
          { key: 'desc', label: 'Point Description', type: 'textarea' }
        ] },
        { key: 'btn_label', label: 'Button Label', type: 'text' }
      ]
    },
    become: {
      name: 'Become a Partner CTA',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'contact_email', label: 'Contact Email', type: 'text' },
      ]
    }
  },

  // ─── SERVICES ────────────────────────────────────────────────────────────────
  services: {
    hero: {
      name: 'Hero Section',
      fields: [
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
        { key: 'watermark', label: 'Background Watermark', type: 'text' }
      ]
    },
    benchmarking: {
      name: 'Benchmarking Feature',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'body', label: 'Body Text', type: 'textarea' },
        { key: 'btn_label', label: 'Button Label', type: 'text' },
        { key: 'year_watermark', label: 'Year Watermark', type: 'text' }
      ]
    },
    directory: {
      name: 'Services Directory',
      fields: [
        { key: 'services_list', label: 'Services', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' },
          { key: 'category', label: 'Category', type: 'text' }
        ] }
      ]
    },
    become: {
      name: 'Become a Provider CTA',
      fields: [
        { key: 'headline', label: 'Headline', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'contact_email', label: 'Contact Email', type: 'text' }
      ]
    }
  },

  // ─── PORTAL ──────────────────────────────────────────────────────────────────
  portal: {
    auth: {
      name: 'Login Screen',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
        { key: 'headline_line1', label: 'Headline Line 1', type: 'text' },
        { key: 'headline_line2', label: 'Headline Line 2', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'btn_label', label: 'Button Label', type: 'text' },
        { key: 'notice', label: 'Notice Text', type: 'text' },
        { key: 'cta_label', label: 'CTA Label', type: 'text' }
      ]
    },
    dashboard: {
      name: 'Dashboard Welcome',
      fields: [
        { key: 'status', label: 'Status Text', type: 'text' },
        { key: 'welcome_line1', label: 'Welcome Line 1', type: 'text' },
        { key: 'welcome_line2', label: 'Welcome Line 2', type: 'text' },
        { key: 'terminate_btn', label: 'Terminate Button Label', type: 'text' }
      ]
    },
    archives: {
      name: 'Premium Archives',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'documents', label: 'Documents', type: 'list', itemFields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'type', label: 'Type (e.g. PDF)', type: 'text' },
          { key: 'size', label: 'Size', type: 'text' }
        ] }
      ]
    },
    briefing: {
      name: 'Executive Briefing',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'month', label: 'Month', type: 'text' },
        { key: 'day', label: 'Day', type: 'text' },
        { key: 'title', label: 'Event Title', type: 'text' },
        { key: 'desc', label: 'Event Description', type: 'textarea' },
        { key: 'btn_label', label: 'Button Label', type: 'text' }
      ]
    },
    status: {
      name: 'Certified Status',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'type', label: 'Member Type', type: 'text' },
        { key: 'tier', label: 'Tier', type: 'text' },
        { key: 'fields', label: 'Status Fields', type: 'list', itemFields: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'value', label: 'Value', type: 'text' }
        ] }
      ]
    },
    itinerary: {
      name: 'Active Itinerary',
      fields: [
        { key: 'headline', label: 'Section Headline', type: 'text' },
        { key: 'events', label: 'Events', type: 'list', itemFields: [
          { key: 'text', label: 'Event Text', type: 'text' }
        ] },
        { key: 'footer_text', label: 'Footer Text', type: 'text' }
      ]
    }
  }
};
