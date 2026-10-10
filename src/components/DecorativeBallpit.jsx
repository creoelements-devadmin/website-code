import { lazy, Suspense, useEffect, useState } from 'react';

const Ballpit = lazy(() => import('../pages/Home/Ballpit'));
const MOBILE_QUERY = '(max-width: 767px), (hover: none) and (pointer: coarse)';

export const DecorativeBallpit = (props) => {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  if (isMobile) return null;

  return (
    <Suspense fallback={null}>
      <Ballpit {...props} />
    </Suspense>
  );
};
