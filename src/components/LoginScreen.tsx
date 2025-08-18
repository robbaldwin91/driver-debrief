import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface LoginScreenProps {
  onLogin: (driverNumber: string, pin: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [driverNumber, setDriverNumber] = useState("")
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (driverNumber.length !== 4 || pin.length !== 4) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onLogin(driverNumber, pin)
      setIsLoading(false)
    }, 1000)
  }

  const isValid = driverNumber.length === 4 && pin.length === 4

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Company Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Demo Transport</h1>
          <p className="text-gray-600 dark:text-gray-300">Driver Debrief System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Driver Login</CardTitle>
            <CardDescription>
              Enter your 4-digit driver number and PIN to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="driverNumber">Driver Number</Label>
                <Input
                  id="driverNumber"
                  type="text"
                  placeholder="0000"
                  value={driverNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                    setDriverNumber(value)
                  }}
                  className="text-center text-lg font-mono tracking-widest"
                  maxLength={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pin">PIN Code</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                    setPin(value)
                  }}
                  className="text-center text-lg font-mono tracking-widest"
                  maxLength={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isValid || isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          Need help? Contact your transport manager
        </div>
      </div>
    </div>
  )
}
