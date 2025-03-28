import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "~/components/ui/chart"

interface ClusterPerformanceProps {
  selectedCluster: string | null
}

export function ClusterPerformance({ selectedCluster }: ClusterPerformanceProps) {
  // In a real app, this data would come from an API call filtered by the selected cluster
  const clusters = [
    { name: "Marketing Pages", avgGrade: "A-", urlCount: 24, color: "#10b981" },
    { name: "Product Pages", avgGrade: "B+", urlCount: 56, color: "#3b82f6" },
    { name: "Blog Articles", avgGrade: "B", urlCount: 87, color: "#3b82f6" },
    { name: "Landing Pages", avgGrade: "A", urlCount: 12, color: "#10b981" },
    { name: "Documentation", avgGrade: "B-", urlCount: 43, color: "#3b82f6" },
  ]

  // Convert letter grades to numerical values for the chart
  const gradeToNumber = (grade: string): number => {
    const gradeMap: Record<string, number> = {
      "A+": 97,
      A: 93,
      "A-": 90,
      "B+": 87,
      B: 83,
      "B-": 80,
      "C+": 77,
      C: 73,
      "C-": 70,
      "D+": 67,
      D: 63,
      "D-": 60,
      F: 50,
    }
    return gradeMap[grade] || 75
  }

  const chartData = clusters.map((cluster, index) => ({
    name: cluster.name,
    score: gradeToNumber(cluster.avgGrade),
    grade: cluster.avgGrade,
    urlCount: cluster.urlCount,
    color: cluster.color,
    id: (index + 1).toString(),
  }))

  // If a specific cluster is selected, filter the data
  const filteredData = selectedCluster ? chartData.filter((item) => item.id === selectedCluster) : chartData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cluster Performance</CardTitle>
        <CardDescription>Average performance grades by cluster.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {filteredData.length > 0 ? (
          <ChartContainer
            config={{
              score: {
                label: "Score",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis domain={[40, 100]} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Cluster</span>
                              <span className="font-bold text-sm">{data.name}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Grade</span>
                              <span className="font-bold text-sm">{data.grade}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">URLs</span>
                              <span className="font-bold text-sm">{data.urlCount}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No data available for the selected cluster.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

