import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

export function ColorPicker({ color, onColorChange, onClose }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color);
  const [rgb, setRgb] = useState(() => {
    // Convert hex to RGB
    const hex = selectedColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b };
  });

  const presetColors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#6b7280",
    "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#9333ea", "#db2777", "#4b5563",
    "#b91c1c", "#c2410c", "#a16207", "#15803d", "#1d4ed8", "#7c2d12", "#be185d", "#374151",
    "#991b1b", "#9a3412", "#854d0e", "#166534", "#1e40af", "#6b21a8", "#9d174d", "#1f2937",
    "#7f1d1d", "#7c2d12", "#713f12", "#14532d", "#1e3a8a", "#581c87", "#831843", "#111827"
  ];

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const updateRGB = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [component]: Math.max(0, Math.min(255, value)) };
    setRgb(newRgb);
    const hexColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setSelectedColor(hexColor);
  };

  const handleColorInputChange = (hexColor: string) => {
    setSelectedColor(hexColor);
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    setRgb({ r, g, b });
  };

  const handleApply = () => {
    onColorChange(selectedColor);
    onClose();
  };

  return (
    <div className="w-80 p-4 bg-card border border-extension-border rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Color Preview */}
        <div className="flex items-center gap-3">
          <div 
            className="w-16 h-16 rounded-lg border-2 border-white shadow-sm"
            style={{ backgroundColor: selectedColor }}
          />
          <div className="flex-1">
            <Label className="text-sm font-medium">Selected Color</Label>
            <div className="text-sm text-muted-foreground font-mono">{selectedColor}</div>
          </div>
        </div>

        <Tabs defaultValue="picker" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="picker">Picker</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="picker" className="space-y-4">
            {/* HTML5 Color Picker */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Color Picker</Label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorInputChange(e.target.value)}
                className="w-full h-12 rounded-md border border-extension-border cursor-pointer"
              />
            </div>

            {/* Hex Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Hex</Label>
              <Input
                value={selectedColor}
                onChange={(e) => handleColorInputChange(e.target.value)}
                placeholder="#000000"
                className="font-mono"
              />
            </div>

            {/* RGB Inputs */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">RGB</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">R</Label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => updateRGB('r', parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">G</Label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => updateRGB('g', parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">B</Label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => updateRGB('b', parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="presets" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Preset Colors</Label>
              <div className="grid grid-cols-8 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-8 h-8 rounded-md border-2 hover:scale-110 transition-transform ${
                      selectedColor === presetColor ? 'border-white shadow-lg' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleColorInputChange(presetColor)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button onClick={handleApply} className="flex-1">
            Apply
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}