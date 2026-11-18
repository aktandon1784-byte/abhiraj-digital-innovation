import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

const pageTitle = "Contact | Abhiraj Digital Innovation";
const pageDescription =
  "Contact Abhiraj Digital Innovation about mobile application, software and website development.";

// The contact page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  ...pageSeo("/contact", { title: pageTitle, description: pageDescription }),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
