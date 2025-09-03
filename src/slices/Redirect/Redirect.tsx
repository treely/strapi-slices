import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface RedirectProps {
  slice: {
    url: string;
  };
}

export const Redirect = ({ slice }: RedirectProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    // When using `replace`, the current browser history entry will be replaced
    router.replace(slice.url);
  }, [slice.url]);

  return <></>;
};
