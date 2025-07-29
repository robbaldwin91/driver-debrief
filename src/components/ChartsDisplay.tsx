import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

const lineData = [
  { month: 'Jan', users: 1200, revenue: 45000, growth: 12 },
  { month: 'Feb', users: 1450, revenue: 52000, growth: 21 },
  { month: 'Mar', users: 1650, revenue: 58000, growth: 14 },
  { month: 'Apr', users: 1800, revenue: 65000, growth: 9 },
  { month: 'May', users: 2100, revenue: 72000, growth: 17 },
  { month: 'Jun', users: 2350, revenue: 78000, growth: 12 },
]

const barData = [
  { category: 'Engineering', count: 45, satisfaction: 8.5 },
  { category: 'Design', count: 23, satisfaction: 9.1 },
  { category: 'Product', count: 18, satisfaction: 8.8 },
  { category: 'Marketing', count: 32, satisfaction: 8.2 },
  { category: 'Sales', count: 28, satisfaction: 8.7 },
  { category: 'Support', count: 15, satisfaction: 9.0 },
]

const pieData = [
  { name: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Mobile', value: 35, color: 'hsl(var(--accent))' },
  { name: 'Tablet', value: 20, color: 'hsl(var(--muted-foreground))' },
]

const areaData = [
  { time: '00:00', active: 120, idle: 80 },
  { time: '04:00', active: 80, idle: 60 },
  { time: '08:00', active: 300, idle: 120 },
  { time: '12:00', active: 450, idle: 200 },
  { time: '16:00', active: 380, idle: 180 },
  { time: '20:00', active: 250, idle: 150 },
]

export function ChartsDisplay() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Growth Metrics</CardTitle>
          <CardDescription>Monthly user acquisition and revenue trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Users"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>Team size and satisfaction scores by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                name="Team Size"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Active vs idle users throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="active"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
                name="Active Users"
              />
              <Area
                type="monotone"
                dataKey="idle"
                stackId="1"
                stroke="hsl(var(--accent))"
                fill="hsl(var(--accent))"
                fillOpacity={0.6}
                name="Idle Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Distribution of users by device type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}