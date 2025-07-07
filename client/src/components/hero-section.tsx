import { Button } from "@/components/ui/button";
import { SiDiscord } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { DiscordStats } from "@shared/schema";

export default function HeroSection() {
  const { data: discordStats, isLoading: statsLoading } = useQuery<DiscordStats>({
    queryKey: ["/api/discord-stats"],
    refetchInterval: 60000, // Refresh every minute
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 gradient-bg"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      <div className="relative z-10 container mx-auto px-4 py-8 mt-16 sm:mt-20">
        <div className="text-center space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black glow-text leading-tight">
            <span className="text-[hsl(260,100%,75%)] block sm:inline">RAIN</span> 
            <span className="text-[hsl(320,100%,70%)] block sm:inline"> ESPORTS</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
            Professional competitive Fortnite team building our championship squad. Join us as we rise to the top!
          </p>
          <div className="flex justify-center items-center px-4">
            <a 
              href="https://discord.gg/CXdR3GQVzR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[hsl(260,100%,75%)] to-[hsl(320,100%,70%)] hover:from-[hsl(260,100%,80%)] hover:to-[hsl(320,100%,75%)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all hover-glow flex items-center justify-center space-x-3 text-white shadow-lg"
            >
              <SiDiscord className="text-lg sm:text-xl" />
              <span>Join Discord</span>
              {discordStats && (
                <span className="bg-[hsl(45,100%,60%)] text-[hsl(222,47%,11%)] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {discordStats.totalMembers} Members
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-[hsl(222,47%,11%)]/90 backdrop-blur-sm py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(45,100%,60%)]">OPEN</div>
              <div className="text-xs sm:text-sm text-gray-400">Tryouts</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(260,100%,75%)]">
                {discordStats?.totalMembers || 440}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Community</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(320,100%,70%)]">
                {discordStats?.onlineMembers || 136}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Online Now</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(200,100%,50%)]">2025</div>
              <div className="text-xs sm:text-sm text-gray-400">New Era</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
