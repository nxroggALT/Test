import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { 
  Shield, 
  LogOut, 
  Users, 
  Trophy, 
  Newspaper, 
  MessageSquare,
  Plus,
  Calendar,
  Megaphone
} from "lucide-react";
import { insertNewsSchema, insertTournamentSchema, insertDiscordStatsSchema, insertAnnouncementSchema } from "@shared/schema";

// Form schemas
const newsFormSchema = insertNewsSchema.extend({
  publishedAt: z.string().min(1, "Published date is required"),
});

const tournamentFormSchema = insertTournamentSchema.extend({
  date: z.string().min(1, "Date is required"),
});

const discordStatsFormSchema = insertDiscordStatsSchema;

const announcementFormSchema = insertAnnouncementSchema;

type NewsForm = z.infer<typeof newsFormSchema>;
type TournamentForm = z.infer<typeof tournamentFormSchema>;
type DiscordStatsForm = z.infer<typeof discordStatsFormSchema>;
type AnnouncementForm = z.infer<typeof announcementFormSchema>;

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, logout, getAuthHeader } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("news");

  // Form setups
  const newsForm = useForm<NewsForm>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      author: "",
      publishedAt: new Date().toISOString().split('T')[0],
    },
  });

  const tournamentForm = useForm<TournamentForm>({
    resolver: zodResolver(tournamentFormSchema),
    defaultValues: {
      opponent: "",
      date: "",
      type: "",
      result: "",
      isUpcoming: true,
    },
  });

  const discordForm = useForm<DiscordStatsForm>({
    resolver: zodResolver(discordStatsFormSchema),
    defaultValues: {
      totalMembers: 0,
      onlineMembers: 0,
      inviteUrl: "",
    },
  });

  const announcementForm = useForm<AnnouncementForm>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "info",
      isActive: true,
    },
  });

  // Mutations
  const createNewsMutation = useMutation({
    mutationFn: async (data: NewsForm) => {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("Not authenticated");
      
      const response = await apiRequest("POST", "/api/admin/news", data, {
        headers: { Authorization: authHeader }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "News article created successfully!",
      });
      newsForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create news article",
        variant: "destructive",
      });
    },
  });

  const createTournamentMutation = useMutation({
    mutationFn: async (data: TournamentForm) => {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("Not authenticated");
      
      const response = await apiRequest("POST", "/api/admin/tournaments", data, {
        headers: { Authorization: authHeader }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Tournament created successfully!",
      });
      tournamentForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/tournaments"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create tournament",
        variant: "destructive",
      });
    },
  });

  const updateDiscordMutation = useMutation({
    mutationFn: async (data: DiscordStatsForm) => {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("Not authenticated");
      
      const response = await apiRequest("PUT", "/api/admin/discord-stats", data, {
        headers: { Authorization: authHeader }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Discord stats updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/discord-stats"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update Discord stats",
        variant: "destructive",
      });
    },
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: async (data: AnnouncementForm) => {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("Not authenticated");
      
      const response = await apiRequest("POST", "/api/admin/announcements", data, {
        headers: { Authorization: authHeader }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Announcement created successfully!",
      });
      announcementForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create announcement",
        variant: "destructive",
      });
    },
  });

  // Queries
  const { data: currentDiscordStats } = useQuery<any>({
    queryKey: ["/api/discord-stats"],
    enabled: activeTab === "discord",
  });

  // Handlers
  const handleLogout = async () => {
    try {
      const authHeader = getAuthHeader();
      if (authHeader) {
        await apiRequest("POST", "/api/admin/logout", {}, {
          headers: { Authorization: authHeader }
        });
      }
    } catch (error) {
      // Ignore logout errors
    } finally {
      logout();
      setLocation("/admin/login");
    }
  };

  const onNewsSubmit = (data: NewsForm) => {
    createNewsMutation.mutate(data);
  };

  const onTournamentSubmit = (data: TournamentForm) => {
    createTournamentMutation.mutate(data);
  };

  const onDiscordSubmit = (data: DiscordStatsForm) => {
    updateDiscordMutation.mutate(data);
  };

  const onAnnouncementSubmit = (data: AnnouncementForm) => {
    createAnnouncementMutation.mutate(data);
  };

  // Check authentication after all hooks are defined
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Rain Esports Admin</h1>
                <p className="text-sm text-slate-400">Content Management Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setLocation("/")}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Go Back to Site
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="news" className="data-[state=active]:bg-blue-600">
              <Newspaper className="h-4 w-4 mr-2" />
              News
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-blue-600">
              <Trophy className="h-4 w-4 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-blue-600">
              <Megaphone className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="discord" className="data-[state=active]:bg-blue-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discord
            </TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create News Article
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Add a new news article to the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...newsForm}>
                  <form onSubmit={newsForm.handleSubmit(onNewsSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={newsForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Article title"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newsForm.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Author</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Author name"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={newsForm.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of the article"
                              className="bg-slate-700/50 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={newsForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Full article content"
                              className="bg-slate-700/50 border-slate-600 text-white min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={newsForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/image.jpg"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newsForm.control}
                        name="publishedAt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Published Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={createNewsMutation.isPending}
                    >
                      {createNewsMutation.isPending ? "Creating..." : "Create Article"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Tournament
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Add a new tournament or match result
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...tournamentForm}>
                  <form onSubmit={tournamentForm.handleSubmit(onTournamentSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={tournamentForm.control}
                        name="opponent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Opponent</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Team or tournament name"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={tournamentForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Championship, Scrim, Tournament"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={tournamentForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={tournamentForm.control}
                        name="result"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Result (optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Win, Loss, 2-1, TBD"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isUpcoming"
                        checked={tournamentForm.watch("isUpcoming")}
                        onChange={(e) => tournamentForm.setValue("isUpcoming", e.target.checked)}
                        className="rounded border-slate-600 bg-slate-700"
                      />
                      <label htmlFor="isUpcoming" className="text-slate-300 text-sm">
                        Upcoming match (uncheck for past results)
                      </label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={createTournamentMutation.isPending}
                    >
                      {createTournamentMutation.isPending ? "Creating..." : "Create Tournament"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Global Announcement
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Create announcements that will appear on all pages of the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...announcementForm}>
                  <form onSubmit={announcementForm.handleSubmit(onAnnouncementSubmit)} className="space-y-4">
                    <FormField
                      control={announcementForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Announcement title"
                              className="bg-slate-700/50 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={announcementForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Announcement message"
                              className="bg-slate-700/50 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={announcementForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                  <SelectValue placeholder="Select announcement type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="info">Info</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="error">Error</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={announcementForm.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-600 p-4 bg-slate-700/50">
                            <div className="space-y-0.5">
                              <FormLabel className="text-slate-300">Active</FormLabel>
                              <div className="text-sm text-slate-400">
                                Show this announcement to users
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={createAnnouncementMutation.isPending}
                    >
                      {createAnnouncementMutation.isPending ? "Creating..." : "Create Announcement"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discord Tab */}
          <TabsContent value="discord" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Update Discord Stats
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update the Discord community statistics displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentDiscordStats && (
                  <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <h3 className="text-white font-medium mb-2">Current Stats:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Total Members:</span>
                        <span className="text-white ml-2">{(currentDiscordStats as any)?.totalMembers || 0}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Online:</span>
                        <span className="text-white ml-2">{(currentDiscordStats as any)?.onlineMembers || 0}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <Form {...discordForm}>
                  <form onSubmit={discordForm.handleSubmit(onDiscordSubmit)} className="space-y-4">
                    <FormField
                      control={discordForm.control}
                      name="inviteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Discord Invite URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://discord.gg/your-invite"
                              className="bg-slate-700/50 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            📍 <strong>Automatic Detection:</strong> Paste your Discord invite link here to automatically fetch member counts, or manually fill the fields below.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={discordForm.control}
                        name="totalMembers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Total Members</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription className="text-slate-400">
                              Auto-filled when Discord invite URL is provided
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={discordForm.control}
                        name="onlineMembers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Online Members</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription className="text-slate-400">
                              Auto-filled when Discord invite URL is provided
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={updateDiscordMutation.isPending}
                    >
                      {updateDiscordMutation.isPending ? "Updating..." : "Update Discord Stats"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}