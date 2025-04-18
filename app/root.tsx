import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import moment from 'moment';
import { useEffect, type JSX } from 'react';
import { Provider } from 'react-redux';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import './app.css';
import { useDarkMode } from './hooks/useDarkMode';
import { getStore } from './state';
import { initGA, RouteChangeTracker } from './utils/google.analytics';
import { useTranslation } from 'react-i18next';

/**
 * Initializing i18n
 */
import i18n from './i18n';
const { t } = i18n;


/**
 * This is important. It enables the OAuth listener for the Auth module.
 *
 * For some reason this is not required in local development, but it is
 * required in production.
 */
import 'aws-amplify/auth/enable-oauth-listener';

/**
 * A function that returns an empty array of links.
 * This function is used to define the links for the route.
 *
 * @returns {Array} An empty array of links.
 */
export const links: Route.LinksFunction = () => [];

/**
 * Configuration for the application.
 *
 * Why this way? Because when running in prod, using import.meta.env
 * directly in the object does not work. Don't ask me why, but only
 * this way works.
 */
const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const userPoolClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const userPoolDomain = import.meta.env.VITE_USER_POOL_DOMAIN;
const fqdn = import.meta.env.VITE_FQDN;

/**
 * Set relative time formats.
 */
moment.updateLocale('en', {
  relativeTime: {
    future: i18n.t('time.future'),
    past: i18n.t('time.past'),
    s: i18n.t('time.s'),
    ss: i18n.t('time.ss'),
    m: i18n.t('time.m'),
    mm: i18n.t('time.mm'),
    h: i18n.t('time.h'),
    hh: i18n.t('time.hh'),
    d: i18n.t('time.d'),
    dd: i18n.t('time.dd'),
    M: i18n.t('time.M'),
    MM: i18n.t('time.MM'),
    y: i18n.t('time.y'),
    yy: i18n.t('time.yy'),
  },
});

/**
 * Configuration for the AWS Amplify library.
 */
const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      loginWith: {
        oauth: {
          domain: userPoolDomain,
          scopes: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: ['http://localhost:5173', fqdn],
          redirectSignOut: ['http://localhost:5173/logout', `${fqdn}/logout`],
          responseType: 'code',
        },
      },
    },
  },
};
Amplify.configure(config);

/**
 * Creates the Redux store.
 */
const { store } = getStore();

/**
 * Layout component that sets up the HTML structure and provides theming and state management.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered layout component.
 *
 * @remarks
 * This component uses the `useDarkMode` hook to determine the current theme mode (dark or light).
 * It wraps the children components with a `Provider` for state management and a `Theme` component for theming.
 * Additionally, it includes meta tags, links, and scripts necessary for the application.
 */
export function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    initGA();
  }, []);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta property="og:title" content="Autostrada" />
        <meta property="og:image" content="https://autostrada.gaulatti.com/og.png" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='anthem' content='https://www.youtube.com/watch?v=TaqJ6UDSRHA' />
        <meta name="description" content="X-Ray your frontend. From every angle. Bella Stronza style." />
        <link rel='icon' href='/favicon.png'></link>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <RouteChangeTracker />
          <Theme appearance={isDarkMode ? 'dark' : 'light'} accentColor='orange' grayColor='sand' radius='large'>
            {children}
            <ScrollRestoration />
            <Scripts />
          </Theme>
        </Provider>
      </body>
    </html>
  );
}

/**
 * The main application component that serves as the root of the application.
 * It renders the `Outlet` component, which is a placeholder for nested routes.
 *
 * @returns {JSX.Element} The rendered `Outlet` component.
 */
export default function App(): JSX.Element {
  return <Outlet />;
}

/**
 * ErrorBoundary component to handle and display errors in the application.
 *
 * @param {Route.ErrorBoundaryProps} props - The properties passed to the ErrorBoundary component.
 * @param {Error} props.error - The error object that was thrown.
 *
 * @returns {JSX.Element} The rendered error boundary component.
 *
 * This component displays a user-friendly error message and, in development mode,
 * includes the error stack trace for debugging purposes.
 *
 * - If the error is a route error response with a status of 404, it displays a "404" message
 *   and a "The requested page could not be found." details.
 * - For other route error responses, it displays a generic "Error" message and the status text.
 * - In development mode, if the error is an instance of Error, it displays the error message
 *   and stack trace.
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps): JSX.Element {
  const { t } = useTranslation();

  let message = t('errorBoundary.defaultMessage');
  let details = t('errorBoundary.defaultDetails');
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? t('errorBoundary.notFound') : t('errorBoundary.genericError');
    details = error.status === 404 ? t('errorBoundary.notFoundDetails') : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
