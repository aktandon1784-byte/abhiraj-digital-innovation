/**
 * Authoritative Site Configuration
 * 
 * Abhiraj Digital Innovation is an organization focused on practical digital application development.
 * 
 * Primary Focus: Mobile Application Development (Android)
 * Secondary Focus: Software Development & Website Development
 * Current Application: OPD Assistant AI (Android Application)
 */

export const siteConfig = {
  companyName: "Abhiraj Digital Innovation",
  shortName: "ADI",
  tagline: "Building Practical Digital Applications",
  description:
    "We focus on creating useful mobile applications, software and websites that solve real-world problems.",

  // Domain Configuration
  domain: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    isProductionPending: true,
  },

  // Authentic Contact Information
  contact: {
    email: "abhirajdigitalinnovationhead@gmail.com",
    phone: null,
    address: null,
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Application", href: "/opd-assistant-ai" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Current Featured Application
  currentProduct: {
    name: "OPD Assistant AI",
    tagline: "Medical Chat Box",
    headline: "AI-Assisted Clinical Reference & Decision-Support Application",
    platform: "Android",
    description:
      "OPD Assistant AI is an AI-assisted Medical Chat Box and Clinical Reference & Decision-Support Application designed to help appropriately qualified healthcare professionals access, organize and understand relevant clinical information.",
    playStore: {
      isLive: false,
      url: null,
      statusText: "Google Play Store — Coming Soon",
    },
  },
};
