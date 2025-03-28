import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "@radix-ui/themes"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export function UrlPerformance() {
  // In a real app, this data would come from an API call with pagination
  // This is just a mock of a larger dataset
  const allUrls = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    url:
      i % 5 === 0
        ? `https://example.com/products/category-${Math.floor(i / 5)}`
        : i % 3 === 0
          ? `https://example.com/blog/post-${i}`
          : i % 2 === 0
            ? `https://example.com/about/page-${i}`
            : `https://example.com/page-${i}`,
    grade: getRandomGrade(),
  }))

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 10

  function getRandomGrade() {
    const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"]
    const weights = [5, 10, 10, 15, 15, 10, 10, 8, 5, 5, 3, 2, 2] // Higher weight for better grades

    const totalWeight = weights.reduce((a, b) => a + b, 0)
    let random = Math.random() * totalWeight

    for (let i = 0; i < grades.length; i++) {
      if (random < weights[i]) return grades[i]
      random -= weights[i]
    }

    return "C" // Fallback
  }

  function getGradeBadge(grade: string) {
    const gradeMap: Record<string, string> = {
      "A+": "bg-green-600",
      A: "bg-green-500",
      "A-": "bg-green-400",
      "B+": "bg-blue-600",
      B: "bg-blue-500",
      "B-": "bg-blue-400",
      "C+": "bg-yellow-600",
      C: "bg-yellow-500",
      "C-": "bg-yellow-400",
      "D+": "bg-orange-600",
      D: "bg-orange-500",
      "D-": "bg-orange-400",
      F: "bg-red-500",
    }

    return <Badge className={`text-white ${gradeMap[grade] || "bg-gray-500"}`}>{grade}</Badge>
  }

  // Filter URLs based on search term
  const filteredUrls = allUrls.filter((item) => item.url.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate pagination
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUrls = filteredUrls.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Performance</CardTitle>
        <CardDescription>Performance grades by URL ({filteredUrls.length} URLs).</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search URLs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead className="w-[100px] text-right">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUrls.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium truncate max-w-[300px]">{item.url}</TableCell>
                <TableCell className="text-right">{getGradeBadge(item.grade)}</TableCell>
              </TableRow>
            ))}
            {paginatedUrls.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                  No URLs found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUrls.length > 0 ? startIndex + 1 : 0}-
            {Math.min(startIndex + itemsPerPage, filteredUrls.length)} of {filteredUrls.length} URLs
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

