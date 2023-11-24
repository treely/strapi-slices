import { Button } from 'boemly';
import Link from 'next/link';
import React from 'react';
import { useDetectAdBlock } from 'adblock-detect-react';
import StrapiLink from '@/models/strapi/StrapiLink';
import strapiLinkUrl from '@/utils/strapiLinkUrl';
import openHubSpotChat from '@/utils/openHubSpotChat';

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
        <Link href="mailto:hello@tree.ly" passHref legacyBehavior>
          <Button {...buttonProps} as="a">
            {link.text}
          </Button>
        </Link>
      );
    }

    return (
      <Button {...buttonProps} onClick={openHubSpotChat}>
        {link.text}
      </Button>
    );
  }

  return (
    <Link href={strapiLinkUrl(link)} passHref legacyBehavior>
      <Button {...buttonProps} as="a">
        {link.text}
      </Button>
    </Link>
  );
};
