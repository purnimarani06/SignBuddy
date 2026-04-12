import { Outlet, useLocation, Link } from "react-router-dom";
import {
  Home, Type, Hand, Mic, Volume2, GraduationCap, AlertTriangle,
  BookOpen, Settings, Sun, Moon, Menu
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/text-to-sign", label: "Text→Sign", icon: Type },
  { path: "/sign-to-text", label: "Sign→Text", icon: Hand },
  { path: "/voice-to-text", label: "Voice→Text", icon: Mic },
  { path: "/text-to-voice", label: "Text→Voice", icon: Volume2 },
  { path: "/learn", label: "Learn", icon: GraduationCap },
  { path: "/dictionary", label: "Dictionary", icon: BookOpen },
  { path: "/sos", label: "SOS", icon: AlertTriangle },
  { path: "/settings", label: "Settings", icon: Settings },
];

const bottomNavItems = navItems.slice(0, 5);

export default function Layout() {
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Hand className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">SignBridge</span>
        </div>
        <div className="flex-1" />
        <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted transition-colors">
          {dark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-60 border-r border-border bg-card flex-col py-4 px-3 gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <aside className="fixed left-0 top-14 bottom-0 w-64 bg-card border-r border-border z-50 lg:hidden py-4 px-3 flex flex-col gap-1 overflow-y-auto">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 pb-20 lg:pb-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border flex items-center justify-around h-16 px-1">
        {bottomNavItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors min-w-[56px]",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", active && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
