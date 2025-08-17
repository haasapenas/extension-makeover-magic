import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModuleSettings {
  replyMode: boolean;
  blockChatMenu: boolean;
  chatUserMonitoring: boolean;
  compactMode: boolean;
  showEyeIcon: boolean;
  hideAvatars: boolean;
  analytics: boolean;
  replyShortcut: string;
}

export function ModulesPage() {
  const [settings, setSettings] = useState<ModuleSettings>({
    replyMode: true,
    blockChatMenu: false,
    chatUserMonitoring: false,
    compactMode: false,
    showEyeIcon: false,
    hideAvatars: true,
    analytics: false,
    replyShortcut: "Double Click"
  });

  const updateSetting = (key: keyof ModuleSettings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const ModuleCard = ({ 
    title, 
    description, 
    enabled, 
    onToggle, 
    children 
  }: { 
    title: string; 
    description: string; 
    enabled: boolean; 
    onToggle: (value: boolean) => void;
    children?: React.ReactNode;
  }) => (
    <Card className="p-6 bg-card border border-extension-border shadow-card-extension">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <Switch
              checked={enabled}
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-secondary"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          {children}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Module Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reply Mode */}
          <ModuleCard
            title="Reply Mode"
            description="Enables the quick reply feature, allowing you to reply to users via shortcuts in the chat."
            enabled={settings.replyMode}
            onToggle={(value) => updateSetting('replyMode', value)}
          >
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Reply Shortcut
              </label>
              <Select 
                value={settings.replyShortcut} 
                onValueChange={(value) => updateSetting('replyShortcut', value)}
              >
                <SelectTrigger className="bg-input border-extension-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Double Click">Double Click</SelectItem>
                  <SelectItem value="Right Click">Right Click</SelectItem>
                  <SelectItem value="Ctrl + Click">Ctrl + Click</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </ModuleCard>

          {/* Block Chat Menu */}
          <ModuleCard
            title="Block Chat Menu"
            description="Prevents the YouTube menu from appearing on a normal click. The menu will only open by clicking ⋮. This feature works with Reply Mode and is great for quickly mentioning users without needing to click the reply button. (Experimental)"
            enabled={settings.blockChatMenu}
            onToggle={(value) => updateSetting('blockChatMenu', value)}
          />

          {/* Chat User Monitoring */}
          <ModuleCard
            title="Chat User Monitoring"
            description="Highlights the nicknames of specific users you add to a monitoring list."
            enabled={settings.chatUserMonitoring}
            onToggle={(value) => updateSetting('chatUserMonitoring', value)}
          />

          {/* Compact Mode */}
          <ModuleCard
            title="Compact Mode"
            description="Reduces the spacing between messages so that more messages fit on the screen."
            enabled={settings.compactMode}
            onToggle={(value) => updateSetting('compactMode', value)}
          />

          {/* Show Eye Icon */}
          <ModuleCard
            title="Show Eye Icon"
            description="Shows an eye icon next to monitored users for easy identification."
            enabled={settings.showEyeIcon}
            onToggle={(value) => updateSetting('showEyeIcon', value)}
          />

          {/* Hide Avatars */}
          <ModuleCard
            title="Hide Avatars"
            description="Hides user profile pictures in the chat for a cleaner look."
            enabled={settings.hideAvatars}
            onToggle={(value) => updateSetting('hideAvatars', value)}
          />

          {/* Analytics */}
          <ModuleCard
            title="Analytics e Relatórios"
            description="Habilita o rastreamento de estatísticas e geração de relatórios detalhados sobre o uso da extensão."
            enabled={settings.analytics}
            onToggle={(value) => updateSetting('analytics', value)}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <span className="text-extension-blue font-medium">haasapenas</span>
          </p>
        </div>
      </div>
    </div>
  );
}