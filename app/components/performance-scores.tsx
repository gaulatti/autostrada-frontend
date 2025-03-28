"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "@radix-ui/themes"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

export function PerformanceScores() {
  // In a real app, this data would come from an API call
  const data = [
    { name: "Performance", grade: "B+" },
    { name: "Accessibility", grade: "A" },
    { name: "SEO", grade: "A+" },
    { name: "Best Practices", grade: "B" },
    { name: "Security", grade: "A-" },
    { name: "Aesthetics", grade: "B+" },
  ]

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Scores</CardTitle>
        <CardDescription>Average grades across all monitored URLs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{getGradeBadge(item.grade)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

