import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "@radix-ui/themes"

export function RecentHeartbeats() {
  // In a real (decent) app, this data would come from an API call
  const heartbeats = [
    {
      id: 1,
      url: "https://example.com",
      platform: "desktop",
      provider: "Synthetic",
      performance: "A-",
      lcp: "2.1s",
      cls: "0.05",
      fid: "15ms",
      timestamp: "2023-03-26 14:32:15",
    },
    {
      id: 2,
      url: "https://example.com",
      platform: "mobile",
      provider: "Synthetic",
      performance: "B+",
      lcp: "3.2s",
      cls: "0.12",
      fid: "28ms",
      timestamp: "2023-03-26 14:32:10",
    },
    {
      id: 3,
      url: "https://example.com/products",
      platform: "desktop",
      provider: "Synthetic",
      performance: "B",
      lcp: "2.3s",
      cls: "0.07",
      fid: "17ms",
      timestamp: "2023-03-26 14:31:45",
    },
    {
      id: 4,
      url: "https://example.com/products",
      platform: "mobile",
      provider: "Synthetic",
      performance: "C+",
      lcp: "3.5s",
      cls: "0.14",
      fid: "32ms",
      timestamp: "2023-03-26 14:31:40",
    },
    {
      id: 5,
      url: "https://example.com/about",
      platform: "desktop",
      provider: "Synthetic",
      performance: "A",
      lcp: "2.2s",
      cls: "0.06",
      fid: "16ms",
      timestamp: "2023-03-26 14:31:15",
    },
  ]

  function getPerformanceBadge(grade: string) {
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
        <CardTitle>Recent Heartbeats</CardTitle>
        <CardDescription>Latest performance measurements across your URLs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>LCP</TableHead>
              <TableHead>CLS</TableHead>
              <TableHead>FID</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heartbeats.map((heartbeat) => (
              <TableRow key={heartbeat.id}>
                <TableCell className="font-medium">{heartbeat.url}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {heartbeat.platform}
                  </Badge>
                </TableCell>
                <TableCell>{getPerformanceBadge(heartbeat.performance)}</TableCell>
                <TableCell>{heartbeat.lcp}</TableCell>
                <TableCell>{heartbeat.cls}</TableCell>
                <TableCell>{heartbeat.fid}</TableCell>
                <TableCell className="text-muted-foreground">{heartbeat.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

