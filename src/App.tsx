import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExtensionSidebar } from "@/components/ExtensionSidebar";
import { MainDashboard } from "@/components/MainDashboard";
import { HighlightsPage } from "@/components/HighlightsPage";
import { MonitoredUsersPage } from "@/components/MonitoredUsersPage";
import { QuickRepliesPage } from "@/components/QuickRepliesPage";
import { ModulesPage } from "@/components/ModulesPage";
import { StatisticsPage } from "@/components/StatisticsPage";
import { Menu } from "lucide-react";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full bg-background">
            <ExtensionSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b border-extension-border bg-card px-4">
                <SidebarTrigger className="mr-2">
                  <Menu className="h-4 w-4" />
                </SidebarTrigger>
                <h2 className="font-semibold text-foreground">YouTube Extension Dashboard</h2>
              </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<MainDashboard />} />
                  <Route path="/highlights" element={<HighlightsPage />} />
                  <Route path="/monitored-users" element={<MonitoredUsersPage />} />
                  <Route path="/quick-replies" element={<QuickRepliesPage />} />
                  <Route path="/modules" element={<ModulesPage />} />
                  <Route path="/statistics" element={<StatisticsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
