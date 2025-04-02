import { Card } from '@radix-ui/themes';
import { AlertCircle, Clock, Database, Image, Monitor, Smartphone, Zap } from 'lucide-react';
import { formatTime } from '~/utils/dashboards';
import { useTranslation } from 'react-i18next'; // Added import
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

/**
 * CoreWebVitals is a React component that displays metrics related to Core Web Vitals
 * and other performance metrics for a given set of heartbeats.
 *
 * @param {Object} props - The component props.
 * @param {Array<any>} props.heartbeats - An array of heartbeat objects containing
 * performance data for various platforms.
 *
 * @returns {JSX.Element} A React component that renders Core Web Vitals and other
 * performance metrics in a grid layout, with visual indicators for metric values.
 *
 * ### Core Web Vitals:
 * - Largest Contentful Paint (LCP)
 * - Cumulative Layout Shift (CLS)
 * - Time to Interactive (TTI)
 *
 * ### Other Metrics:
 * - First Contentful Paint (FCP)
 * - Speed Index (SI)
 * - Total Blocking Time (TBT)
 * - Time to First Byte (TTFB)
 *
 * Each metric is displayed with:
 * - A name and icon.
 * - A list of values for each heartbeat, color-coded based on thresholds.
 * - A progress bar indicating the relative value of the metric.
 *
 * The component also includes tooltips for platform details (e.g., user agent).
 */
const CoreWebVitals = ({ heartbeats }: any) => {
  const { t } = useTranslation(); // Added hook

  return (
    <>
      <section>
        <h2 className="text-xl font-bold mb-4">{t('metrics.core-web-vitals')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: t('metrics.largest-contentful-paint'),
              accessor: (heartbeat: any) => heartbeat.cwv.lcp,
              icon: <Image className="h-5 w-5" />,
              max: 4000,
            },
            {
              name: t('metrics.cumulative-layout-shift'),
              accessor: (heartbeat: any) => heartbeat.cwv.cls,
              icon: <AlertCircle className="h-5 w-5" />,
              max: 0.5,
            },
            {
              name: t('metrics.time-to-interactive'),
              accessor: (heartbeat: any) => heartbeat.cwv.tti,
              icon: <Clock className="h-5 w-5" />,
              max: 7000,
            },
          ].map((vital) => (
            <Card key={vital.name} className="p-4">
              <div className="flex items-center gap-2 mb-4">
                {vital.icon}
                <h3 className="font-medium">{vital.name}</h3>
              </div>
              <div className="space-y-4">
                {heartbeats.map((heartbeat: any) => {
                  const value = vital.accessor(heartbeat);
                  let color = 'text-green-500';
                  if (value > vital.max * 0.625) {
                    color = 'text-red-500';
                  } else if (value > vital.max * 0.45) {
                    color = 'text-amber-500';
                  }
                  return (
                    <div key={heartbeat.id} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          {heartbeat.platform.type === 'mobile' ? <Smartphone className='h-3 w-3 text-gray-500' /> : <Monitor className='h-3 w-3 text-gray-500' />}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span>
                                  {heartbeat.platform.type.charAt(0).toUpperCase() +
                                    heartbeat.platform.type.slice(1)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <>{heartbeat.platform.user_agent}</>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className={`font-bold ${color}`}>
                          {vital.name === 'CLS' ? value.toFixed(2) : formatTime(value)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${color === 'text-red-500'
                            ? 'bg-red-500'
                            : color === 'text-amber-500'
                              ? 'bg-amber-500'
                              : 'bg-green-500'
                            }`}
                          style={{ width: `${Math.min(100, (value / vital.max) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Metrics Comparison */}
      <section>
        <h2 className="text-xl font-bold mb-4">{t('metrics.other-metrics')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: t('metrics.first-contentful-paint'),
              accessor: (heartbeat: any) => heartbeat.cwv.fcp,
              format: formatTime,
              icon: <Clock className="h-5 w-5" />,
            },
            {
              name: t('metrics.speed-index'),
              accessor: (heartbeat: any) => heartbeat.cwv.si,
              format: formatTime,
              icon: <Zap className="h-5 w-5" />,
            },
            {
              name: t('metrics.total-blocking-time'),
              accessor: (heartbeat: any) => heartbeat.cwv.tbt,
              format: (v: number) => v + 'ms',
              icon: <Clock className="h-5 w-5" />,
            },
            {
              name: t('metrics.time-to-first-byte'),
              accessor: (heartbeat: any) => heartbeat.cwv.ttfb,
              format: (v: number) => v + 'ms',
              icon: <Database className="h-5 w-5" />,
            },
          ].map((metric) => (
            <Card key={metric.name} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                {metric.icon}
                <h3 className="font-medium text-sm">{metric.name}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {heartbeats.map((heartbeat: any) => {
                  const value = metric.accessor(heartbeat);
                  return (
                    <div key={heartbeat.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {heartbeat.platform.type === 'mobile' ? <Smartphone className='h-3 w-3 text-gray-500' /> : <Monitor className='h-3 w-3 text-gray-500' />}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span>
                                {heartbeat.platform.type.charAt(0).toUpperCase() +
                                  heartbeat.platform.type.slice(1)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <>{heartbeat.platform.user_agent}</>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-lg font-bold">{metric.format(value)}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export { CoreWebVitals };
