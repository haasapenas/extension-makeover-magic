import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Edit, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Shortcut {
  id: string;
  trigger: string;
  response: string;
}

export function QuickRepliesPage() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: "1", trigger: "!p", response: "Obrigado pela pergunta!" },
    { id: "2", trigger: "!bv", response: "Seja bem-vindo ao canal!" }
  ]);
  
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");

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

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Respostas Rápidas</h1>
            <p className="text-muted-foreground">
              Gerencie seus atalhos para respostas automáticas no chat
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="bg-secondary hover:bg-secondary/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Atalho
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
                    className="bg-input border-extension-border min-h-[80px]"
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

        <div className="space-y-4">
          {shortcuts.length === 0 ? (
            <Card className="p-12 bg-card border border-extension-border shadow-card-extension text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum atalho criado ainda
              </h3>
              <p className="text-muted-foreground mb-4">
                Crie seu primeiro atalho para começar a usar respostas rápidas
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-secondary hover:bg-secondary/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Atalho
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shortcuts.map((shortcut) => (
                <Card 
                  key={shortcut.id}
                  className="p-4 bg-card border border-extension-border shadow-card-extension hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <code className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm font-mono">
                        {shortcut.trigger}
                      </code>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(shortcut)}
                          className="h-8 w-8 p-0 hover:bg-muted-foreground/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteShortcut(shortcut.id)}
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted rounded p-3">
                      <p className="text-sm text-foreground">{shortcut.response}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Os atalhos serão substituídos automaticamente quando digitados no chat
          </p>
        </div>
      </div>
    </div>
  );
}