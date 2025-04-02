import { Card, Progress } from '@radix-ui/themes';
import { AlertCircle, ExternalLink, FileText, Monitor, Smartphone, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProgressColor, getScoreColor } from '~/utils/dashboards';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

/**
 * The t('metrics.grades') component renders a section displaying various metrics (Performance, Accessibility,
 * Best Practices, and SEO) for a list of heartbeats. Each metric is displayed as a card containing
 * platform-specific scores and progress bars.
 *
 * @param {Object} props - The props for the component.
 * @param {any[]} props.heartbeats - An array of heartbeat objects containing platform and grade data.
 *
 * @returns {JSX.Element} A section containing metric cards with scores and progress bars for each heartbeat.
 *
 * ### Example
 * ```tsx
 * const heartbeats = [
 *   {
 *     id: 1,
 *     platform: { type: 'mobile', user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)' },
 *     grades: { performance: 85, accessibility: 90, best_practices: 80, seo: 95 },
 *   },
 *   {
 *     id: 2,
 *     platform: { type: 'desktop', user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
 *     grades: { performance: 75, accessibility: 85, best_practices: 70, seo: 80 },
 *   },
 * ];
 *
 * <Grades heartbeats={heartbeats} />
 * ```
 */
const Grades = ({ heartbeats }: { heartbeats: any[] }) => {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className='text-xl font-bold mb-4'>{t('metrics.grades')}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          {
            name: t('metrics.performance'),
            accessor: (heartbeat: any) => heartbeat.grades.performance,
            icon: <Zap className='h-5 w-5' />,
          },
          {
            name: t('metrics.accessibility'),
            accessor: (heartbeat: any) => heartbeat.grades.accessibility,
            icon: <AlertCircle className='h-5 w-5' />,
          },
          {
            name: t('metrics.best-practices'),
            accessor: (heartbeat: any) => heartbeat.grades.best_practices,
            icon: <FileText className='h-5 w-5' />,
          },
          {
            name: t('metrics.seo'),
            accessor: (heartbeat: any) => heartbeat.grades.seo,
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
              {heartbeats.map((heartbeat: any) => {
                const value = metric.accessor(heartbeat);
                return (
                  <div key={heartbeat.id} className='space-y-1'>
                    <div className='flex items-center gap-1 text-sm'>
                      {heartbeat.platform.type === 'mobile' ? <Smartphone className='h-3 w-3 text-gray-500' /> : <Monitor className='h-3 w-3 text-gray-500' />}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span>{heartbeat.platform.type.charAt(0).toUpperCase() + heartbeat.platform.type.slice(1)}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <>{heartbeat.platform.user_agent}</>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                      <span className={`font-bold ${getScoreColor(value)}`}>{Math.round(value)}</span>
                    </div>
                    <Progress value={value} className='h-2' color={getProgressColor(value)} />
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export { Grades };
