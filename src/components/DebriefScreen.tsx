import { useState, useRef, useEffect, useCallback } from "react"
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, AlertTriangle, CheckCircle, Truck, Home, Building2, Package, Car, Users, FileText, Zap, Navigation, Timer } from "lucide-react"
import { toast } from "sonner"

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 53.4678,
  lng: -2.2642
}

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [{"color": "#f5f5f5"}, {"lightness": 10}]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#616161"}, {"lightness": 20}]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{"color": "#f5f5f5"}, {"lightness": 30}]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{"color": "#ffffff"}, {"lightness": 20}]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#9e9e9e"}, {"lightness": 30}]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"color": "#dadada"}, {"lightness": 15}]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#c9c9c9"}, {"lightness": 25}]
    }
  ]
}

// Mock data for route and events - More localized around Manchester
const routeData = [
  {
    id: 1,
    type: "depot",
    location: "Manchester Depot",
    address: "Trafford Park, Manchester M17 8DA",
    coordinates: { lat: 53.4678, lng: -2.3142 },
    scheduledArrival: "06:00",
    actualArrival: "06:05",
    scheduledDeparture: "06:15",
    actualDeparture: "06:20",
    status: "completed",
    arrivalDelay: 5,
    departureDelay: 5
  },
  {
    id: 2,
    type: "delivery",
    location: "Asda Trafford Park",
    address: "Barton Dock Rd, Trafford Park M41 7ZA",
    coordinates: { lat: 53.4598, lng: -2.3234 },
    scheduledArrival: "06:30",
    actualArrival: "06:35",
    scheduledDeparture: "06:45",
    actualDeparture: "06:50",
    status: "completed",
    arrivalDelay: 5,
    departureDelay: 5
  },
  {
    id: 3,
    type: "delivery",
    location: "Asda Old Trafford",
    address: "Chester Rd, Old Trafford M16 0RP",
    coordinates: { lat: 53.4598, lng: -2.2862 },
    scheduledArrival: "07:00",
    actualArrival: "07:15",
    scheduledDeparture: "07:15",
    actualDeparture: "07:35",
    status: "delayed",
    arrivalDelay: 15,
    departureDelay: 20
  },
  {
    id: 4,
    type: "incident",
    incidentType: "harsh_braking",
    location: "A56 Chester Road",
    coordinates: { lat: 53.4598, lng: -2.2950 }, // Between Old Trafford and Hulme on actual route
    time: "07:25",
    status: "requires_explanation"
  },
  {
    id: 5,
    type: "delivery",
    location: "Asda Hulme",
    address: "Princess Rd, Hulme, Manchester M15 5AS",
    coordinates: { lat: 53.4598, lng: -2.2455 },
    scheduledArrival: "07:45",
    actualArrival: "07:50",
    scheduledDeparture: "08:00",
    actualDeparture: "08:05",
    status: "completed",
    arrivalDelay: 5,
    departureDelay: 5
  },
  {
    id: 6,
    type: "delivery",
    location: "Asda Eastlands",
    address: "Ashton New Rd, Clayton M11 4BD",
    coordinates: { lat: 53.4789, lng: -2.1987 },
    scheduledArrival: "08:30",
    actualArrival: "08:45",
    scheduledDeparture: "08:45",
    actualDeparture: "09:05",
    status: "delayed",
    arrivalDelay: 15,
    departureDelay: 20
  },
  {
    id: 7,
    type: "incident",
    incidentType: "overspeed",
    location: "M60 Junction 23",
    coordinates: { lat: 53.4800, lng: -2.1900 }, // Between Eastlands and Ashton on actual route
    time: "09:10",
    status: "requires_explanation"
  },
  {
    id: 8,
    type: "delivery",
    location: "Asda Ashton-under-Lyne",
    address: "Cavendish St, Ashton-under-Lyne OL6 7QL",
    coordinates: { lat: 53.4889, lng: -2.0923 },
    scheduledArrival: "09:30",
    actualArrival: "09:35",
    scheduledDeparture: "09:45",
    actualDeparture: "09:50",
    status: "completed",
    arrivalDelay: 5,
    departureDelay: 5
  },
  {
    id: 9,
    type: "delivery",
    location: "Asda Droylsden",
    address: "Market St, Droylsden M43 6DE",
    coordinates: { lat: 53.4812, lng: -2.1423 },
    scheduledArrival: "10:15",
    actualArrival: "10:30",
    scheduledDeparture: "10:30",
    actualDeparture: "10:50",
    status: "delayed",
    arrivalDelay: 15,
    departureDelay: 20
  },
  {
    id: 10,
    type: "delivery",
    location: "Asda Wythenshawe",
    address: "Civic Centre, Wythenshawe M22 5RX",
    coordinates: { lat: 53.3889, lng: -2.2634 },
    scheduledArrival: "11:00",
    actualArrival: "11:05",
    scheduledDeparture: "11:15",
    actualDeparture: "11:20",
    status: "completed",
    arrivalDelay: 5,
    departureDelay: 5
  },
  {
    id: 11,
    type: "incident",
    incidentType: "tachograph",
    location: "A5103 Princess Parkway",
    coordinates: { lat: 53.4100, lng: -2.2600 }, // Between Wythenshawe and Longsight on actual route
    time: "11:30",
    status: "requires_explanation"
  },
  {
    id: 12,
    type: "delivery",
    location: "Asda Longsight",
    address: "Plymouth Grove, Longsight M13 9WP",
    coordinates: { lat: 53.4567, lng: -2.2123 },
    scheduledArrival: "12:00",
    actualArrival: "12:15",
    scheduledDeparture: "12:15",
    actualDeparture: "12:35",
    status: "delayed",
    arrivalDelay: 15,
    departureDelay: 20
  },
  {
    id: 13,
    type: "depot",
    location: "Manchester Depot Return",
    address: "Trafford Park, Manchester M17 8DA",
    coordinates: { lat: 53.4678, lng: -2.3142 },
    scheduledArrival: "13:00",
    actualArrival: "13:10",
    scheduledDeparture: null,
    actualDeparture: null,
    status: "completed",
    arrivalDelay: 10,
    departureDelay: 0
  }
]

