import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColorPicker } from "@/components/ColorPicker";
import { Plus, Search, Volume2, Trash2, Palette } from "lucide-react";

const initialHighlights = [
  { word: "abusad*", color: "#ef4444", soundEnabled: false },
  { word: "apost*", color: "#ef4444", soundEnabled: false }, 
  { word: "baleia*", color: "#ef4444", soundEnabled: false },
  { word: "boca*", color: "#ef4444", soundEnabled: false },
  { word: "bolsonaro*", color: "#ef4444", soundEnabled: false },
  { word: "bolud*", color: "#ef4444", soundEnabled: false },
  { word: "burr*", color: "#ef4444", soundEnabled: false },
  { word: "cala boc*", color: "#ef4444", soundEnabled: false },
  { word: "chá*", color: "#ef4444", soundEnabled: false },
  { word: "comia*", color: "#ef4444", soundEnabled: false },
  { word: "dentr*", color: "#ef4444", soundEnabled: false },
  { word: "dentro", color: "#ef4444", soundEnabled: false }
];

const colorOptions = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#a855f7", // purple
  "#ec4899", // pink
];

export function HighlightsPage() {
  const [highlights, setHighlights] = useState(initialHighlights);
  const [newWord, setNewWord] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null);

  const addHighlight = () => {
    if (newWord.trim() && !highlights.some(h => h.word === newWord.trim())) {
      setHighlights([...highlights, { word: newWord.trim(), color: "#ef4444", soundEnabled: false }]);
      setNewWord("");
    }
  };

  const removeHighlight = (wordToRemove: string) => {
    setHighlights(highlights.filter(h => h.word !== wordToRemove));
  };

  const updateHighlightColor = (word: string, color: string) => {
    setHighlights(highlights.map(h => 
      h.word === word ? { ...h, color } : h
    ));
  };

  const toggleSound = (word: string) => {
    setHighlights(highlights.map(h => 
      h.word === word ? { ...h, soundEnabled: !h.soundEnabled } : h
    ));
  };

  const filteredHighlights = highlights.filter(highlight =>
    highlight.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Highlight Settings</h1>
        
        {/* Add Word Section */}
        <Card className="p-6 mb-6 bg-card border border-extension-border shadow-card-extension">
          <div className="flex gap-3">
            <Input
              placeholder="Add new word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
              className="flex-1 bg-input border-extension-border"
            />
            <Button 
              onClick={addHighlight}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Add
            </Button>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-muted/50 border-extension-border hover:bg-muted"
            >
              Save .txt
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-muted/50 border-extension-border hover:bg-muted"
            >
              Save .json
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-muted/50 border-extension-border hover:bg-muted"
            >
              Load List
            </Button>
          </div>
        </Card>

        {/* Search Section */}
        <Card className="p-6 mb-6 bg-card border border-extension-border shadow-card-extension">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-extension-border"
            />
          </div>
        </Card>

        {/* Highlights List */}
        <Card className="p-6 bg-card border border-extension-border shadow-card-extension">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredHighlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-extension-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Popover 
                    open={colorPickerOpen === highlight.word} 
                    onOpenChange={(open) => setColorPickerOpen(open ? highlight.word : null)}
                  >
                    <PopoverTrigger asChild>
                      <button 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer relative group"
                        style={{ backgroundColor: highlight.color }}
                      >
                        <Palette className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 m-auto" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <ColorPicker
                        color={highlight.color}
                        onColorChange={(color) => updateHighlightColor(highlight.word, color)}
                        onClose={() => setColorPickerOpen(null)}
                      />
                    </PopoverContent>
                  </Popover>
                  <span className="text-foreground font-medium">{highlight.word}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSound(highlight.word)}
                    className={`h-8 w-8 p-0 hover:bg-muted transition-colors ${
                      highlight.soundEnabled 
                        ? 'text-green-500 hover:text-green-600' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeHighlight(highlight.word)}
                    className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredHighlights.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No words found matching your search." : "No highlights added yet."}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}