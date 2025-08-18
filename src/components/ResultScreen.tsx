import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CheckCircle, User, Home, Key, Truck, Clock } from "lucide-react"

export function ResultScreen() {
  const [showManagerResult, setShowManagerResult] = useState(false)

  const goHome = !showManagerResult
  const seeManager = showManagerResult

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Demo Transport</h1>
                <p className="text-sm text-gray-500">Driver Debrief Complete</p>
              </div>
            </div>
            
            {/* Demo Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
              <Label htmlFor="demo-toggle" className="text-sm text-gray-900">Demo:</Label>
              <Switch 
                id="demo-toggle"
                checked={showManagerResult}
                onCheckedChange={setShowManagerResult}
              />
              <span className="text-sm text-gray-900">{showManagerResult ? "See Manager" : "Go Home"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
            goHome ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            {goHome ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <User className="w-12 h-12 text-orange-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {goHome ? "Great Job Today!" : "Please See Transport Manager"}
          </h1>
          
          <p className="text-lg text-gray-600">
            {goHome 
              ? "Your debrief is complete. You can head home for the day."
              : "Your debrief requires manager review before you can leave."
            }
          </p>
        </div>

        {/* Result Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Today's Summary</span>
            </CardTitle>
            <CardDescription>Route: Manchester → Leeds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Deliveries Completed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Issues Explained</div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-900">Total Time</div>
              <div className="text-sm text-gray-600">11 hours 10 minutes</div>
            </div>

            {seeManager && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Manager Review Required</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Multiple overspeed incidents</li>
                  <li>• Excessive delays on deliveries</li>
                  <li>• Tachograph infringement</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          {goHome ? (
            <>
              {/* Key Return Reminder */}
              <Card className="border-blue-200">
                <CardContent className="flex items-center space-x-4 pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Key className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Don't Forget!</h3>
                    <p className="text-sm text-gray-600">
                      Please return your vehicle keys to the key safe before leaving.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                <Home className="w-5 h-5 mr-2" />
                You Can Go Home
              </Button>
            </>
          ) : (
            <>
              <Card className="border-orange-200">
                <CardContent className="flex items-center space-x-4 pt-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Transport Manager Review</h3>
                    <p className="text-sm text-gray-600">
                      Please report to the transport manager's office for a quick discussion about today's incidents.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                <User className="w-5 h-5 mr-2" />
                Go to Transport Manager
              </Button>
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for completing your driver debrief.</p>
          <p>Drive safe and see you tomorrow!</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Demo Transport © 2025 • Driver Debrief System v1.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
