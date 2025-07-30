import { useState } from "react"
import { Home } from "lucide-react"

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [logo] = useState(() => {
    const saved = localStorage.getItem("app-logo");
    return saved ? JSON.parse(saved) : "";
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          {logo ? (
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          ) : (
            <Home className="h-8 w-8 text-primary" />
          )}
          <h1 className="text-xl font-bold">Component Library</h1>
        </div>
      </div>
    </header>
  )
}