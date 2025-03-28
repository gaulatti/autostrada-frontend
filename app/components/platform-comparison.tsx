import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"

export function PlatformComparison() {
  // In a real app, this data would come from an API call
  const data = [
    { name: "LCP", desktop: 2.1, mobile: 3.2 },
    { name: "FID", desktop: 15, mobile: 28 },
    { name: "CLS", desktop: 0.05, mobile: 0.12 },
    { name: "TTFB", desktop: 120, mobile: 220 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desktop vs Mobile</CardTitle>
        <CardDescription>Compare performance across platforms.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          className="h-[300px]"
          config={{
            desktop: {
              label: "Desktop",
              color: "hsl(var(--chart-1))",
            },
            mobile: {
              label: "Mobile",
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="desktop" fill="var(--color-desktop)" />
              <Bar dataKey="mobile" fill="var(--color-mobile)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

