import { useState } from "react"
import { useKV } from '@github/spark/hooks'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./ThemeToggle"
import { 
  List, 
  House, 
  Table, 
  CreditCard, 
  ChartLine, 
  Calendar, 
  Palette,
  Package
} from "@phosphor-icons/react"

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const navigation = [
  { id: 'table', label: 'Data Table', icon: Table },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'charts', label: 'Charts', icon: ChartLine },
  { id: 'planning', label: 'Planning', icon: Calendar },
  { id: 'components', label: 'Components', icon: Package },
  { id: 'theme', label: 'Theme', icon: Palette },
]

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [logo] = useKV("app-logo", "")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          {logo ? (
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          ) : (
            <House className="h-8 w-8 text-primary" />
          )}
          <h1 className="text-xl font-bold">Component Library</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => onPageChange(item.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            )
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <List className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      onClick={() => {
                        onPageChange(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className="justify-start space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}