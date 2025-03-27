import { Box, Flex, Progress, Tabs } from '@radix-ui/themes';
import { AlertCircle, Clock, Code, Database, ExternalLink, FileText, Image, Zap } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { Card } from '~/components/ui/card';

export function meta() {
  return [{ title: 'Pulses - Autostrada' }];
}

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Scans',
  },
  {
    title: 'Pulses',
    link: '/scans/pulses',
  },
  {
    title: 'Heartbeat Detail',
  },
];

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-500';
  if (score >= 50) return 'text-amber-500';
  return 'text-red-500';
};

const getProgressColor = (score: number) => {
  if (score >= 90) return 'green';
  if (score >= 50) return 'amber';
  return 'red';
};

// Format milliseconds to seconds with 1 decimal place
const formatTime = (ms: number) => {
  return (ms / 1000).toFixed(1) + 's';
};

const Page = () => {
  return (
    <>
      <SiteHeader title='Pulse Detail' />
      <Flex className='m-6' gap='3' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='min-h-screen'>
          <div className='max-w-7xl mx-auto space-y-8'>
            {/* Overall Grade */}
            <section className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
              <div className='flex items-start gap-6'>
                <div className='flex-shrink-0'>
                  <div className='w-24 h-24 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900'>
                    <span className='text-5xl font-bold text-red-600 dark:text-red-400'>D-</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h2 className='text-xl font-bold'>Overall Grade: D-</h2>
                  <p className='text-gray-600 dark:text-gray-300'>
                    This site is significantly underperforming due to its extremely poor performance score (28/100) and below-average best practices
                    implementation (57/100). While SEO (100/100) and accessibility (96/100) are excellent, the critical user experience metrics are concerning:
                  </p>
                  <ul className='list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1'>
                    <li>LCP of 9.95s is nearly 4x the recommended maximum (2.5s)</li>
                    <li>Time to Interactive of 29.16s indicates severe interactivity issues</li>
                    <li>JavaScript is bloated (2.59 MB) with significant unused code</li>
                  </ul>
                  <p className='text-gray-600 dark:text-gray-300 italic'>Immediate optimization is strongly recommended to improve user experience.</p>
                </div>
              </div>
            </section>

            {/* Header */}
            <header className='space-y-2'>
              <div className='flex gap-3 items-center text-sm text-gray-500 dark:text-gray-400'>
                <div className='flex'>
                  <span className='mr-2'>URL:</span>
                  <a
                    href='https://www.nytimes.com/'
                    className='text-blue-600 dark:text-blue-400 hover:underline flex items-center'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    www.nytimes.com <ExternalLink className='ml-1 h-3 w-3' />
                  </a>
                </div>
                <span className='px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full'>Mobile</span>
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>Tested on: March 26, 2025 at 18:56:03 UTC</div>
            </header>

            {/* Score Overview */}
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {[
                { name: 'Performance', score: 28, icon: <Zap className='h-5 w-5' /> },
                { name: 'Accessibility', score: 96, icon: <AlertCircle className='h-5 w-5' /> },
                { name: 'Best Practices', score: 57, icon: <FileText className='h-5 w-5' /> },
                { name: 'SEO', score: 100, icon: <ExternalLink className='h-5 w-5' /> },
              ].map((metric) => (
                <Card key={metric.name} className='p-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <div className='flex items-center gap-2'>
                      {metric.icon}
                      <h3 className='font-medium'>{metric.name}</h3>
                    </div>
                    <span className={`text-xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}</span>
                  </div>
                  <Progress value={metric.score} className='h-2' color={getProgressColor(metric.score)} />
                </Card>
              ))}
            </section>

            {/* Core Web Vitals & Metrics */}
            <section>
              <h2 className='text-xl font-bold mb-4'>Core Web Vitals & Metrics</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {[
                  {
                    name: 'First Contentful Paint (FCP)',
                    value: 5272.69,
                    format: formatTime,
                    icon: <Clock className='h-5 w-5' />,
                  },
                  {
                    name: 'Largest Contentful Paint (LCP)',
                    value: 9953.23,
                    format: formatTime,
                    icon: <Image className='h-5 w-5' />,
                  },
                  {
                    name: 'Cumulative Layout Shift (CLS)',
                    value: 0.027,
                    format: (v: number) => v.toFixed(3),
                    icon: <AlertCircle className='h-5 w-5' />,
                  },
                  {
                    name: 'Time to Interactive (TTI)',
                    value: 29163.56,
                    format: formatTime,
                    icon: <Clock className='h-5 w-5' />,
                  },
                  {
                    name: 'Total Blocking Time (TBT)',
                    value: 2755.5,
                    format: formatTime,
                    icon: <Clock className='h-5 w-5' />,
                  },
                  { name: 'Speed Index (SI)', value: 8486.71, format: formatTime, icon: <Zap className='h-5 w-5' /> },
                  {
                    name: 'Time to First Byte (TTFB)',
                    value: 601,
                    format: (v: number) => v + 'ms',
                    icon: <Database className='h-5 w-5' />,
                  },
                  {
                    name: 'DOM Content Loaded (DCL)',
                    value: 2215,
                    format: (v: number) => v + 'ms',
                    icon: <Code className='h-5 w-5' />,
                  },
                ].map((metric) => (
                  <Card key={metric.name} className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      {metric.icon}
                      <h3 className='font-medium text-sm'>{metric.name}</h3>
                    </div>
                    <p className='text-2xl font-bold'>{metric.format(metric.value)}</p>
                  </Card>
                ))}
              </div>
            </section>

            <Tabs.Root defaultValue='opportunities'>
              <Tabs.List size='2'>
                <Tabs.Trigger value='opportunities'>Opportunities</Tabs.Trigger>
                <Tabs.Trigger value='resources'>Resource Breakdown</Tabs.Trigger>
              </Tabs.List>

              <Box pt='3'>
                <Tabs.Content value='opportunities'>
                  <Card className='p-4'>
                    <h3 className='text-lg font-semibold mb-4'>Opportunities for Improvement</h3>
                    <div className='space-y-4'>
                      {[
                        { id: 'unused-javascript', title: 'Reduce unused JavaScript', savings: '1960ms' },
                        { id: 'render-blocking-resources', title: 'Eliminate render-blocking resources', savings: '1777ms' },
                        { id: 'uses-rel-preconnect', title: 'Preconnect to required origins', savings: '0ms' },
                        {
                          id: 'duplicated-javascript',
                          title: 'Remove duplicate modules in JavaScript bundles',
                          savings: '0ms',
                        },
                        { id: 'unused-css-rules', title: 'Reduce unused CSS', savings: '0ms' },
                      ].map((opportunity) => (
                        <div
                          key={opportunity.id}
                          className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                        >
                          <div className='flex items-center gap-3'>
                            <div
                              className={`p-2 rounded-full ${opportunity.savings !== '0ms'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                }`}
                            >
                              {opportunity.savings !== '0ms' ? <AlertCircle className='h-4 w-4' /> : <Clock className='h-4 w-4' />}
                            </div>
                            <span className='font-medium'>{opportunity.title}</span>
                          </div>
                          <div className='flex items-center'>
                            {opportunity.savings !== '0ms' && (
                              <span className='text-sm font-medium text-amber-600 dark:text-amber-400 mr-2'>Potential savings: {opportunity.savings}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
                      <p>Showing 5 of 17 opportunities. Implement these recommendations to improve your website's performance. [^1]</p>
                    </div>
                  </Card>
                </Tabs.Content>

                {/* Tabs for different sections */}
                <Tabs.Content value='resources'>
                  <Card className='p-4'>
                    <h3 className='text-lg font-semibold mb-4'>Resource Summary</h3>
                    <div className='space-y-4'>
                      <div className='flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 pb-2 border-b'>
                        <span>Resource Type</span>
                        <div className='flex gap-8'>
                          <span>Size</span>
                          <span>Requests</span>
                        </div>
                      </div>

                      {[
                        { type: 'JavaScript', size: '2.59 MB', count: 1, icon: <Code className='h-4 w-4' /> },
                        { type: 'Document', size: '252.7 KB', count: 1, icon: <FileText className='h-4 w-4' /> },
                        { type: 'Font', size: '311.1 KB', count: 1, icon: <FileText className='h-4 w-4' /> },
                        { type: 'Image', size: '146.2 KB', count: 1, icon: <Image className='h-4 w-4' /> },
                        { type: 'Stylesheet', size: '21.9 KB', count: 1, icon: <FileText className='h-4 w-4' /> },
                        { type: 'Other', size: '170.4 KB', count: 1, icon: <FileText className='h-4 w-4' /> },
                        { type: 'Third-party', size: '1.60 MB', count: 1, icon: <ExternalLink className='h-4 w-4' /> },
                      ].map((resource) => (
                        <div key={resource.type} className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>{resource.icon}</div>
                            <span className='font-medium'>{resource.type}</span>
                          </div>
                          <div className='flex gap-8'>
                            <span className='text-sm font-medium'>{resource.size}</span>
                            <span className='text-sm font-medium w-16 text-right'>{resource.count}</span>
                          </div>
                        </div>
                      ))}

                      <div className='flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                            <Database className='h-4 w-4' />
                          </div>
                          <span className='font-medium'>Total</span>
                        </div>
                        <div className='flex gap-8'>
                          <span className='text-sm font-medium'>8.19 MB</span>
                          <span className='text-sm font-medium w-16 text-right'>9</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Tabs.Content>
              </Box>
            </Tabs.Root>

            {/* Recommendations */}
            <section>
              <Card className='p-6'>
                <h2 className='text-xl font-bold mb-4'>Key Recommendations</h2>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <h3 className='font-semibold'>1. Optimize JavaScript</h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      The site has 2.59 MB of JavaScript with significant unused code. Minimize and defer non-critical JavaScript to improve performance. [^1]
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <h3 className='font-semibold'>2. Eliminate Render-Blocking Resources</h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.
                      [^1]
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <h3 className='font-semibold'>3. Optimize LCP</h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      The Largest Contentful Paint (LCP) is very slow at 9.95s. Consider preloading the LCP image and optimizing server response time. [^1]
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <h3 className='font-semibold'>4. Reduce Total Blocking Time</h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      The Total Blocking Time (TBT) is high at 2.76s. Break up long tasks and defer non-critical JavaScript to improve interactivity. [^1]
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Footer */}
            <footer className='text-center text-sm text-gray-500 dark:text-gray-400 pt-4'>
              <p>Lighthouse v12.4.0 | Generated on March 26, 2025</p>
            </footer>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default Page;
