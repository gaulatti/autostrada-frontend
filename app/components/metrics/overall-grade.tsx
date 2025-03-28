import { Button, Card } from '@radix-ui/themes';
import { ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { NavLink } from 'react-router';
import { calculateGrade } from '~/utils/dashboards';

const OverallGrade = ({ heartbeat }: any) => {
    const grade = calculateGrade(
        heartbeat.performance,
        heartbeat.accessibility,
        heartbeat.bestPractices,
        heartbeat.seo
    );
    return (
        <Card key={heartbeat.id} className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-bl-lg">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {heartbeat.platform.type === 'mobile' ? (
                        <Smartphone className="h-4 w-4" />
                    ) : (
                        <Monitor className="h-4 w-4" />
                    )}
                    <span>
                        {heartbeat.platform.type.charAt(0).toUpperCase() +
                            heartbeat.platform.type.slice(1)}
                    </span>
                </div>
            </div>
            <div className="flex items-start gap-6 mt-4">
                <div className="flex-shrink-0">
                    <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center bg-opacity-20 ${grade.grade.startsWith('A')
                            ? 'bg-green-100 dark:bg-green-900'
                            : grade.grade.startsWith('B')
                                ? 'bg-green-100 dark:bg-green-900'
                                : grade.grade.startsWith('C')
                                    ? 'bg-amber-100 dark:bg-amber-900'
                                    : 'bg-red-100 dark:bg-red-900'
                            }`}
                    >
                        <span className={`text-4xl font-bold ${grade.color}`}>
                            {grade.grade}
                        </span>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold">Overall Grade: {grade.grade}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Performance: {heartbeat.grades.performance}/100, Accessibility: {heartbeat.grades.accessibility}/100, Best Practices: {heartbeat.grades.best_practices}/100, SEO: {heartbeat.grades.seo}/100.
                    </p>
                    <div className="flex mt-2">
                        <Button asChild variant="outline" size="1" className="flex items-center gap-1">
                            <NavLink to={`/heartbeats/${heartbeat.slug}`}>
                                View Details <ArrowRight className="h-3 w-3 ml-1" />
                            </NavLink>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export { OverallGrade };
