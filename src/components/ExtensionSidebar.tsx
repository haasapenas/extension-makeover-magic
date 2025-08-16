import { useState } from "react";
import { Settings, Eye, Users, Sliders, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Highlights", url: "/highlights", icon: Eye },
  { title: "Monitored Users", url: "/monitored-users", icon: Users },
  { title: "Modules", url: "/modules", icon: Sliders },
  { title: "Statistics", url: "/statistics", icon: BarChart3 },
];

export function ExtensionSidebar() {
  const { open } = useSidebar();
  const collapsed = !open;

  return (
    <Sidebar className={cn(
      "border-r border-extension-border bg-sidebar transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarContent className="bg-sidebar">
        {/* Logo Section */}
        <div className="p-4 border-b border-extension-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-extension-red font-bold text-lg">MOre IN</h1>
                <p className="text-extension-blue text-sm font-medium">Youtube/IP</p>
              </div>
            )}
          </div>
        </div>

        {/* Language Toggle */}
        {!collapsed && (
          <div className="p-4 border-b border-extension-border">
            <div className="flex gap-1">
              <button className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded">
                PT
              </button>
              <button className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded">
                EN
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                          "hover:bg-sidebar-accent text-sidebar-foreground",
                          isActive && "bg-secondary text-secondary-foreground shadow-md"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-extension-border">
          {!collapsed && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Version 1.0</p>
              <p className="text-xs text-muted-foreground">
                Made with ❤️ by{" "}
                <span className="text-extension-blue">haasapenas</span>
              </p>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}