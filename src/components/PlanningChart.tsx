import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductionEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  type: 'production' | 'maintenance' | 'testing' | 'delivery'
  priority: 'high' | 'medium' | 'low'
  assignee: string
}

interface ProductionLine {
  id: string
  name: string
  events: ProductionEvent[]
}

const sampleData: ProductionLine[] = [
  {
    id: 'line-1',
    name: 'Production Line A',
    events: [
      {
        id: 'event-1',
        title: 'Morning Setup',
        startTime: '08:00',
        endTime: '09:00',
        type: 'production',
        priority: 'high',
        assignee: 'Team Alpha'
      },
      {
        id: 'event-2',
        title: 'Quality Check',
        startTime: '14:00',
        endTime: '15:00',
        type: 'testing',
        priority: 'medium',
        assignee: 'Team Beta'
      },
      {
        id: 'event-3',
        title: 'Evening Clean',
        startTime: '16:00',
        endTime: '17:00',
        type: 'maintenance',
        priority: 'low',
        assignee: 'Team Gamma'
      }
    ]
  },
  {
    id: 'line-2',
    name: 'Production Line B',
    events: [
      {
        id: 'event-4',
        title: 'Quality Testing',
        startTime: '10:00',
        endTime: '11:00',
        type: 'testing',
        priority: 'high',
        assignee: 'QA Team'
      },
      {
        id: 'event-5',
        title: 'Production Run',
        startTime: '12:00',
        endTime: '15:00',
        type: 'production',
        priority: 'medium',
        assignee: 'Production Team'
      }
    ]
  },
  {
    id: 'line-3',
    name: 'Production Line C',
    events: [
      {
        id: 'event-6',
        title: 'Equipment Check',
        startTime: '09:00',
        endTime: '10:00',
        type: 'maintenance',
        priority: 'medium',
        assignee: 'Maintenance Team'
      },
      {
        id: 'event-7',
        title: 'Delivery Prep',
        startTime: '17:00',
        endTime: '18:00',
        type: 'delivery',
        priority: 'high',
        assignee: 'Packaging Team'
      }
    ]
  }
]

const getEventColor = (type: ProductionEvent['type']) => {
  switch (type) {
    case 'production': return 'bg-primary'
    case 'maintenance': return 'bg-accent'
    case 'testing': return 'bg-secondary'
    case 'delivery': return 'bg-destructive'
    default: return 'bg-muted'
  }
}

const getPriorityBorder = (priority: ProductionEvent['priority']) => {
  switch (priority) {
    case 'high': return 'border-l-red-500'
    case 'medium': return 'border-l-yellow-500'
    case 'low': return 'border-l-green-500'
  }
}

const calculateEventPosition = (startTime: string, endTime: string) => {
  const startHour = parseInt(startTime.split(':')[0])
  const startMinute = parseInt(startTime.split(':')[1])
  const endHour = parseInt(endTime.split(':')[0])
  const endMinute = parseInt(endTime.split(':')[1])

  const startOffset = ((startHour - 8) * 60 + startMinute) / 600 * 100 // 10 hours = 600 minutes
  const endOffset = ((endHour - 8) * 60 + endMinute) / 600 * 100

  const left = `${startOffset}%`
  const width = `${endOffset - startOffset}%`
  
  return { left, width }
}

export function PlanningChart() {
  const [selectedLine, setSelectedLine] = useState<string>('all')
  
  const filteredLines = selectedLine === 'all' 
    ? sampleData 
    : sampleData.filter(line => line.id === selectedLine)

  // Generate time slots for the timeline
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8
    return `${hour.toString().padStart(2, '0')}:00`
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Production Planning Chart</h1>
        <p className="text-muted-foreground mt-2">
          Track multiple events across production lines throughout the day.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Timeline</CardTitle>
          <CardDescription>
            View and manage production events across different lines (8:00 AM - 6:00 PM)
          </CardDescription>
          <div className="flex items-center gap-4">
            <Select value={selectedLine} onValueChange={setSelectedLine}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select production line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lines</SelectItem>
                {sampleData.map(line => (
                  <SelectItem key={line.id} value={line.id}>
                    {line.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Timeline Header */}
          <div className="mb-4">
            <div className="grid grid-cols-11 gap-0 text-xs text-muted-foreground border-b pb-2">
              {timeSlots.map((time) => (
                <div key={time} className="text-center">
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Production Lines */}
          <div className="space-y-4">
            {filteredLines.map((line, index) => (
              <div key={line.id} className="relative">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium w-48 flex-shrink-0">{line.name}</h3>
                </div>
                
                {/* Timeline Grid */}
                <div className="relative h-12 bg-muted/20 rounded border">
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-11">
                    {timeSlots.map((_, i) => (
                      <div key={i} className="border-r border-border/20 last:border-r-0"></div>
                    ))}
                  </div>
                  
                  {/* Events */}
                  {line.events.map((event) => {
                    const { left, width } = calculateEventPosition(event.startTime, event.endTime)
                    return (
                      <div
                        key={event.id}
                        className={`absolute top-1 bottom-1 ${getEventColor(event.type)} ${getPriorityBorder(event.priority)} border-l-4 rounded text-white text-xs flex items-center px-2 overflow-hidden`}
                        style={{ left, width }}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-90 truncate">{event.assignee}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Event Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-sm">Production</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span className="text-sm">Maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary rounded"></div>
                    <span className="text-sm">Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-destructive rounded"></div>
                    <span className="text-sm">Delivery</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Priority Levels</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 border-l-4 border-l-red-500 bg-gray-200"></div>
                    <span className="text-sm">High Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 border-l-4 border-l-yellow-500 bg-gray-200"></div>
                    <span className="text-sm">Medium Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 border-l-4 border-l-green-500 bg-gray-200"></div>
                    <span className="text-sm">Low Priority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}