import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, Focus, Keyboard } from "lucide-react";

export function MainDashboard() {
  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-md mx-auto space-y-4">
        <Card className="p-6 bg-card border border-extension-border shadow-card-extension">
          <div className="space-y-4">
            {/* Settings Button */}
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 bg-muted/50 border-extension-border hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>

            {/* Focus Mode */}
            <Button 
              variant="outline"
              className="w-full justify-start gap-3 bg-muted/50 border-extension-border hover:bg-muted"
            >
              <Focus className="h-4 w-4" />
              Focus Mode: Off
            </Button>

            {/* Shortcuts */}
            <Button 
              className="w-full justify-start gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Keyboard className="h-4 w-4" />
              Shortcuts: On
            </Button>
          </div>
        </Card>

        {/* Version Info */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Version 1.0</p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <span className="text-extension-blue font-medium">haasapenas</span>
          </p>
        </div>
      </div>
    </div>
  );
}