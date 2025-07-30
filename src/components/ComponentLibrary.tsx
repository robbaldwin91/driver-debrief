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
  Calendar as CalendarIcon, 
  ChevronsUpDown, 
  Check, 
  Info, 
  AlertTriangle, 
  Star,
  MapPin,
  Users,
  Search,
  ChevronUp,
  ChevronDown,
  Clock,
  User
} from "lucide-react"
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
  { name: 'Desktop', value: 45, color: '#3b82f6' },
  { name: 'Mobile', value: 35, color: '#10b981' },
  { name: 'Tablet', value: 20, color: '#f97316' },
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
                  <CalendarIcon className="mr-2 h-4 w-4" />
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
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                            <ChevronUp className="h-4 w-4" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Example 1 */}
            <Card className="flex flex-col overflow-hidden pt-0">
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
                <CardTitle className="text-lg">Modern Web Development</CardTitle>
                <CardDescription className="text-primary font-medium">
                  Frontend Technologies
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                {cardFeatures.showDescription && (
                  <p className="text-sm text-muted-foreground mb-4">
                    This card showcases modern web development technologies and best practices for building scalable applications.
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

            {/* Card Example 2 */}
            <Card className="flex flex-col overflow-hidden pt-0">
              {cardFeatures.showImage && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" 
                    alt="Analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="flex-none">
                {cardFeatures.showLabels && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">Analytics</Badge>
                    <Badge variant="secondary">Data Science</Badge>
                  </div>
                )}
                <CardTitle className="text-lg">Data Analytics Platform</CardTitle>
                <CardDescription className="text-primary font-medium">
                  Business Intelligence
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                {cardFeatures.showDescription && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced analytics platform for processing large datasets and generating actionable business insights.
                  </p>
                )}
                
                {cardFeatures.showMetadata && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>Feb 28, 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>New York</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>89 users</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      <span>4.9/5.0</span>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {cardFeatures.showFooter && (
                <CardContent className="flex-none pt-0">
                  <Button className="w-full">
                    View Dashboard
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Card Example 3 */}
            <Card className="flex flex-col overflow-hidden pt-0">
              {cardFeatures.showImage && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop" 
                    alt="Business"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="flex-none">
                {cardFeatures.showLabels && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">Business</Badge>
                    <Badge variant="secondary">Strategy</Badge>
                  </div>
                )}
                <CardTitle className="text-lg">Business Strategy Tools</CardTitle>
                <CardDescription className="text-primary font-medium">
                  Enterprise Solutions
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                {cardFeatures.showDescription && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive suite of tools for strategic planning, market analysis, and business growth optimization.
                  </p>
                )}
                
                {cardFeatures.showMetadata && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>Apr 10, 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>London</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>234 enterprises</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      <span>4.7/5.0</span>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {cardFeatures.showFooter && (
                <CardContent className="flex-none pt-0">
                  <Button className="w-full">
                    Get Started
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
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      name="Users"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      name="Revenue"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                    />
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
                    <Bar dataKey="count" fill="#8b5cf6" name="Count" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Area Chart Sample */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Area Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={sampleChartData}>
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
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#f97316" 
                      fill="#f97316" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart Sample */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pie Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={samplePieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {samplePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    {chartFeatures.showTooltip && (
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                    )}
                  </PieChart>
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
                <h3 className="font-semibold">Production Schedule</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="setup">Setup</SelectItem>
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

            <div className="space-y-3">
              {/* Production Line A */}
              <div>
                <div className="text-sm font-medium mb-2 text-muted-foreground">Line A - Assembly</div>
                <div className="relative h-16 bg-muted/20 rounded-lg border">
                  <div className="absolute top-2 bottom-2 left-[5%] w-[25%] bg-blue-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Setup</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>08:00 - 10:00</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 bottom-2 left-[30%] w-[40%] bg-green-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Production Run</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Team Alpha</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 bottom-2 left-[75%] w-[20%] bg-orange-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">QA Check</div>
                  </div>
                </div>
              </div>

              {/* Production Line B */}
              <div>
                <div className="text-sm font-medium mb-2 text-muted-foreground">Line B - Packaging</div>
                <div className="relative h-16 bg-muted/20 rounded-lg border">
                  <div className="absolute top-2 bottom-2 left-[10%] w-[35%] bg-purple-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Packaging</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>09:00 - 13:30</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 bottom-2 left-[50%] w-[25%] bg-red-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Maintenance</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Tech Team</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Production Line C */}
              <div>
                <div className="text-sm font-medium mb-2 text-muted-foreground">Line C - Quality Control</div>
                <div className="relative h-16 bg-muted/20 rounded-lg border">
                  <div className="absolute top-2 bottom-2 left-[15%] w-[30%] bg-teal-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Inspection</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>10:00 - 13:00</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 bottom-2 left-[50%] w-[25%] bg-yellow-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Testing</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>QA Team</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 bottom-2 left-[80%] w-[15%] bg-indigo-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Audit</div>
                  </div>
                </div>
              </div>

              {/* Production Line D */}
              <div>
                <div className="text-sm font-medium mb-2 text-muted-foreground">Line D - Shipping</div>
                <div className="relative h-16 bg-muted/20 rounded-lg border">
                  <div className="absolute top-2 bottom-2 left-[20%] w-[40%] bg-pink-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Preparation</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>11:00 - 15:00</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 bottom-2 left-[65%] w-[30%] bg-cyan-500 rounded-md p-2 cursor-pointer">
                    <div className="text-xs text-white font-medium">Dispatch</div>
                    {planningFeatures.showEventDetails && (
                      <div className="text-xs text-white/80 flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Logistics</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {planningFeatures.showLegend && (
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    <span className="text-sm">Setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span className="text-sm">Production</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-sm">Maintenance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span className="text-sm">Quality Check</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded" />
                    <span className="text-sm">Packaging</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-teal-500 rounded" />
                    <span className="text-sm">Inspection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-pink-500 rounded" />
                    <span className="text-sm">Shipping Prep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-cyan-500 rounded" />
                    <span className="text-sm">Dispatch</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Map Component */}
      <Card>
        <CardHeader>
          <CardTitle>Map Component</CardTitle>
          <CardDescription>
            Simple Google Maps integration
            <br />
            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              Component: GoogleMaps (embedded iframe)
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/10] rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50398.85242804041!2d-122.46976267832031!3d37.75919937822546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map Display"
            />
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
                <AlertTriangle className="h-4 w-4" />
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