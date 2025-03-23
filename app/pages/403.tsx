import { Button } from '@radix-ui/themes';
import { ShieldAlert } from 'lucide-react';
import { useCallback, type JSX } from 'react';
import { useLocation, useNavigate } from 'react-router';

/**
 * Forbidden component renders a 403 error page indicating access is denied.
 * It provides a button to navigate back to the home page if not already there.
 *
 * @component
 * @example
 * return (
 *   <Forbidden />
 * )
 *
 * @returns {JSX.Element} A JSX element representing the 403 error page.
 */
const Forbidden = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Handles the click event on the button to navigate to the home page.
     */
    const handleClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const isHome = location.pathname === '/';

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <div className='max-w-md w-full space-y-8 text-center'>
                <ShieldAlert className='mx-auto h-24 w-24 text-muted-foreground' />
                <h1 className='text-4xl font-bold'>403</h1>
                <h2 className='text-2xl font-semibold'>Access Denied</h2>
                <p className='text-muted-foreground'>
                    You don’t have permission to view this page. Please contact an administrator if you believe this is a mistake.
                </p>
                {!isHome && (
                    <Button onClick={handleClick} className='mt-4'>
                        Go Home
                    </Button>
                )}
            </div>
        </div>
    );
};

export { Forbidden };
