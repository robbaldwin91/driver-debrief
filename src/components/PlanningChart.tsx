import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
        startTime: '17:00',
        endTime: '18:00',
        type: 'maintenance',
        priority: 'low',
        assignee: 'Maintenance'
      }
    ]
  },
  {
    id: 'line-2',
    name: 'Production Line B',
    events: [
      {
        id: 'event-4',
        title: 'Setup',
        startTime: '09:00',
        endTime: '10:00',
        type: 'production',
        priority: 'high',
        assignee: 'Team Gamma'
      },
      {
        id: 'event-5',
        title: 'Packaging',
        startTime: '13:00',
        endTime: '16:00',
        type: 'delivery',
        priority: 'medium',
        assignee: 'Packaging Team'
      }
    ]
  },
  {
    id: 'line-3',
    name: 'Production Line C',
    events: [
      {
        id: 'event-6',
        title: 'Maintenance Check',
        startTime: '10:00',
        endTime: '11:00',
        type: 'maintenance',
        priority: 'high',
        assignee: 'Tech Team'
      },
      {
        id: 'event-7',
        title: 'Final Delivery',
        startTime: '16:00',
        endTime: '17:00',
        type: 'delivery',
        priority: 'medium',
        assignee: 'Logistics'
      }
    ]
  }
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'production': return 'bg-primary'
    case 'maintenance': return 'bg-accent'
    case 'testing': return 'bg-secondary'
    case 'delivery': return 'bg-destructive'
    default: return 'bg-muted'
  }
}

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-l-red-500'
    case 'medium': return 'border-l-yellow-500'
    case 'low': return 'border-l-green-500'
    default: return 'border-l-gray-500'
  }
}

const calculateEventPosition = (startTime: string, endTime: string) => {
  const startMinute = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1])
  const endMinute = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1])
  const startOffset = ((startMinute - 480) / 720) * 100 // 480 = 8AM in minutes, 720 = 12 hours
  const duration = ((endMinute - startMinute) / 720) * 100
  
  return { left: `${Math.max(0, startOffset)}%`, width: `${duration}%` }
}

export function PlanningChart() {
  const [selectedLine, setSelectedLine] = useState<string>('all')
  
  const filteredLines = selectedLine === 'all' 
    ? sampleData 
    : sampleData.filter(line => line.id === selectedLine)

  // Generate time slots for the timeline
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8
    return `${hour.toString().padStart(2, '0')}:00`
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Production Planning Chart</h1>
        <p className="text-muted-foreground mt-2">
          Visual timeline showing production events across multiple lines with scheduling conflicts and priorities.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Schedule</CardTitle>
          <CardDescription>
            Track events across production lines with real-time scheduling
          </CardDescription>
          
          <Select value={selectedLine} onValueChange={setSelectedLine}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select production line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Production Lines</SelectItem>
              {sampleData.map((line) => (
                <SelectItem key={line.id} value={line.id}>
                  {line.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Timeline Header */}
          <div className="grid grid-cols-13 gap-0 text-xs text-muted-foreground border-b pb-2">
            {timeSlots.map((time) => (
              <div key={time} className="text-center">
                {time}
              </div>
            ))}
          </div>
          
          {/* Production Lines */}
          <div className="space-y-4">
            {filteredLines.map((line) => (
              <div key={line.id} className="space-y-2">
                <h3 className="font-medium text-sm">{line.name}</h3>
                <div className="relative h-12 bg-muted/30 rounded border">
                  {line.events.map((event) => {
                    const position = calculateEventPosition(event.startTime, event.endTime)
                    return (
                      <div
                        key={event.id}
                        className={`absolute top-1 bottom-1 rounded px-2 py-1 ${getEventTypeColor(event.type)} ${getPriorityBorder(event.priority)} border-l-4 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity`}
                        style={{ left: position.left, width: position.width }}
                        title={`${event.title} (${event.startTime} - ${event.endTime})`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-90 truncate">{event.assignee}</div>
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