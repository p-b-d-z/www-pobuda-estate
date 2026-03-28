export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface BusinessData {
  name: string;
  tagline: string;
  tagline2: string;
  description: string;
  services: Service[];
  contact: ContactInfo;
}

export const businessData: BusinessData = {
  name: "Pobuda Estates LLC",
  tagline: "Technical Consulting for Business & Residence",
  tagline2: "Providing expert guidance to optimize your technical infrastructure and residential systems.",
  description: "Professional technical consulting services for businesses and private residences.",
  services: [
    {
      title: "Business Technical Consulting",
      description: "Comprehensive technology strategy and infrastructure planning for businesses of all sizes.",
      icon: "🏢"
    },
    {
      title: "Residential Technical Services",
      description: "Smart home integration, security systems, and technical solutions for private residences.",
      icon: "🏠"
    },
    {
      title: "System Optimization",
      description: "Analysis and optimization of existing technical systems to improve efficiency and performance.",
      icon: "⚙️"
    },
    {
      title: "Technical Advisory",
      description: "Expert advice on technology investments, upgrades, and best practices.",
      icon: "📋"
    }
  ],
  contact: {
    email: "info@pobuda.estate",
    phone: "(480) 202-0751"
  }
};

export const colors = {
  copper: {
    light: "#e8a87c",
    DEFAULT: "#b87333",
    dark: "#8b5a2b"
  },
  creme: {
    light: "#fdf6e3",
    DEFAULT: "#f5e6c8",
    dark: "#e8d4a8"
  }
};
