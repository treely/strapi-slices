import React from 'react';
import { Button } from 'boemly';
import Link from 'next/link';
import { useDetectAdBlock } from 'adblock-detect-react';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import openHubSpotChat from '../../utils/openHubSpotChat';

export interface StrapiLinkButtonProps {
  link: StrapiLink;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'outlineWhite' | 'link' | 'ghost';
  colorScheme?: 'primary' | 'gray' | 'orange' | 'green' | 'white';
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  mt?: any;
  mr?: any;
  mb?: any;
  ml?: any;
  mx?: any;
  my?: any;
  background?: string;
}

export const StrapiLinkButton: React.FC<StrapiLinkButtonProps> = ({
  link,
  ...buttonProps
}: StrapiLinkButtonProps) => {
  const adBlockDetected = useDetectAdBlock();

  if (link.intercomLauncher) {
    if (adBlockDetected) {
      return (
        <Button {...buttonProps} as={Link} href="mailto:hello@tree.ly">
          {link.text}
        </Button>
      );
    }

    return (
      <Button {...buttonProps} onClick={openHubSpotChat}>
        {link.text}
      </Button>
    );
  }

  return (
    <Button {...buttonProps} as={Link} href={strapiLinkUrl(link)}>
      {link.text}
    </Button>
  );
};
