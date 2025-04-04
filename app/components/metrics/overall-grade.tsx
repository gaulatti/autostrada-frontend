import { Button, Card } from '@radix-ui/themes';
import { ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { calculateGrade } from '~/utils/dashboards';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

/**
 * The `OverallGrade` component displays an overall grade card for a given heartbeat.
 * It calculates the grade based on performance, accessibility, best practices, and SEO scores.
 * The component also provides an optional link to view detailed information about the heartbeat.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.heartbeat - The heartbeat data containing grades and platform information.
 * @param {Object} props.heartbeat.grades - The grades object with performance, accessibility, best practices, and SEO scores.
 * @param {number} props.heartbeat.grades.performance - The performance score (0-100).
 * @param {number} props.heartbeat.grades.accessibility - The accessibility score (0-100).
 * @param {number} props.heartbeat.grades.best_practices - The best practices score (0-100).
 * @param {number} props.heartbeat.grades.seo - The SEO score (0-100).
 * @param {Object} props.heartbeat.platform - The platform information for the heartbeat.
 * @param {string} props.heartbeat.platform.type - The platform type (e.g., "mobile" or "desktop").
 * @param {string} props.heartbeat.platform.user_agent - The user agent string for the platform.
 * @param {string} props.heartbeat.slug - The unique identifier for the heartbeat used in the details link.
 * @param {boolean} [props.showLink=true] - Whether to show the t('metrics.view-details') link.
 *
 * @returns {JSX.Element} A card component displaying the overall grade and related information.
 */
const OverallGrade = ({ heartbeat, showLink = true }: any) => {
  const { t } = useTranslation();
  const grade = calculateGrade(heartbeat.grades.performance, heartbeat.grades.accessibility, heartbeat.grades.best_practices, heartbeat.grades.seo);
  return (
    <Card key={heartbeat.id} className='p-6 relative overflow-hidden'>
      <div className='absolute top-0 right-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-bl-lg'>
        <div className='flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
          {heartbeat.platform.type === 'mobile' ? <Smartphone className='h-4 w-4' /> : <Monitor className='h-4 w-4' />}
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
      </div>
      <div className='flex items-center gap-6 m-4'>
        <div className='flex-shrink-0'>
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center bg-opacity-20 ${
              grade.grade.startsWith('A')
                ? 'bg-green-100 dark:bg-green-900'
                : grade.grade.startsWith('B')
                ? 'bg-green-100 dark:bg-green-900'
                : grade.grade.startsWith('C')
                ? 'bg-amber-100 dark:bg-amber-900'
                : 'bg-red-100 dark:bg-red-900'
            }`}
          >
            <span className={`text-4xl font-bold ${grade.color}`}>{grade.grade}</span>
          </div>
        </div>
        <div className='space-y-2 flex-col justify-between'>
          <h2 className='text-xl font-bold'>{t('metrics.overall-grade')}: {grade.grade}</h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('metrics.performance')}: {heartbeat.grades.performance}/100, {t('metrics.accessibility')}: {heartbeat.grades.accessibility}/100, {t('metrics.best-practices')}: {heartbeat.grades.best_practices}/100, {t('metrics.seo')}: {heartbeat.grades.seo}/100.
          </p>
          {showLink && (
            <div className='flex mt-2'>
              <Button asChild variant='outline' size='1' className='flex items-center gap-1'>
                <NavLink to={`/heartbeats/${heartbeat.slug}`}>
                  {t('metrics.view-details')} <ArrowRight className='h-3 w-3 ml-1' />
                </NavLink>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export { OverallGrade };
