import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { ComponentLibrary } from "@/components/ComponentLibrary"
import { LoginScreen } from "@/components/LoginScreen"
import { DebriefScreen } from "@/components/DebriefScreen"
import { ResultScreen } from "@/components/ResultScreen"
import { Toaster } from "@/components/ui/sonner"

type PageType = 'components' | 'login' | 'debrief' | 'result'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const saved = localStorage.getItem("current-page");
    return saved ? JSON.parse(saved) : "login";
  });

  const [driverData, setDriverData] = useState<{
    driverNumber: string;
    pin: string;
  } | null>(null);

  const [debriefComplete, setDebriefComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem("current-page", JSON.stringify(currentPage));
  }, [currentPage]);

  const handleLogin = (driverNumber: string, pin: string) => {
    setDriverData({ driverNumber, pin });
    setCurrentPage('debrief');
  };

  const handleDebriefComplete = () => {
    setDebriefComplete(true);
    setCurrentPage('result');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />
      case 'debrief':
        return <DebriefScreen onComplete={handleDebriefComplete} />
      case 'result':
        return <ResultScreen />
      case 'components':
        return <ComponentLibrary />
      default:
        return <LoginScreen onLogin={handleLogin} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Show header on all pages */}
      <Header currentPage={currentPage} onPageChange={(page) => setCurrentPage(page as PageType)} />
      
      {currentPage === 'components' ? (
        <main className="flex-1 container py-8">
          {renderCurrentPage()}
        </main>
      ) : (
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
      )}
      
      <Toaster />
    </div>
  )
}

export default App