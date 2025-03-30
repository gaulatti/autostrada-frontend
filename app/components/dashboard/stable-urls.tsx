import { ArrowDown, Laptop, Smartphone } from 'lucide-react';
import { Line, LineChart, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { getProgressColor } from '~/utils/dashboards';
const stableUrlsData = {
  desktop: {
    url1: { name: 'example.com/home', score: 95, variation: 3, trend: [92, 94, 93, 95, 96, 94, 95] },
    url2: { name: 'example.com/about', score: 89, variation: 5, trend: [85, 83, 86, 88, 90, 87, 89] },
    url3: { name: 'example.com/products', score: 83, variation: 6, trend: [78, 76, 80, 82, 84, 81, 83] },
  },
  mobile: {
    url1: { name: 'example.com/home', score: 88, variation: 4, trend: [85, 86, 87, 89, 90, 88, 88] },
    url2: { name: 'example.com/about', score: 82, variation: 6, trend: [78, 76, 80, 83, 85, 81, 82] },
    url3: { name: 'example.com/products', score: 76, variation: 8, trend: [70, 68, 74, 76, 80, 75, 76] },
  },
  comparison: {
    url1: { name: 'example.com/home', desktop: 95, mobile: 88, diff: 7 },
    url2: { name: 'example.com/about', desktop: 89, mobile: 82, diff: 7 },
    url3: { name: 'example.com/products', desktop: 83, mobile: 76, diff: 7 },
  },
};

const MostStableUrls = () => {
  return (
    <div className='grid gap-6 md:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Laptop className='w-5 h-5' />
            Desktop Performance
          </CardTitle>
          <CardDescription>Most stable URLs on desktop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Object.values(stableUrlsData.desktop).map((url, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.name}>
                      {url.name}
                    </span>
                    <span className='text-sm font-bold' style={{ color: getProgressColor(url.score) }}>
                      {url.score}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-full h-8'>
                      <LineChart width={150} height={30} data={url.trend.map((value, i) => ({ value, index: i }))}>
                        <Line type='monotone' dataKey='value' stroke={getProgressColor(url.score)} strokeWidth={2} dot={false} />
                        <YAxis domain={[50, 100]} hide />
                      </LineChart>
                    </div>
                    <div className='ml-2 text-xs text-muted-foreground'>±{url.variation}%</div>
                  </div>
                </div>
              </div>
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
          <CardDescription>Most stable URLs on mobile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Object.values(stableUrlsData.mobile).map((url, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.name}>
                      {url.name}
                    </span>
                    <span className='text-sm font-bold' style={{ color: getProgressColor(url.score) }}>
                      {url.score}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-full h-8'>
                      <LineChart width={150} height={30} data={url.trend.map((value, i) => ({ value, index: i }))}>
                        <Line type='monotone' dataKey='value' stroke={getProgressColor(url.score)} strokeWidth={2} dot={false} />
                        <YAxis domain={[50, 100]} hide />
                      </LineChart>
                    </div>
                    <div className='ml-2 text-xs text-muted-foreground'>±{url.variation}%</div>
                  </div>
                </div>
              </div>
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
            {Object.values(stableUrlsData.comparison).map((url, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.name}>
                      {url.name}
                    </span>
                    <span className='text-sm font-bold flex items-center'>
                      <ArrowDown className='w-3 h-3 text-red-500 mr-1' />
                      {url.diff}%
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Laptop className='w-4 h-4 mr-1 text-muted-foreground' />
                      <span className='text-sm' style={{ color: getProgressColor(url.desktop) }}>
                        {url.desktop}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Smartphone className='w-4 h-4 mr-1 text-muted-foreground' />
                      <span className='text-sm' style={{ color: getProgressColor(url.mobile) }}>
                        {url.mobile}
                      </span>
                    </div>
                    <div className='w-24 h-2 bg-gray-200 rounded-full'>
                      <div
                        className='h-full rounded-full'
                        style={{
                          width: `${(url.mobile / url.desktop) * 100}%`,
                          backgroundColor: getProgressColor(url.mobile),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { MostStableUrls };
