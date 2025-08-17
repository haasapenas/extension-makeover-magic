import { useState } from "react";
import { Card } from "@/components/ui/card";
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

export function ShortcutsManager() {
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
    <Card className="p-6 bg-card border border-extension-border shadow-card-extension">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Atalhos de Resposta Rápida</h3>
          <p className="text-sm text-muted-foreground">
            Crie atalhos que serão substituídos automaticamente por suas respostas
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

      <div className="space-y-3">
        {shortcuts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum atalho criado ainda. Clique em "Novo Atalho" para começar.
          </p>
        ) : (
          shortcuts.map((shortcut) => (
            <div 
              key={shortcut.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg border border-extension-border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm font-mono">
                    {shortcut.trigger}
                  </code>
                  <span className="text-muted-foreground">→</span>
                </div>
                <p className="text-sm text-foreground">{shortcut.response}</p>
              </div>
              <div className="flex gap-2">
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
          ))
        )}
      </div>
    </Card>
  );
}