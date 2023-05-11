import { useState, useEffect, FC, ReactElement } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: ReactElement;
};

const RouteGuard: FC<Props> = ({ children }: Props) => {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      const isLoggedIn =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      const publicPaths = ['/account/login', '/account/register'];
      const path = url.split('?')[0];
      if (!isLoggedIn && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push('/account/login');
      } else if (isLoggedIn && publicPaths.includes(path)) {
        router.push('/account/');
        setAuthorized(true);
      } else {
        setAuthorized(true);
      }
    };

    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authorized ? (
    children
  ) : (
    <div className="h-96">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
      </div>
    </div>
  );
};

export default RouteGuard;
