import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Shortcut {
  id: string;
  trigger: string;
  response: string;
}

interface ModuleSettings {
  replyMode: boolean;
  blockChatMenu: boolean;
  chatUserMonitoring: boolean;
  compactMode: boolean;
  showEyeIcon: boolean;
  hideAvatars: boolean;
  quickShortcuts: boolean;
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
    quickShortcuts: false,
    analytics: false,
    replyShortcut: "Double Click"
  });

  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: "1", trigger: "!p", response: "Obrigado pela pergunta!" },
    { id: "2", trigger: "!bv", response: "Seja bem-vindo ao canal!" }
  ]);
  
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");

  const updateSetting = (key: keyof ModuleSettings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addShortcut = () => {
    if (!trigger.trim() || !response.trim()) return;
    
    const newShortcut: Shortcut = {
      id: Date.now().toString(),
      trigger: trigger.trim(),
      response: response.trim()
    };
    
    setShortcuts(prev => [...prev, newShortcut]);
    resetForm();
    setIsDialogOpen(false);
  };

  const updateShortcut = () => {
    if (!editingShortcut || !trigger.trim() || !response.trim()) return;
    
    setShortcuts(prev => prev.map(shortcut => 
      shortcut.id === editingShortcut.id 
        ? { ...shortcut, trigger: trigger.trim(), response: response.trim() }
        : shortcut
    ));
    resetForm();
    setIsDialogOpen(false);
  };

  const deleteShortcut = (id: string) => {
    setShortcuts(prev => prev.filter(shortcut => shortcut.id !== id));
  };

  const startEdit = (shortcut: Shortcut) => {
    setEditingShortcut(shortcut);
    setTrigger(shortcut.trigger);
    setResponse(shortcut.response);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingShortcut(null);
    setTrigger("");
    setResponse("");
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
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

          {/* Quick Shortcuts */}
          <ModuleCard
            title="Atalhos de Resposta Rápida"
            description="Permite criar atalhos que serão automaticamente substituídos pelas suas respostas personalizadas."
            enabled={settings.quickShortcuts}
            onToggle={(value) => updateSetting('quickShortcuts', value)}
          >
            {settings.quickShortcuts && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Atalhos Configurados ({shortcuts.length})
                  </label>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm"
                        onClick={() => setIsDialogOpen(true)} 
                        className="bg-secondary hover:bg-secondary/80"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Novo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-extension-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">
                          {editingShortcut ? "Editar Atalho" : "Novo Atalho"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Atalho (ex: !p, !bv)
                          </label>
                          <Input
                            placeholder="Digite o atalho..."
                            value={trigger}
                            onChange={(e) => setTrigger(e.target.value)}
                            className="bg-input border-extension-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Resposta
                          </label>
                          <Textarea
                            placeholder="Digite a resposta que substituirá o atalho..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            className="bg-input border-extension-border min-h-[60px]"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            onClick={handleDialogClose}
                            className="border-extension-border"
                          >
                            Cancelar
                          </Button>
                          <Button 
                            onClick={editingShortcut ? updateShortcut : addShortcut}
                            className="bg-secondary hover:bg-secondary/80"
                          >
                            {editingShortcut ? "Atualizar" : "Criar"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {shortcuts.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-2">
                      Nenhum atalho criado ainda.
                    </p>
                  ) : (
                    shortcuts.map((shortcut) => (
                      <div 
                        key={shortcut.id}
                        className="flex items-center justify-between p-2 bg-muted rounded border border-extension-border"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-xs font-mono">
                              {shortcut.trigger}
                            </code>
                          </div>
                          <p className="text-xs text-foreground truncate">{shortcut.response}</p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(shortcut)}
                            className="h-6 w-6 p-0 hover:bg-muted-foreground/10"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteShortcut(shortcut.id)}
                            className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </ModuleCard>

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