// Comprehensive reason categories with varying levels of detail
const reasonCategories = {
  delivery_delay: {
    "Traffic": {
      "Heavy Traffic": ["Roadworks", "Accident ahead", "Rush hour congestion", "Event traffic"],
      "Road Closure": ["Planned roadworks", "Emergency services", "Accident blocking road"],
      "Weather Related": ["Heavy rain", "Snow", "Flooding", "Ice conditions"]
    },
    "Vehicle Issues": {
      "Mechanical": ["Engine problem", "Flat tire", "Brake issue", "Electrical fault"],
      "Loading": ["Damaged goods", "Incorrect load", "Loading equipment failure"]
    },
    "Customer Issues": {
      "Not Available": ["No answer", "Closed premises", "Wrong time slot"],
      "Access Problems": ["Blocked access", "No parking", "Height restriction", "Security issues"],
      "Documentation": ["Missing paperwork", "Incorrect details", "Signature required"]
    },
    "External Factors": ["Emergency services priority", "Police incident", "Other delivery delay"]
  },
  harsh_braking: {
    "Traffic Situation": {
      "Emergency Stop": ["Vehicle pulled out", "Pedestrian stepped out", "Traffic light change"],
      "Following Distance": ["Vehicle in front braked suddenly", "Tailgating situation"]
    },
    "Road Conditions": ["Wet road", "Poor visibility", "Obstacle in road"],
    "Vehicle Related": ["Brake sensitivity", "Load shifting"]
  },
  overspeed: {
    "Road Conditions": ["Downhill gradient", "Good visibility", "Light traffic"],
    "Navigation": ["Unfamiliar route", "Sat nav error"],
    "Time Pressure": ["Running late", "Traffic delay catch-up"],
    "Vehicle": ["Cruise control malfunction", "Speedometer error"]
  },
  tachograph: {
    "Driving Time": {
      "Daily Limit": ["Approaching 9 hours", "Emergency completion"],
      "Continuous Driving": ["4.5 hour limit reached", "Break overdue"]
    },
    "Rest Periods": ["Insufficient daily rest", "Weekly rest overdue"],
    "Recording Issues": ["Card error", "Equipment malfunction"]
  }
}

