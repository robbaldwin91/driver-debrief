import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

  id: string
  startTime: string

  assignee: string
  id: string
  title: string
  startTime: string
  endTime: string
  type: 'production' | 'maintenance' | 'testing' | 'delivery'
  priority: 'low' | 'medium' | 'high'
  assignee: string
}

interface ProductionLine {
        id: 'e
  events: PlanningEvent[]
 

const mockProductionLines: ProductionLine[] = [
  {
        id: 'event-2',
    events: [
       
        id: 'event-1',
        title: 'Morning Setup',
        startTime: '08:00',
        endTime: '09:00',
        type: 'production',
        priority: 'high',
        assignee: 'Team Alpha'
        
    eve
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
        type: 'maintenanc
        type: 'maintenance',
        priority: 'medium',
        assignee: 'Evening Shift'
       
     
    
   
        endTime: '17:30',
        prior
      }
  },
    name: 'Quality Control',
      {
        title: 'Initial T
        endTime: '11:00'
        priority: 'high',
      },
        
       
        type: 'testing
        assignee: 'QA Lead'
      {
        title: 'Final Ins
        endTime: '15:30',
        priority: 'medium
      }
  }

  const hour = 7 + i
})
const getEventTypeColor = (
    case 'production': re
    case 'testing': retur
    default: return 'bg-gra
}
const g
    c
    
}
const calculateEventPosition = (start
  const endHo
  const
  const left = ((start
  
}
export function PlanningC

    ...line,
      selectedFilter === "all
  }))
  retur
      {/* Header with 
        <div className="flex items-cen
            <CardTitle clas
              Resource pl
          </div>
            <SelectTrigge
            </SelectTrigger>
        
       
              <SelectI
          </Select>
      </CardHeader>
      <CardContent>
        <div className="m
            {timeSlots.map(
                {time}
       
     
    
   
              <div className
             
       
              
                {/* Time grid bac
                  {timeSlot
                  ))}
                
                <div clas
                    const p
        
       
                       
                          minWidt
                        tit
                        <
                      </
                  })}
              </div>
        

        <div className=
            <div className="flex i
              <span>Product
            <div classNam
              <span>Main
            <div className=
              <span>Testing</s
       
     
   
 

              <span>Medium Priority</span>
          </div>
  return `${hour}:00`
  


  switch (type) {





  }



  switch (priority) {




}






  














  }))

  return (





















          </Select>
































                </div>






                      <div















              </div>































          </div>



  )
