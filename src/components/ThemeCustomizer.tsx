import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { Upload, Palette, RotateCcw, Eye, Info, Check } from "lucide-react"

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

interface PresetTheme {
  name: string
  color: string
  light: ThemeColors
  dark: ThemeColors
}

const presetThemes: PresetTheme[] = [
  {
    name: "Default Blue",
    color: "#3b82f6",
    light: {
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
    },
    dark: {
      primary: "oklch(0.65 0.18 250)",
      secondary: "oklch(0.25 0.02 250)",
      accent: "oklch(0.65 0.18 180)",
      background: "oklch(0.08 0.005 250)",
      foreground: "oklch(0.92 0.02 250)",
      card: "oklch(0.12 0.01 250)",
      'card-foreground': "oklch(0.92 0.02 250)",
      muted: "oklch(0.18 0.01 250)",
      'muted-foreground': "oklch(0.65 0.02 250)",
      border: "oklch(0.22 0.02 250)",
      input: "oklch(0.22 0.02 250)",
      ring: "oklch(0.65 0.18 250)",
      destructive: "oklch(0.677 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 250)"
    }
  },
  {
    name: "Green",
    color: "#10b981",
    light: {
      primary: "oklch(0.45 0.18 155)",
      secondary: "oklch(0.88 0.02 155)",
      accent: "oklch(0.55 0.18 120)",
      background: "oklch(0.99 0.005 155)",
      foreground: "oklch(0.15 0.02 155)",
      card: "oklch(0.95 0.01 155)",
      'card-foreground': "oklch(0.15 0.02 155)",
      muted: "oklch(0.92 0.01 155)",
      'muted-foreground': "oklch(0.55 0.02 155)",
      border: "oklch(0.85 0.02 155)",
      input: "oklch(0.85 0.02 155)",
      ring: "oklch(0.45 0.18 155)",
      destructive: "oklch(0.577 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 155)"
    },
    dark: {
      primary: "oklch(0.65 0.18 155)",
      secondary: "oklch(0.25 0.02 155)",
      accent: "oklch(0.65 0.18 120)",
      background: "oklch(0.08 0.005 155)",
      foreground: "oklch(0.92 0.02 155)",
      card: "oklch(0.12 0.01 155)",
      'card-foreground': "oklch(0.92 0.02 155)",
      muted: "oklch(0.18 0.01 155)",
      'muted-foreground': "oklch(0.65 0.02 155)",
      border: "oklch(0.22 0.02 155)",
      input: "oklch(0.22 0.02 155)",
      ring: "oklch(0.65 0.18 155)",
      destructive: "oklch(0.677 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 155)"
    }
  },
  {
    name: "Purple",
    color: "#8b5cf6",
    light: {
      primary: "oklch(0.45 0.18 290)",
      secondary: "oklch(0.88 0.02 290)",
      accent: "oklch(0.55 0.18 320)",
      background: "oklch(0.99 0.005 290)",
      foreground: "oklch(0.15 0.02 290)",
      card: "oklch(0.95 0.01 290)",
      'card-foreground': "oklch(0.15 0.02 290)",
      muted: "oklch(0.92 0.01 290)",
      'muted-foreground': "oklch(0.55 0.02 290)",
      border: "oklch(0.85 0.02 290)",
      input: "oklch(0.85 0.02 290)",
      ring: "oklch(0.45 0.18 290)",
      destructive: "oklch(0.577 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 290)"
    },
    dark: {
      primary: "oklch(0.65 0.18 290)",
      secondary: "oklch(0.25 0.02 290)",
      accent: "oklch(0.65 0.18 320)",
      background: "oklch(0.08 0.005 290)",
      foreground: "oklch(0.92 0.02 290)",
      card: "oklch(0.12 0.01 290)",
      'card-foreground': "oklch(0.92 0.02 290)",
      muted: "oklch(0.18 0.01 290)",
      'muted-foreground': "oklch(0.65 0.02 290)",
      border: "oklch(0.22 0.02 290)",
      input: "oklch(0.22 0.02 290)",
      ring: "oklch(0.65 0.18 290)",
      destructive: "oklch(0.677 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 290)"
    }
  },
  {
    name: "Orange",
    color: "#f97316",
    light: {
      primary: "oklch(0.45 0.18 35)",
      secondary: "oklch(0.88 0.02 35)",
      accent: "oklch(0.55 0.18 60)",
      background: "oklch(0.99 0.005 35)",
      foreground: "oklch(0.15 0.02 35)",
      card: "oklch(0.95 0.01 35)",
      'card-foreground': "oklch(0.15 0.02 35)",
      muted: "oklch(0.92 0.01 35)",
      'muted-foreground': "oklch(0.55 0.02 35)",
      border: "oklch(0.85 0.02 35)",
      input: "oklch(0.85 0.02 35)",
      ring: "oklch(0.45 0.18 35)",
      destructive: "oklch(0.577 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 35)"
    },
    dark: {
      primary: "oklch(0.65 0.18 35)",
      secondary: "oklch(0.25 0.02 35)",
      accent: "oklch(0.65 0.18 60)",
      background: "oklch(0.08 0.005 35)",
      foreground: "oklch(0.92 0.02 35)",
      card: "oklch(0.12 0.01 35)",
      'card-foreground': "oklch(0.92 0.02 35)",
      muted: "oklch(0.18 0.01 35)",
      'muted-foreground': "oklch(0.65 0.02 35)",
      border: "oklch(0.22 0.02 35)",
      input: "oklch(0.22 0.02 35)",
      ring: "oklch(0.65 0.18 35)",
      destructive: "oklch(0.677 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 35)"
    }
  },
  {
    name: "Red",
    color: "#ef4444",
    light: {
      primary: "oklch(0.45 0.18 15)",
      secondary: "oklch(0.88 0.02 15)",
      accent: "oklch(0.55 0.18 340)",
      background: "oklch(0.99 0.005 15)",
      foreground: "oklch(0.15 0.02 15)",
      card: "oklch(0.95 0.01 15)",
      'card-foreground': "oklch(0.15 0.02 15)",
      muted: "oklch(0.92 0.01 15)",
      'muted-foreground': "oklch(0.55 0.02 15)",
      border: "oklch(0.85 0.02 15)",
      input: "oklch(0.85 0.02 15)",
      ring: "oklch(0.45 0.18 15)",
      destructive: "oklch(0.577 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 15)"
    },
    dark: {
      primary: "oklch(0.65 0.18 15)",
      secondary: "oklch(0.25 0.02 15)",
      accent: "oklch(0.65 0.18 340)",
      background: "oklch(0.08 0.005 15)",
      foreground: "oklch(0.92 0.02 15)",
      card: "oklch(0.12 0.01 15)",
      'card-foreground': "oklch(0.92 0.02 15)",
      muted: "oklch(0.18 0.01 15)",
      'muted-foreground': "oklch(0.65 0.02 15)",
      border: "oklch(0.22 0.02 15)",
      input: "oklch(0.22 0.02 15)",
      ring: "oklch(0.65 0.18 15)",
      destructive: "oklch(0.677 0.245 27.325)",
      'destructive-foreground': "oklch(0.98 0.005 15)"
    }
  }
]

