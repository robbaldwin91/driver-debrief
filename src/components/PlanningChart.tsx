import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDot, Clock, User } from "@phosphor-icons/react"

interface PlanningEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  type: 'production' | 'maintenance' | 'testing' | 'delivery'
  priority: 'low' | 'medium' | 'high'
  assignee?: string
}

interface PlanningLine {
  id: string
  name: string
  description: string
  events: PlanningEvent[]
}

const planningData: PlanningLine[] = [
  {
    id: 'line-1',
    name: 'Production Line A',
    description: 'Main assembly line for consumer products',
    events: [
      {
        id: 'event-1',
        title: 'Morning Setup',
        startTime: '08:00',
        endTime: '09:00',
        type: 'production',
        priority: 'high',
        assignee: 'John Smith'
      },
      {
        id: 'event-2',
        title: 'Batch Production Run',
        startTime: '09:00',
        endTime: '12:00',
        type: 'production',
        priority: 'high',
        assignee: 'Production Team'
      },
      {
        id: 'event-3',
        title: 'Quality Check',
        startTime: '14:00',
        endTime: '15:30',
        type: 'testing',
        priority: 'medium',
        assignee: 'QA Team'
      },
      {
        id: 'event-4',
        title: 'Evening Production',
        startTime: '16:00',
        endTime: '18:00',
        type: 'production',
        priority: 'medium',
        assignee: 'Evening Shift'
      }
    ]
  },
  {
    id: 'line-2',
    name: 'Production Line B',
    description: 'Secondary line for specialized components',
    events: [
      {
        id: 'event-5',
        title: 'Component Assembly',
        startTime: '07:30',
        endTime: '11:00',
        type: 'production',
        priority: 'high',
        assignee: 'Assembly Team'
      },
      {
        id: 'event-6',
        title: 'Line Maintenance',
        startTime: '13:00',
        endTime: '14:00',
        type: 'maintenance',
        priority: 'high',
        assignee: 'Maintenance Crew'
      },
      {
        id: 'event-7',
        title: 'Custom Orders',
        startTime: '15:00',
        endTime: '17:30',
        type: 'production',
        priority: 'low',
        assignee: 'Custom Team'
      }
    ]
  },
  {
    id: 'line-3',
    name: 'Packaging & Dispatch',
    description: 'Final packaging and shipping preparation',
    events: [
      {
        id: 'event-8',
        title: 'Morning Packaging',
        startTime: '08:30',
        endTime: '12:00',
        type: 'production',
        priority: 'medium',
        assignee: 'Package Team'
      },
      {
        id: 'event-9',
        title: 'Shipping Preparation',
        startTime: '13:30',
        endTime: '16:00',
        type: 'delivery',
        priority: 'high',
        assignee: 'Dispatch Team'
      },
      {
        id: 'event-10',
        title: 'Equipment Check',
        startTime: '16:30',
        endTime: '17:00',
        type: 'maintenance',
        priority: 'low',
        assignee: 'Tech Support'
      }
    ]
  },
  {
    id: 'line-4',
    name: 'Quality Control',
    description: 'Testing and quality assurance processes',
    events: [
      {
        id: 'event-11',
        title: 'Incoming Material Test',
        startTime: '07:00',
        endTime: '09:00',
        type: 'testing',
        priority: 'high',
        assignee: 'QC Inspector'
      },
      {
        id: 'event-12',
        title: 'Product Testing',
        startTime: '10:00',
        endTime: '12:30',
        type: 'testing',
        priority: 'high',
        assignee: 'Test Engineers'
      },
      {
        id: 'event-13',
        title: 'Final Quality Review',
        startTime: '15:00',
        endTime: '16:30',
        type: 'testing',
        priority: 'medium',
        assignee: 'QA Manager'
      }
    ]
  }
]

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

const getEventTypeColor = (type: PlanningEvent['type']) => {
  switch (type) {
    case 'production': return 'bg-primary'
    case 'maintenance': return 'bg-accent'
    case 'testing': return 'bg-secondary'
    case 'delivery': return 'bg-muted'
    default: return 'bg-muted'
  }
}

const getPriorityColor = (priority: PlanningEvent['priority']) => {
  switch (priority) {
    case 'high': return 'border-l-destructive'
    case 'medium': return 'border-l-accent'
    case 'low': return 'border-l-muted-foreground'
    default: return 'border-l-muted-foreground'
  }
}

const calculateEventPosition = (startTime: string, endTime: string) => {
  const start = parseInt(startTime.split(':')[0]) + parseInt(startTime.split(':')[1]) / 60
  const end = parseInt(endTime.split(':')[0]) + parseInt(endTime.split(':')[1]) / 60
  const duration = end - start
  const leftPercent = (start / 24) * 100
  const widthPercent = (duration / 24) * 100
  
  return {
    left: `${leftPercent}%`,
    width: `${widthPercent}%`
  }
}

export function PlanningChart() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedDay] = useState('Today')

  const filteredData = planningData.map(line => ({
    ...line,
    events: line.events.filter(event => 
      selectedFilter === 'all' || event.type === selectedFilter
    )
  }))

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Production Planning</h2>
          <p className="text-muted-foreground">
            Daily schedule and resource allocation across production lines
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter events" />
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
      </div>

      {/* Time grid header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDot className="h-5 w-5" />
            <span>{selectedDay} Schedule</span>
          </CardTitle>
          <CardDescription>
            Resource planning and event scheduling across all production lines
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Time scale */}
          <div className="mb-4 relative">
            <div className="flex border-b border-border pb-2">
              {timeSlots.filter((_, i) => i % 2 === 0).map((time) => (
                <div key={time} className="flex-1 text-xs text-muted-foreground text-center">
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Planning lines */}
          <div className="space-y-6">
            {filteredData.map((line) => (
              <div key={line.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{line.name}</h3>
                    <p className="text-sm text-muted-foreground">{line.description}</p>
                  </div>
                  <Badge variant="outline">
                    {line.events.length} events
                  </Badge>
                </div>
                
                {/* Timeline for this line */}
                <div className="relative h-20 bg-muted/20 rounded-lg border">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex">
                    {timeSlots.filter((_, i) => i % 2 === 0).map((_, index) => (
                      <div key={index} className="flex-1 border-r border-border/30 last:border-r-0" />
                    ))}
                  </div>
                  
                  {/* Events */}
                  {line.events.map((event) => {
                    const position = calculateEventPosition(event.startTime, event.endTime)
                    return (
                      <div
                        key={event.id}
                        className={`absolute top-2 bottom-2 ${getEventTypeColor(event.type)} ${getPriorityColor(event.priority)} border-l-4 rounded-md p-2 cursor-pointer hover:opacity-90 transition-opacity`}
                        style={position}
                        title={`${event.title} (${event.startTime} - ${event.endTime})`}
                      >
                        <div className="text-xs text-white font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-white/80 flex items-center space-x-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {event.assignee && (
                          <div className="text-xs text-white/80 flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span className="truncate">{event.assignee}</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Event Types</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded" />
                <span className="text-sm">Production</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-accent rounded" />
                <span className="text-sm">Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-secondary rounded" />
                <span className="text-sm">Testing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded" />
                <span className="text-sm">Delivery</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}