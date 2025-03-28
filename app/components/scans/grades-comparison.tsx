import { Card, Progress } from '@radix-ui/themes';
import { AlertCircle, ExternalLink, FileText, Monitor, Smartphone, Zap } from 'lucide-react';
import { getProgressColor, getScoreColor } from '~/utils/dashboards';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const GradesComparison = ({ heartbeats }: any) => (
  <section>
    <h2 className='text-xl font-bold mb-4'>Score Comparison</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {[
        {
          name: 'Performance',
          accessor: (heartbeat: any) => heartbeat.performance,
          icon: <Zap className='h-5 w-5' />,
        },
        {
          name: 'Accessibility',
          accessor: (heartbeat: any) => heartbeat.accessibility,
          icon: <AlertCircle className='h-5 w-5' />,
        },
        {
          name: 'Best Practices',
          accessor: (heartbeat: any) => heartbeat.bestPractices,
          icon: <FileText className='h-5 w-5' />,
        },
        {
          name: 'SEO',
          accessor: (heartbeat: any) => heartbeat.seo,
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

export { GradesComparison };
