import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ComponentLibrary } from "@/components/ComponentLibrary"
import { Toaster } from "@/components/ui/sonner"

type PageType = 'components'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const saved = localStorage.getItem("current-page");
    return saved ? JSON.parse(saved) : "components";
  });

  useEffect(() => {
    localStorage.setItem("current-page", JSON.stringify(currentPage));
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'components':
        return <ComponentLibrary />
      default:
        return <ComponentLibrary />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentPage={currentPage} onPageChange={(page) => setCurrentPage(page as PageType)} />
      
      <main className="flex-1 container py-8">
        {renderCurrentPage()}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  )
}

export default App