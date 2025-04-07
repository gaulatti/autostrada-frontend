import type { JSX } from 'react';

/**
 * A reusable card component designed to display data with customizable styles.
 *
 * @param backgroundColor - A string representing the background color of the card.
 *                          This should be a valid Tailwind CSS class.
 * @param textColor - A string representing the text color of the card.
 *                    This should be a valid Tailwind CSS class.
 * @param header - A JSX element to be rendered in the header section of the card.
 * @param main - A JSX element to be rendered in the main content area of the card.
 *
 * @returns A styled card component with hover effects and customizable content.
 */
const DataCard = ({ backgroundColor, textColor, header, main }: { backgroundColor: string; textColor: string; header: JSX.Element; main: JSX.Element }) => (
  <div className={`rounded-md overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:opacity-80 ${backgroundColor} ${textColor}`}>
    <div className='p-4'>
      <header className='flex items-center justify-between mb-2 text-sm font-bold'>{header}</header>
      <main className='flex items-center'>{main}</main>
    </div>
  </div>
);

export { DataCard };
