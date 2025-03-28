import { Box, Card, Tabs } from '@radix-ui/themes'
import { Monitor, Smartphone } from 'lucide-react'

const Opportunities = () => {
    return (<>
        <Tabs.Root defaultValue='opportunities'>
            <Tabs.List size='2'>
                <Tabs.Trigger value='opportunities'>Opportunities</Tabs.Trigger>
                <Tabs.Trigger value='resources'>Resource Breakdown</Tabs.Trigger>
            </Tabs.List>

            <Box pt='3'>
                <Tabs.Content value='opportunities'>
                    <Card className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Monitor className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Desktop Opportunities</h3>
                        </div>
                        <div className="space-y-3">
                            {/* {desktopData.topOpportunities.map((opportunity) => (
                                <div
                                    key={opportunity.id}
                                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-full ${opportunity.savings !== "0ms" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}
                                        >
                                            {opportunity.savings !== "0ms" ? (
                                                <AlertCircle className="h-4 w-4" />
                                            ) : (
                                                <Clock className="h-4 w-4" />
                                            )}
                                        </div>
                                        <span className="font-medium">{opportunity.title}</span>
                                    </div>
                                    <div className="flex items-center">
                                        {opportunity.savings !== "0ms" && (
                                            <span className="text-sm font-medium text-amber-600 dark:text-amber-400 mr-2">
                                                {opportunity.savings}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </Card>
                </Tabs.Content>

                {/* Tabs for different sections */}
                <Tabs.Content value='resources'>
                    {/* Mobile Resources */}
                    <Card className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Smartphone className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Mobile Resources</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 pb-2 border-b">
                                <span>Resource Type</span>
                                <span>Size</span>
                            </div>

                            {/* {[
                                {
                                    type: "Images",
                                    size: mobileData.resourceSummary.breakdown.image.size,
                                    icon: <Image className="h-4 w-4" />,
                                },
                                {
                                    type: "JavaScript",
                                    size: mobileData.resourceSummary.breakdown.script.size,
                                    icon: <Code className="h-4 w-4" />,
                                },
                                {
                                    type: "CSS",
                                    size: mobileData.resourceSummary.breakdown.stylesheet.size,
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    type: "Fonts",
                                    size: mobileData.resourceSummary.breakdown.font.size,
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    type: "HTML",
                                    size: mobileData.resourceSummary.breakdown.document.size,
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    type: "Third-party",
                                    size: mobileData.resourceSummary.breakdown.thirdParty.size,
                                    icon: <ExternalLink className="h-4 w-4" />,
                                },
                            ].map((resource) => (
                                <div
                                    key={resource.type}
                                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                            {resource.icon}
                                        </div>
                                        <span className="font-medium">{resource.type}</span>
                                    </div>
                                    <span className="text-sm font-medium">{formatBytes(resource.size)}</span>
                                </div>
                            ))} */}

                            {/* <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                        <Database className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">Total</span>
                                </div>
                                <span className="text-sm font-medium">
                                    {formatBytes(mobileData.resourceSummary.totalTransferSize)}
                                </span>
                            </div> */}
                        </div>
                    </Card>

                    {/* Desktop Resources */}
                    <Card className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Monitor className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">Desktop Resources</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 pb-2 border-b">
                                <span>Resource Type</span>
                                <span>Size</span>
                            </div>
                            {/* 
                            {[
                                {
                                    type: "Images",
                                    size: desktopData.resourceSummary.breakdown.image.size,
                                    icon: <Image className="h-4 w-4" />,
                                },
                                {
                                    type: "JavaScript",
                                    size: desktopData.resourceSummary.breakdown.script.size,
                                    icon: <Code className="h-4 w-4" />,
                                },
                                {
                                    type: "CSS",
                                    size: desktopData.resourceSummary.breakdown.stylesheet.size,
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    type: "Fonts",
                                    size: desktopData.resourceSummary.breakdown.font.size,
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    type: "HTML",
                                    size: desktopData.resourceSummary.breakdown.document.size,
                                    icon: <FileText className="h-4 w-4" />,
                                },
                                {
                                    type: "Third-party",
                                    size: desktopData.resourceSummary.breakdown.thirdParty.size,
                                    icon: <ExternalLink className="h-4 w-4" />,
                                },
                            ].map((resource) => (
                                <div
                                    key={resource.type}
                                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                            {resource.icon}
                                        </div>
                                        <span className="font-medium">{resource.type}</span>
                                    </div>
                                    <span className="text-sm font-medium">{formatBytes(resource.size)}</span>
                                </div>
                            ))} */}
                            {/* 
                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                        <Database className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">Total</span>
                                </div>
                                <span className="text-sm font-medium">
                                    {formatBytes(desktopData.resourceSummary.totalTransferSize)}
                                </span>
                            </div> */}
                        </div>
                    </Card>
                </Tabs.Content>
            </Box>
        </Tabs.Root>

        {/* Key Insights */}
        <section>
            <Card className='p-6'>
                <h2 className='text-xl font-bold mb-4'>Key Insights</h2>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <h3 className='font-semibold'>1. Performance Difference</h3>
                        <p className='text-gray-600 dark:text-gray-400'>
                            Desktop performance (83/100) is better than mobile (77/100). The most significant differences are in loading times, with mobile LCP being
                            4.3x slower than desktop.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <h3 className='font-semibold'>2. Layout Stability</h3>
                        <p className='text-gray-600 dark:text-gray-400'>
                            Mobile has perfect layout stability (CLS: 0) while desktop has some layout shift issues (CLS: 0.25). This suggests the mobile layout is
                            more stable during loading.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <h3 className='font-semibold'>3. Resource Usage</h3>
                        <p className='text-gray-600 dark:text-gray-400'>
                            Mobile uses slightly more resources (1.67 MB) than desktop (1.60 MB). The biggest difference is in image sizes, with mobile using 11.9%
                            more image data.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <h3 className='font-semibold'>4. Optimization Opportunities</h3>
                        <p className='text-gray-600 dark:text-gray-400'>
                            Mobile has more significant optimization opportunities, particularly in CSS usage (450ms potential savings) and image sizing (150ms
                            potential savings). [^1]
                        </p>
                    </div>
                </div>
            </Card>
        </section></>)
}

export { Opportunities }
