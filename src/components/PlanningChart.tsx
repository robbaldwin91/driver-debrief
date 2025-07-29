import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


  startTime: string
  type: 'pro
  assignee: str

  id: string
  events: ProductionEvent[]

  {
 

        title: 'Morning Se
        endT
        priori
      },
 

        type: 'production',
   
      {
        title: 'End of Day C
        endTi
       
      }
  },
    id: 'line-2',
    events: [
        id: 'event-4',
        startTime: '08:00',
        type: 'testing',
        
      {
        title: 'Batch 
        endTime: '16:00',
        priority: 'medium',
      }
  },
    id: 'line-3',
    events: [
        
       
        type: 'product
        assignee: 'Packaging Team'
      {
        title: 'Shipment 
        endTime: '18:00',
        priority: 'high'
      }
  }

  co
})
const getEventTyp
    case 'production': retur
    case 'tes
    def
}
const getPriorityColor = (priority: 
    case 'high': return 'bo
    case 'low': return 'b
  }

  const startHour = parseIn
  const 

  const duration = (en
  const left = `${(startOffset 
  
}
export function Planning

    ...line,
      s
  }))
  re
   
          <div cl
              <CardTitle cl
            <
       
              </Select
                <SelectItem value="a
                <SelectItem
                <SelectIt
            </Select>
        </CardHeader>
          <div className="mb-4">
        
       
              {timeSlo
                  {time}
              ))}

            {filteredLine
                <div clas
                    <div clas
       
     
   
 

                        style={{ left: `${(index / 12) *
                    
                    {/* Events */}
  

                          className={`absolut
                 
                            minWidth: '80p
                          title={`${event.
                          <div className=
                        </div>
                    })}
   
 

          <div className="mt-6 pt-4 border-t bor
              <div>
                <div className="space-y-2"
                    <div className="w-4 h-4 bg-
                  </div>
                    <div className="w-4
   
 

                    <div className="w-4 h-4 bg-destructive rounded"></di
                  </div>
              </div>
                <h4 className="text-sm font-mediu
                  <div className="flex items-center

                  <div className="flex items-center gap-2"
                    <span className="text-sm">Medium Priority</span>
  
                    <span className="text-sm"
                </div>
  
        </CardContent>
 



















































































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






