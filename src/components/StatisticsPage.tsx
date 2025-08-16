import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Eye, RefreshCw, Calendar } from "lucide-react";

interface WordDetection {
  word: string;
  count: number;
  lastDetected: Date;
  category: string;
}

export function StatisticsPage() {
  const [totalDetections, setTotalDetections] = useState(0);
  const [uniqueWords, setUniqueWords] = useState(0);
  const [todayDetections, setTodayDetections] = useState(0);
  const [weeklyDetections, setWeeklyDetections] = useState(0);
  const [topWords, setTopWords] = useState<WordDetection[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Dados simulados para demonstração
  useEffect(() => {
    const mockData: WordDetection[] = [
      { word: "JavaScript", count: 145, lastDetected: new Date(), category: "Technology" },
      { word: "React", count: 132, lastDetected: new Date(), category: "Technology" },
      { word: "Tutorial", count: 98, lastDetected: new Date(), category: "Education" },
      { word: "Python", count: 87, lastDetected: new Date(), category: "Technology" },
      { word: "AI", count: 76, lastDetected: new Date(), category: "Technology" },
      { word: "Machine Learning", count: 65, lastDetected: new Date(), category: "Technology" },
      { word: "CSS", count: 54, lastDetected: new Date(), category: "Technology" },
      { word: "Node.js", count: 43, lastDetected: new Date(), category: "Technology" },
    ];

    setTopWords(mockData);
    setTotalDetections(mockData.reduce((sum, word) => sum + word.count, 0));
    setUniqueWords(mockData.length);
    setTodayDetections(23);
    setWeeklyDetections(156);
  }, []);

  const refreshStats = () => {
    setLastUpdate(new Date());
    // Aqui seria implementada a lógica para atualizar as estatísticas
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Education":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Estatísticas</h1>
            <p className="text-muted-foreground">
              Acompanhe as palavras detectadas em tempo real
            </p>
          </div>
          <Button onClick={refreshStats} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-extension-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Detecções</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalDetections.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Todas as palavras detectadas</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-extension-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Palavras Únicas</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{uniqueWords}</div>
              <p className="text-xs text-muted-foreground">Palavras diferentes encontradas</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-extension-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todayDetections}</div>
              <p className="text-xs text-muted-foreground">Detecções de hoje</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-extension-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{weeklyDetections}</div>
              <p className="text-xs text-muted-foreground">Detecções dos últimos 7 dias</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Words Table */}
        <Card className="bg-card border-extension-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Palavras Mais Detectadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWords.map((word, index) => (
                <div
                  key={word.word}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{word.word}</h3>
                      <p className="text-sm text-muted-foreground">
                        Última detecção: {word.lastDetected.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getCategoryColor(word.category)}>
                      {word.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">{word.count}</div>
                      <div className="text-sm text-muted-foreground">detecções</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Last Update */}
        <div className="text-center text-sm text-muted-foreground">
          Última atualização: {lastUpdate.toLocaleString()}
        </div>
      </div>
    </div>
  );
}