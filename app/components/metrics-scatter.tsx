"use client"

import { useState } from "react"
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { ChartContainer } from "~/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

interface MetricsScatterProps {
  selectedCluster: string | null
}

export function MetricsScatter({ selectedCluster }: MetricsScatterProps) {
  const [xMetric, setXMetric] = useState("lcp")
  const [yMetric, setYMetric] = useState("cls")

  // In a real app, this data would come from an API call filtered by the selected cluster
  const generateClusterData = (clusterId: string, size: number, quality: "high" | "medium" | "low") => {
    const data = []

    // Base values and ranges based on quality
    const lcpBase = quality === "high" ? 1.8 : quality === "medium" ? 2.5 : 3.2
    const lcpRange = quality === "high" ? 0.8 : quality === "medium" ? 1.2 : 1.8

    const clsBase = quality === "high" ? 0.05 : quality === "medium" ? 0.1 : 0.15
    const clsRange = quality === "high" ? 0.05 : quality === "medium" ? 0.08 : 0.12

    const fidBase = quality === "high" ? 15 : quality === "medium" ? 30 : 50
    const fidRange = quality === "high" ? 10 : quality === "medium" ? 20 : 30

    const ttfbBase = quality === "high" ? 150 : quality === "medium" ? 250 : 350
    const ttfbRange = quality === "high" ? 100 : quality === "medium" ? 150 : 200

    for (let i = 0; i < size; i++) {
      data.push({
        id: `${clusterId}-${i}`,
        lcp: lcpBase + Math.random() * lcpRange,
        cls: clsBase + Math.random() * clsRange,
        fid: fidBase + Math.random() * fidRange,
        ttfb: ttfbBase + Math.random() * ttfbRange,
        cluster: clusterId,
      })
    }

    return data
  }

  const clusterData: Record<string, any[]> = {
    "1": generateClusterData("1", 24, "high"), // Marketing Pages
    "2": generateClusterData("2", 56, "medium"), // Product Pages
    "3": generateClusterData("3", 87, "medium"), // Blog Articles
    "4": generateClusterData("4", 12, "high"), // Landing Pages
    "5": generateClusterData("5", 43, "low"), // Documentation
  }

  // Combine all data for the default view
  const allData = Object.values(clusterData).flat()

  // Get data based on selected cluster
  const data = selectedCluster && clusterData[selectedCluster] ? clusterData[selectedCluster] : allData

  // Metric options for the dropdowns
  const metricOptions = [
    { value: "lcp", label: "LCP (seconds)" },
    { value: "cls", label: "CLS" },
    { value: "fid", label: "FID (ms)" },
    { value: "ttfb", label: "TTFB (ms)" },
  ]

  // Get axis labels
  const getAxisLabel = (metric: string) => {
    return metricOptions.find((option) => option.value === metric)?.label || metric
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">{getAxisLabel(xMetric)}</span>
              <span className="font-bold text-sm">{data[xMetric].toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">{getAxisLabel(yMetric)}</span>
              <span className="font-bold text-sm">{data[yMetric].toFixed(2)}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metrics Correlation</CardTitle>
        <CardDescription>
          {selectedCluster
            ? `Explore relationships between metrics for the selected cluster.`
            : `Explore relationships between metrics across all URLs.`}
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="x-metric" className="text-sm font-medium">
              X-Axis
            </label>
            <Select value={xMetric} onValueChange={setXMetric}>
              <SelectTrigger id="x-metric">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="y-metric" className="text-sm font-medium">
              Y-Axis
            </label>
            <Select value={yMetric} onValueChange={setYMetric}>
              <SelectTrigger id="y-metric">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey={xMetric}
                name={getAxisLabel(xMetric)}
                label={{ value: getAxisLabel(xMetric), position: "bottom" }}
              />
              <YAxis
                type="number"
                dataKey={yMetric}
                name={getAxisLabel(yMetric)}
                label={{ value: getAxisLabel(yMetric), angle: -90, position: "left" }}
              />
              <ZAxis range={[60, 60]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Metrics" data={data} fill="hsl(var(--chart-1))" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

