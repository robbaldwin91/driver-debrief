import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/s
interface ProductionEvent {

  endTime: string
  assignee: 
}
interface Productio
  name: string
}
const sampleData: 
    id: 'line-1',
 

        startTime: '08:00'
        type
        priori
      {
 

        assignee: 'Team Beta',
   
        id: 'even
        startTime: '16:00',
        type:
       
    ]
  {
    name: 'Production Line 
      {
        title: 'Quality Tes
        endTime: '11:00',
        priority: 'high'
      },
       
        startTime: '12
        type: 'production',
        priority: 'medium'
    ]
  {
    name: 'Production Line C',
      {
        
       
        assignee: 'Pac
      },
        id: 'event-7',
        startTime: '17:00
        type: 'delivery',
        priority: 'high'
    ]
      }
const
    
   
    default: retu
}
const getPrio
    cas
    case 'low': return
  }

  const startHour = parse
  const endHour = parseI

  const endOffset = endH

  const
  return { left, width

  const [selectedLine, setS
  const filteredLines = s
    : sampleData.filter(lin
  // Generate time slots for th
    const hour = i + 8
  })
  ret
    
   
        </p>

        <Card
       
              <CardDes
            <Select value={selectedLi
                <SelectValu
              <SelectCont
                <SelectItem
                <SelectItem value="
            </Select>
        
       
            <div class
                {timeSlots.map((tim
                    key={ti
                  >
                  </div>
              </div>

       
     
  }
 

                      key={index}
                 
                  ))}
                  {/* Events */}
                    const { left, width }
                      <div
                        classN
   
}

                        <div className="text-xs text-primary-foregrou
                     
                      </div>
                  })}
              </div>
          </div>
  }
}

                  <div className="flex items-center gap-2">
                    <span className="text-sm">Product
                  <div className="flex items-center gap
                    <span className="text-sm">Mai
                  <div className="flex items-center

                  <div className="flex items-center gap-2">
                    <span className="text-sm">De
                </div>

                <div className="space-y-2">
                    <div className="w-4 h-2

                    <div
 

                  </div>
              </div>

      </Card>
  )


































            </Select>

        </CardHeader>











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






