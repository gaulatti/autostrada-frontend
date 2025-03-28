import { CalendarIcon, RefreshCw } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { ClusterSelector } from "./cluster-selector"

interface DashboardHeaderProps {
  heading: string
  text?: string
  onClusterChange: (clusterId: string | null) => void
}

export function DashboardHeader({ heading, text, onClusterChange }: DashboardHeaderProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const formattedDate = date
    ? date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : "Select date"

  return (
    <div className="flex flex-col gap-4 print:px-0 mb-4">
      <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center gap-4">
        <ClusterSelector onClusterChange={onClusterChange} />
        <div className="flex items-center justify-between">
          <div className="print:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <Button size="icon" variant="ghost" className="print:hidden">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
        <div className="hidden print:block">
          <span className="text-sm text-muted-foreground">Report Date: {formattedDate}</span>
        </div>
      </div>
    </div>
  )
}

