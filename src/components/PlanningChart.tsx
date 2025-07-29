import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanningEvent {
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
  events: PlanningEvent[]
}

const mockProductionLines: ProductionLine[] = [
  {
    id: 'line-1',
    name: 'Production Line A',
    events: [
      {
        id: 'event-1',
        title: 'Morning Setup',
        startTime: '08:00',
        endTime: '10:00',
        type: 'production',
        priority: 'high',
        assignee: 'Team Lead'
      },
      {
        id: 'event-2',
        title: 'Production Run',
        startTime: '10:30',
        endTime: '14:00',
        type: 'production',
        priority: 'medium',
        assignee: 'Production Team'
      },
      {
        id: 'event-3',
        title: 'Quality Check',
        startTime: '14:30',
        endTime: '16:00',
        type: 'testing',
        priority: 'high',
        assignee: 'QA Lead'
      }
    ]
  },
  {
    id: 'line-2',
    name: 'Production Line B',
    events: [
      {
        id: 'event-4',
        title: 'Maintenance Check',
        startTime: '07:00',
        endTime: '09:00',
        type: 'maintenance',
        priority: 'high',
        assignee: 'Maintenance'
      },
      {
        id: 'event-5',
        title: 'Batch Production',
        startTime: '09:30',
        endTime: '15:30',
        type: 'production',
        priority: 'medium',
        assignee: 'Production Team'
      },
      {
        id: 'event-6',
        title: 'End of Day Testing',
        startTime: '16:00',
        endTime: '17:30',
        type: 'testing',
        priority: 'low',
        assignee: 'QA Lead'
      }
    ]
  },
  {
    id: 'line-3',
    name: 'Packaging & Delivery',
    events: [
      {
        id: 'event-7',
        title: 'Package Assembly',
        startTime: '10:00',
        endTime: '13:00',
        type: 'production',
        priority: 'medium',
        assignee: 'Pack Team'
      },
      {
        id: 'event-8',
        title: 'Delivery Prep',
        startTime: '16:00',
        endTime: '18:00',
        type: 'delivery',
        priority: 'high',
        assignee: 'Logistics'
      }
    ]
  }
]

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 7 + i
  return `${hour.toString().padStart(2, '0')}:00`
})

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'production': return 'bg-primary'
    case 'maintenance': return 'bg-accent'
    case 'testing': return 'bg-secondary'
    case 'delivery': return 'bg-destructive'
    default: return 'bg-gray-500'
  }
}

const getPriorityColor = (priority: string) => {
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

  const startOffset = (startHour - 7) + (startMinute / 60)
  const duration = (endHour - startHour) + ((endMinute - startMinute) / 60)
  
  const left = `${(startOffset / 12) * 100}%`
  const width = `${(duration / 12) * 100}%`
  
  return { left, width }
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Resource Planning</CardTitle>
              <CardDescription>Production line scheduling and resource allocation</CardDescription>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            {/* Time header */}
            <div className="grid grid-cols-13 gap-0 mb-2">
              <div className="text-sm font-medium text-muted-foreground py-2 px-3">
                Production Line
              </div>
              {timeSlots.map((time) => (
                <div key={time} className="text-xs text-center text-muted-foreground py-2 border-l border-border">
                  {time}
                </div>
              ))}
            </div>

            {/* Production lines and events */}
            {filteredLines.map((line) => (
              <div key={line.id} className="border-b border-border last:border-b-0">
                <div className="grid grid-cols-13 gap-0 min-h-[80px]">
                  <div className="py-4 px-3 border-r border-border bg-muted/30">
                    <div className="font-medium text-sm">{line.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {line.events.length} events
                    </div>
                  </div>
                  
                  <div className="col-span-12 relative py-2">
                    {/* Time grid background */}
                    {timeSlots.map((_, index) => (
                      <div
                        key={index}
                        className="absolute top-0 bottom-0 border-l border-border/30"
                        style={{ left: `${(index / 12) * 100}%` }}
                      />
                    ))}

                    {/* Events */}
                    {line.events.map((event) => {
                      const position = calculateEventPosition(event.startTime, event.endTime)
                      return (
                        <div
                          key={event.id}
                          className={`absolute top-2 bottom-2 ${getEventTypeColor(event.type)} ${getPriorityColor(event.priority)} border-l-4 rounded-md p-2 text-white text-xs shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                          style={{
                            left: position.left,
                            width: position.width,
                            minWidth: '80px'
                          }}
                          title={`${event.title} (${event.startTime} - ${event.endTime})`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-90 truncate">{event.assignee}</div>
                          <div className="text-xs opacity-75">{event.startTime} - {event.endTime}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
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
            <div className="flex items-center gap-2 ml-6">
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
        </CardContent>
      </Card>
    </div>
  )
}