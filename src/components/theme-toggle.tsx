"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-lg w-full h-9 animate-pulse" />
    )
  }

  return (
    <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-lg w-full">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-all",
          theme === "light" 
            ? "bg-background text-primary shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun size={14} />
        <span className="text-xs font-medium">Claro</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-all",
          theme === "dark" 
            ? "bg-background text-primary shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon size={14} />
        <span className="text-xs font-medium">Escuro</span>
      </button>
    </div>
  )
}
