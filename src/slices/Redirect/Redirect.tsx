import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { buildRedirectUrl } from '../../utils/buildRedirectUrl';

export interface RedirectProps {
  slice: {
    url: string;
  };
}

export const Redirect = ({ slice }: RedirectProps): React.JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (!slice.url) return;

    // Build redirect URL
    const redirectUrl = buildRedirectUrl(
      slice.url,
      router.asPath,
      router.query
    );

    // Redirect
    router.replace(redirectUrl);
  }, [slice.url, router]);

  return <></>;
};
