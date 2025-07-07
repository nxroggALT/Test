import { 
  users, 
  teamMembers, 
  tournaments, 
  news, 
  discordStats,
  adminSessions,
  announcements,
  type User, 
  type InsertUser,
  type TeamMember,
  type InsertTeamMember,
  type Tournament,
  type InsertTournament,
  type News,
  type InsertNews,
  type DiscordStats,
  type InsertDiscordStats,
  type AdminSession,
  type InsertAdminSession,
  type Announcement,
  type InsertAnnouncement
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  getTournaments(): Promise<Tournament[]>;
  getUpcomingTournaments(): Promise<Tournament[]>;
  getRecentResults(): Promise<Tournament[]>;
  createTournament(tournament: InsertTournament): Promise<Tournament>;
  
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  
  getDiscordStats(): Promise<DiscordStats | undefined>;
  updateDiscordStats(stats: InsertDiscordStats): Promise<DiscordStats>;
  
  // Announcement methods
  getAnnouncements(): Promise<Announcement[]>;
  getActiveAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement>;
  deleteAnnouncement(id: number): Promise<void>;
  
  // Admin session methods
  createAdminSession(session: InsertAdminSession): Promise<AdminSession>;
  getAdminSession(id: string): Promise<AdminSession | undefined>;
  deleteAdminSession(id: string): Promise<void>;
  cleanExpiredSessions(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teamMembers: Map<number, TeamMember>;
  private tournaments: Map<number, Tournament>;
  private news: Map<number, News>;
  private discordStats: DiscordStats | undefined;
  private adminSessions: Map<string, AdminSession>;
  private announcements: Map<number, Announcement>;
  private currentUserId: number;
  private currentTeamMemberId: number;
  private currentTournamentId: number;
  private currentNewsId: number;
  private currentAnnouncementId: number;

  constructor() {
    this.users = new Map();
    this.teamMembers = new Map();
    this.tournaments = new Map();
    this.news = new Map();
    this.adminSessions = new Map();
    this.announcements = new Map();
    this.currentUserId = 1;
    this.currentTeamMemberId = 1;
    this.currentTournamentId = 1;
    this.currentNewsId = 1;
    this.currentAnnouncementId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize team members with sample data
    const teamMembersData: InsertTeamMember[] = [
      {
        name: "StormRider",
        role: "IGL (In-Game Leader)",
        rank: "Champion League",
        kda: "2.8",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&crop=face",
        description: "Strategic mastermind leading the team with exceptional game sense and communication.",
        isActive: true
      },
      {
        name: "NeonStrike",
        role: "Fragger",
        rank: "Elite League",
        kda: "3.2", 
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face",
        description: "Aggressive entry fragger with incredible aim and clutch potential.",
        isActive: true
      },
      {
        name: "CyberVault",
        role: "Support Player",
        rank: "Elite League",
        kda: "2.1",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        description: "Team player focused on rotations, heals, and setting up teammates for success.",
        isActive: true
      }
    ];

    teamMembersData.forEach(member => {
      this.createTeamMember(member);
    });

    // Initialize tournaments with upcoming matches and results
    const tournamentsData: InsertTournament[] = [
      {
        opponent: "Fortnite Championship Series",
        date: "January 15, 2025",
        type: "FNCS Qualifier",
        result: null,
        isUpcoming: true
      },
      {
        opponent: "Elite Gaming Squad",
        date: "January 20, 2025", 
        type: "Scrim Match",
        result: null,
        isUpcoming: true
      },
      {
        opponent: "Thunder Esports",
        date: "December 28, 2024",
        type: "Practice Match",
        result: "Victory - 15 Eliminations",
        isUpcoming: false
      },
      {
        opponent: "Cyber Warriors",
        date: "December 25, 2024",
        type: "Scrimmage",
        result: "Victory - 18 Eliminations",
        isUpcoming: false
      }
    ];

    tournamentsData.forEach(tournament => {
      this.createTournament(tournament);
    });

    // Initialize news for new team
    const newsData: InsertNews[] = [
      {
        title: "Rain Esports is Born - New Fortnite Team Launches!",
        excerpt: "We're officially launching Rain Esports! Join us as we build the next champion Fortnite team from the ground up.",
        content: "Welcome to Rain Esports! We're a brand new competitive Fortnite team with big dreams and the determination to reach the top. Our mission is to build a championship-caliber squad while fostering an amazing community of passionate gamers. We're actively recruiting talented players and building our fanbase. Join our Discord to be part of the journey from day one!",
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        publishedAt: "Jan 3, 2025",
        author: "Rain Esports Management"
      },
      {
        title: "Player Tryouts Now Open!",
        excerpt: "Think you have what it takes? We're holding open tryouts for all positions. Show us your skills!",
        content: "Rain Esports is officially holding tryouts for our competitive roster! We're looking for dedicated players in all roles: IGL, Fragger, Support, and Flex players. Tryouts are open to all skill levels - we value attitude, teamwork, and improvement potential just as much as current skill. Join our Discord and sign up for tryout sessions happening every weekend!",
        imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        publishedAt: "Jan 5, 2025",
        author: "Rain Esports Coaching Staff"
      },
      {
        title: "Discord Community Launch Event",
        excerpt: "Join our Discord launch party! Custom games, giveaways, and meet the founding members of Rain Esports.",
        content: "Celebrate the launch of Rain Esports with our Discord community event! We'll be hosting custom Creative maps, build battles, elimination tournaments, and giving away exclusive skins and V-Bucks to our first 500 members. This is your chance to be part of Rain Esports history and help shape our community culture from the beginning.",
        imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        publishedAt: "Jan 1, 2025",
        author: "Rain Esports Community Team"
      }
    ];

    newsData.forEach(newsItem => {
      this.createNews(newsItem);
    });

    // Initialize Discord stats
    this.discordStats = {
      id: 1,
      totalMembers: 440,
      onlineMembers: 136,
      inviteUrl: "https://discord.gg/CXdR3GQVzR",
      updatedAt: new Date()
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(member => member.isActive);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamMemberId++;
    const member: TeamMember = { 
      ...insertTeamMember, 
      id,
      isActive: insertTeamMember.isActive ?? true
    };
    this.teamMembers.set(id, member);
    return member;
  }

  async getTournaments(): Promise<Tournament[]> {
    return Array.from(this.tournaments.values());
  }

  async getUpcomingTournaments(): Promise<Tournament[]> {
    return Array.from(this.tournaments.values()).filter(tournament => tournament.isUpcoming);
  }

  async getRecentResults(): Promise<Tournament[]> {
    return Array.from(this.tournaments.values()).filter(tournament => !tournament.isUpcoming);
  }

  async createTournament(insertTournament: InsertTournament): Promise<Tournament> {
    const id = this.currentTournamentId++;
    const tournament: Tournament = { 
      ...insertTournament, 
      id,
      result: insertTournament.result ?? null,
      isUpcoming: insertTournament.isUpcoming ?? true
    };
    this.tournaments.set(id, tournament);
    return tournament;
  }

  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const news: News = { ...insertNews, id };
    this.news.set(id, news);
    return news;
  }

  async getDiscordStats(): Promise<DiscordStats | undefined> {
    return this.discordStats;
  }

  async updateDiscordStats(stats: InsertDiscordStats): Promise<DiscordStats> {
    this.discordStats = {
      id: 1,
      ...stats,
      updatedAt: new Date()
    };
    return this.discordStats;
  }

  // Admin session methods
  async createAdminSession(session: InsertAdminSession): Promise<AdminSession> {
    const adminSession: AdminSession = {
      ...session,
      createdAt: new Date()
    };
    this.adminSessions.set(session.id, adminSession);
    return adminSession;
  }

  async getAdminSession(id: string): Promise<AdminSession | undefined> {
    const session = this.adminSessions.get(id);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      this.adminSessions.delete(id);
    }
    return undefined;
  }

  async deleteAdminSession(id: string): Promise<void> {
    this.adminSessions.delete(id);
  }

  async cleanExpiredSessions(): Promise<void> {
    const now = new Date();
    const sessionsToDelete: string[] = [];
    this.adminSessions.forEach((session, id) => {
      if (session.expiresAt <= now) {
        sessionsToDelete.push(id);
      }
    });
    sessionsToDelete.forEach(id => this.adminSessions.delete(id));
  }

  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values())
      .filter(announcement => announcement.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    const now = new Date();
    const announcement: Announcement = { 
      title: insertAnnouncement.title,
      message: insertAnnouncement.message,
      type: insertAnnouncement.type ?? "info",
      isActive: insertAnnouncement.isActive ?? true,
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async updateAnnouncement(id: number, updates: Partial<InsertAnnouncement>): Promise<Announcement> {
    const announcement = this.announcements.get(id);
    if (!announcement) {
      throw new Error("Announcement not found");
    }
    
    const updated: Announcement = {
      ...announcement,
      ...updates,
      updatedAt: new Date()
    };
    
    this.announcements.set(id, updated);
    return updated;
  }

  async deleteAnnouncement(id: number): Promise<void> {
    this.announcements.delete(id);
  }
}

export const storage = new MemStorage();
