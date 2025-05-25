import { Card, Heading } from '@radix-ui/themes';

/**
 * The `InterstitialPage` component renders the login page of the application.
 * It includes a background image and centers the login form within the page.
 *
 * @returns A JSX element representing the login page.
 */
export default function InterstitialPage() {
  return (
    <div
      style={{ background: 'url(/login.background.png)', backgroundSize: 'cover' }}
      className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'
    >
      <div className='w-full max-w-sm md:max-w-3xl'>
        <h1>asd</h1>
        <Card variant='ghost'>
          <div className='flex flex-col items-center justify-center py-10 text-center'>
            <img src='https://i.ytimg.com/vi/wQf5Nho1CJI/sddefault.jpg' />
            <Heading as='h1' size='8' style={{ margin: '32px', color: '#FFEEFF' }}>
              Major surgery in progress.
            </Heading>
          </div>
        </Card>
      </div>
    </div>
  );
}
