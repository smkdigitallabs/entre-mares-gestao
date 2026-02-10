"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  DollarSign, 
  Calendar, 
  Megaphone, 
  FileText, 
  Home,
  Waves,
  Lightbulb
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import packageJson from "../../../package.json";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Financeiro", href: "/financeiro", icon: DollarSign },
  { name: "Operacional", href: "/operacional", icon: Calendar },
  { name: "Marketing", href: "/marketing", icon: Megaphone },
  { name: "Documentos", href: "/documentos", icon: FileText },
  { name: "Propriedades", href: "/propriedades", icon: Home },
  { name: "Melhorias", href: "/melhorias", icon: Lightbulb },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        setIsOnline(res.ok);
      } catch {
        setIsOnline(false);
      }
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-64 bg-background/80 backdrop-blur-md border-r border-border flex flex-col h-screen sticky top-0 transition-colors">
      <div className="p-6 flex items-center gap-2 border-b border-border">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 transition-colors">
          <Waves size={24} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight text-foreground">Entre Marés</span>
          <span className="text-xs text-muted-foreground">Gestão Profissional</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
              pathname === item.href 
                ? "bg-secondary text-primary font-medium shadow-sm" 
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="bg-secondary/30 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-medium text-muted-foreground">Conta</span>
            <UserButton showName />
          </div>

          <div>
            <div className="flex items-center gap-2 mt-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isOnline === null ? "bg-slate-300" : 
                isOnline ? "bg-green-500 animate-pulse" : "bg-rose-500"
              )} />
              <span className="text-sm text-foreground">
                {isOnline === null ? "Verificando..." : 
                 isOnline ? "Sistema Online" : "Sistema Offline"}
              </span>
            </div>
          </div>
          
          <div className="text-center pt-1 border-t border-border/50 mt-2">
            <span className="text-[10px] text-muted-foreground font-mono tracking-wider">v{packageJson.version}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
