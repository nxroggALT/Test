import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  rank: text("rank").notNull(),
  kda: text("kda").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  opponent: text("opponent").notNull(),
  date: text("date").notNull(),
  type: text("type").notNull(),
  result: text("result"),
  isUpcoming: boolean("is_upcoming").notNull().default(true),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: text("published_at").notNull(),
  author: text("author").notNull(),
});

export const discordStats = pgTable("discord_stats", {
  id: serial("id").primaryKey(),
  totalMembers: integer("total_members").notNull(),
  onlineMembers: integer("online_members").notNull(),
  inviteUrl: text("invite_url").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: varchar("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"), // info, warning, success, error
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export const insertTournamentSchema = createInsertSchema(tournaments).omit({
  id: true,
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
});

export const insertDiscordStatsSchema = createInsertSchema(discordStats).omit({
  id: true,
  updatedAt: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type Tournament = typeof tournaments.$inferSelect;
export type InsertTournament = z.infer<typeof insertTournamentSchema>;
export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type DiscordStats = typeof discordStats.$inferSelect;
export type InsertDiscordStats = z.infer<typeof insertDiscordStatsSchema>;
export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

// Admin session schema
export const insertAdminSessionSchema = createInsertSchema(adminSessions);
export type AdminSession = typeof adminSessions.$inferSelect;
export type InsertAdminSession = z.infer<typeof insertAdminSessionSchema>;
