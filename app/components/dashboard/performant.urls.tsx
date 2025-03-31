import { Laptop, Smartphone } from 'lucide-react';
import { NavLink } from 'react-router';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { getProgressColor } from '~/utils/dashboards';

interface UrlData {
  url: string;
  slug: string;
  average?: number;
  grades?: number[];
  variation?: number;
  desktopAverage?: number;
  mobileAverage?: number;
  difference?: number;
}

interface PerformantUrlsProps {
  desktop: UrlData[];
  mobile: UrlData[];
  differences: UrlData[];
}

/**
 * The `PerformantUrls` component displays performance data for URLs across
 * desktop and mobile platforms, as well as the performance gap between the two.
 * It organizes the data into three sections: Desktop Performance, Mobile Performance,
 * and Desktop vs Mobile comparison.
 *
 * @param {Object} props - The props for the component.
 * @param {PerformantUrlsProps} props.data - The performance data to display.
 * @param {Array} props.data.desktop - An array of desktop performance data objects.
 * @param {Array} props.data.mobile - An array of mobile performance data objects.
 * @param {Array} props.data.differences - An array of objects representing the performance
 * gap between desktop and mobile platforms.
 *
 * @returns {JSX.Element} A grid layout containing cards for each performance category.
 *
 * - **Desktop Performance**: Displays the most performant URLs for desktop, including
 *   a line chart of grades and average performance.
 * - **Mobile Performance**: Displays the most performant URLs for mobile, including
 *   a line chart of grades and average performance.
 * - **Desktop vs Mobile**: Highlights the performance gap between desktop and mobile
 *   platforms, showing averages and a visual representation of the gap.
 *
 * @example
 * ```tsx
 * const data = {
 *   desktop: [
 *     { url: 'https://example.com', slug: 'example', average: 90, variation: 5, grades: [88, 92, 89] },
 *   ],
 *   mobile: [
 *     { url: 'https://example.com', slug: 'example', average: 85, variation: 4, grades: [83, 87, 84] },
 *   ],
 *   differences: [
 *     { url: 'https://example.com', slug: 'example', desktopAverage: 90, mobileAverage: 85, difference: 5 },
 *   ],
 * };
 *
 * <PerformantUrls data={data} />;
 * ```
 */
const PerformantUrls = ({ data }: { data: PerformantUrlsProps }) => {
  if (!data) {
    return <></>;
  }

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Laptop className='w-5 h-5' />
            Desktop Performance
          </CardTitle>
          <CardDescription>Most performant URLs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data.desktop.map((url, index) => (
              <NavLink to={`/urls/${url.slug}`} key={index} className='flex items-center justify-between h-[50px]'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.url}>
                      {url.url}
                    </span>
                    <span className='text-sm font-bold' style={{ color: getProgressColor(url.average!) }}>
                      {url.average}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-full h-8'>
                      <ResponsiveContainer className='w-full' height={30}>
                        <LineChart data={url.grades!.map((value, i) => ({ value, index: i }))}>
                          <CartesianGrid />
                          <Line type='monotone' dataKey='value' stroke={getProgressColor(url.average!)} strokeWidth={2} dot={false} />
                          <YAxis domain={[url.average! - url.variation!, url.average! + url.variation!]} hide />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className='ml-2 text-xs text-muted-foreground'>±{url.variation}%</div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Smartphone className='w-5 h-5' />
            Mobile Performance
          </CardTitle>
          <CardDescription>Most performant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data.mobile.map((url, index) => (
              <NavLink to={`/urls/${url.slug}`} key={index} className='flex items-center justify-between h-[50px]'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.url}>
                      {url.url}
                    </span>
                    <span className='text-sm font-bold' style={{ color: getProgressColor(url.average!) }}>
                      {url.average}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-full h-8 pr-5'>
                      <ResponsiveContainer className='w-full' height={30}>
                        <LineChart data={url.grades!.map((value, i) => ({ value, index: i }))}>
                          <CartesianGrid />
                          <Line type='monotone' dataKey='value' stroke={getProgressColor(url.average!)} strokeWidth={2} dot={false} />
                          <YAxis domain={[url.average! - url.variation!, url.average! + url.variation!]} hide />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className='ml-2 text-xs text-muted-foreground'>±{url.variation}%</div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Laptop className='w-5 h-5 mr-1' />
            <Smartphone className='w-5 h-5' />
            Desktop vs Mobile
          </CardTitle>
          <CardDescription>Performance gap between platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data.differences.map((url, index) => (
              <NavLink to={`/urls/${url.slug}`} key={index} className='flex items-center justify-between h-[50px]'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.url}>
                      {url.url}
                    </span>
                    <span className='text-sm font-bold flex items-center'>{url.difference}%</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Laptop className='w-4 h-4 mr-1 text-muted-foreground' />
                      <span className='text-sm' style={{ color: getProgressColor(url.desktopAverage!) }}>
                        {url.desktopAverage}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Smartphone className='w-4 h-4 mr-1 text-muted-foreground' />
                      <span className='text-sm' style={{ color: getProgressColor(url.mobileAverage!) }}>
                        {url.mobileAverage}
                      </span>
                    </div>
                    <div className='w-24 h-2 bg-gray-200 rounded-full'>
                      <div
                        className='h-full rounded-full'
                        style={{
                          width: `${100 - (url.mobileAverage! / url.desktopAverage!) * 100}%`,
                          backgroundColor: getProgressColor(url.mobileAverage!),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { PerformantUrls };
