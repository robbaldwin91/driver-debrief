import { useState } from "react"
import { Home, Truck, RotateCcw, LogIn, Map, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [logo] = useState(() => {
    const saved = localStorage.getItem("app-logo");
    return saved ? JSON.parse(saved) : "";
  });

  const resetToLogin = () => {
    onPageChange('login')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          {logo ? (
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          ) : (
            <Home className="h-8 w-8 text-primary" />
          )}
          <h1 className="text-xl font-bold">
            {currentPage === 'components' ? 'Component Library' : 'Demo Transport'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange('login')}
            className={currentPage === 'login' ? 'bg-accent' : ''}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange('debrief')}
            className={currentPage === 'debrief' ? 'bg-accent' : ''}
          >
            <Map className="w-4 h-4 mr-2" />
            Map
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange('result')}
            className={currentPage === 'result' ? 'bg-accent' : ''}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            Results
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange('components')}
            className={currentPage === 'components' ? 'bg-accent' : ''}
          >
            <Home className="w-4 h-4 mr-2" />
            Components
          </Button>
        </div>
      </div>
    </header>
  )
}