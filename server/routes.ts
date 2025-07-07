import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import crypto from "crypto";
import { insertTeamMemberSchema, insertTournamentSchema, insertNewsSchema, insertDiscordStatsSchema, insertAnnouncementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Team members routes
  app.get("/api/team-members", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const teamMember = await storage.getTeamMember(id);
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(teamMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.post("/api/team-members", async (req, res) => {
    try {
      const teamMember = await storage.createTeamMember(req.body);
      res.status(201).json(teamMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to create team member" });
    }
  });

  // Tournaments routes
  app.get("/api/tournaments", async (req, res) => {
    try {
      const tournaments = await storage.getTournaments();
      res.json(tournaments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tournaments" });
    }
  });

  app.get("/api/tournaments/upcoming", async (req, res) => {
    try {
      const tournaments = await storage.getUpcomingTournaments();
      res.json(tournaments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch upcoming tournaments" });
    }
  });

  app.get("/api/tournaments/results", async (req, res) => {
    try {
      const tournaments = await storage.getRecentResults();
      res.json(tournaments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tournament results" });
    }
  });

  app.post("/api/tournaments", async (req, res) => {
    try {
      const tournament = await storage.createTournament(req.body);
      res.status(201).json(tournament);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tournament" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsItem = await storage.getNewsItem(id);
      if (!newsItem) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const newsItem = await storage.createNews(req.body);
      res.status(201).json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to create news item" });
    }
  });

  // Discord stats route
  app.get("/api/discord-stats", async (req, res) => {
    try {
      const stats = await storage.getDiscordStats();
      if (!stats) {
        return res.status(404).json({ error: "Discord stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Discord stats" });
    }
  });

  // Announcement routes
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.get("/api/announcements/active", async (req, res) => {
    try {
      const announcements = await storage.getActiveAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active announcements" });
    }
  });

  // Admin password (in production, this should be an environment variable)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rain2025";

  // Admin authentication middleware
  const authenticateAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sessionId = authHeader.substring(7);
    const session = await storage.getAdminSession(sessionId);
    
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    req.adminSession = session;
    next();
  };

  // Admin login route
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Create admin session
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      const session = await storage.createAdminSession({
        id: sessionId,
        expiresAt
      });

      res.json({ 
        sessionId: session.id,
        expiresAt: session.expiresAt
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // Admin logout route
  app.post("/api/admin/logout", authenticateAdmin, async (req: any, res) => {
    try {
      await storage.deleteAdminSession(req.adminSession.id);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to logout" });
    }
  });

  // Admin-only routes for managing content
  app.post("/api/admin/team-members", authenticateAdmin, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.createTeamMember(validatedData);
      res.status(201).json(teamMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create team member" });
      }
    }
  });

  app.post("/api/admin/tournaments", authenticateAdmin, async (req, res) => {
    try {
      const validatedData = insertTournamentSchema.parse(req.body);
      const tournament = await storage.createTournament(validatedData);
      res.status(201).json(tournament);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create tournament" });
      }
    }
  });

  app.post("/api/admin/news", authenticateAdmin, async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(validatedData);
      res.status(201).json(newsItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create news item" });
      }
    }
  });

  // Helper function to fetch Discord server info from invite link
  async function fetchDiscordServerInfo(inviteLink: string) {
    try {
      // Extract invite code from various Discord invite link formats
      const inviteCode = inviteLink.replace(/https?:\/\/(www\.)?(discord\.gg\/|discordapp\.com\/invite\/|discord\.com\/invite\/)/, '');
      
      // Use Discord API to get server info
      const response = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`);
      
      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        totalMembers: data.approximate_member_count || 0,
        onlineMembers: data.approximate_presence_count || 0,
        serverName: data.guild?.name || 'Unknown Server',
        inviteLink: inviteLink
      };
    } catch (error) {
      console.error('Failed to fetch Discord server info:', error);
      throw error;
    }
  }

  app.put("/api/admin/discord-stats", authenticateAdmin, async (req, res) => {
    try {
      const body = req.body;
      
      // If an invite link is provided, fetch stats automatically
      if (body.inviteUrl && body.inviteUrl.trim()) {
        try {
          const discordInfo = await fetchDiscordServerInfo(body.inviteUrl.trim());
          const validatedData = insertDiscordStatsSchema.parse({
            totalMembers: discordInfo.totalMembers,
            onlineMembers: discordInfo.onlineMembers,
            inviteUrl: discordInfo.inviteLink
          });
          const stats = await storage.updateDiscordStats(validatedData);
          res.json(stats);
          return;
        } catch (discordError) {
          // If Discord API fails, fall back to manual input
          console.warn('Discord API failed, using manual input:', discordError);
        }
      }
      
      // Manual input or fallback
      const validatedData = insertDiscordStatsSchema.parse(body);
      const stats = await storage.updateDiscordStats(validatedData);
      res.json(stats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update Discord stats" });
      }
    }
  });

  // Admin announcement routes
  app.post("/api/admin/announcements", authenticateAdmin, async (req, res) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(validatedData);
      res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create announcement" });
      }
    }
  });

  app.put("/api/admin/announcements/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAnnouncementSchema.partial().parse(req.body);
      const announcement = await storage.updateAnnouncement(id, validatedData);
      res.json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update announcement" });
      }
    }
  });

  app.delete("/api/admin/announcements/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAnnouncement(id);
      res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete announcement" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required")
      });

      const validatedData = contactSchema.parse(req.body);
      
      // In a real application, you would send this to an email service
      console.log("Contact form submission:", validatedData);
      
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
