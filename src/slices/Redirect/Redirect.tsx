import React, { useEffect } from 'react';
import { RedirectType, redirect } from 'next/navigation';

export interface RedirectProps {
  slice: {
    url: string;
  };
}

export const Redirect = ({ slice }: RedirectProps): JSX.Element => {
  useEffect(() => {
    // When using `replace`, the current browser history entry will be replaced
    redirect(slice.url, RedirectType.replace);
  }, [slice.url]);

  return <></>;
};
