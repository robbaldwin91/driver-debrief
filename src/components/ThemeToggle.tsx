import { Moon, Sun } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useKV } from '@github/spark/hooks'
import { useEffect } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useKV("theme-mode", false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(current => !current)}
      className="h-9 w-9"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}