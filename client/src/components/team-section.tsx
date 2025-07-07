import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TeamMember } from "@shared/schema";

export default function TeamSection() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openPositions = [
    {
      role: "IGL (In-Game Leader)",
      description: "Strategic mastermind who calls rotations and leads the team to Victory Royales.",
      requirements: ["Champion+ Rank", "Strong Communication", "Game Sense", "Leadership"],
      color: "hsl(260,100%,75%)"
    },
    {
      role: "Fragger",
      description: "Aggressive player with exceptional aim and building mechanics for high-elimination games.",
      requirements: ["Elite+ Rank", "High K/D Ratio", "Building Skills", "Clutch Factor"],
      color: "hsl(320,100%,70%)"
    },
    {
      role: "Support Player",
      description: "Team player focused on rotations, heals, and setting up teammates for success.",
      requirements: ["Elite+ Rank", "Team Player", "Game Knowledge", "Consistency"],
      color: "hsl(200,100%,50%)"
    },
    {
      role: "Flex Player",
      description: "Versatile player who adapts to any situation and fills multiple roles as needed.",
      requirements: ["Elite+ Rank", "Adaptability", "Multiple Playstyles", "Quick Learning"],
      color: "hsl(45,100%,60%)"
    }
  ];

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-[hsl(215,25%,27%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            We're building a championship team from the ground up. Elite players with dedication and skill are what we seek.
          </p>
        </div>
        
        {teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member) => (
              <Card key={member.id} className="neon-border hover-glow transition-all bg-transparent">
                <CardContent className="p-6">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 text-[hsl(260,100%,75%)]">{member.name}</h3>
                  <p className="text-[hsl(320,100%,70%)] mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-[hsl(222,47%,11%)] text-white">
                      KDA: {member.kda}
                    </Badge>
                    <Badge variant="secondary" className="bg-[hsl(222,47%,11%)] text-white">
                      Rank: {member.rank}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {openPositions.map((position, index) => (
            <Card key={index} className="neon-border hover-glow transition-all bg-transparent group">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-xl sm:text-2xl font-bold text-white group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: position.color }}
                  >
                    ?
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: position.color }}>
                    {position.role}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">{position.description}</p>
                </div>
                
                <div className="space-y-3 mb-4 sm:mb-6">
                  <h4 className="text-white font-semibold text-sm sm:text-base">Requirements:</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {position.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} variant="secondary" className="bg-[hsl(222,47%,11%)] text-white text-xs sm:text-sm">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => window.open('https://discord.gg/CXdR3GQVzR', '_blank')}
                  className="w-full bg-gradient-to-r from-[hsl(260,100%,75%)] to-[hsl(320,100%,70%)] hover:from-[hsl(260,100%,80%)] hover:to-[hsl(320,100%,75%)] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white font-bold transition-all hover-glow text-sm sm:text-base shadow-lg"
                >
                  Apply for Position
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Card className="neon-border bg-transparent max-w-2xl mx-auto">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[hsl(260,100%,75%)]">Ready to Tryout?</h3>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed px-2">
                Join our Discord and sign up for weekend tryouts. We're looking for dedicated players who want to compete at the highest level.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <a 
                  href="https://discord.gg/CXdR3GQVzR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-[hsl(260,100%,75%)] to-[hsl(320,100%,70%)] hover:from-[hsl(260,100%,80%)] hover:to-[hsl(320,100%,75%)] px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-white font-bold transition-all hover-glow text-sm sm:text-base shadow-lg"
                >
                  Join Discord
                </a>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto border-2 border-[hsl(260,100%,75%)] text-[hsl(260,100%,75%)] hover:bg-[hsl(260,100%,75%)] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all hover-glow text-sm sm:text-base shadow-lg"
                >
                  Schedule Tryout
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
