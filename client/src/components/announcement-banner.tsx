import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
};

const typeColors = {
  info: "bg-blue-600/20 border-blue-600/30 text-blue-100",
  warning: "bg-yellow-600/20 border-yellow-600/30 text-yellow-100",
  success: "bg-green-600/20 border-green-600/30 text-green-100",
  error: "bg-red-600/20 border-red-600/30 text-red-100",
};

const badgeColors = {
  info: "bg-blue-600 text-white",
  warning: "bg-yellow-600 text-white",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};

export default function AnnouncementBanner() {
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<number[]>(() => {
    const stored = localStorage.getItem("dismissedAnnouncements");
    return stored ? JSON.parse(stored) : [];
  });

  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements/active"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const visibleAnnouncements = announcements.filter(
    (announcement) => !dismissedAnnouncements.includes(announcement.id)
  );

  const dismissAnnouncement = (id: number) => {
    const newDismissed = [...dismissedAnnouncements, id];
    setDismissedAnnouncements(newDismissed);
    localStorage.setItem("dismissedAnnouncements", JSON.stringify(newDismissed));
  };

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] space-y-2 p-4">
      {visibleAnnouncements.map((announcement) => {
        const Icon = typeIcons[announcement.type];
        return (
          <Card
            key={announcement.id}
            className={`backdrop-blur-sm border ${typeColors[announcement.type]} shadow-lg`}
          >
            <div className="flex items-start justify-between p-4">
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{announcement.title}</h3>
                    <Badge className={`text-xs ${badgeColors[announcement.type]}`}>
                      {announcement.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm opacity-90">{announcement.message}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAnnouncement(announcement.id)}
                className="h-8 w-8 p-0 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}