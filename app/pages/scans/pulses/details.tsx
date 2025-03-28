import { Box, Card, Flex, Progress, Tabs } from '@radix-ui/themes';
import { AlertCircle, AlertTriangle, ArrowRight, Clock, Code, Database, ExternalLink, FileText, Image, Monitor, Smartphone, Zap } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { Button } from '~/components/ui/button';

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
    title: 'Pulse Detail',
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

const calculateGrade = (performance: number, accessibility: number, bestPractices: number, seo: number) => {
  const weightedScore = performance * 0.5 + accessibility * 0.2 + bestPractices * 0.15 + seo * 0.15;

  if (weightedScore >= 97) return { grade: 'A+', color: 'text-green-600' };
  if (weightedScore >= 93) return { grade: 'A', color: 'text-green-600' };
  if (weightedScore >= 90) return { grade: 'A-', color: 'text-green-600' };
  if (weightedScore >= 87) return { grade: 'B+', color: 'text-green-500' };
  if (weightedScore >= 83) return { grade: 'B', color: 'text-green-500' };
  if (weightedScore >= 80) return { grade: 'B-', color: 'text-green-500' };
  if (weightedScore >= 77) return { grade: 'C+', color: 'text-amber-500' };
  if (weightedScore >= 73) return { grade: 'C', color: 'text-amber-500' };
  if (weightedScore >= 70) return { grade: 'C-', color: 'text-amber-500' };
  if (weightedScore >= 67) return { grade: 'D+', color: 'text-amber-600' };
  if (weightedScore >= 63) return { grade: 'D', color: 'text-amber-600' };
  if (weightedScore >= 60) return { grade: 'D-', color: 'text-amber-600' };
  return { grade: 'F', color: 'text-red-600' };
};

// Format milliseconds to seconds with 1 decimal place
const formatTime = (ms: number) => {
  return (ms / 1000).toFixed(1) + 's';
};
// Mobile data
const mobileData = {
  performance: 77,
  accessibility: 91,
  bestPractices: 96,
  seo: 100,
  timings: {
    TTFB: 610,
    FCP: 1953.09,
    LCP: 5184.5,
    DCL: 1671,
    SI: 4019.76,
    CLS: 0,
    TBT: 89,
    TTI: 5556.3,
  },
  topOpportunities: [
    { id: 'unused-css-rules', title: 'Reduce unused CSS', savings: '450ms' },
    { id: 'server-response-time', title: 'Initial server response time was short', savings: '382ms' },
    { id: 'uses-responsive-images', title: 'Properly size images', savings: '150ms' },
    { id: 'modern-image-formats', title: 'Serve images in next-gen formats', savings: '150ms' },
  ],
  resourceSummary: {
    totalRequests: 9,
    totalTransferSize: 1671868,
    breakdown: {
      image: { size: 385063, count: 1 },
      script: { size: 231625, count: 1 },
      stylesheet: { size: 42198, count: 1 },
      font: { size: 50850, count: 1 },
      document: { size: 37944, count: 1 },
      other: { size: 56822, count: 1 },
      thirdParty: { size: 62864, count: 1 },
    },
  },
};

// Desktop data
const desktopData = {
  performance: 83,
  accessibility: 89,
  bestPractices: 96,
  seo: 100,
  timings: {
    TTFB: 171,
    FCP: 578.59,
    LCP: 1210.5,
    DCL: 1386,
    SI: 1313.38,
    CLS: 0.25,
    TBT: 71.9,
    TTI: 1216.9,
  },
  topOpportunities: [
    { id: 'server-response-time', title: 'Initial server response time was short', savings: '94ms' },
    { id: 'unused-javascript', title: 'Reduce unused JavaScript', savings: '40ms' },
  ],
  resourceSummary: {
    totalRequests: 9,
    totalTransferSize: 1600659,
    breakdown: {
      image: { size: 344106, count: 1 },
      script: { size: 231592, count: 1 },
      stylesheet: { size: 47067, count: 1 },
      font: { size: 50850, count: 1 },
      document: { size: 37944, count: 1 },
      other: { size: 57573, count: 1 },
      thirdParty: { size: 62395, count: 1 },
    },
  },
};

// Calculate grades
const mobileGrade = calculateGrade(mobileData.performance, mobileData.accessibility, mobileData.bestPractices, mobileData.seo);

const desktopGrade = calculateGrade(desktopData.performance, desktopData.accessibility, desktopData.bestPractices, desktopData.seo);

// Format bytes to KB/MB
const formatBytes = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

