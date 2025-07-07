import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { SiDiscord } from "react-icons/si";
import { Gamepad2, Users, Trophy } from "lucide-react";
import type { DiscordStats } from "@shared/schema";

export default function DiscordSection() {
  const { data: discordStats } = useQuery<DiscordStats>({
    queryKey: ["/api/discord-stats"],
  });

  return (
    <section className="py-20 bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 glow-text">Join Our Discord Community</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with {discordStats?.totalMembers || 440}+ members, participate in customs, and stay updated with the latest news.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[hsl(188,88%,37%)] p-3 rounded-lg">
                <Gamepad2 className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[hsl(180,100%,50%)]">Custom Games</h3>
                <p className="text-gray-400">
                  Join daily custom matches and scrimmages with community members.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[hsl(188,88%,37%)] p-3 rounded-lg">
                <Users className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[hsl(180,100%,50%)]">Active Community</h3>
                <p className="text-gray-400">
                  {discordStats?.totalMembers || 440} members with {discordStats?.onlineMembers || 136} online right now - always someone to play with.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[hsl(188,88%,37%)] p-3 rounded-lg">
                <Trophy className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[hsl(180,100%,50%)]">Tournaments</h3>
                <p className="text-gray-400">
                  Weekly community tournaments with prizes and rank climbing opportunities.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Card className="neon-border hover-glow transition-all bg-transparent">
              <CardContent className="p-8">
                <SiDiscord className="text-6xl text-[hsl(180,100%,50%)] mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4 text-[hsl(180,100%,50%)]">
                  RAIN ESPORTS | CUSTOMS
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Members:</span>
                    <span className="text-[hsl(180,100%,50%)] font-bold">
                      {discordStats?.totalMembers || 440}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Currently Online:</span>
                    <span className="text-[hsl(142,71%,45%)] font-bold">
                      {discordStats?.onlineMembers || 136}
                    </span>
                  </div>
                </div>
                <a 
                  href="https://discord.gg/HhTDR8DJQF" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] px-8 py-4 rounded-lg text-lg font-semibold transition-all hover-glow inline-flex items-center space-x-3"
                >
                  <SiDiscord />
                  <span>Join Discord Server</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
