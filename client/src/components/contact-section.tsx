import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone } from "lucide-react";
import { SiX, SiInstagram, SiYoutube, SiTwitch, SiDiscord } from "react-icons/si";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-[hsl(215,25%,27%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            Interested in partnerships, sponsorships, or joining our team? Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="neon-border bg-transparent">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-[hsl(180,100%,50%)]">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-[hsl(222,47%,11%)] border-[hsl(188,88%,37%)]/30 focus:border-[hsl(185,84%,44%)]"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-[hsl(222,47%,11%)] border-[hsl(188,88%,37%)]/30 focus:border-[hsl(185,84%,44%)]"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="bg-[hsl(222,47%,11%)] border-[hsl(188,88%,37%)]/30 focus:border-[hsl(185,84%,44%)]">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="sponsorship">Sponsorship</SelectItem>
                      <SelectItem value="tryouts">Team Tryouts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    rows={4}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-[hsl(222,47%,11%)] border-[hsl(188,88%,37%)]/30 focus:border-[hsl(185,84%,44%)]"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] w-full hover-glow text-sm sm:text-base py-2.5 sm:py-3 font-bold shadow-lg"
                  disabled={contactMutation.isPending || !formData.name || !formData.email || !formData.subject || !formData.message}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="neon-border bg-transparent">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[hsl(180,100%,50%)]">
                  Management Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-[hsl(185,84%,44%)]" />
                    <span>management@rainesports.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-[hsl(185,84%,44%)]" />
                    <span>+1 (555) 123-RAIN</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border bg-transparent">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[hsl(180,100%,50%)]">
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] p-3 rounded-lg transition-all hover-glow"
                  >
                    <SiX className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] p-3 rounded-lg transition-all hover-glow"
                  >
                    <SiInstagram className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] p-3 rounded-lg transition-all hover-glow"
                  >
                    <SiYoutube className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] p-3 rounded-lg transition-all hover-glow"
                  >
                    <SiTwitch className="text-xl" />
                  </a>
                  <a 
                    href="https://discord.gg/CXdR3GQVzR" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] p-3 rounded-lg transition-all hover-glow"
                  >
                    <SiDiscord className="text-xl" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border bg-transparent">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[hsl(180,100%,50%)]">
                  Sponsorship Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Partner with Rain Esports and reach our growing community of 440+ gaming enthusiasts.
                </p>
                <Button className="bg-[hsl(188,88%,37%)] hover:bg-[hsl(185,84%,44%)] hover-glow">
                  View Sponsorship Packages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
