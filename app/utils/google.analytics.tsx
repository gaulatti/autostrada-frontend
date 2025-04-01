import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

/**
 * Initializes Google Analytics using the tracking ID provided in the environment variables.
 *
 * This function checks if the `VITE_GOOGLE_ANALYTICS` environment variable is defined.
 * If it is, it initializes Google Analytics with the provided tracking ID.
 *
 * @remarks
 * Ensure that the `VITE_GOOGLE_ANALYTICS` environment variable is set in your environment
 * configuration for this function to work correctly.
 */
export const initGA = () => {
  if (import.meta.env.VITE_GOOGLE_ANALYTICS) {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS!);
  }
};

/**
 * Tracks a pageview event in Google Analytics.
 *
 * @param path - The path of the page to be tracked.
 */
export const trackPageview = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

/**
 * A React component that tracks route changes and sends pageview data
 * to Google Analytics whenever the location changes.
 *
 * This component uses the `useLocation` hook from React Router to monitor
 * the current location and triggers the `trackPageview` function with the
 * updated pathname and search query whenever the location changes.
 *
 * @returns {null} This component does not render anything to the DOM.
 */
const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export { RouteChangeTracker };
