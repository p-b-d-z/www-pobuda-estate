export type Audience = "Business" | "Residence" | "Both";

export interface NavItem {
  label: string;
  href: string;
}

export interface Capability {
  title: string;
  audience: Audience;
  summary: string;
}

export interface MethodStep {
  index: string;
  title: string;
  detail: string;
}

export interface StatDatum {
  value: string;
  label: string;
}

export interface SiteData {
  name: string;
  shortName: string;
  wordmark: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  nav: NavItem[];
  hero: {
    eyebrow: string;
    headline: string;
    headlineLines: string[];
    standfirst: string;
    primaryCta: string;
    secondaryCta: string;
  };
  manifesto: {
    label: string;
    statement: string;
    body: string;
    stats: StatDatum[];
  };
  capabilities: {
    label: string;
    heading: string;
    items: Capability[];
  };
  method: {
    label: string;
    heading: string;
    intro: string;
    steps: MethodStep[];
  };
  trust: {
    label: string;
    heading: string;
    body: string;
    quote: string;
    attribution: string;
  };
  contact: {
    label: string;
    heading: string;
    body: string;
    cta: string;
  };
}

export const site: SiteData = {
  name: "Pobuda Estates LLC",
  shortName: "Pobuda Estates",
  wordmark: "Pobuda Estates",
  tagline: "Technical Consulting for Business & Residence",
  description:
    "Pobuda Estates designs, installs, and maintains the technical infrastructure of businesses and private residences — one standard, one firm.",
  location: "Phoenix, Arizona",
  email: "info@pobuda.estate",
  phone: "(480) 202-0751",
  phoneHref: "+14802020751",

  nav: [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Method", href: "#method" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Technical Consulting — Business & Residence",
    headline: "The systems behind working businesses and quiet homes.",
    headlineLines: ["The systems behind working", "businesses and quiet homes."],
    standfirst:
      "Pobuda Estates designs, installs, and maintains the technical infrastructure of both. One standard, one firm, no hand-offs.",
    primaryCta: "Request a consultation",
    secondaryCta: "See capabilities",
  },

  manifesto: {
    label: "The Standard",
    statement: "Most technical work is invisible when it is done right. That is the work.",
    body: "We treat a business network and a household's systems with the same discipline: understand the whole before touching a part, document what already exists, and leave it more stable than we found it. The result is infrastructure you stop thinking about.",
    stats: [
      { value: "01", label: "Firm — a single point of contact" },
      { value: "02", label: "Audiences — business and residence" },
      { value: "04", label: "Disciplines under one standard" },
    ],
  },

  capabilities: {
    label: "Capabilities",
    heading: "Four disciplines. One standard.",
    items: [
      {
        title: "Business Technical Consulting",
        audience: "Business",
        summary:
          "Technology strategy, network design, and infrastructure planning for organizations that have outgrown ad-hoc setups.",
      },
      {
        title: "Residential Technical Services",
        audience: "Residence",
        summary:
          "Smart-home integration, security, and the quiet systems that keep a house running without asking for attention.",
      },
      {
        title: "System Optimization",
        audience: "Both",
        summary:
          "Audits and remediation of infrastructure already in place — measured, documented, and improved against a baseline.",
      },
      {
        title: "Technical Advisory",
        audience: "Both",
        summary:
          "Independent guidance on technology decisions, vendors, and upgrades before you commit budget to any of them.",
      },
    ],
  },

  method: {
    label: "Method",
    heading: "The order matters.",
    intro:
      "Every engagement follows the same sequence. Skipping a step is how systems end up undocumented and unstable.",
    steps: [
      {
        index: "01",
        title: "Assess",
        detail:
          "We map what exists — hardware, network, usage, and the points of failure nobody has written down.",
      },
      {
        index: "02",
        title: "Architect",
        detail:
          "We produce a written plan sized to the actual need, not a catalog of products with a margin attached.",
      },
      {
        index: "03",
        title: "Implement",
        detail:
          "Careful installation and migration, scheduled so the work does not disrupt the business or the household.",
      },
      {
        index: "04",
        title: "Steward",
        detail:
          "Documentation, monitoring, and support, so the system keeps working long after the handoff.",
      },
    ],
  },

  trust: {
    label: "Why Pobuda",
    heading: "Enterprise rigor. Residential care.",
    body: "The diligence that keeps a business running belongs in the systems you live with. Pobuda Estates is built on that overlap — the same rigor, applied at the scale it is needed.",
    quote:
      "Pobuda Estates has been a trusted partner of ours for over 15 years.",
    attribution: "Darren, Tier 3 Consulting",
  },

  contact: {
    label: "Start",
    heading: "Tell us what is not working.",
    body: "Describe the system, the space, or the problem. We will tell you plainly whether we are the right fit, and what it would take to fix it.",
    cta: "Request a consultation",
  },
};

export const colors = {
  copper: {
    light: "#e0a15e",
    DEFAULT: "#b87333",
    dark: "#8b5a2b",
  },
  void: "#0b0907",
  surface: "#141110",
  surfaceRaised: "#1c1815",
  bone: "#f2eae0",
  muted: "#9a8f84",
} as const;
