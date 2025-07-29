import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Star } from "@phosphor-icons/react"

interface InfoCardData {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  labels: string[]
  metadata: {
    date: string
    location: string
    participants: number
    rating: number
  }
}

const cardData: InfoCardData[] = [
  {
    id: 1,
    title: "Modern React Development",
    subtitle: "Advanced Component Patterns",
    description: "Learn the latest React patterns including hooks, context, and performance optimization techniques for building scalable applications.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    labels: ["React", "TypeScript", "Performance"],
    metadata: {
      date: "2024-03-15",
      location: "San Francisco, CA",
      participants: 156,
      rating: 4.8
    }
  },
  {
    id: 2,
    title: "Design System Workshop",
    subtitle: "Building Consistent UIs",
    description: "Master the art of creating and maintaining design systems that scale across teams and products with real-world examples.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    labels: ["Design", "Figma", "Components"],
    metadata: {
      date: "2024-03-22",
      location: "New York, NY",
      participants: 89,
      rating: 4.9
    }
  },
  {
    id: 3,
    title: "Data Visualization Mastery",
    subtitle: "Charts, Graphs & Interactive Dashboards",
    description: "Create compelling data stories using modern visualization libraries and techniques for web applications.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    labels: ["D3.js", "Charts", "Analytics"],
    metadata: {
      date: "2024-04-05",
      location: "Austin, TX",
      participants: 203,
      rating: 4.7
    }
  },
  {
    id: 4,
    title: "API Development Best Practices",
    subtitle: "Building Robust Backend Services",
    description: "Comprehensive guide to designing, building, and deploying production-ready APIs with security and performance in mind.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    labels: ["API", "Node.js", "Security"],
    metadata: {
      date: "2024-04-12",
      location: "Seattle, WA",
      participants: 127,
      rating: 4.6
    }
  },
  {
    id: 5,
    title: "Mobile-First CSS",
    subtitle: "Responsive Design Principles",
    description: "Learn modern CSS techniques for creating responsive, accessible, and performant user interfaces across all devices.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
    labels: ["CSS", "Mobile", "Accessibility"],
    metadata: {
      date: "2024-04-18",
      location: "Los Angeles, CA",
      participants: 174,
      rating: 4.8
    }
  },
  {
    id: 6,
    title: "Cloud Architecture Patterns",
    subtitle: "Scalable Infrastructure Design",
    description: "Explore cloud-native architecture patterns and best practices for building resilient, scalable applications.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    labels: ["Cloud", "AWS", "Architecture"],
    metadata: {
      date: "2024-04-25",
      location: "Chicago, IL",
      participants: 95,
      rating: 4.9
    }
  }
]

export function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card) => (
        <Card key={card.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
          <div className="aspect-video overflow-hidden">
            <img 
              src={card.image} 
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            />
          </div>
          
          <CardHeader className="flex-none">
            <div className="flex flex-wrap gap-2 mb-2">
              {card.labels.map((label) => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-lg leading-tight">{card.title}</CardTitle>
            <CardDescription className="text-primary font-medium">
              {card.subtitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{new Date(card.metadata.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{card.metadata.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{card.metadata.participants} participants</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-current" />
                <span>{card.metadata.rating}/5.0</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-none">
            <Button className="w-full">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}