/**
 * Products and portfolio entries shown in the navbar, footer, home page and /portfolio.
 * Keep routes here in sync with the pages under src/app.
 */
export type ProductEntry = {
  name: string;
  tagline: string;
  href: string;
  external?: boolean;
};

export const products: ProductEntry[] = [
  { name: "OPD Assistant AI", tagline: "Clinical reference & decision-support app (Android)", href: "/opd-assistant-ai" },
  { name: "Medical Chat Box", tagline: "The chat interface inside OPD Assistant AI", href: "/opd-assistant-ai#medical-chat-box" },
  { name: "GharMitra", tagline: "Complete Home Solution", href: "/gharmitra" },
  { name: "Colony Mitra", tagline: "कॉलोनी / सोसाइटी मैनेजमेंट ऐप", href: "/colony-mitra" },
];

export type PortfolioEntry = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  liveUrl: string;
};

export const portfolio: PortfolioEntry[] = [
  {
    slug: "kumar-solar-panel",
    name: "Kumar Solar Panel",
    kind: "Business website",
    summary: "A website built by Abhiraj Digital Innovation for Kumar Solar Panel.",
    liveUrl: "https://kumar-solar-panel-website.vercel.app",
  },
];
