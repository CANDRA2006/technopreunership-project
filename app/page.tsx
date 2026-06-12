import { HeroSection } from "@/components/sections/HeroSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { CatalogPreview } from "@/components/sections/CatalogPreview"
import { PortfolioSection } from "@/components/sections/PortfolioSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { MembershipSection } from "@/components/sections/MembershipSection"
import { EmergencyBanner } from "@/components/sections/EmergencyBanner"
import { MapSection } from "@/components/sections/MapSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { ChatbotWidget } from "@/components/common/ChatbotWidget"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CatalogPreview />
      <PortfolioSection />
      <TestimonialsSection />
      <MembershipSection />
      <EmergencyBanner />
      <MapSection />
      <FAQSection />
      <ChatbotWidget />
    </>
  )
}
