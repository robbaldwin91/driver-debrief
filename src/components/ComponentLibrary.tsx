import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { toast } from "sonner"
import { format } from "date-fns"
import { CalendarBlank, CaretUpDown, Check, Info, Warning } from "@phosphor-icons/react"

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
]

export function ComponentLibrary() {
  const [textValue, setTextValue] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState("")
  const [sliderValue, setSliderValue] = useState([50])
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const [comboValue, setComboValue] = useState("")
  const [progress, setProgress] = useState(45)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Component Library</h2>
        <p className="text-muted-foreground">
          A comprehensive showcase of all available UI components with interactive examples.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>Interactive form elements for user input</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input
                id="text-input"
                placeholder="Enter some text..."
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea
                id="textarea"
                placeholder="Enter a longer message..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Dropdown</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Searchable Dropdown (Combobox)</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {comboValue
                      ? frameworks.find((framework) => framework.value === comboValue)?.label
                      : "Select framework..."}
                    <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search frameworks..." />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setComboValue(currentValue === comboValue ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                comboValue === framework.value ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date Picker</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarBlank className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
            <CardDescription>Switches, checkboxes, sliders, and more</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="switch"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <Label htmlFor="switch">Enable notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox"
                checked={checkboxValue}
                onCheckedChange={(checked) => setCheckboxValue(checked as boolean)}
              />
              <Label htmlFor="checkbox">I agree to the terms and conditions</Label>
            </div>

            <div className="space-y-3">
              <Label>Radio Group</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label htmlFor="r3">Option 3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Slider (Value: {sliderValue[0]})</Label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Progress Bar</Label>
              <Progress value={progress} className="w-full" />
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                  Decrease
                </Button>
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                  Increase
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buttons & Actions</CardTitle>
            <CardDescription>Various button styles and interactive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => toast.success("Primary button clicked!")}>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Messages</CardTitle>
            <CardDescription>Information, warnings, and status messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational message to provide additional context.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <Warning className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This is a warning message that requires your attention.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Toast Notifications</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Success message!")}
                >
                  Success Toast
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.error("Error message!")}
                >
                  Error Toast
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Info message!")}
                >
                  Info Toast
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}