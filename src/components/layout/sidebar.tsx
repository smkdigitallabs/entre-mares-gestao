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
  Waves
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Financeiro", href: "/financeiro", icon: DollarSign },
  { name: "Operacional", href: "/operacional", icon: Calendar },
  { name: "Marketing", href: "/marketing", icon: Megaphone },
  { name: "Documentos", href: "/documentos", icon: FileText },
  { name: "Propriedades", href: "/propriedades", icon: Home },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2 border-b">
        <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white">
          <Waves size={24} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight">Entre Marés</span>
          <span className="text-xs text-slate-500">Gestão Profissional</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === item.href 
                ? "bg-sky-50 text-sky-600 font-medium" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t mt-auto">
        <div className="bg-slate-50 rounded-lg p-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-slate-700">Sistema Online</span>
            </div>
          </div>
          <Link
            href="/auth/logout"
            className="w-full text-sm font-medium text-slate-600 border border-slate-200 rounded-md py-2 hover:bg-slate-100 transition-colors text-center"
          >
            Sair
          </Link>
        </div>
      </div>
    </aside>
  );
}
