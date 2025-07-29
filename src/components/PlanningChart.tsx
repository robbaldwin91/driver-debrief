import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductionEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  type: 'production' | 'maintenance' | 'testing' | 'delivery'
  assignee: string
  priority: 'high' | 'medium' | 'low'
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
        assignee: 'Team Alpha',
        priority: 'high'
      },
      {
        id: 'event-2',
        title: 'Batch Processing',
        startTime: '10:30',
        endTime: '14:00',
        type: 'production',
        assignee: 'Team Beta',
        priority: 'medium'
      },
      {
        id: 'event-3',
        title: 'End of Day Cleanup',
        startTime: '16:00',
        endTime: '17:00',
        type: 'maintenance',
        assignee: 'Maintenance Crew',
        priority: 'low'
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
        startTime: '09:00',
        endTime: '11:00',
        type: 'testing',
        assignee: 'QA Team',
        priority: 'high'
      },
      {
        id: 'event-5',
        title: 'Batch Production',
        startTime: '12:00',
        endTime: '16:00',
        type: 'production',
        assignee: 'Team Gamma',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'line-3',
    name: 'Production Line C',
    events: [
      {
        id: 'event-6',
        title: 'Package Preparation',
        startTime: '14:00',
        endTime: '16:30',
        type: 'production',
        assignee: 'Packaging Team',
        priority: 'medium'
      },
      {
        id: 'event-7',
        title: 'Shipment Delivery',
        startTime: '17:00',
        endTime: '18:00',
        type: 'delivery',
        assignee: 'Logistics Team',
        priority: 'high'
      }
    ]
  }
]

const getEventTypeColor = (type: ProductionEvent['type']) => {
  switch (type) {
    case 'production': return 'bg-primary'
    case 'maintenance': return 'bg-accent'
    case 'testing': return 'bg-secondary'
    case 'delivery': return 'bg-destructive'
    default: return 'bg-muted'
  }
}

const getPriorityColor = (priority: ProductionEvent['priority']) => {
  switch (priority) {
    case 'high': return 'border-l-red-500'
    case 'medium': return 'border-l-yellow-500'
    case 'low': return 'border-l-green-500'
    default: return 'border-l-gray-500'
  }
}

const calculateEventPosition = (startTime: string, endTime: string) => {
  const startHour = parseInt(startTime.split(':')[0])
  const startMinute = parseInt(startTime.split(':')[1])
  const endHour = parseInt(endTime.split(':')[0])
  const endMinute = parseInt(endTime.split(':')[1])

  const startOffset = startHour - 8 + startMinute / 60 // Assuming 8 AM start
  const endOffset = endHour - 8 + endMinute / 60
  const duration = endOffset - startOffset

  const left = `${(startOffset / 12) * 100}%` // 12 hour day
  const width = `${(duration / 12) * 100}%`

  return { left, width }
}

export function PlanningChart() {
  const [selectedLine, setSelectedLine] = useState<string>('all')

  const filteredLines = selectedLine === 'all' 
    ? sampleData 
    : sampleData.filter(line => line.id === selectedLine)

  // Generate time slots for the header (8 AM to 8 PM)
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8
    return hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Production Planning Chart</h1>
        <p className="text-muted-foreground mt-2">
          Timeline view of production line activities and resource allocation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Production Schedule</CardTitle>
              <CardDescription>Daily production line activities and events</CardDescription>
            </div>
            <Select value={selectedLine} onValueChange={setSelectedLine}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lines</SelectItem>
                <SelectItem value="line-1">Production Line A</SelectItem>
                <SelectItem value="line-2">Production Line B</SelectItem>
                <SelectItem value="line-3">Production Line C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Time header */}
            <div className="relative h-8 border-b border-border">
              <div className="absolute inset-0 flex">
                {timeSlots.map((time, index) => (
                  <div 
                    key={time} 
                    className="flex-1 text-xs text-muted-foreground text-center border-r border-border last:border-r-0"
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Production lines */}
            {filteredLines.map((line) => (
              <div key={line.id} className="relative">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium w-40 flex-shrink-0">{line.name}</h3>
                </div>
                
                <div className="relative h-16 bg-muted/30 rounded border">
                  {/* Grid lines */}
                  {timeSlots.map((_, index) => (
                    <div
                      key={index}
                      className="absolute top-0 bottom-0 border-r border-border/30"
                      style={{ left: `${(index / 12) * 100}%` }}
                    />
                  ))}
                  
                  {/* Events */}
                  {line.events.map((event) => {
                    const { left, width } = calculateEventPosition(event.startTime, event.endTime)
                    return (
                      <div
                        key={event.id}
                        className={`absolute top-2 bottom-2 ${getEventTypeColor(event.type)} ${getPriorityColor(event.priority)} border-l-4 rounded-r px-2 flex flex-col justify-center cursor-pointer hover:opacity-80 transition-opacity`}
                        style={{ 
                          left, 
                          width,
                          minWidth: '80px'
                        }}
                        title={`${event.title} (${event.startTime} - ${event.endTime})`}
                      >
                        <div className="text-xs text-primary-foreground">
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