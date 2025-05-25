import { useState, useEffect } from 'react';
import type { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from './date-picker-with-range';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ValidatingDatePickerProps {
  onUpdate: (date: DateRange | undefined) => void;
}

export function ValidatingDatePicker({ onUpdate }: ValidatingDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const { t } = useTranslation();

  // Validate the date range and update parent component only if valid
  useEffect(() => {
    if (!dateRange) {
      setIsValid(true);
      onUpdate(undefined);
      return;
    }

    const { from, to } = dateRange;

    // Check if from and to dates are provided and from <= to
    if (from && to) {
      // If both dates are provided, ensure from <= to
      if (new Date(from) <= new Date(to)) {
        setIsValid(true);
        onUpdate(dateRange);
      } else {
        // Invalid range: from > to
        setIsValid(false);
      }
    } else if (from && !to) {
      // From date only is valid
      setIsValid(true);
      onUpdate({ from, to: from }); // Use from as the to date for single date selection
    } else if (!from && to) {
      // To date only without from date is invalid
      setIsValid(false);
    } else {
      // No dates selected
      setIsValid(true);
      onUpdate(undefined);
    }
  }, [dateRange, onUpdate]);

  // Handle date updates from the picker
  const handleDateUpdate = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  return (
    <div className="relative">
      <DatePickerWithRange onUpdate={handleDateUpdate} />
      {!isValid && (
        <div className="absolute top-full mt-1 z-50">
          <Alert variant="destructive" className="w-[300px] animate-pulse shadow-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              {t('errors.invalid-date-range', 'Please select a valid date range')}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
