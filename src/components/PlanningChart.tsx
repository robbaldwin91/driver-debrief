import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/butto
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDot, Clock, User } from "@phosphor-icons/react"

interface PlanningEvent {
  type: 'pro
  title: string
}
  endTime: string
  type: 'production' | 'maintenance' | 'testing' | 'delivery'
  priority: 'low' | 'medium' | 'high'
  events: PlanningE
}

        endTime: '09:00'
        prio
      },
        id: 'event-2'
        startTime: '09:00
 

      {
   
        endTime: 
        priority: 'medium',
      },
        id: '
       
        type: 'product
        assignee: 'Evening Shif
    ]
  {
    name: 'Production Line 
    events: [
        id: 'event-5',
        
       
        assignee: 'Ass
      {
        title: 'Line Mainte
        endTime: '14:00',
        priority: 'high',
      },
        id: 'event-7',
        
       
        assignee: 'Cus
    ]
  {
    name: 'Packaging & Di
    events: [
        id: 'event-8',
        startTime: '08:30',
        
       
      {
        title: 'Shipping Preparation
        endTime: '16:00',
        priority: 'high',
      },
        id: 'event-10',
        startTime: '16:30',
       
     
    
  {
    name: 'Qualit
    events: [
        id: 'event-11',
        start
       
        assignee: 'QC 
      {
        title: 'Product Tes
        endTime: '12:30',
        priority: 'high',
      },
        id: 'event-13',
        
       
        assignee: 'QA 
    ]
]
const timeSlots = Array.f
  return `${hour}:00`

  switch (type) {
    case
    cas
  }

  switch (priority) {
    case 'medium': return
    default: return 'border
}
const calculateEventPosition = 
  const
  con
  
   
  }

  const [selectedFilter, setSelectedFilter] = useState<strin

    ...
      selectedFilter =
  }))
  return (
      {/* Header with con
        <div>
          <p className="tex
          </p>
        
       
            </SelectTr
              <SelectItem value="all">
              <SelectItem v
              <SelectItem
          </Select>
      </div>
      {/* Time grid header */}
        
       
          </CardTitle>
            Resource planning and
        </CardHeader>
          {/* Time scale 
            <div className="
                <div key
                </div>
       

    
   
                 
                    <p class
                  <Badge variant="outline">
             
       
                <div cl
                  <div className="absolu
                      <div 
                  </div>
                  {/* Ev
                    const
                      <div
        
       
                       
                        </div>
                          <
                        <
                        
                         
                        )}
        
       
            ))}

          <div className="m
            <div classNam
                <div cla
              </div>
                <div className
       
     
   
 

          </div>
      </Card>
  )














































































































































































