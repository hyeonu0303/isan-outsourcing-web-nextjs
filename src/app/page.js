import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section"
import { HeroSection } from "@/components/hero-section"
import { PartnersSection } from "@/components/partners-section"
import { ServicesSection } from "@/components/services-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