interface DebriefScreenProps {
  onComplete: () => void;
}

export function DebriefScreen({ onComplete }: DebriefScreenProps) {
  const [completedItems, setCompletedItems] = useState<Set<number | string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [reasonPath, setReasonPath] = useState<string[]>([])
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [currentActionItemId, setCurrentActionItemId] = useState<number | string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Create separate action items for arrival and departure delays
  const createActionItems = () => {
    const actionItems: any[] = []
    
    routeData.forEach(item => {
      if (item.type === 'delivery' && item.status === 'delayed') {
        // Create separate cards for arrival and departure delays
        if (item.arrivalDelay && item.arrivalDelay > 0) {
          actionItems.push({
            ...item,
            id: `${item.id}-arrival`,
            delayType: 'arrival',
            delay: item.arrivalDelay,
            actionTitle: `Arrival Delay - ${item.location}`
          })
        }
        if (item.departureDelay && item.departureDelay > 0) {
          actionItems.push({
            ...item,
            id: `${item.id}-departure`,
            delayType: 'departure',
            delay: item.departureDelay,
            actionTitle: `Departure Delay - ${item.location}`
          })
        }
      } else if (item.type === 'incident' && item.status === 'requires_explanation') {
        actionItems.push({
          ...item,
          actionTitle: `${item.incidentType?.replace('_', ' ')} - ${item.location}`
        })
      }
    })
    
    return actionItems
  }

  const allActionItems = createActionItems()
  const requiresAction = allActionItems.filter(item => !completedItems.has(item.id))

  // Get completed items for the sidebar - need to check if any action items for this route item are completed
  const completedActionItems = routeData.filter(item => {
    // Check if the original item ID is completed (for incidents)
    if (completedItems.has(item.id)) {
      return true
    }
    // Check if any arrival/departure action items for this item are completed
    const hasCompletedArrival = completedItems.has(`${item.id}-arrival`)
    const hasCompletedDeparture = completedItems.has(`${item.id}-departure`)
    return hasCompletedArrival || hasCompletedDeparture
  })

  // Set the current action item to the first uncompleted item that requires action
  useEffect(() => {
    // Don't interfere if showing complete shift card
    if (currentActionItemId === 'complete-shift') return
    
    if (requiresAction.length > 0 && currentActionItemId === null) {
      setCurrentActionItemId(requiresAction[0].id)
    } else if (requiresAction.length === 0 && currentActionItemId !== null && currentActionItemId !== 'complete-shift') {
      setCurrentActionItemId(null)
    } else if (currentActionItemId && !requiresAction.find(item => item.id === currentActionItemId)) {
      // Current action item was completed, move to next one
      setCurrentActionItemId(requiresAction.length > 0 ? requiresAction[0].id : null)
    }
  }, [completedItems, currentActionItemId, requiresAction])

  const allCompleted = requiresAction.length === 0

  // Show Complete Shift card when all action items are done
  const [showCompleteShift, setShowCompleteShift] = useState(false)
  
  useEffect(() => {
    if (allCompleted && completedActionItems.length > 0 && !showCompleteShift) {
      setShowCompleteShift(true)
      setCurrentActionItemId('complete-shift')
      
      toast.success("All tasks completed!", {
        description: "Ready to complete your shift.",
        duration: 4000,
      })
    }
  }, [allCompleted, completedActionItems.length, showCompleteShift])

  const handleCompleteShift = () => {
    toast.success("Shift completed successfully!", {
      description: "Thank you for your hard work today.",
      duration: 2000,
    })
    
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  // Calculate directions for road-following route
  const calculateRoute = useCallback(async () => {
    if (!map || !window.google || !window.google.maps) return

    const directionsService = new window.google.maps.DirectionsService()
    
    // Get only delivery and depot locations for the route
    const waypoints = routeData
      .filter(item => item.type === 'delivery' || item.type === 'depot')
      .map(item => item.coordinates)

    if (waypoints.length < 2) return

    const origin = waypoints[0]
    const destination = waypoints[waypoints.length - 1]
    const waypointsForRoute = waypoints.slice(1, -1).map(point => ({
      location: point,
      stopover: true
    }))

    try {
      const result = await directionsService.route({
        origin,
        destination,
        waypoints: waypointsForRoute,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false
      })
      
      setDirectionsResponse(result)
    } catch (error) {
      console.error('Error calculating route:', error)
    }
  }, [map])

  useEffect(() => {
    if (map && GOOGLE_MAPS_API_KEY) {
      calculateRoute()
    }
  }, [map, calculateRoute])

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleItemClick = (item: any) => {
    // Find the action item that corresponds to this route item
    const relevantActionItem = requiresAction.find(actionItem => {
      // For string IDs (arrival/departure), check if it starts with the item ID
      if (typeof actionItem.id === 'string') {
        return actionItem.id.startsWith(`${item.id}-`)
      }
      // For regular items, check direct ID match
      return actionItem.id === item.id
    })
    
    // Only allow clicking if this item has a current action
    if (relevantActionItem && relevantActionItem.id === currentActionItemId &&
        ((item.type === 'delivery' && item.status === 'delayed') ||
         (item.type === 'incident' && item.status === 'requires_explanation'))) {
      setSelectedItem(relevantActionItem) // Use the action item, not the route item
      setShowModal(true)
      setReasonPath([])
    }
  }

  const handleActionCardClick = (actionItem: any) => {
    // Direct click on action card - actionItem is already the correct action item
    if (actionItem.id === currentActionItemId) {
      setSelectedItem(actionItem)
      setShowModal(true)
      setReasonPath([])
    }
  }

  const handleReasonSubmit = () => {
    if (reasonPath.length > 0 && selectedItem) {
      // Add completed item with animation
      setCompletedItems(prev => new Set([...prev, selectedItem.id]))
      setShowModal(false)
      setSelectedItem(null)
      setReasonPath([])
      
      // Show toast notification
      toast.success("Report completed successfully!", {
        description: `${selectedItem.actionTitle || selectedItem.location} has been documented.`,
        duration: 3000,
      })
    }
  }

  const getMarkerIcon = (item: any) => {
    // Check if google maps is loaded
    if (!window.google || !window.google.maps) {
      return undefined; // Return undefined if Google Maps isn't loaded yet
    }

    const baseIcon = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeWeight: 2,
      strokeColor: '#ffffff',
    }

    if (completedItems.has(item.id)) {
      return { ...baseIcon, fillColor: '#16a34a', fillOpacity: 1 }
    }
    if (item.type === 'depot') {
      return { ...baseIcon, fillColor: '#2563eb', fillOpacity: 1 }
    }
    if (item.type === 'delivery') {
      return { ...baseIcon, fillColor: '#059669', fillOpacity: 1 }
    }
    if (item.type === 'incident') {
      return { ...baseIcon, fillColor: '#dc2626', fillOpacity: 1 }
    }
    return { ...baseIcon, fillColor: '#059669', fillOpacity: 1 }
  }
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'demo_key_replace_with_real_key') {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span>Google Maps API Key Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              To view the interactive map with road-following routes, you need to:
            </p>
            <ol className="text-sm text-gray-600 space-y-2">
              <li>1. Get a Google Maps API key from the Google Cloud Console</li>
              <li>2. Enable the Maps JavaScript API and Directions API</li>
              <li>3. Add your API key to the .env file as VITE_GOOGLE_MAPS_API_KEY</li>
            </ol>
            <Button onClick={() => window.open('https://console.cloud.google.com/google/maps-apis/overview', '_blank')}>
              Get API Key
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-white shadow-sm border-b flex-shrink-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Driver Debrief</h1>
                <p className="text-sm text-gray-600">Complete your daily route review</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Driver #1234</p>
              <p className="text-xs text-gray-600">Route: MAN-LOCAL-001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with sidebar and map */}
      <div className="flex-1 flex">
        {/* Completed Items Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Completed Items</h3>
          <div className="space-y-2">
            {completedActionItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.type === 'depot' ? item.location :
                       item.type === 'delivery' ? item.location :
                       `${item.incidentType?.replace('_', ' ')} Incident`}
                    </h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      Satisfied
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {completedActionItems.length === 0 && (
              <p className="text-sm text-gray-500 italic">No completed items yet</p>
            )}
          </div>
        </div>

        {/* Map and Action Card Container */}
        <div className="flex-1 relative">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={9}
              options={mapOptions}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* Directions for road-following route */}
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}
                  options={{
                    polylineOptions: {
                      strokeColor: '#2563eb',
                      strokeWeight: 6,
                      strokeOpacity: 0.9,
                      // Add a border effect by creating a thicker line underneath
                      path: directionsResponse.routes[0]?.overview_path,
                    },
                    suppressMarkers: true,
                  }}
                />
              )}
              
              {/* Custom markers for each location */}
              {window.google && window.google.maps && routeData.map((item) => (
                <Marker
                  key={item.id}
                  position={item.coordinates}
                  icon={getMarkerIcon(item)}
                  onClick={() => handleItemClick(item)}
                  title={item.location}
                />
              ))}
            </GoogleMap>
          </LoadScript>
          
          {/* Action Card and Queue - Top Left Corner */}
          <div className="absolute top-4 left-4 z-10 w-96 space-y-4">
            {/* Current Action Card */}
            {currentActionItemId && (
              <div className="transition-all duration-500 ease-in-out">
                {(() => {
                  // Handle Complete Shift card
                  if (currentActionItemId === 'complete-shift') {
                    return (
                      <div 
                        className="bg-white rounded-xl border-2 border-green-500 shadow-xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-105"
                        onClick={handleCompleteShift}
                      >
                        <div className="p-6">
                          {/* Status badge positioned absolutely in top right */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Ready to Complete
                            </span>
                          </div>
                          
                          <div className="pr-24">
                            {/* Icon and Title */}
                            <div className="flex items-start space-x-3 mb-4">
                              <div className="p-2 rounded-lg flex-shrink-0 bg-green-100">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Complete Shift
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  All tasks completed successfully
                                </p>
                              </div>
                            </div>
                            
                            {/* Completion Summary */}
                            <div className="bg-green-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-green-700">
                                  {completedActionItems.length} tasks completed
                                </span>
                              </div>
                              <div className="text-xs text-green-600 mt-1">
                                Ready to finish your shift
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-500">
                              Click to complete your shift and finish
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  
                  // Handle regular action items
                  const actionItem = requiresAction.find(item => item.id === currentActionItemId)
                  if (!actionItem) return null
                  
                  return (
                    <div 
                      className="bg-white rounded-xl border-2 border-orange-500 shadow-xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-105"
                      onClick={() => handleActionCardClick(actionItem)}
                    >
                      <div className="p-6">
                        {/* Status badge positioned absolutely in top right */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Action Required
                          </span>
                        </div>
                        
                        <div className="pr-24">
                          {/* Icon and Title */}
                          <div className="flex items-start space-x-3 mb-4">
                            <div className={`p-2 rounded-lg flex-shrink-0 ${
                              actionItem.type === 'depot' ? 'bg-blue-100' :
                              actionItem.type === 'delivery' ? 'bg-green-100' :
                              'bg-red-100'
                            }`}>
                              {actionItem.type === 'depot' && <Building2 className="w-5 h-5 text-blue-600" />}
                              {actionItem.type === 'delivery' && <Package className="w-5 h-5 text-green-600" />}
                              {actionItem.type === 'incident' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {actionItem.actionTitle || actionItem.location}
                              </h3>
                              {actionItem.address && (
                                <p className="text-sm text-gray-600 mt-1 break-words">
                                  {actionItem.address}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Delay Information */}
                          {actionItem.delayType && (
                            <div className="bg-red-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-medium text-red-700">
                                  {actionItem.delayType === 'arrival' ? 'Arrival' : 'Departure'} delayed by {actionItem.delay} minutes
                                </span>
                              </div>
                              <div className="text-xs text-red-600 mt-1">
                                {actionItem.delayType === 'arrival' 
                                  ? `Scheduled: ${actionItem.scheduledArrival} → Actual: ${actionItem.actualArrival}`
                                  : `Scheduled: ${actionItem.scheduledDeparture} → Actual: ${actionItem.actualDeparture}`
                                }
                              </div>
                            </div>
                          )}
                          
                          {/* Incident Information */}
                          {actionItem.type === 'incident' && (
                            <div className="bg-red-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-medium text-red-700">
                                  {actionItem.incidentType?.replace('_', ' ')}
                                </span>
                              </div>
                              {actionItem.time && (
                                <div className="text-xs text-red-600 mt-1">
                                  Time: {actionItem.time}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Queue of remaining action items */}
            {requiresAction.slice(1).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 px-2">Coming Up:</h4>
                {requiresAction.slice(1).map((item, index) => (
                  <div 
                    key={item.id}
                    className="bg-white/90 rounded-lg border border-gray-200 shadow-sm p-3 transition-all duration-300 hover:shadow-md transform hover:scale-105"
                    style={{
                      transform: `translateY(${index * 2}px)`,
                      opacity: Math.max(0.7, 1 - index * 0.1)
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                        item.type === 'depot' ? 'bg-blue-100' :
                        item.type === 'delivery' ? 'bg-green-100' :
                        'bg-red-100'
                      }`}>
                        {item.type === 'depot' && <Building2 className="w-4 h-4 text-blue-600" />}
                        {item.type === 'delivery' && <Package className="w-4 h-4 text-green-600" />}
                        {item.type === 'incident' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-gray-900 truncate">
                          {item.type === 'depot' ? item.location :
                           item.type === 'delivery' ? item.location :
                           `${item.incidentType?.replace('_', ' ')} Incident`}
                        </h5>
                        <p className="text-xs text-gray-500 truncate">
                          {item.type === 'incident' ? `Time: ${item.time}` : 
                           item.address ? item.address : 'Pending review'}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          #{index + 2}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completion Card - Special case when all items are done */}
            {requiresAction.length === 0 && completedActionItems.length > 0 && (
              <div className="transition-all duration-500 ease-in-out">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-105"
                  onClick={onComplete}
                >
                  <div className="p-6 text-white">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-white/20">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">All Complete!</h3>
                        <p className="text-green-100">Tap to finish your debrief</p>
                      </div>
                    </div>
                    <div className="text-sm text-green-100">
                      {completedActionItems.length} items completed successfully
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <p className="text-sm text-gray-600">
                {completedActionItems.length} of {completedActionItems.length + requiresAction.length} items completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button - Fixed at bottom */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 p-4 flex-shrink-0 z-20 shadow-lg">
        <div className="w-full">
          <Button 
            onClick={onComplete}
            disabled={!allCompleted}
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {allCompleted ? "Complete Debrief" : `Complete ${completedItems.size}/${requiresAction.length} items to continue`}
          </Button>
        </div>
      </div>

      {/* Explanation Modal - Centered and much wider */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="!max-w-none !w-[1400px] max-h-[90vh] overflow-hidden" style={{ width: '1400px', maxWidth: 'none' }}>
          <div className="space-y-6 h-[90vh] overflow-y-auto">
            {/* Header Section */}
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {selectedItem?.type === 'delivery' ? 'Explain Delivery Delay' : 'Explain Incident'}
              </DialogTitle>
              
              {/* Location details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-baseline gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedItem?.location}</h3>
                  {selectedItem?.address && (
                    <p className="text-gray-600">{selectedItem.address}</p>
                  )}
                </div>
                
                {selectedItem?.type === 'delivery' && (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Arrival Times */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Arrival</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">Scheduled: {selectedItem.scheduledArrival}</span>
                        <span className="text-gray-600">Actual: {selectedItem.actualArrival}</span>
                        {selectedItem.arrivalDelay > 0 && (
                          <span className="text-red-600 font-medium">+{selectedItem.arrivalDelay}min delay</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Departure Times */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Departure</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">Scheduled: {selectedItem.scheduledDeparture || 'N/A'}</span>
                        <span className="text-gray-600">Actual: {selectedItem.actualDeparture || 'N/A'}</span>
                        {selectedItem.departureDelay && selectedItem.departureDelay > 0 && (
                          <span className="text-red-600 font-medium">+{selectedItem.departureDelay}min delay</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedItem?.time && selectedItem?.type !== 'delivery' && (
                  <div className="text-sm text-gray-500">
                    <span>Time: {selectedItem.time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Satellite View - Full Width */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">Incident Location</h4>
              <div className="h-64 bg-gray-100 rounded-xl overflow-hidden shadow-lg border">
                {selectedItem?.coordinates ? (
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${selectedItem.coordinates.lat},${selectedItem.coordinates.lng}&zoom=18&maptype=satellite`}
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-500">Location unavailable</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reason Selection */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Select Reason</h4>
              
              {(() => {
                const itemType = selectedItem?.type === 'delivery' ? 'delivery_delay' : selectedItem?.incidentType
                const currentLevel = reasonCategories[itemType as keyof typeof reasonCategories]
                
                if (!currentLevel) return null

                // Navigate through reason path
                let currentOptions = currentLevel
                for (const pathItem of reasonPath) {
                  if (typeof currentOptions === 'object' && currentOptions[pathItem]) {
                    currentOptions = currentOptions[pathItem]
                  }
                }

                return (
                  <div className="space-y-6">
                    {/* Breadcrumb */}
                    {reasonPath.length > 0 && (
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setReasonPath(reasonPath.slice(0, -1))}
                          className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
                        >
                          ← Back
                        </Button>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">Current path:</span>
                          <span className="font-medium text-blue-700 text-lg">
                            {reasonPath.join(' → ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Current Level Title */}
                    <div className="border-b border-gray-200 pb-2">
                      <h5 className="text-xl font-medium text-gray-800">
                        {reasonPath.length === 0 ? 'Main Categories' : 
                         reasonPath.length === 1 ? `${reasonPath[0]} - Specific Reasons` : 
                         `${reasonPath.join(' → ')} - Final Selection`}
                      </h5>
                    </div>
                    
                    {Array.isArray(currentOptions) ? (
                      // Final level - array of specific reasons
                      <div className="grid grid-cols-3 gap-4">
                        {currentOptions.map((reason: string) => (
                          <Button
                            key={reason}
                            variant="outline"
                            className="h-20 p-4 text-center hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 border-2 border-emerald-200"
                            onClick={() => {
                              setReasonPath([...reasonPath, reason])
                              handleReasonSubmit()
                            }}
                          >
                            <div className="text-center space-y-2">
                              <CheckCircle className="w-6 h-6 mx-auto text-emerald-600" />
                              <span className="text-sm font-medium text-emerald-800 leading-tight">{reason}</span>
                              <span className="text-xs text-emerald-600 block">Complete</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    ) : typeof currentOptions === 'object' ? (
                      // Categories level - removed icons, simplified layout
                      <div className="grid grid-cols-4 gap-4">
                        {Object.keys(currentOptions).map((option) => {
                          const optionCount = Array.isArray(currentOptions[option]) 
                            ? currentOptions[option].length 
                            : Object.keys(currentOptions[option]).length
                            
                          return (
                            <Button
                              key={option}
                              variant="outline"
                              className="h-16 p-4 text-center hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transition-all duration-200 border-2"
                              onClick={() => setReasonPath([...reasonPath, option])}
                            >
                              <div className="text-center space-y-1">
                                <span className="text-sm font-medium leading-tight block">{option}</span>
                                <span className="text-xs text-gray-500 block">
                                  {optionCount} {Array.isArray(currentOptions[option]) ? 'options' : 'categories'}
                                </span>
                              </div>
                            </Button>
                          )
                        })}
                      </div>
                    ) : (
                      // Single string option (fallback)
                      <Button
                        variant="outline"
                        className="w-full h-20 p-4 text-center hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-lg transition-all duration-200"
                        onClick={() => {
                          setReasonPath([...reasonPath, currentOptions])
                          handleReasonSubmit()
                        }}
                      >
                        <div className="text-center space-y-2">
                          <CheckCircle className="w-6 h-6 mx-auto text-emerald-600" />
                          <span className="font-medium text-lg">{currentOptions}</span>
                        </div>
                      </Button>
                    )}
                  </div>
                )
              })()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
