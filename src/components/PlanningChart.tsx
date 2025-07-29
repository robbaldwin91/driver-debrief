import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
interface ProductionEvent {

  endTime: string
  priority: 
}
interface Productio
  name: string
}
const sampleData: ProductionLine[] = 
    id: 'line-1',
 

        startTime: '08:00'
        type
  name: string
  events: ProductionEvent[]
}

const sampleData: ProductionLine[] = [
  {
    id: 'line-1',
    name: 'Production Line A',
    events: [
      }
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
        title: 'Quality Tes
        assignee: 'Team Beta'
      },
      {
        id: 'event-3',
        title: 'Evening Clean',
        id: 'event-7',
        startTime: '17:00
        type: 'delivery',
        assignee: 'Packa
    ]
]
const
    
   
    default: retu
}
const getPrio
    cas
    case 'low': return
}
const calculateEventPositio
  const startMinute = par
  const endMinute = pars
  const startOffset = ((s

  const 
  retur

  const [selectedLine, setSelect
  const filteredLines = sel
    : sampleData.filter(l
  // Generate time slots fo
    const hour = i + 8
  })
  retur
     
    
   

        <CardHeader>
          <Ca
       
            <Select va
                <SelectValue plac
              <SelectConten
                {sampleDa
                    {line.na
                ))}
            </Select>
        
       
          <div classNa
              {timeSlots.map((t
                  {time}
              ))}
          </div>
          {/* Production 
            {filteredLines.map((li
       
     
   
 

                    ))}
                 
                  {line.events.map((event)
                    return (
                        key={event.id}
                        style={{ left, width
                        <div c
   
 

              </div>
          </div>
          {/* Legend */}
            <div className="grid grid-cols-2 ga
                <h4 className="text-sm font
   
 

                    <span className="text-sm">Maintenance</span>
                  <div className="flex items-center g
                    <span className="text-sm">Testing</
                  <div className="flex items-cent
                    <span className="text-sm">Deliv

              <div>
                <div className="space-y-2">

                  </div>
                    <div className="w-4 h-2 b
  
                    <div
 

          </div>
      </Card>
  






    const hour = i + 8

  })







        </p>





















            </Select>













          </div>







                </div>








                  </div>











                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-90 truncate">{event.assignee}</div>
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






