import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, UserPlus } from "lucide-react";

export function MonitoredUsersPage() {
  const [users, setUsers] = useState<string[]>([]);
  const [newUser, setNewUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addUser = () => {
    if (newUser.trim() && !users.includes(newUser.trim())) {
      setUsers([...users, newUser.trim()]);
      setNewUser("");
    }
  };

  const removeUser = (username: string) => {
    setUsers(users.filter(u => u !== username));
  };

  const filteredUsers = users.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Monitored Users</h1>
        
        {/* Add User Section */}
        <Card className="p-6 mb-6 bg-card border border-extension-border shadow-card-extension">
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="Add user nickname"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addUser()}
              className="flex-1 bg-input border-extension-border"
            />
            <Button 
              onClick={addUser}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Add
            </Button>
          </div>

          {/* Search Section */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-extension-border"
            />
          </div>
        </Card>

        {/* Users List */}
        <Card className="p-6 bg-card border border-extension-border shadow-card-extension">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {users.length === 0 ? "No users." : "No users found matching your search."}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-extension-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-foreground font-medium">{user}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUser(user)}
                    className="text-destructive hover:bg-destructive/20"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <span className="text-extension-blue font-medium">haasapenas</span>
          </p>
        </div>
      </div>
    </div>
  );
}