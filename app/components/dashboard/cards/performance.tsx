'use client';

import { ArrowRight, Laptop, Smartphone, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { DataCard } from './data.card';

export type URLPerformanceData = {
  url: string;
  slug: string;
  average?: number;
  variation?: number;
  grades?: number[];
};

export type ClusterPerformanceData = {
  name: string;
  slug: string;
  average?: number;
  variation?: number;
  grades?: number[];
};

export type PerformanceComparisonData = { url?: string; name: string, desktopAverage: number; slug: string; mobileAverage: number; difference: number };

const getProgressColor = (progress: number): string => {
  if (progress >= 90) {
    return 'bg-green-600';
  } else if (progress >= 50) {
    return 'bg-amber-400';
  } else {
    return 'bg-red-500';
  }
};

const getTextColor = (progress: number): string => {
  return progress >= 50 && progress < 90 ? '#333' : '#fff';
};

/**
 * A React component that renders a performance summary for a given URL with a metro style.
 */

const UrlPerformance = ({ url, average, grades, slug, variation, solo }: URLPerformanceData & { solo?: 'desktop' | 'mobile' }) => {
  const name = url!.replace(/^https?:\/\//, '');
  return <PerformanceCard name={name} average={average} grades={grades} slug={slug} variation={variation} link={`/urls/${slug}`} solo={solo} />;
};

const ClusterPerformance = ({ name, average, grades, slug, variation, solo }: ClusterPerformanceData & { solo?: 'desktop' | 'mobile' }) => {
  return <PerformanceCard name={name} average={average} grades={grades} slug={slug} variation={variation} link={`/urls/${slug}`} />;
};

const PerformanceComparisonCard = ({
  url,
  name,
  slug,
  desktopAverage,
  mobileAverage,
  difference,
  solo,
}: PerformanceComparisonData & { solo?: 'desktop' | 'mobile' }) => {
  const title = name || url!.replace(/^https?:\/\//, '');
  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = getProgressColor(100 - difference);
  const textColor = getTextColor(100 - difference);
  const { t } = useTranslation();
  const header = (
    <>
      <div className='flex items-center h-6'>
        <span className={`flex items-center gap-2 text-sm ${!solo && 'font-semibold'} truncate mr-2`} style={{ color: textColor }} title={title}>
          {solo ? (
            <>
              {solo && (
                <>
                  <Laptop className='w-5 h-5' />
                  <Smartphone className='w-5 h-5' />
                </>
              )}
              {t(`dashboard.desktop-vs-mobile`)}
            </>
          ) : (
            title
          )}
        </span>
      </div>
      <ArrowRight
        size={18}
        className='transition-opacity duration-300'
        style={{
          color: textColor,
          opacity: isHovered ? 1 : 0.5,
        }}
      />
    </>
  );

  const main = (
    <>
      <div className='grid grid-cols-3 w-full items-center justify-between h-8'>
        <div className='flex items-center' style={{ color: textColor }}>
          <Laptop className='w-4 h-4 mr-1' />
          <span className='text-sm font-bold'>{desktopAverage}</span>
        </div>
        <div className='flex items-center' style={{ color: textColor }}>
          <Smartphone className='w-4 h-4 mr-1' />
          <span className='text-sm font-bold'>{mobileAverage}</span>
        </div>
      </div>
      <div className='flex gap-3 items-center justify-between'>
        <span className='text-xs' style={{ color: textColor }}>
          ±{difference}
        </span>
        <div className='w-24 h-2 bg-gray-200/40 rounded-full'>
          <div
            className={`h-full rounded-full ${textColor}`}
            style={{
              width: `${difference}%`,
              backgroundColor: textColor,
            }}
          ></div>
        </div>
      </div>
    </>
  );
  const card = <DataCard backgroundColor={backgroundColor} textColor={textColor} header={header} main={main} />;
  return solo ? (
    card
  ) : (
    <Link to={`/urls/${slug}`} className='block' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {card}
    </Link>
  );
};

const PerformanceCard = ({
  name,
  average,
  grades,
  variation,
  link,
  solo,
}: Partial<URLPerformanceData | ClusterPerformanceData> & { name: string; link: string; solo?: 'desktop' | 'mobile' }) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = getProgressColor(average!);
  const textColor = getTextColor(average!);
  const chartData = grades?.map((value, index) => ({
    value,
    index,
    formattedValue: value.toFixed(0),
  }));

  const header = (
    <>
      <div className='flex items-center'>
        <span className={`flex items-center gap-2 text-sm ${!solo && 'font-semibold'} truncate mr-2`} style={{ color: textColor }} title={name}>
          {solo ? (
            <>
              {solo === 'desktop' ? <Laptop className='w-5 h-5' /> : <Smartphone className='w-5 h-5' />}
              {t(`dashboard.${solo}-performance`)}
            </>
          ) : (
            name
          )}
        </span>
        <span
          className='text-xs font-bold px-2 py-1 rounded-full flex items-center'
          style={{
            backgroundColor: `${textColor}20`,
            color: textColor,
          }}
        >
          <TrendingUp size={14} className='mr-1' />
          {average}
        </span>
      </div>
      <ArrowRight
        size={18}
        className='transition-opacity duration-300'
        style={{
          color: textColor,
          opacity: isHovered ? 1 : 0.5,
        }}
      />
    </>
  );

  const main = (
    <>
      <div className='flex-1 h-8'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={chartData}>
            <YAxis domain={[Math.max(0, average! - variation! * 1.5), Math.min(100, average! + variation! * 1.5)]} hide />
            <Line
              type='monotone'
              dataKey='value'
              stroke={textColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: textColor,
                stroke: backgroundColor,
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return <div className='bg-gray-900 text-white px-2 py-1 rounded text-xs'>Score: {payload[0].payload.formattedValue}</div>;
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        className='ml-2 text-xs px-2 py-1 rounded-full'
        style={{
          backgroundColor: `${textColor}20`,
          color: textColor,
        }}
      >
        ±{variation}
      </div>
    </>
  );

  const card = <DataCard backgroundColor={backgroundColor} textColor={textColor} header={header} main={main} />;

  return solo ? (
    card
  ) : (
    <Link to={link} className='block' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {card}
    </Link>
  );
};

export { ClusterPerformance, PerformanceCard, PerformanceComparisonCard, UrlPerformance };
