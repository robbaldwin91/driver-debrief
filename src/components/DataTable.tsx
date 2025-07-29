import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CaretUp, CaretDown, MagnifyingGlass } from "@phosphor-icons/react"

interface DataItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  department: string
}

const dummyData: DataItem[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Manager", status: "active", joinDate: "2023-01-15", department: "Engineering" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "active", joinDate: "2023-03-22", department: "Engineering" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Designer", status: "pending", joinDate: "2024-01-10", department: "Design" },
  { id: 4, name: "David Wilson", email: "david@example.com", role: "Analyst", status: "active", joinDate: "2023-06-05", department: "Marketing" },
  { id: 5, name: "Eva Brown", email: "eva@example.com", role: "QA Engineer", status: "inactive", joinDate: "2023-09-12", department: "Engineering" },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Product Manager", status: "active", joinDate: "2023-02-28", department: "Product" },
  { id: 7, name: "Grace Chen", email: "grace@example.com", role: "Developer", status: "active", joinDate: "2023-11-18", department: "Engineering" },
  { id: 8, name: "Henry Taylor", email: "henry@example.com", role: "Designer", status: "pending", joinDate: "2024-02-03", department: "Design" },
]

type SortField = keyof DataItem
type SortDirection = 'asc' | 'desc'

export function DataTable() {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filter, setFilter] = useState('')

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let filtered = dummyData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    return filtered
  }, [filter, sortField, sortDirection])

  const getStatusBadge = (status: DataItem['status']) => {
    const variants = {
      active: "default",
      inactive: "secondary", 
      pending: "outline"
    } as const
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-4 w-4" /> : 
      <CaretDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {/* Header row with title, subtitle, and search */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Data Table</h1>
          <p className="text-muted-foreground">
            Interactive table with sorting, filtering, and search capabilities.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search all columns..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredAndSortedData.length} of {dummyData.length} rows
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  <span className="flex items-center space-x-1">
                    <span>Name</span>
                    <SortIcon field="name" />
                  </span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('email')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  <span className="flex items-center space-x-1">
                    <span>Email</span>
                    <SortIcon field="email" />
                  </span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('role')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  <span className="flex items-center space-x-1">
                    <span>Role</span>
                    <SortIcon field="role" />
                  </span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('department')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  <span className="flex items-center space-x-1">
                    <span>Department</span>
                    <SortIcon field="department" />
                  </span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('status')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  <span className="flex items-center space-x-1">
                    <span>Status</span>
                    <SortIcon field="status" />
                  </span>
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('joinDate')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  <span className="flex items-center space-x-1">
                    <span>Join Date</span>
                    <SortIcon field="joinDate" />
                  </span>
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{new Date(item.joinDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No results found for "{filter}"
        </div>
      )}
    </div>
  )
}