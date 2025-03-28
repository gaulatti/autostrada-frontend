import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"

export function CoreWebVitals() {
  // In a real app, this data would come from an API call
  const data = [
    { date: "Jan 1", lcp: 2.8, cls: 0.12, fid: 24, ttfb: 180 },
    { date: "Jan 8", lcp: 2.7, cls: 0.11, fid: 22, ttfb: 175 },
    { date: "Jan 15", lcp: 2.6, cls: 0.1, fid: 20, ttfb: 170 },
    { date: "Jan 22", lcp: 2.5, cls: 0.09, fid: 19, ttfb: 165 },
    { date: "Jan 29", lcp: 2.4, cls: 0.08, fid: 18, ttfb: 160 },
    { date: "Feb 5", lcp: 2.3, cls: 0.07, fid: 17, ttfb: 155 },
    { date: "Feb 12", lcp: 2.2, cls: 0.06, fid: 16, ttfb: 150 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Core Web Vitals</CardTitle>
        <CardDescription>Track your Core Web Vitals metrics over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lcp" className="print:hidden">
          <TabsList className="mb-4">
            <TabsTrigger value="lcp">LCP</TabsTrigger>
            <TabsTrigger value="cls">CLS</TabsTrigger>
            <TabsTrigger value="fid">FID</TabsTrigger>
            <TabsTrigger value="ttfb">TTFB</TabsTrigger>
          </TabsList>
          <TabsContent value="lcp" className="h-[300px]">
            <ChartContainer
            className="h-[300px]"
              config={{
                lcp: {
                  label: "LCP",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: "seconds", angle: -90, position: "insideLeft" }} domain={[0, "dataMax + 1"]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="lcp"
                    stroke="var(--color-lcp)"
                    fill="var(--color-lcp)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="cls" className="h-[300px]">
            <ChartContainer
            className="h-[300px]"
              config={{
                cls: {
                  label: "CLS",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis
                    label={{ value: "score", angle: -90, position: "insideLeft" }}
                    domain={[0, "dataMax + 0.05"]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="cls"
                    stroke="var(--color-cls)"
                    fill="var(--color-cls)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="fid" className="h-[300px]">
            <ChartContainer
            className="h-[300px]"
              config={{
                fid: {
                  label: "FID",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis
                    label={{ value: "milliseconds", angle: -90, position: "insideLeft" }}
                    domain={[0, "dataMax + 5"]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="fid"
                    stroke="var(--color-fid)"
                    fill="var(--color-fid)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="ttfb" className="h-[300px]">
            <ChartContainer
            className="h-[300px]"
              config={{
                ttfb: {
                  label: "TTFB",
                  color: "hsl(var(--chart-4))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis
                    label={{ value: "milliseconds", angle: -90, position: "insideLeft" }}
                    domain={[0, "dataMax + 50"]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="ttfb"
                    stroke="var(--color-ttfb)"
                    fill="var(--color-ttfb)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>

        {/* Print version - shows all metrics in a grid */}
        <div className="hidden print:grid print:grid-cols-2 print:gap-4">
          <div className="h-[200px]">
            <h3 className="text-sm font-medium mb-2">Largest Contentful Paint (LCP)</h3>
            <ChartContainer
              config={{
                lcp: {
                  label: "LCP",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis
                    label={{ value: "seconds", angle: -90, position: "insideLeft", fontSize: 10 }}
                    tick={{ fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="lcp"
                    stroke="var(--color-lcp)"
                    fill="var(--color-lcp)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="h-[200px]">
            <h3 className="text-sm font-medium mb-2">Cumulative Layout Shift (CLS)</h3>
            <ChartContainer
              config={{
                cls: {
                  label: "CLS",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis
                    label={{ value: "score", angle: -90, position: "insideLeft", fontSize: 10 }}
                    tick={{ fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cls"
                    stroke="var(--color-cls)"
                    fill="var(--color-cls)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

