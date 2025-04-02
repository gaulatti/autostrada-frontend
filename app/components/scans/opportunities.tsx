import { Box, Card, Tabs } from '@radix-ui/themes';
import { AlertCircle, Clock, Code, Database, ExternalLink, FileText, Image } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

/**
 * The t('scans.opportunities') component renders a tabbed interface displaying opportunities for improvement
 * and a resource breakdown based on the provided `heartbeat` report data. It also includes a section
 * for key recommendations derived from the opportunities.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.heartbeat - The heartbeat data containing the report.
 * @param {Object} props.heartbeat.report - The report data used to populate the component.
 * @param {Array} [props.heartbeat.report.opportunities] - A list of opportunities for improvement.
 * Each opportunity includes an `id`, `title`, `description`, and `savings`.
 * @param {Object} [props.heartbeat.report.resourceSummary] - A summary of resource usage, including
 * breakdowns by resource type, total transfer size, and total requests.
 * @param {Object} [props.heartbeat.report.resourceSummary.breakdown] - A breakdown of resource usage
 * by type (e.g., script, document, font, etc.).
 * @param {number} [props.heartbeat.report.resourceSummary.totalTransferSize] - The total size of all
 * resources transferred, in bytes.
 * @param {number} [props.heartbeat.report.resourceSummary.totalRequests] - The total number of resource
 * requests.
 *
 * @returns {JSX.Element} A React component that displays the opportunities, resource breakdown, and
 * key recommendations based on the provided report data.
 */
const Opportunities = ({ heartbeat: { report } }: any) => {
  const { t } = useTranslation();

  return (
    <>
      <Tabs.Root defaultValue='opportunities'>
        <Tabs.List size='2'>
          <Tabs.Trigger value='opportunities'>{t('scans.opportunities')}</Tabs.Trigger>
          <Tabs.Trigger value='resources'>{t('scans.resource-breakdown')}</Tabs.Trigger>
        </Tabs.List>

        <Box pt='3'>
          <Tabs.Content value='opportunities'>
            {report && report.opportunities ? (
              <Card className='p-4'>
                <h3 className='text-lg font-semibold mb-4'>{t('scans.opportunities-for-improvement')}</h3>
                <div className='space-y-4'>
                  {report.opportunities.map((opportunity: any) => {
                    return (
                      <div
                        key={opportunity.id}
                        className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className={`p-2 rounded-full ${
                              opportunity.savings !== '0ms'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                            }`}
                          >
                            {opportunity.savings !== '0ms' ? <AlertCircle className='h-4 w-4' /> : <Clock className='h-4 w-4' />}
                          </div>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className='font-medium'>{opportunity.title}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <ReactMarkdown>{opportunity.description}</ReactMarkdown>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className='flex items-center'>
                          {opportunity.savings !== '0ms' && (
                            <span className='text-sm font-medium text-amber-600 dark:text-amber-400 mr-2'>Potential savings: {opportunity.savings}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
                  <p>{t('scans.showing-opportunities', { count: report.opportunities.length })}</p>
                </div>
              </Card>
            ) : (
              <Card className='p-4'>
                <p>{t('scans.no-opportunities')}</p>
              </Card>
            )}
          </Tabs.Content>

          <Tabs.Content value='resources'>
            {report && report.resourceSummary ? (
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
                    { type: 'Script', key: 'script', icon: <Code className='h-4 w-4' /> },
                    { type: 'Document', key: 'document', icon: <FileText className='h-4 w-4' /> },
                    { type: 'Font', key: 'font', icon: <FileText className='h-4 w-4' /> },
                    { type: 'Image', key: 'image', icon: <Image className='h-4 w-4' /> },
                    { type: 'Stylesheet', key: 'stylesheet', icon: <FileText className='h-4 w-4' /> },
                    { type: 'Other', key: 'other', icon: <FileText className='h-4 w-4' /> },
                    { type: 'Third-party', key: 'third-party', icon: <ExternalLink className='h-4 w-4' /> },
                  ].map((resource) => {
                    const breakdown = report.resourceSummary.breakdown;
                    const resourceData = breakdown[resource.key];
                    return resourceData ? (
                      <div key={resource.key} className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>{resource.icon}</div>
                          <span className='font-medium'>{resource.type}</span>
                        </div>
                        <div className='flex gap-8'>
                          <span className='text-sm font-medium'>{(resourceData.size / 1024).toFixed(1)} KB</span>
                          <span className='text-sm font-medium w-16 text-right'>{resourceData.count}</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                  {report.resourceSummary.totalRequests && (
                    <div className='flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                      <div className='flex items-center gap-3'>
                        <div className='p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                          <Database className='h-4 w-4' />
                        </div>
                        <span className='font-medium'>Total</span>
                      </div>
                      <div className='flex gap-8'>
                        <span className='text-sm font-medium'>{(report.resourceSummary.totalTransferSize / (1024 * 1024)).toFixed(2)} MB</span>
                        <span className='text-sm font-medium w-16 text-right'>{report.resourceSummary.totalRequests}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className='p-4'>
                <p>Resource details not available.</p>
              </Card>
            )}
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      {/* Key Insights */}
      <section>
        {report && report.opportunities ? (
          <Card className='p-6'>
            <h2 className='text-xl font-bold mb-4'>Key Recommendations</h2>
            <div className='space-y-4'>
              {report.opportunities
                .filter((opp: any) => opp.savings !== '0ms')
                .map((opp: any) => (
                  <div key={opp.id} className='space-y-2'>
                    <h3 className='font-semibold'>{opp.title}</h3>
                    <ReactMarkdown>{opp.description}</ReactMarkdown>
                  </div>
                ))}
              {report.opportunities.filter((opp: any) => opp.savings !== '0ms').length === 0 && (
                <p className='text-gray-600 dark:text-gray-400'>No key recommendations available.</p>
              )}
            </div>
          </Card>
        ) : (
          <Card className='p-6'>
            <p>Recommendations not available.</p>
          </Card>
        )}
      </section>
    </>
  );
};

export { Opportunities };
