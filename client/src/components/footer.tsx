import { Zap } from "lucide-react";
import { SiX, SiInstagram, SiYoutube, SiDiscord } from "react-icons/si";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[hsl(222,47%,11%)] py-8 sm:py-12 border-t border-[hsl(188,88%,37%)]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="text-[hsl(180,100%,50%)] text-xl sm:text-2xl" />
              <span className="text-xl sm:text-2xl font-bold glow-text">RAIN ESPORTS</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
              Professional gaming team dominating the competitive scene with skill, strategy, and teamwork.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="text-[hsl(185,84%,44%)] hover:text-[hsl(180,100%,50%)] transition-colors hover:scale-110 transform"
              >
                <SiX className="text-lg sm:text-xl" />
              </a>
              <a 
                href="#" 
                className="text-[hsl(185,84%,44%)] hover:text-[hsl(180,100%,50%)] transition-colors hover:scale-110 transform"
              >
                <SiInstagram className="text-lg sm:text-xl" />
              </a>
              <a 
                href="#" 
                className="text-[hsl(185,84%,44%)] hover:text-[hsl(180,100%,50%)] transition-colors hover:scale-110 transform"
              >
                <SiYoutube className="text-lg sm:text-xl" />
              </a>
              <a 
                href="https://discord.gg/CXdR3GQVzR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[hsl(185,84%,44%)] hover:text-[hsl(180,100%,50%)] transition-colors hover:scale-110 transform"
              >
                <SiDiscord className="text-lg sm:text-xl" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[hsl(180,100%,50%)]">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="hover:text-[hsl(185,84%,44%)] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("team")}
                  className="hover:text-[hsl(185,84%,44%)] transition-colors"
                >
                  Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("tournaments")}
                  className="hover:text-[hsl(185,84%,44%)] transition-colors"
                >
                  Vision
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("news")}
                  className="hover:text-[hsl(185,84%,44%)] transition-colors"
                >
                  News
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-[hsl(185,84%,44%)] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-[hsl(180,100%,50%)]">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://discord.gg/CXdR3GQVzR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[hsl(185,84%,44%)] transition-colors"
                >
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[hsl(185,84%,44%)] transition-colors">
                  Custom Games
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[hsl(185,84%,44%)] transition-colors">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[hsl(185,84%,44%)] transition-colors">
                  Leaderboards
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[hsl(188,88%,37%)]/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Rain Esports. All rights reserved. | Designed for competitive excellence.</p>
          <div className="mt-2">
            <a 
              href="/admin/login" 
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
