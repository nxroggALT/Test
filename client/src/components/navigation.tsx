import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[hsl(222,47%,11%)]/95 backdrop-blur-sm z-50 border-b border-[hsl(188,88%,37%)]/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="text-[hsl(260,100%,75%)] text-2xl" />
            <span className="text-2xl font-bold glow-text">
              <span className="text-[hsl(260,100%,75%)]">RAIN</span>
              <span className="text-[hsl(320,100%,70%)]"> ESPORTS</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("tournaments")}
              className="hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              Vision
            </button>
            <button 
              onClick={() => scrollToSection("news")}
              className="hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              News
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              Contact
            </button>
            <a 
              href="https://discord.gg/CXdR3GQVzR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 hover-glow"
            >
              <SiDiscord />
              <span>Join Discord</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[hsl(185,84%,44%)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[hsl(215,25%,27%)]/95 backdrop-blur-sm border-t border-[hsl(188,88%,37%)]/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection("home")}
              className="block hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("tournaments")}
              className="block hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              Vision
            </button>
            <button 
              onClick={() => scrollToSection("news")}
              className="block hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              News
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block hover:text-[hsl(185,84%,44%)] transition-colors"
            >
              Contact
            </button>
            <a 
              href="https://discord.gg/CXdR3GQVzR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 w-fit"
            >
              <SiDiscord />
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
