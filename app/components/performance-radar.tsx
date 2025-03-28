"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "~/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

interface PerformanceRadarProps {
  selectedCluster: string | null
}

export function PerformanceRadar({ selectedCluster }: PerformanceRadarProps) {
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

  // In a real app, this data would come from an API call filtered by the selected cluster
  const clusterData: Record<string, { desktop: any[]; mobile: any[] }> = {
    "1": {
      // Marketing Pages
      desktop: [
        { category: "Performance", value: gradeToNumber("A-") },
        { category: "Accessibility", value: gradeToNumber("A") },
        { category: "SEO", value: gradeToNumber("A+") },
        { category: "Best Practices", value: gradeToNumber("B+") },
        { category: "Security", value: gradeToNumber("A") },
        { category: "Aesthetics", value: gradeToNumber("A-") },
      ],
      mobile: [
        { category: "Performance", value: gradeToNumber("B+") },
        { category: "Accessibility", value: gradeToNumber("A-") },
        { category: "SEO", value: gradeToNumber("A") },
        { category: "Best Practices", value: gradeToNumber("B") },
        { category: "Security", value: gradeToNumber("A-") },
        { category: "Aesthetics", value: gradeToNumber("B+") },
      ],
    },
    "2": {
      // Product Pages
      desktop: [
        { category: "Performance", value: gradeToNumber("B+") },
        { category: "Accessibility", value: gradeToNumber("B") },
        { category: "SEO", value: gradeToNumber("A-") },
        { category: "Best Practices", value: gradeToNumber("B+") },
        { category: "Security", value: gradeToNumber("A-") },
        { category: "Aesthetics", value: gradeToNumber("B") },
      ],
      mobile: [
        { category: "Performance", value: gradeToNumber("C+") },
        { category: "Accessibility", value: gradeToNumber("B-") },
        { category: "SEO", value: gradeToNumber("B+") },
        { category: "Best Practices", value: gradeToNumber("C+") },
        { category: "Security", value: gradeToNumber("B+") },
        { category: "Aesthetics", value: gradeToNumber("B-") },
      ],
    },
    "3": {
      // Blog Articles
      desktop: [
        { category: "Performance", value: gradeToNumber("B") },
        { category: "Accessibility", value: gradeToNumber("B+") },
        { category: "SEO", value: gradeToNumber("A") },
        { category: "Best Practices", value: gradeToNumber("B") },
        { category: "Security", value: gradeToNumber("B+") },
        { category: "Aesthetics", value: gradeToNumber("B") },
      ],
      mobile: [
        { category: "Performance", value: gradeToNumber("C+") },
        { category: "Accessibility", value: gradeToNumber("B") },
        { category: "SEO", value: gradeToNumber("A-") },
        { category: "Best Practices", value: gradeToNumber("C+") },
        { category: "Security", value: gradeToNumber("B") },
        { category: "Aesthetics", value: gradeToNumber("B-") },
      ],
    },
    "4": {
      // Landing Pages
      desktop: [
        { category: "Performance", value: gradeToNumber("A") },
        { category: "Accessibility", value: gradeToNumber("A-") },
        { category: "SEO", value: gradeToNumber("A+") },
        { category: "Best Practices", value: gradeToNumber("A-") },
        { category: "Security", value: gradeToNumber("A") },
        { category: "Aesthetics", value: gradeToNumber("A") },
      ],
      mobile: [
        { category: "Performance", value: gradeToNumber("B+") },
        { category: "Accessibility", value: gradeToNumber("A-") },
        { category: "SEO", value: gradeToNumber("A") },
        { category: "Best Practices", value: gradeToNumber("B+") },
        { category: "Security", value: gradeToNumber("A-") },
        { category: "Aesthetics", value: gradeToNumber("A-") },
      ],
    },
    "5": {
      // Documentation
      desktop: [
        { category: "Performance", value: gradeToNumber("B-") },
        { category: "Accessibility", value: gradeToNumber("B") },
        { category: "SEO", value: gradeToNumber("B+") },
        { category: "Best Practices", value: gradeToNumber("B-") },
        { category: "Security", value: gradeToNumber("B+") },
        { category: "Aesthetics", value: gradeToNumber("C+") },
      ],
      mobile: [
        { category: "Performance", value: gradeToNumber("C") },
        { category: "Accessibility", value: gradeToNumber("B-") },
        { category: "SEO", value: gradeToNumber("B") },
        { category: "Best Practices", value: gradeToNumber("C+") },
        { category: "Security", value: gradeToNumber("B") },
        { category: "Aesthetics", value: gradeToNumber("C") },
      ],
    },
  }

  // Default data (average across all clusters)
  const defaultData = {
    desktop: [
      { category: "Performance", value: gradeToNumber("B+") },
      { category: "Accessibility", value: gradeToNumber("A-") },
      { category: "SEO", value: gradeToNumber("A") },
      { category: "Best Practices", value: gradeToNumber("B+") },
      { category: "Security", value: gradeToNumber("A-") },
      { category: "Aesthetics", value: gradeToNumber("B") },
    ],
    mobile: [
      { category: "Performance", value: gradeToNumber("C+") },
      { category: "Accessibility", value: gradeToNumber("B") },
      { category: "SEO", value: gradeToNumber("A-") },
      { category: "Best Practices", value: gradeToNumber("C+") },
      { category: "Security", value: gradeToNumber("B+") },
      { category: "Aesthetics", value: gradeToNumber("B-") },
    ],
  }

  // Get data based on selected cluster
  const data = selectedCluster && clusterData[selectedCluster] ? clusterData[selectedCluster] : defaultData

  // Function to convert numerical value back to grade for tooltip
  const numberToGrade = (value: number): string => {
    if (value >= 97) return "A+"
    if (value >= 93) return "A"
    if (value >= 90) return "A-"
    if (value >= 87) return "B+"
    if (value >= 83) return "B"
    if (value >= 80) return "B-"
    if (value >= 77) return "C+"
    if (value >= 73) return "C"
    if (value >= 70) return "C-"
    if (value >= 67) return "D+"
    if (value >= 63) return "D"
    if (value >= 60) return "D-"
    return "F"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Radar</CardTitle>
        <CardDescription>
          {selectedCluster
            ? `Performance metrics for the selected cluster across categories.`
            : `Average performance metrics across all clusters.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="desktop">
          <TabsList className="mb-4">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="desktop" className="h-[300px]">
            <ChartContainer
              config={{
                performance: {
                  label: "Performance",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.desktop} cx="50%" cy="50%" outerRadius="80%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="var(--color-performance)"
                    fill="var(--color-performance)"
                    fillOpacity={0.5}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                                <span className="font-bold text-sm">{data.category}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Grade</span>
                                <span className="font-bold text-sm">{numberToGrade(data.value)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="mobile" className="h-[300px]">
            <ChartContainer
              config={{
                performance: {
                  label: "Performance",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.mobile} cx="50%" cy="50%" outerRadius="80%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="var(--color-performance)"
                    fill="var(--color-performance)"
                    fillOpacity={0.5}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                                <span className="font-bold text-sm">{data.category}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Grade</span>
                                <span className="font-bold text-sm">{numberToGrade(data.value)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

