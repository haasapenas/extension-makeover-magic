import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Shield, MessageSquare, User } from "lucide-react";

interface ModerationLog {
  id: string;
  action: string;
  target: string;
  reason: string;
  timestamp: Date;
  moderator: string;
  type: "comment" | "user" | "video";
}

export function LogsPage() {
  const [logs, setLogs] = useState<ModerationLog[]>([
    {
      id: "1",
      action: "Comment Deleted",
      target: "User comment on 'Sample Video'",
      reason: "Spam content",
      timestamp: new Date("2024-01-15T10:30:00"),
      moderator: "Admin",
      type: "comment"
    },
    {
      id: "2", 
      action: "User Warned",
      target: "@problematic_user",
      reason: "Multiple policy violations",
      timestamp: new Date("2024-01-15T09:15:00"),
      moderator: "Moderator1",
      type: "user"
    }
  ]);

  const clearLogs = () => {
    setLogs([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "comment":
        return "secondary";
      case "user":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Moderation Log</h1>
          <p className="text-muted-foreground mt-1">
            Track all moderation actions and decisions
          </p>
        </div>
        <Button 
          variant="destructive" 
          onClick={clearLogs}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Logs
        </Button>
      </div>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No moderation logs found.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      {getTypeIcon(log.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{log.action}</CardTitle>
                      <CardDescription>{log.target}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getTypeBadgeVariant(log.type)}>
                      {log.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {log.timestamp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    <strong>Reason:</strong> {log.reason}
                  </span>
                  <span className="text-muted-foreground">
                    <strong>Moderator:</strong> {log.moderator}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}