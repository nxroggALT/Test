import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Users, TrendingUp, Calendar, Clock, Award } from "lucide-react";
import type { Tournament } from "@shared/schema";

export default function TournamentsSection() {
  const { data: upcomingTournaments } = useQuery<Tournament[]>({
    queryKey: ["/api/tournaments/upcoming"],
  });

  const { data: recentResults } = useQuery<Tournament[]>({
    queryKey: ["/api/tournaments/results"],
  });

  const competitiveGoals = [
    {
      icon: Target,
      title: "FNCS Qualification",
      description: "Our primary goal is to qualify for the Fortnite Championship Series - the biggest tournament in competitive Fortnite.",
      timeline: "Season Goal",
      color: "hsl(45,100%,60%)"
    },
    {
      icon: Trophy,
      title: "Tournament Success",
      description: "Compete in weekly Cash Cups and monthly tournaments to build experience and earn prize money.",
      timeline: "Ongoing",
      color: "hsl(260,100%,75%)"
    },
    {
      icon: Users,
      title: "Team Development",
      description: "Build strong team chemistry and develop coordinated strategies through daily practice sessions.",
      timeline: "Daily",
      color: "hsl(320,100%,70%)"
    },
    {
      icon: TrendingUp,
      title: "Skill Growth",
      description: "Continuously improve individual and team mechanics to compete at the highest professional level.",
      timeline: "Ongoing",
      color: "hsl(200,100%,50%)"
    }
  ];

  return (
    <section id="tournaments" className="py-12 sm:py-16 md:py-20 bg-[hsl(222,47%,11%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">Competitive Vision</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            Our roadmap to becoming a championship-level Fortnite team through strategic development and competitive excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {competitiveGoals.map((goal, index) => (
            <Card key={index} className="neon-border hover-glow transition-all bg-transparent group">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
                    style={{ backgroundColor: goal.color }}
                  >
                    <goal.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: goal.color }}>
                      {goal.title}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="text-white"
                      style={{ backgroundColor: goal.color }}
                    >
                      {goal.timeline}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-400">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>





        <div className="text-center">
          <Card className="neon-border bg-transparent max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 text-[hsl(260,100%,75%)]">Professional Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[hsl(45,100%,60%)] mb-2">Dedication</div>
                  <p className="text-gray-400">Committed to daily practice and continuous improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[hsl(320,100%,70%)] mb-2">Teamwork</div>
                  <p className="text-gray-400">Strong communication and coordinated strategies</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[hsl(200,100%,50%)] mb-2">Excellence</div>
                  <p className="text-gray-400">Pursuing the highest level of competitive performance</p>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://discord.gg/CXdR3GQVzR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[hsl(260,100%,75%)] to-[hsl(320,100%,70%)] hover:from-[hsl(260,100%,80%)] hover:to-[hsl(320,100%,75%)] px-8 py-4 rounded-xl text-white font-bold transition-all hover-glow"
                >
                  Join Our Mission
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}