const Page = () => {
  return (
    <>
      <SiteHeader title='Pulse Report' />
      <Flex className='m-6' gap='3' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        {/* Overall Grades */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Mobile Grade */}
          <Card className='p-6 relative overflow-hidden'>
            <div className='absolute top-0 right-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-bl-lg'>
              <div className='flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                <Smartphone className='h-4 w-4' />
                <span>Mobile</span>
              </div>
            </div>
            <div className='flex items-start gap-6 mt-4'>
              <div className='flex-shrink-0'>
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center bg-opacity-20 ${mobileGrade.grade.startsWith('A')
                    ? 'bg-green-100 dark:bg-green-900'
                    : mobileGrade.grade.startsWith('B')
                      ? 'bg-green-100 dark:bg-green-900'
                      : mobileGrade.grade.startsWith('C')
                        ? 'bg-amber-100 dark:bg-amber-900'
                        : 'bg-red-100 dark:bg-red-900'
                    }`}
                >
                  <span className={`text-4xl font-bold ${mobileGrade.color}`}>{mobileGrade.grade}</span>
                </div>
              </div>
              <div className='space-y-2'>
                <h2 className='text-xl font-bold'>Overall Grade: {mobileGrade.grade}</h2>
                <p className='text-gray-600 dark:text-gray-300'>
                  The mobile site performs well with good scores across all categories. The performance score (77/100) indicates room for improvement,
                  particularly in loading speed and resource optimization.
                </p>
                <div className='flex mt-2'>
                  <Button variant='outline' size='sm' className='flex items-center gap-1'>
                    View Mobile Details <ArrowRight className='h-3 w-3 ml-1' />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Desktop Grade */}
          <Card className='p-6 relative overflow-hidden'>
            <div className='absolute top-0 right-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-bl-lg'>
              <div className='flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
                <Monitor className='h-4 w-4' />
                <span>Desktop</span>
              </div>
            </div>
            <div className='flex items-start gap-6 mt-4'>
              <div className='flex-shrink-0'>
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center bg-opacity-20 ${desktopGrade.grade.startsWith('A')
                    ? 'bg-green-100 dark:bg-green-900'
                    : desktopGrade.grade.startsWith('B')
                      ? 'bg-green-100 dark:bg-green-900'
                      : desktopGrade.grade.startsWith('C')
                        ? 'bg-amber-100 dark:bg-amber-900'
                        : 'bg-red-100 dark:bg-red-900'
                    }`}
                >
                  <span className={`text-4xl font-bold ${desktopGrade.color}`}>{desktopGrade.grade}</span>
                </div>
              </div>
              <div className='space-y-2'>
                <h2 className='text-xl font-bold'>Overall Grade: {desktopGrade.grade}</h2>
                <p className='text-gray-600 dark:text-gray-300'>
                  The desktop site performs very well with strong scores in all categories. The performance score (83/100) is good, with fast loading times
                  and good interactivity. The CLS score (0.25) indicates some layout shifts that could be improved.
                </p>
                <div className='flex mt-2'>
                  <Button variant='outline' size='sm' className='flex items-center gap-1'>
                    View Desktop Details <ArrowRight className='h-3 w-3 ml-1' />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Header */}
        <header className='space-y-2'>
          <div className='flex gap-3 items-center text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex'>
              <span className='mr-2'>URL:</span>
              <a
                href='https://www.swr3.de/'
                className='text-blue-600 dark:text-blue-400 hover:underline flex items-center'
                target='_blank'
                rel='noopener noreferrer'
              >
                www.swr3.de <ExternalLink className='ml-1 h-3 w-3' />
              </a>
            </div>
            <span className='px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full'>Comparison</span>
          </div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>Tested on: March 26, 2025 at 18:56:03 UTC</div>
        </header>

        {/* Score Comparison */}
        <section>
          <h2 className='text-xl font-bold mb-4'>Score Comparison</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              {
                name: 'Performance',
                mobile: mobileData.performance,
                desktop: desktopData.performance,
                icon: <Zap className='h-5 w-5' />,
              },
              {
                name: 'Accessibility',
                mobile: mobileData.accessibility,
                desktop: desktopData.accessibility,
                icon: <AlertCircle className='h-5 w-5' />,
              },
              {
                name: 'Best Practices',
                mobile: mobileData.bestPractices,
                desktop: desktopData.bestPractices,
                icon: <FileText className='h-5 w-5' />,
              },
              {
                name: 'SEO',
                mobile: mobileData.seo,
                desktop: desktopData.seo,
                icon: <ExternalLink className='h-5 w-5' />,
              },
            ].map((metric) => (
              <Card key={metric.name} className='p-4'>
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex items-center gap-2'>
                    {metric.icon}
                    <h3 className='font-medium'>{metric.name}</h3>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='space-y-1'>
                    <div className='flex justify-between items-center text-sm'>
                      <div className='flex items-center gap-1'>
                        <Smartphone className='h-3 w-3 text-gray-500' />
                        <span className='text-gray-500'>Mobile</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(metric.mobile)}`}>{metric.mobile}</span>
                    </div>
                    <Progress value={metric.mobile} className='h-2' color={getProgressColor(metric.mobile)} />
                  </div>

                  <div className='space-y-1'>
                    <div className='flex justify-between items-center text-sm'>
                      <div className='flex items-center gap-1'>
                        <Monitor className='h-3 w-3 text-gray-500' />
                        <span className='text-gray-500'>Desktop</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(metric.desktop)}`}>{metric.desktop}</span>
                    </div>
                    <Progress value={metric.desktop} className='h-2' color={getProgressColor(metric.desktop)} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Web Vitals Comparison */}
        <section>
          <h2 className='text-xl font-bold mb-4'>Core Web Vitals Comparison</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* LCP Comparison */}
            <Card className='p-4'>
              <div className='flex items-center gap-2 mb-4'>
                <Image className='h-5 w-5' />
                <h3 className='font-medium'>Largest Contentful Paint (LCP)</h3>
              </div>

              <div className='space-y-4'>
                <div className='space-y-1'>
                  <div className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-1'>
                      <Smartphone className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-500'>Mobile</span>
                    </div>
                    <span
                      className={`font-bold ${mobileData.timings.LCP > 2500 ? 'text-red-500' : mobileData.timings.LCP > 1800 ? 'text-amber-500' : 'text-green-500'
                        }`}
                    >
                      {formatTime(mobileData.timings.LCP)}
                    </span>
                  </div>
                  <div className='h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full rounded-full ${mobileData.timings.LCP > 2500 ? 'bg-red-500' : mobileData.timings.LCP > 1800 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(100, (mobileData.timings.LCP / 4000) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-1'>
                  <div className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-1'>
                      <Monitor className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-500'>Desktop</span>
                    </div>
                    <span
                      className={`font-bold ${desktopData.timings.LCP > 2500 ? 'text-red-500' : desktopData.timings.LCP > 1800 ? 'text-amber-500' : 'text-green-500'
                        }`}
                    >
                      {formatTime(desktopData.timings.LCP)}
                    </span>
                  </div>
                  <div className='h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full rounded-full ${desktopData.timings.LCP > 2500 ? 'bg-red-500' : desktopData.timings.LCP > 1800 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(100, (desktopData.timings.LCP / 4000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                  <AlertTriangle className='h-3 w-3' />
                  <span>Mobile LCP is {(mobileData.timings.LCP / desktopData.timings.LCP).toFixed(1)}x slower than desktop</span>
                </div>
              </div>
            </Card>

            {/* CLS Comparison */}
            <Card className='p-4'>
              <div className='flex items-center gap-2 mb-4'>
                <AlertCircle className='h-5 w-5' />
                <h3 className='font-medium'>Cumulative Layout Shift (CLS)</h3>
              </div>

              <div className='space-y-4'>
                <div className='space-y-1'>
                  <div className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-1'>
                      <Smartphone className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-500'>Mobile</span>
                    </div>
                    <span
                      className={`font-bold ${mobileData.timings.CLS > 0.25 ? 'text-red-500' : mobileData.timings.CLS > 0.1 ? 'text-amber-500' : 'text-green-500'
                        }`}
                    >
                      {mobileData.timings.CLS.toFixed(3)}
                    </span>
                  </div>
                  <div className='h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full rounded-full ${mobileData.timings.CLS > 0.25 ? 'bg-red-500' : mobileData.timings.CLS > 0.1 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(100, (mobileData.timings.CLS / 0.5) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-1'>
                  <div className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-1'>
                      <Monitor className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-500'>Desktop</span>
                    </div>
                    <span
                      className={`font-bold ${desktopData.timings.CLS > 0.25 ? 'text-red-500' : desktopData.timings.CLS > 0.1 ? 'text-amber-500' : 'text-green-500'
                        }`}
                    >
                      {desktopData.timings.CLS.toFixed(3)}
                    </span>
                  </div>
                  <div className='h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full rounded-full ${desktopData.timings.CLS > 0.25 ? 'bg-red-500' : desktopData.timings.CLS > 0.1 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(100, (desktopData.timings.CLS / 0.5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                  <AlertTriangle className='h-3 w-3' />
                  <span>Desktop has layout shift issues, mobile has none</span>
                </div>
              </div>
            </Card>

            {/* TTI Comparison */}
            <Card className='p-4'>
              <div className='flex items-center gap-2 mb-4'>
                <Clock className='h-5 w-5' />
                <h3 className='font-medium'>Time to Interactive (TTI)</h3>
              </div>

              <div className='space-y-4'>
                <div className='space-y-1'>
                  <div className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-1'>
                      <Smartphone className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-500'>Mobile</span>
                    </div>
                    <span
                      className={`font-bold ${mobileData.timings.TTI > 5000 ? 'text-red-500' : mobileData.timings.TTI > 3500 ? 'text-amber-500' : 'text-green-500'
                        }`}
                    >
                      {formatTime(mobileData.timings.TTI)}
                    </span>
                  </div>
                  <div className='h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full rounded-full ${mobileData.timings.TTI > 5000 ? 'bg-red-500' : mobileData.timings.TTI > 3500 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(100, (mobileData.timings.TTI / 7000) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-1'>
                  <div className='flex justify-between items-center text-sm'>
                    <div className='flex items-center gap-1'>
                      <Monitor className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-500'>Desktop</span>
                    </div>
                    <span
                      className={`font-bold ${desktopData.timings.TTI > 5000 ? 'text-red-500' : desktopData.timings.TTI > 3500 ? 'text-amber-500' : 'text-green-500'
                        }`}
                    >
                      {formatTime(desktopData.timings.TTI)}
                    </span>
                  </div>
                  <div className='h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full rounded-full ${desktopData.timings.TTI > 5000 ? 'bg-red-500' : desktopData.timings.TTI > 3500 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min(100, (desktopData.timings.TTI / 7000) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                  <AlertTriangle className='h-3 w-3' />
                  <span>Mobile TTI is {(mobileData.timings.TTI / desktopData.timings.TTI).toFixed(1)}x slower than desktop</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Other Metrics Comparison */}
        <section>
          <h2 className='text-xl font-bold mb-4'>Other Metrics Comparison</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              {
                name: 'First Contentful Paint (FCP)',
                mobile: mobileData.timings.FCP,
                desktop: desktopData.timings.FCP,
                format: formatTime,
                icon: <Clock className='h-5 w-5' />,
              },
              {
                name: 'Speed Index (SI)',
                mobile: mobileData.timings.SI,
                desktop: desktopData.timings.SI,
                format: formatTime,
                icon: <Zap className='h-5 w-5' />,
              },
              {
                name: 'Total Blocking Time (TBT)',
                mobile: mobileData.timings.TBT,
                desktop: desktopData.timings.TBT,
                format: (v: number) => v + 'ms',
                icon: <Clock className='h-5 w-5' />,
              },
              {
                name: 'Time to First Byte (TTFB)',
                mobile: mobileData.timings.TTFB,
                desktop: desktopData.timings.TTFB,
                format: (v: number) => v + 'ms',
                icon: <Database className='h-5 w-5' />,
              },
            ].map((metric) => (
              <Card key={metric.name} className='p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  {metric.icon}
                  <h3 className='font-medium text-sm'>{metric.name}</h3>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                      <Smartphone className='h-3 w-3' />
                      <span>Mobile</span>
                    </div>
                    <p className='text-lg font-bold'>{metric.format(metric.mobile)}</p>
                  </div>

                  <div className='space-y-1'>
                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                      <Monitor className='h-3 w-3' />
                      <span>Desktop</span>
                    </div>
                    <p className='text-lg font-bold'>{metric.format(metric.desktop)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tabs for different sections */}

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
                  {desktopData.topOpportunities.map((opportunity) => (
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
                  ))}
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

                  {[
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
                  ))}

                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        <Database className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Total</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatBytes(mobileData.resourceSummary.totalTransferSize)}
                    </span>
                  </div>
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
                  ))}

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
                  </div>
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
        </section>

        {/* Footer */}
        <footer className='text-center text-sm text-gray-500 dark:text-gray-400 pt-4'>
          <p>Lighthouse v12.4.0 | Generated on March 26, 2025</p>
        </footer>
      </Flex>
    </>
  );
};

export default Page;
