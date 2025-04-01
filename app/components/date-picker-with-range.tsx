import { addWeeks, format, set } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpdate: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({ className, onUpdate }: DatePickerWithRangeProps) {
  const now = useMemo(() => new Date(), []);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addWeeks(now, -1),
    to: now,
  });

  /**
   * When selecting a date in a range, include boundaries as well.
   * https://github.com/gaulatti/autostrada-frontend/issues/2
   */
  useEffect(() => {
    if (date?.to) {
      const adjustedTo = set(date.to, { hours: 23, minutes: 59, seconds: 59 });
      onUpdate({ ...date, to: adjustedTo });
    } else {
      onUpdate(date);
    }
  }, [date]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id='date' variant={'outline'} className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar initialFocus mode='range' defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