// Helper function to convert hex to hue for oklch
const hexToHue = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  if (delta === 0) return 0;
  
  let hue = 0;
  if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }
  
  return (hue * 60 + 360) % 360;
}

// Generate theme colors from a custom color
const generateThemeFromColor = (color: string): PresetTheme => {
  const hue = hexToHue(color);
  const accentHue = (hue + 30) % 360;
  
  return {
    name: "Custom",
    color,
    light: {
      primary: `oklch(0.45 0.18 ${hue})`,
      secondary: `oklch(0.88 0.02 ${hue})`,
      accent: `oklch(0.55 0.18 ${accentHue})`,
      background: `oklch(0.99 0.005 ${hue})`,
      foreground: `oklch(0.15 0.02 ${hue})`,
      card: `oklch(0.95 0.01 ${hue})`,
      'card-foreground': `oklch(0.15 0.02 ${hue})`,
      muted: `oklch(0.92 0.01 ${hue})`,
      'muted-foreground': `oklch(0.55 0.02 ${hue})`,
      border: `oklch(0.85 0.02 ${hue})`,
      input: `oklch(0.85 0.02 ${hue})`,
      ring: `oklch(0.45 0.18 ${hue})`,
      destructive: "oklch(0.577 0.245 27.325)",
      'destructive-foreground': `oklch(0.98 0.005 ${hue})`
    },
    dark: {
      primary: `oklch(0.65 0.18 ${hue})`,
      secondary: `oklch(0.25 0.02 ${hue})`,
      accent: `oklch(0.65 0.18 ${accentHue})`,
      background: `oklch(0.08 0.005 ${hue})`,
      foreground: `oklch(0.92 0.02 ${hue})`,
      card: `oklch(0.12 0.01 ${hue})`,
      'card-foreground': `oklch(0.92 0.02 ${hue})`,
      muted: `oklch(0.18 0.01 ${hue})`,
      'muted-foreground': `oklch(0.65 0.02 ${hue})`,
      border: `oklch(0.22 0.02 ${hue})`,
      input: `oklch(0.22 0.02 ${hue})`,
      ring: `oklch(0.65 0.18 ${hue})`,
      destructive: "oklch(0.677 0.245 27.325)",
      'destructive-foreground': `oklch(0.98 0.005 ${hue})`
    }
  };
}

