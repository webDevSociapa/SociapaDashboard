// pages/_app.js
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../src/app/components/loading';
import '../app/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    // Next.js route change events
    window.addEventListener('routeChangeStart', handleRouteChange);
    window.addEventListener('routeChangeComplete', handleRouteComplete);
    window.addEventListener('routeChangeError', handleRouteComplete);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChange);
      window.removeEventListener('routeChangeComplete', handleRouteComplete);
      window.removeEventListener('routeChangeError', handleRouteComplete);
    };
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}  {/* Show loader while loading */}
      <Component {...pageProps} />
    </>
  );
}
