import { Card } from '@radix-ui/themes';
import { AlertCircle, Clock, Database, Image, Monitor, Smartphone, Zap } from 'lucide-react';
import { formatTime } from '~/utils/dashboards';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const CwvComparison = ({ heartbeats }: any) => {
    return (<>
        <section>
            <h2 className="text-xl font-bold mb-4">Core Web Vitals Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    {
                        name: 'Largest Contentful Paint (LCP)',
                        accessor: (heartbeat: any) => heartbeat.timings.LCP,
                        icon: <Image className="h-5 w-5" />,
                        max: 4000,
                    },
                    {
                        name: 'Cumulative Layout Shift (CLS)',
                        accessor: (heartbeat: any) => heartbeat.timings.CLS,
                        icon: <AlertCircle className="h-5 w-5" />,
                        max: 0.5,
                    },
                    {
                        name: 'Time to Interactive (TTI)',
                        accessor: (heartbeat: any) => heartbeat.timings.TTI,
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
            <h2 className="text-xl font-bold mb-4">Other Metrics Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        name: 'First Contentful Paint (FCP)',
                        accessor: (heartbeat: any) => heartbeat.timings.FCP,
                        format: formatTime,
                        icon: <Clock className="h-5 w-5" />,
                    },
                    {
                        name: 'Speed Index (SI)',
                        accessor: (heartbeat: any) => heartbeat.timings.SI,
                        format: formatTime,
                        icon: <Zap className="h-5 w-5" />,
                    },
                    {
                        name: 'Total Blocking Time (TBT)',
                        accessor: (heartbeat: any) => heartbeat.timings.TBT,
                        format: (v: number) => v + 'ms',
                        icon: <Clock className="h-5 w-5" />,
                    },
                    {
                        name: 'Time to First Byte (TTFB)',
                        accessor: (heartbeat: any) => heartbeat.timings.TTFB,
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
        </section></>)
}

export { CwvComparison };
