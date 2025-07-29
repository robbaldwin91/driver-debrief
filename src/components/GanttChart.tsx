import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useMemo } from "react"

interface GanttTask {
  id: number
  name: string
  startDate: string
  endDate: string
  progress: number
  assignee: string
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high'
  dependencies?: number[]
}

const tasks: GanttTask[] = [
  {
    id: 1,
    name: "Project Planning & Requirements",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    progress: 100,
    assignee: "Alice Johnson",
    status: "completed",
    priority: "high"
  },
  {
    id: 2,
    name: "UI/UX Design Phase",
    startDate: "2024-03-10",
    endDate: "2024-03-30",
    progress: 85,
    assignee: "Bob Smith",
    status: "in-progress",
    priority: "high",
    dependencies: [1]
  },
  {
    id: 3,
    name: "Frontend Development",
    startDate: "2024-03-25",
    endDate: "2024-04-20",
    progress: 45,
    assignee: "Carol Davis",
    status: "in-progress",
    priority: "medium",
    dependencies: [2]
  },
  {
    id: 4,
    name: "Backend API Development",
    startDate: "2024-03-20",
    endDate: "2024-04-15",
    progress: 60,
    assignee: "David Wilson",
    status: "in-progress",
    priority: "medium",
    dependencies: [1]
  },
  {
    id: 5,
    name: "Database Schema Design",
    startDate: "2024-03-15",
    endDate: "2024-03-25",
    progress: 100,
    assignee: "Eva Brown",
    status: "completed",
    priority: "high",
    dependencies: [1]
  },
  {
    id: 6,
    name: "Integration Testing",
    startDate: "2024-04-10",
    endDate: "2024-04-25",
    progress: 0,
    assignee: "Frank Miller",
    status: "not-started",
    priority: "medium",
    dependencies: [3, 4]
  },
  {
    id: 7,
    name: "Performance Optimization",
    startDate: "2024-04-20",
    endDate: "2024-05-05",
    progress: 0,
    assignee: "Grace Chen",
    status: "not-started",
    priority: "low",
    dependencies: [6]
  },
  {
    id: 8,
    name: "User Acceptance Testing",
    startDate: "2024-04-25",
    endDate: "2024-05-10",
    progress: 0,
    assignee: "Henry Taylor",
    status: "blocked",
    priority: "high",
    dependencies: [6]
  }
]

export function GanttChart() {
  const [hoveredTask, setHoveredTask] = useState<number | null>(null)

  const dateRange = useMemo(() => {
    const allDates = tasks.flatMap(task => [task.startDate, task.endDate])
    const minDate = new Date(Math.min(...allDates.map(d => new Date(d).getTime())))
    const maxDate = new Date(Math.max(...allDates.map(d => new Date(d).getTime())))
    
    const start = new Date(minDate)
    start.setDate(start.getDate() - 3)
    const end = new Date(maxDate)
    end.setDate(end.getDate() + 3)
    
    return { start, end }
  }, [])

  const totalDays = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))
  
  const getDateWeeks = () => {
    const weeks = []
    const current = new Date(dateRange.start)
    
    while (current <= dateRange.end) {
      weeks.push(new Date(current))
      current.setDate(current.getDate() + 7)
    }
    return weeks
  }

  const getTaskPosition = (task: GanttTask) => {
    const taskStart = new Date(task.startDate)
    const taskEnd = new Date(task.endDate)
    
    const daysFromStart = Math.ceil((taskStart.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))
    const taskDuration = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24))
    
    const left = (daysFromStart / totalDays) * 100
    const width = (taskDuration / totalDays) * 100
    
    return { left: `${left}%`, width: `${width}%` }
  }

  const getStatusColor = (status: GanttTask['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'blocked': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getPriorityBadge = (priority: GanttTask['priority']) => {
    const variants = {
      low: "secondary",
      medium: "default",
      high: "destructive"
    } as const
    
    return (
      <Badge variant={variants[priority]} className="text-xs">
        {priority}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline - Q1/Q2 2024</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="relative">
              <div className="flex border-b border-border pb-2 mb-4">
                <div className="w-64 font-semibold text-sm">Task</div>
                <div className="flex-1 relative">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {getDateWeeks().map((week, index) => (
                      <div key={index} className="text-center">
                        {week.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-20 text-center text-sm font-semibold">Progress</div>
              </div>

              <div className="space-y-3">
                {tasks.map((task, index) => {
                  const position = getTaskPosition(task)
                  
                  return (
                    <div 
                      key={task.id}
                      className="flex items-center group"
                      onMouseEnter={() => setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      <div className="w-64 pr-4">
                        <div className="text-sm font-medium truncate">{task.name}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                          {getPriorityBadge(task.priority)}
                        </div>
                      </div>
                      
                      <div className="flex-1 relative h-8 bg-muted/30 rounded">
                        <div
                          className={`absolute top-1 bottom-1 rounded ${getStatusColor(task.status)} transition-all duration-200 ${
                            hoveredTask === task.id ? 'opacity-90 shadow-md' : 'opacity-80'
                          }`}
                          style={position}
                        >
                          <div className="flex items-center justify-between px-2 h-full">
                            <span className="text-xs text-white font-medium truncate">
                              {task.name}
                            </span>
                            {task.progress > 0 && (
                              <span className="text-xs text-white">
                                {task.progress}%
                              </span>
                            )}
                          </div>
                          
                          {task.progress > 0 && task.progress < 100 && (
                            <div 
                              className="absolute top-0 bottom-0 left-0 bg-white/20 rounded-l"
                              style={{ width: `${task.progress}%` }}
                            />
                          )}
                        </div>
                        
                        <div className="absolute top-0 bottom-0 left-0 right-0 grid grid-cols-7 opacity-10">
                          {Array.from({ length: Math.ceil(totalDays / 7) }).map((_, i) => (
                            <div key={i} className="border-r border-border" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="w-20 text-center">
                        <div className="text-sm font-medium">{task.progress}%</div>
                        <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${getStatusColor(task.status)}`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Blocked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span>Not Started</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
          </div>
        </div>
      </CardContent>
    </Card>
  )
}