export function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const saved = localStorage.getItem("selected-theme");
    return saved ? JSON.parse(saved) : "Default Blue";
  });
  const [customColor, setCustomColor] = useState("#3b82f6");
  const [logo, setLogo] = useState(() => {
    const saved = localStorage.getItem("app-logo");
    return saved ? JSON.parse(saved) : "";
  });
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.setItem("selected-theme", JSON.stringify(selectedTheme));
  }, [selectedTheme]);

  useEffect(() => {
    localStorage.setItem("app-logo", JSON.stringify(logo));
  }, [logo]);

  const applyTheme = (theme: PresetTheme) => {
    const isDark = document.documentElement.classList.contains('dark');
    const colors = isDark ? theme.dark : theme.light;
    
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value as string)
    })
    
    setSelectedTheme(theme.name);
    toast.success(`${theme.name} theme applied!`)
  }

  const applyCustomTheme = () => {
    const customTheme = generateThemeFromColor(customColor);
    applyTheme(customTheme);
  }

  const resetTheme = () => {
    const defaultTheme = presetThemes[0]; // Default Blue
    applyTheme(defaultTheme);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Theme Customization</h2>
        <p className="text-muted-foreground">
          Choose from preset themes or create your own with a custom color. All themes automatically support dark and light modes.
        </p>
      </div>

      {/* Logo Section */}
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
        </CardContent>
      </Card>

      {/* Preset Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Preset Themes</span>
          </CardTitle>
          <CardDescription>
            Quick theme options that work in both light and dark modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {presetThemes.map((theme) => (
              <div
                key={theme.name}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                  selectedTheme === theme.name ? 'border-primary shadow-md' : 'border-border'
                }`}
                onClick={() => applyTheme(theme)}
              >
                <div className="space-y-2">
                  <div 
                    className="w-full h-8 rounded"
                    style={{ backgroundColor: theme.color }}
                  />
                  <p className="text-sm font-medium text-center">{theme.name}</p>
                </div>
                {selectedTheme === theme.name && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Color */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Custom Color</span>
          </CardTitle>
          <CardDescription>
            Create your own theme from any color
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="custom-color">Choose a color</Label>
              <div className="flex items-center space-x-3">
                <input
                  id="custom-color"
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <Input
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>
            <Button onClick={applyCustomTheme}>
              Apply Custom Theme
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={resetTheme} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              All themes automatically adjust for dark and light modes. Use the theme toggle in the header to switch between modes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}