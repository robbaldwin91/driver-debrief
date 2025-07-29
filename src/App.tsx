import { useState, useEffect } from "react"
import { useKV } from '@github/spark/hooks'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { DataTable } from "@/components/DataTable"
import { InfoCards } from "@/components/InfoCards"
import { ChartsDisplay } from "@/components/ChartsDisplay"
import { PlanningChart } from "@/components/PlanningChart"
import { ComponentLibrary } from "@/components/ComponentLibrary"
import { ThemeCustomizer } from "@/components/ThemeCustomizer"
import { Toaster } from "@/components/ui/sonner"

type PageType = 'table' | 'cards' | 'charts' | 'planning' | 'components' | 'theme'

function App() {
  const [currentPage, setCurrentPage] = useKV<PageType>("current-page", "table")
  const [themeColors] = useKV("theme-colors", {})

  useEffect(() => {
    // Apply theme colors if any are set
    if (Object.keys(themeColors).length > 0) {
      const root = document.documentElement
      Object.entries(themeColors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value as string)
      })
    }
  }, [themeColors])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'table':
        return <DataTable />
      case 'cards':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Information Cards</h1>
              <p className="text-muted-foreground mt-2">
                Responsive card layouts showcasing content with images, labels, and metadata.
              </p>
            </div>
            <InfoCards />
          </div>
        )
      case 'charts':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Data Visualization</h1>
              <p className="text-muted-foreground mt-2">
                Interactive charts and graphs for data analysis and reporting.
              </p>
            </div>
            <ChartsDisplay />
          </div>
        )
      case 'planning':
        return <PlanningChart />
      case 'components':
        return <ComponentLibrary />
      case 'theme':
        return <ThemeCustomizer />
      default:
        return <DataTable />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 container py-8">
        {renderCurrentPage()}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  )
}

export default App