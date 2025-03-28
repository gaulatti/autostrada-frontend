import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Clock, Gauge, Lightbulb, Zap } from "lucide-react"

export function MetricsOverview() {
  // In a real app, this data would come from an API call
  const metrics = [
    {
      title: "Avg. Performance",
      value: "B+",
      change: "+1 grade",
      increasing: true,
      icon: Gauge,
    },
    {
      title: "Avg. LCP",
      value: "2.4s",
      change: "-0.3s",
      increasing: false,
      icon: Clock,
    },
    {
      title: "Avg. CLS",
      value: "0.08",
      change: "-0.02",
      increasing: false,
      icon: Lightbulb,
    },
    {
      title: "Avg. FID",
      value: "18ms",
      change: "-5ms",
      increasing: false,
      icon: Zap,
    },
  ]

  return (
    <>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {metric.increasing ? (
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4 text-green-500" />
              )}
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

