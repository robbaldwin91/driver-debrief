import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarDot, Clock, User } from "@phosphor-icons/react"

interface PlanningEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  type: 'production' | 'maintenance' | 'testing' | 'delivery'
  priority: 'low' | 'medium' | 'high'
  assignee: string
}

interface ProductionLine {
  name: string
  events: PlanningEvent[]
}

const mockProductionLines: ProductionLine[] = [
  {
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
        title: 'Main Production Run',
        startTime: '09:00',
        endTime: '15:00',
        type: 'production',
        priority: 'high',
        assignee: 'Team Alpha'
      },
      {
        id: 'event-3',
        title: 'Evening Cleanup',
        startTime: '15:30',
        endTime: '17:00',
        type: 'maintenance',
        priority: 'medium',
        assignee: 'Evening Shift'
      }
    ]
  },
  {
    name: 'Production Line B',
    events: [
      {
        id: 'event-4',
        title: 'Equipment Check',
        startTime: '07:00',
        endTime: '08:00',
        type: 'testing',
        priority: 'medium',
        assignee: 'Assembly Team'
      },
      {
        id: 'event-5',
        title: 'Line Maintenance',
        startTime: '12:00',
        endTime: '14:00',
        type: 'maintenance',
        priority: 'high',
        assignee: 'Maintenance Crew'
      },
      {
        id: 'event-6',
        title: 'Product Delivery',
        startTime: '16:00',
        endTime: '18:00',
        type: 'delivery',
        priority: 'medium',
        assignee: 'Customer Service'
      }
    ]
  },
  {
    name: 'Packaging & Distribution',
    events: [
      {
        id: 'event-7',
        title: 'Package Processing',
        startTime: '08:30',
        endTime: '12:00',
        type: 'production',
        priority: 'high',
        assignee: 'Pack Team'
      },
      {
        id: 'event-8',
        title: 'Shipping Preparation',
        startTime: '13:00',
        endTime: '16:00',
        type: 'delivery',
        priority: 'high',
        assignee: 'Shipping Team'
      },
      {
        id: 'event-9',
        title: 'Final Dispatch',
        startTime: '16:30',
        endTime: '17:30',
        type: 'delivery',
        priority: 'medium',
        assignee: 'Logistics'
      }
    ]
  },
  {
    name: 'Quality Control',
    events: [
      {
        id: 'event-10',
        title: 'Initial Testing',
        startTime: '09:00',
        endTime: '11:00',
        type: 'testing',
        priority: 'high',
        assignee: 'QC Team'
      },
      {
        id: 'event-11',
        title: 'Product Testing',
        startTime: '11:30',
        endTime: '12:30',
        type: 'testing',
        priority: 'high',
        assignee: 'QA Lead'
      },
      {
        id: 'event-12',
        title: 'Final Inspection',
        startTime: '14:00',
        endTime: '15:30',
        type: 'testing',
        priority: 'medium',
        assignee: 'QA Manager'
      }
    ]
  }
]

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 7 + i
  return `${hour}:00`
})

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'production': return 'bg-blue-500'
    case 'maintenance': return 'bg-orange-500'
    case 'testing': return 'bg-green-500'
    case 'delivery': return 'bg-purple-500'
    default: return 'bg-gray-500'
  }
}

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-red-400 border-2'
    case 'medium': return 'border-yellow-400 border-2'
    default: return 'border-gray-300 border'
  }
}

const calculateEventPosition = (startTime: string, endTime: string) => {
  const startHour = parseInt(startTime.split(':')[0])
  const endHour = parseInt(endTime.split(':')[0])
  const startMinutes = parseInt(startTime.split(':')[1])
  const endMinutes = parseInt(endTime.split(':')[1])
  
  const left = ((startHour - 7) * 60 + startMinutes) / (12 * 60) * 100
  const width = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / (12 * 60) * 100
  
  return { left: `${left}%`, width: `${width}%` }
}

export function PlanningChart() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const filteredLines = mockProductionLines.map(line => ({
    ...line,
    events: line.events.filter(event => 
      selectedFilter === "all" || event.type === selectedFilter
    )
  }))

  return (
    <Card className="w-full">
      {/* Header with controls */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Production Planning Chart</CardTitle>
            <CardDescription>
              Resource planning and event scheduling across production lines.
            </CardDescription>
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {/* Time grid header */}
        <div className="mb-4">
          <div className="grid grid-cols-12 gap-1 text-sm text-muted-foreground text-center font-medium">
            {timeSlots.map((time, index) => (
              <div key={index} className="py-2">
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Production lines and events */}
        <div className="space-y-6">
          {filteredLines.map((line, lineIndex) => (
            <div key={lineIndex} className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{line.name}</h3>
                <Badge variant="outline">
                  {line.events.length} events
                </Badge>
              </div>
              
              <div className="relative">
                {/* Time grid background */}
                <div className="absolute inset-0 grid grid-cols-12 gap-1">
                  {timeSlots.map((_, index) => (
                    <div key={index} className="border-r border-border/30 h-16"></div>
                  ))}
                </div>
                
                {/* Events */}
                <div className="relative h-16 bg-muted/20 rounded-lg">
                  {line.events.map((event) => {
                    const position = calculateEventPosition(event.startTime, event.endTime)
                    return (
                      <div
                        key={event.id}
                        className={`absolute top-1 bottom-1 rounded px-2 py-1 text-xs text-white shadow-sm cursor-pointer hover:shadow-md transition-shadow ${getEventTypeColor(event.type)} ${getPriorityBorder(event.priority)}`}
                        style={{
                          left: position.left,
                          width: position.width,
                          minWidth: '80px'
                        }}
                        title={`${event.title} - ${event.assignee} (${event.startTime} - ${event.endTime})`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-90 truncate">{event.assignee}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Production</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Delivery</span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-4 h-4 border-2 border-red-400 rounded"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-yellow-400 rounded"></div>
              <span>Medium Priority</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}