import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TournamentsSection from "@/components/tournaments-section";
import NewsSection from "@/components/news-section";
import DiscordSection from "@/components/discord-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-[hsl(222,47%,11%)] text-white font-inter">
      <Navigation />
      <HeroSection />
      <TournamentsSection />
      <NewsSection />
      <DiscordSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
