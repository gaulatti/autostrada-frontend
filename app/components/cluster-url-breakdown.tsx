"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "@radix-ui/themes"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

interface ClusterUrlBreakdownProps {
  selectedCluster: string | null
}

export function ClusterUrlBreakdown({ selectedCluster }: ClusterUrlBreakdownProps) {
  // In a real app, this data would come from an API call filtered by the selected cluster
  const clusterUrls = {
    "1": Array.from({ length: 24 }, (_, i) => ({
      id: `m-${i + 1}`,
      url: `https://example.com/about/${i % 5 === 0 ? "team" : i % 3 === 0 ? "mission" : "contact"}-${i + 1}`,
      grade: getRandomGrade(),
      cluster: "Marketing Pages",
    })),
    "2": Array.from({ length: 56 }, (_, i) => ({
      id: `p-${i + 1}`,
      url: `https://example.com/products/item-${i + 1}`,
      grade: getRandomGrade(),
      cluster: "Product Pages",
    })),
    "3": Array.from({ length: 87 }, (_, i) => ({
      id: `b-${i + 1}`,
      url: `https://example.com/blog/post-${i + 1}`,
      grade: getRandomGrade(),
      cluster: "Blog Articles",
    })),
    "4": Array.from({ length: 12 }, (_, i) => ({
      id: `l-${i + 1}`,
      url: `https://example.com/landing/campaign-${i + 1}`,
      grade: getRandomGrade(),
      cluster: "Landing Pages",
    })),
    "5": Array.from({ length: 43 }, (_, i) => ({
      id: `d-${i + 1}`,
      url: `https://example.com/docs/section-${i + 1}`,
      grade: getRandomGrade(),
      cluster: "Documentation",
    })),
  }

  // All URLs across all clusters
  const allUrls = Object.values(clusterUrls).flat()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 10
  // For print view, show more items
  const printItemsPerPage = 20

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

  // Filter URLs based on selected cluster and search term
  const filteredUrls =
    selectedCluster && clusterUrls[selectedCluster as keyof typeof clusterUrls]
      ? clusterUrls[selectedCluster as keyof typeof clusterUrls].filter((item) =>
          item.url.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : allUrls.filter((item) => item.url.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate pagination
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUrls = filteredUrls.slice(startIndex, startIndex + itemsPerPage)

  // For print view, get top URLs
  const printUrls = filteredUrls.slice(0, printItemsPerPage)

  // Get cluster name for the description
  const getClusterName = () => {
    if (!selectedCluster) return "All Clusters"
    const urls = clusterUrls[selectedCluster as keyof typeof clusterUrls]
    return urls && urls.length > 0 ? urls[0].cluster : "selected cluster"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>URLs by Cluster</CardTitle>
        <CardDescription>
          {selectedCluster
            ? `URLs in the ${getClusterName()} (${filteredUrls.length} URLs).`
            : `All URLs across clusters (${filteredUrls.length} URLs).`}
        </CardDescription>
        <div className="relative mt-2 print:hidden">
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
        {/* Interactive view */}
        <div className="print:hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                {!selectedCluster && <TableHead>Cluster</TableHead>}
                <TableHead className="w-[100px] text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUrls.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium truncate max-w-[300px]">{item.url}</TableCell>
                  {!selectedCluster && (
                    <TableCell>
                      <Badge variant="outline">{item.cluster}</Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-right">{getGradeBadge(item.grade)}</TableCell>
                </TableRow>
              ))}
              {paginatedUrls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={selectedCluster ? 2 : 3} className="text-center py-4 text-muted-foreground">
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
        </div>

        {/* Print view */}
        <div className="hidden print:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                {!selectedCluster && <TableHead>Cluster</TableHead>}
                <TableHead className="w-[80px] text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {printUrls.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium truncate max-w-[300px] text-xs">{item.url}</TableCell>
                  {!selectedCluster && (
                    <TableCell className="text-xs">
                      <Badge variant="outline" className="text-xs">
                        {item.cluster}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-right">{getGradeBadge(item.grade)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredUrls.length > printItemsPerPage && (
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Showing top {printItemsPerPage} of {filteredUrls.length} URLs. View the full dashboard for complete data.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

