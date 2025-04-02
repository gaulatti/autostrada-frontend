import { Button } from '@radix-ui/themes';
import { AlertCircle } from 'lucide-react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

/**
 * NotFound component renders a 404 error page indicating the page doesn't exist.
 * It provides a button to navigate back to the home page if not already there.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 *
 * @returns {JSX.Element} A JSX element representing the 404 error page.
 */
const NotFound = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

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
                <AlertCircle className='mx-auto h-24 w-24 text-muted-foreground' />
                <h1 className='text-4xl font-bold'>{t('pages.404-not-found')}</h1>
                <h2 className='text-2xl font-semibold'>{t('pages.page-not-found')}</h2>
                <p className='text-muted-foreground'>{t('pages.page-not-found-description')}</p>
                {!isHome && (
                    <Button onClick={handleClick} className='mt-4'>
                        {t('navigation.go-home')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export { NotFound };
