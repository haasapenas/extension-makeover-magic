import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Shield } from "lucide-react";

interface ModerationLog {
  id: string;
  date: string;
  user: string;
  message: string;
  action: string;
  moderator: string;
}

export function LogsPage() {
  const [logs, setLogs] = useState<ModerationLog[]>([
    {
      id: "1",
      date: "19/08/2025, 01:16:30",
      user: "accounttest",
      message: "e",
      action: "Timeout (10 segundos.)",
      moderator: "Haasapenas"
    },
    {
      id: "2",
      date: "19/08/2025, 00:45:12", 
      user: "problematic_user",
      message: "spam content here",
      action: "Comment Deleted",
      moderator: "Moderator1"
    }
  ]);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between border-b border-extension-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Moderation Log</h1>
        <Button 
          variant="destructive" 
          onClick={clearLogs}
          className="flex items-center gap-2"
        >
          Clear Logs
        </Button>
      </div>

      {logs.length === 0 ? (
        <Card className="bg-card">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No moderation logs found.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-extension-border">
                  <TableHead className="text-muted-foreground font-medium">Date</TableHead>
                  <TableHead className="text-muted-foreground font-medium">User</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Message</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Action</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Moderator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow 
                    key={log.id} 
                    className="border-b border-extension-border hover:bg-muted/50"
                  >
                    <TableCell className="text-foreground">{log.date}</TableCell>
                    <TableCell className="text-foreground">{log.user}</TableCell>
                    <TableCell className="text-foreground">{log.message}</TableCell>
                    <TableCell className="text-foreground">{log.action}</TableCell>
                    <TableCell className="text-foreground">{log.moderator}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}