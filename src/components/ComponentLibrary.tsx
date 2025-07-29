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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { format } from "date-fns"
import { 
  CalendarBlank, 
  CaretUpDown, 
  Check, 
  Info, 
  Warning, 
  Star,
  MapPin,
  Users,
  Calendar as CalendarIcon,
  MagnifyingGlass,
  CaretUp,
  CaretDown,
  Clock,
  User
} from "@phosphor-icons/react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
]

const sampleTableData = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Manager", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "pending" },
]

const sampleChartData = [
  { month: 'Jan', users: 1200, revenue: 45000 },
  { month: 'Feb', users: 1450, revenue: 52000 },
  { month: 'Mar', users: 1650, revenue: 58000 },
]

const sampleBarData = [
  { category: 'Engineering', count: 45 },
  { category: 'Design', count: 23 },
  { category: 'Product', count: 18 },
]

const samplePieData = [
  { name: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Mobile', value: 35, color: 'hsl(var(--accent))' },
  { name: 'Tablet', value: 20, color: 'hsl(var(--muted-foreground))' },
]

export function ComponentLibrary() {
  // Basic form states
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

  // Component toggles
  const [cardFeatures, setCardFeatures] = useState({
    showImage: true,
    showLabels: true,
    showMetadata: true,
    showDescription: true,
    showFooter: true
  })

  const [tableFeatures, setTableFeatures] = useState({
    showSearch: true,
    showSorting: true,
    showRowCount: true,
    showBorders: true
  })

  const [chartFeatures, setChartFeatures] = useState({
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showAxis: true
  })

  const [planningFeatures, setPlanningFeatures] = useState({
    showTimeScale: true,
    showEventDetails: true,
    showLegend: true,
    showFilters: true
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "outline"
    } as const
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"} className="capitalize">
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Component Library</h2>
        <p className="text-muted-foreground">
          Interactive showcase of all UI components used throughout the application. Toggle features to see different variations.
        </p>
      </div>

      {/* Basic Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Form Components</CardTitle>
          <CardDescription>
            Standard form controls and input elements
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Components: Input, Textarea, Select, Button, Label, Switch, Checkbox, RadioGroup
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="min-h-[80px]"
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

          <div className="space-y-2">
            <Label>Searchable Dropdown</Label>
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

          <div className="space-y-3">
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
              <Label htmlFor="checkbox">I agree to terms</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Component */}
      <Card>
        <CardHeader>
          <CardTitle>Data Table Component</CardTitle>
          <CardDescription>
            Interactive table with sorting, filtering, and search capabilities
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Component: DataTable (Table, TableHeader, TableBody, TableRow, TableCell)
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Feature toggles */}
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Toggle Table Features:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="table-search"
                  checked={tableFeatures.showSearch}
                  onCheckedChange={(checked) => setTableFeatures(prev => ({ ...prev, showSearch: checked }))}
                />
                <Label htmlFor="table-search" className="text-sm">Search</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="table-sorting"
                  checked={tableFeatures.showSorting}
                  onCheckedChange={(checked) => setTableFeatures(prev => ({ ...prev, showSorting: checked }))}
                />
                <Label htmlFor="table-sorting" className="text-sm">Sorting</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="table-count"
                  checked={tableFeatures.showRowCount}
                  onCheckedChange={(checked) => setTableFeatures(prev => ({ ...prev, showRowCount: checked }))}
                />
                <Label htmlFor="table-count" className="text-sm">Row Count</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="table-borders"
                  checked={tableFeatures.showBorders}
                  onCheckedChange={(checked) => setTableFeatures(prev => ({ ...prev, showBorders: checked }))}
                />
                <Label htmlFor="table-borders" className="text-sm">Borders</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {tableFeatures.showSearch && (
              <div className="flex items-center justify-between">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search table..."
                    className="pl-10 w-64"
                  />
                </div>
                {tableFeatures.showRowCount && (
                  <div className="text-sm text-muted-foreground">
                    {sampleTableData.length} rows
                  </div>
                )}
              </div>
            )}

            <div className={`rounded-md ${tableFeatures.showBorders ? 'border' : ''}`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {tableFeatures.showSorting ? (
                        <Button variant="ghost" className="h-auto p-0 font-semibold hover:bg-transparent">
                          <span className="flex items-center space-x-1">
                            <span>Name</span>
                            <CaretUp className="h-4 w-4" />
                          </span>
                        </Button>
                      ) : (
                        <span className="font-semibold">Name</span>
                      )}
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleTableData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards Component */}
      <Card>
        <CardHeader>
          <CardTitle>Info Cards Component</CardTitle>
          <CardDescription>
            Responsive card layouts with images, labels, and metadata
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Component: InfoCards (Card, CardHeader, CardContent, CardFooter)
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Feature toggles */}
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Toggle Card Features:</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="card-image"
                  checked={cardFeatures.showImage}
                  onCheckedChange={(checked) => setCardFeatures(prev => ({ ...prev, showImage: checked }))}
                />
                <Label htmlFor="card-image" className="text-sm">Image</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="card-labels"
                  checked={cardFeatures.showLabels}
                  onCheckedChange={(checked) => setCardFeatures(prev => ({ ...prev, showLabels: checked }))}
                />
                <Label htmlFor="card-labels" className="text-sm">Labels</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="card-description"
                  checked={cardFeatures.showDescription}
                  onCheckedChange={(checked) => setCardFeatures(prev => ({ ...prev, showDescription: checked }))}
                />
                <Label htmlFor="card-description" className="text-sm">Description</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="card-metadata"
                  checked={cardFeatures.showMetadata}
                  onCheckedChange={(checked) => setCardFeatures(prev => ({ ...prev, showMetadata: checked }))}
                />
                <Label htmlFor="card-metadata" className="text-sm">Metadata</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="card-footer"
                  checked={cardFeatures.showFooter}
                  onCheckedChange={(checked) => setCardFeatures(prev => ({ ...prev, showFooter: checked }))}
                />
                <Label htmlFor="card-footer" className="text-sm">Footer</Label>
              </div>
            </div>
          </div>

          <div className="max-w-sm">
            <Card className="flex flex-col overflow-hidden">
              {cardFeatures.showImage && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop" 
                    alt="Sample"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="flex-none">
                {cardFeatures.showLabels && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                )}
                <CardTitle className="text-lg">Sample Card Title</CardTitle>
                <CardDescription className="text-primary font-medium">
                  Card Subtitle
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                {cardFeatures.showDescription && (
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a sample card description showing how content appears in the card layout.
                  </p>
                )}
                
                {cardFeatures.showMetadata && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>Mar 15, 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>San Francisco</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>156 participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      <span>4.8/5.0</span>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {cardFeatures.showFooter && (
                <CardContent className="flex-none pt-0">
                  <Button className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Charts Component */}
      <Card>
        <CardHeader>
          <CardTitle>Charts Component</CardTitle>
          <CardDescription>
            Data visualization with interactive charts and graphs
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Component: ChartsDisplay (LineChart, BarChart, PieChart, AreaChart from recharts)
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Feature toggles */}
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Toggle Chart Features:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="chart-grid"
                  checked={chartFeatures.showGrid}
                  onCheckedChange={(checked) => setChartFeatures(prev => ({ ...prev, showGrid: checked }))}
                />
                <Label htmlFor="chart-grid" className="text-sm">Grid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="chart-legend"
                  checked={chartFeatures.showLegend}
                  onCheckedChange={(checked) => setChartFeatures(prev => ({ ...prev, showLegend: checked }))}
                />
                <Label htmlFor="chart-legend" className="text-sm">Legend</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="chart-tooltip"
                  checked={chartFeatures.showTooltip}
                  onCheckedChange={(checked) => setChartFeatures(prev => ({ ...prev, showTooltip: checked }))}
                />
                <Label htmlFor="chart-tooltip" className="text-sm">Tooltip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="chart-axis"
                  checked={chartFeatures.showAxis}
                  onCheckedChange={(checked) => setChartFeatures(prev => ({ ...prev, showAxis: checked }))}
                />
                <Label htmlFor="chart-axis" className="text-sm">Axis</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart Sample */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Line Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={sampleChartData}>
                    {chartFeatures.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
                    {chartFeatures.showAxis && (
                      <>
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      </>
                    )}
                    {chartFeatures.showTooltip && (
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                    )}
                    {chartFeatures.showLegend && <Legend />}
                    <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} name="Users" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart Sample */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bar Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={sampleBarData}>
                    {chartFeatures.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
                    {chartFeatures.showAxis && (
                      <>
                        <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      </>
                    )}
                    {chartFeatures.showTooltip && (
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                    )}
                    {chartFeatures.showLegend && <Legend />}
                    <Bar dataKey="count" fill="hsl(var(--primary))" name="Count" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Planning Chart Component */}
      <Card>
        <CardHeader>
          <CardTitle>Planning Chart Component</CardTitle>
          <CardDescription>
            Timeline visualization for resource planning and scheduling
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Component: PlanningChart (Custom timeline layout with event cards)
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Feature toggles */}
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Toggle Planning Features:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="planning-time"
                  checked={planningFeatures.showTimeScale}
                  onCheckedChange={(checked) => setPlanningFeatures(prev => ({ ...prev, showTimeScale: checked }))}
                />
                <Label htmlFor="planning-time" className="text-sm">Time Scale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="planning-details"
                  checked={planningFeatures.showEventDetails}
                  onCheckedChange={(checked) => setPlanningFeatures(prev => ({ ...prev, showEventDetails: checked }))}
                />
                <Label htmlFor="planning-details" className="text-sm">Event Details</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="planning-legend"
                  checked={planningFeatures.showLegend}
                  onCheckedChange={(checked) => setPlanningFeatures(prev => ({ ...prev, showLegend: checked }))}
                />
                <Label htmlFor="planning-legend" className="text-sm">Legend</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="planning-filters"
                  checked={planningFeatures.showFilters}
                  onCheckedChange={(checked) => setPlanningFeatures(prev => ({ ...prev, showFilters: checked }))}
                />
                <Label htmlFor="planning-filters" className="text-sm">Filters</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {planningFeatures.showFilters && (
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Production Line A</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {planningFeatures.showTimeScale && (
              <div className="flex border-b border-border pb-2">
                <div className="flex-1 text-xs text-muted-foreground text-center">08:00</div>
                <div className="flex-1 text-xs text-muted-foreground text-center">10:00</div>
                <div className="flex-1 text-xs text-muted-foreground text-center">12:00</div>
                <div className="flex-1 text-xs text-muted-foreground text-center">14:00</div>
                <div className="flex-1 text-xs text-muted-foreground text-center">16:00</div>
                <div className="flex-1 text-xs text-muted-foreground text-center">18:00</div>
              </div>
            )}

            <div className="relative h-16 bg-muted/20 rounded-lg border">
              <div className="absolute top-2 bottom-2 left-[5%] w-[25%] bg-primary rounded-md p-2 cursor-pointer">
                <div className="text-xs text-white font-medium">Production Setup</div>
                {planningFeatures.showEventDetails && (
                  <div className="text-xs text-white/80 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>08:00 - 10:00</span>
                  </div>
                )}
              </div>
              <div className="absolute top-2 bottom-2 left-[35%] w-[30%] bg-accent rounded-md p-2 cursor-pointer">
                <div className="text-xs text-white font-medium">Maintenance</div>
                {planningFeatures.showEventDetails && (
                  <div className="text-xs text-white/80 flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>Tech Team</span>
                  </div>
                )}
              </div>
            </div>

            {planningFeatures.showLegend && (
              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span className="text-sm">Production</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-accent rounded" />
                    <span className="text-sm">Maintenance</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Other UI Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Additional UI Elements</CardTitle>
          <CardDescription>
            Buttons, badges, alerts, progress bars, and other interface elements
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Components: Button, Badge, Alert, Progress, Slider, Separator
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Buttons</Label>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => toast.success("Primary button clicked!")}>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Badges</Label>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Progress & Slider</Label>
            <div className="space-y-4">
              <div>
                <Progress value={progress} className="w-full" />
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                    Decrease
                  </Button>
                  <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                    Increase
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm">Slider (Value: {sliderValue[0]})</Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Alerts</Label>
            <div className="space-y-3">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is an informational message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <Warning className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>This requires your attention.</AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}