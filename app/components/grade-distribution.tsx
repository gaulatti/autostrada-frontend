import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"
import { ChartContainer } from "~/components/ui/chart"
import { useState } from "react"

interface GradeDistributionProps {
  selectedCluster: string | null
}

export function GradeDistribution({ selectedCluster }: GradeDistributionProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  // In a real app, this data would come from an API call filtered by the selected cluster
  const clusterGradeDistribution: Record<string, Array<{ name: string; value: number; color: string }>> = {
    "1": [
      // Marketing Pages
      { name: "A+", value: 3, color: "#15803d" },
      { name: "A", value: 8, color: "#16a34a" },
      { name: "A-", value: 5, color: "#22c55e" },
      { name: "B+", value: 4, color: "#2563eb" },
      { name: "B", value: 2, color: "#3b82f6" },
      { name: "B-", value: 1, color: "#60a5fa" },
      { name: "C+", value: 1, color: "#ca8a04" },
      { name: "C", value: 0, color: "#eab308" },
      { name: "C-", value: 0, color: "#facc15" },
      { name: "D+", value: 0, color: "#ea580c" },
      { name: "D", value: 0, color: "#f97316" },
      { name: "D-", value: 0, color: "#fb923c" },
      { name: "F", value: 0, color: "#dc2626" },
    ],
    "2": [
      // Product Pages
      { name: "A+", value: 2, color: "#15803d" },
      { name: "A", value: 5, color: "#16a34a" },
      { name: "A-", value: 8, color: "#22c55e" },
      { name: "B+", value: 12, color: "#2563eb" },
      { name: "B", value: 15, color: "#3b82f6" },
      { name: "B-", value: 8, color: "#60a5fa" },
      { name: "C+", value: 4, color: "#ca8a04" },
      { name: "C", value: 2, color: "#eab308" },
      { name: "C-", value: 0, color: "#facc15" },
      { name: "D+", value: 0, color: "#ea580c" },
      { name: "D", value: 0, color: "#f97316" },
      { name: "D-", value: 0, color: "#fb923c" },
      { name: "F", value: 0, color: "#dc2626" },
    ],

    "4": [
      // Landing Pages
      { name: "A+", value: 4, color: "#15803d" },
      { name: "A", value: 5, color: "#16a34a" },
      { name: "A-", value: 2, color: "#22c55e" },
      { name: "B+", value: 1, color: "#2563eb" },
      { name: "B", value: 0, color: "#3b82f6" },
      { name: "B-", value: 0, color: "#60a5fa" },
      { name: "C+", value: 0, color: "#ca8a04" },
      { name: "C", value: 0, color: "#eab308" },
      { name: "C-", value: 0, color: "#facc15" },
      { name: "D+", value: 0, color: "#ea580c" },
      { name: "D", value: 0, color: "#f97316" },
      { name: "D-", value: 0, color: "#fb923c" },
      { name: "F", value: 0, color: "#dc2626" },
    ],
    "5": [
      // Documentation
      { name: "A+", value: 0, color: "#15803d" },
      { name: "A", value: 2, color: "#16a34a" },
      { name: "A-", value: 5, color: "#22c55e" },
      { name: "B+", value: 10, color: "#2563eb" },
      { name: "B", value: 15, color: "#3b82f6" },
      { name: "B-", value: 8, color: "#60a5fa" },
      { name: "C+", value: 3, color: "#ca8a04" },
      { name: "C", value: 0, color: "#eab308" },
      { name: "C-", value: 0, color: "#facc15" },
      { name: "D+", value: 0, color: "#ea580c" },
      { name: "D", value: 0, color: "#f97316" },
      { name: "D-", value: 0, color: "#fb923c" },
      { name: "F", value: 0, color: "#dc2626" },
    ],
  }

  // Default data (all clusters combined)
  const defaultGradeDistribution = [
    { name: "A+", value: 14, color: "#15803d" },
    { name: "A", value: 30, color: "#16a34a" },
    { name: "A-", value: 35, color: "#22c55e" },
    { name: "B+", value: 47, color: "#2563eb" },
    { name: "B", value: 50, color: "#3b82f6" },
    { name: "B-", value: 29, color: "#60a5fa" },
    { name: "C+", value: 13, color: "#ca8a04" },
    { name: "C", value: 4, color: "#eab308" },
    { name: "C-", value: 0, color: "#facc15" },
    { name: "D+", value: 0, color: "#ea580c" },
    { name: "D", value: 0, color: "#f97316" },
    { name: "D-", value: 0, color: "#fb923c" },
    { name: "F", value: 0, color: "#dc2626" },
  ]

  // Get data based on selected cluster
  const data =
    selectedCluster && clusterGradeDistribution[selectedCluster]
      ? clusterGradeDistribution[selectedCluster]
      : defaultGradeDistribution

  // Filter out grades with zero values
  const filteredData = data.filter((item) => item.value > 0)

  // Active shape for the pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="var(--foreground)">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="var(--foreground)" fontSize={24} fontWeight="bold">
          {value}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill="var(--muted-foreground)">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
        <CardDescription>
          {selectedCluster
            ? `Distribution of performance grades for the selected cluster.`
            : `Distribution of performance grades across all URLs.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={filteredData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

