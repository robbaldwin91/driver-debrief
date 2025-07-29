import { useState, useRef } from "react"
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { Upload, Palette, RotateCcw, Eye } from "@phosphor-icons/react"

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  card: string
  'card-foreground': string
  muted: string
  'muted-foreground': string
  border: string
  input: string
  ring: string
  destructive: string
  'destructive-foreground': string
}

const defaultColors: ThemeColors = {
  primary: "oklch(0.45 0.18 250)",
  secondary: "oklch(0.88 0.02 250)",
  accent: "oklch(0.55 0.18 180)",
  background: "oklch(0.99 0.005 250)",
  foreground: "oklch(0.15 0.02 250)",
  card: "oklch(0.95 0.01 250)",
  'card-foreground': "oklch(0.15 0.02 250)",
  muted: "oklch(0.92 0.01 250)",
  'muted-foreground': "oklch(0.55 0.02 250)",
  border: "oklch(0.85 0.02 250)",
  input: "oklch(0.85 0.02 250)",
  ring: "oklch(0.45 0.18 250)",
  destructive: "oklch(0.577 0.245 27.325)",
  'destructive-foreground': "oklch(0.98 0.005 250)"
}

export function ThemeCustomizer() {
  const [colors, setColors] = useKV("theme-colors", defaultColors)
  const [logo, setLogo] = useKV("app-logo", "")
  const [previewMode, setPreviewMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors(currentColors => ({
      ...currentColors,
      [key]: value
    }))
  }

  const applyTheme = () => {
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    
    toast.success("Theme applied successfully!")
  }

  const resetTheme = () => {
    setColors(defaultColors)
    const root = document.documentElement
    Object.entries(defaultColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    toast.info("Theme reset to defaults")
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("File size must be less than 1MB")
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogo(result)
        toast.success("Logo uploaded successfully!")
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.info("Logo removed")
  }

  const colorPresets = [
    {
      name: "Ocean Blue",
      colors: {
        ...defaultColors,
        primary: "oklch(0.5 0.2 230)",
        accent: "oklch(0.7 0.15 200)",
        background: "oklch(0.98 0.005 230)",
        card: "oklch(0.94 0.01 230)"
      }
    },
    {
      name: "Forest Green",
      colors: {
        ...defaultColors,
        primary: "oklch(0.45 0.15 130)",
        accent: "oklch(0.65 0.12 160)",
        background: "oklch(0.98 0.005 130)",
        card: "oklch(0.94 0.01 130)"
      }
    },
    {
      name: "Sunset Orange",
      colors: {
        ...defaultColors,
        primary: "oklch(0.6 0.2 40)",
        accent: "oklch(0.7 0.15 60)",
        background: "oklch(0.98 0.005 40)",
        card: "oklch(0.94 0.01 40)"
      }
    },
    {
      name: "Royal Purple",
      colors: {
        ...defaultColors,
        primary: "oklch(0.5 0.2 280)",
        accent: "oklch(0.65 0.15 300)",
        background: "oklch(0.98 0.005 280)",
        card: "oklch(0.94 0.01 280)"
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Theme Customization</h2>
        <p className="text-muted-foreground">
          Customize the app's appearance with your own colors and branding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Color Palette</span>
            </CardTitle>
            <CardDescription>
              Customize the primary colors used throughout the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded border border-border"
                      style={{ backgroundColor: value }}
                    />
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                      placeholder="oklch(0.5 0.2 250)"
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Color Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => setColors(preset.colors)}
                    className="justify-start"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: preset.colors.accent }}
                        />
                      </div>
                      <span>{preset.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={applyTheme} className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                Apply Theme
              </Button>
              <Button variant="outline" onClick={resetTheme}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Logo & Branding</span>
            </CardTitle>
            <CardDescription>
              Upload your logo to customize the app's branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  {logo ? (
                    <img 
                      src={logo} 
                      alt="App Logo" 
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Upload className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No logo uploaded</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <Input
                  ref={fileInputRef}
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: Square image, max 1MB (PNG, JPG, SVG)
                </p>
              </div>

              {logo && (
                <Button variant="outline" onClick={removeLogo} className="w-full">
                  Remove Logo
                </Button>
              )}
            </div>

            <Separator />

            <Alert>
              <AlertDescription>
                Logo changes are applied immediately and will appear in the header navigation.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
          <CardDescription>
            See how your theme looks with these sample components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-card">
            <h3 className="font-semibold mb-3">Sample UI Elements</h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button size="sm">Primary Button</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
              </div>
              
              <div className="flex space-x-2">
                <Badge>Default Badge</Badge>
                <Badge variant="secondary">Secondary Badge</Badge>
                <Badge variant="outline">Outline Badge</Badge>
              </div>
              
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm">
                  This is sample text on a secondary background to show contrast and readability.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}