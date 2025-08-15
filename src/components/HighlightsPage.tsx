import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Volume2, Trash2 } from "lucide-react";

const initialHighlights = [
  "abusad*",
  "apost*", 
  "baleia*",
  "boca*",
  "bolsonaro*",
  "bolud*",
  "burr*",
  "cala boc*",
  "chá*",
  "comia*",
  "dentr*",
  "dentro"
];

export function HighlightsPage() {
  const [highlights, setHighlights] = useState(initialHighlights);
  const [newWord, setNewWord] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addHighlight = () => {
    if (newWord.trim() && !highlights.includes(newWord.trim())) {
      setHighlights([...highlights, newWord.trim()]);
      setNewWord("");
    }
  };

  const removeHighlight = (word: string) => {
    setHighlights(highlights.filter(h => h !== word));
  };

  const filteredHighlights = highlights.filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
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
            {filteredHighlights.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-extension-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-extension-red rounded-full"></div>
                  <span className="text-foreground font-medium">{word}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-muted"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeHighlight(word)}
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