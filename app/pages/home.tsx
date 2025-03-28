import { Flex } from '@radix-ui/themes'
import { useState } from "react"
import { ClusterPerformance } from "~/components/cluster-performance"
import { ClusterUrlBreakdown } from "~/components/cluster-url-breakdown"
import { CoreWebVitals } from "~/components/core-web-vitals"
import { DashboardHeader } from "~/components/dashboard-header"
import { GradeDistribution } from "~/components/grade-distribution"
import { SiteHeader } from '~/components/header'
import { MetricsOverview } from "~/components/metrics-overview"
import { MetricsScatter } from "~/components/metrics-scatter"
import { PerformanceRadar } from "~/components/performance-radar"
import { PerformanceScores } from "~/components/performance-scores"
import { PlatformComparison } from "~/components/platform-comparison"
import { PrintButton } from "~/components/print-button"
import { RecentHeartbeats } from "~/components/recent-heartbeats"
import { Separator } from "~/components/ui/separator"

export default function DashboardPage() {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)

  const handleClusterChange = (clusterId: string | null) => {
    setSelectedCluster(clusterId)
  }

  return (
    <>
      <SiteHeader title='Executive Report' />
      <Flex className='m-6' gap='3' direction='column'>
        <DashboardHeader
          heading="Performance Dashboard"
          text="Executive summary of website performance metrics."
          onClusterChange={handleClusterChange}
        />  

        {/* Key Metrics Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          <MetricsOverview />
        </div>

        {/* Performance Overview Section */}
        <div className="mt-8 print:mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Performance Overview</h2>
            <PrintButton />
          </div>
          <Separator className="mb-6" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
            <div className="lg:col-span-2 print:col-span-2">
              <CoreWebVitals />
            </div>
            <div>
              <PerformanceScores />
            </div>
          </div>
        </div>

        {/* Cluster Analysis Section */}
        <div className="mt-8 print:mt-4 print:break-before-page">
          <h2 className="text-2xl font-bold mb-4">Cluster Analysis</h2>
          <Separator className="mb-6" />

          <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2">
            <ClusterPerformance selectedCluster={selectedCluster} />
            <PlatformComparison />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
            <div className="lg:col-span-2 print:col-span-2">
              <PerformanceRadar selectedCluster={selectedCluster} />
            </div>
            <div>
              <GradeDistribution selectedCluster={selectedCluster} />
            </div>
          </div>
        </div>

        {/* Detailed Metrics Section */}
        <div className="mt-8 print:mt-4 print:break-before-page">
          <h2 className="text-2xl font-bold mb-4">Detailed Metrics</h2>
          <Separator className="mb-6" />

          <div className="grid gap-6 mb-6">
            <MetricsScatter selectedCluster={selectedCluster} />
          </div>

          <div className="grid gap-6">
            <ClusterUrlBreakdown selectedCluster={selectedCluster} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 print:mt-4 print:break-before-page">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Separator className="mb-6" />

          <div className="grid gap-6">
            <RecentHeartbeats />
          </div>
        </div>
      </Flex>
    </>
  )
}

