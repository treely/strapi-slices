import React, { useContext } from 'react';
import { Button } from 'boemly';
import Link from 'next/link';
import { useDetectAdBlock } from 'adblock-detect-react';
import StrapiLink from '../../models/strapi/StrapiLink';
import strapiLinkUrl from '../../utils/strapiLinkUrl';
import openHubSpotChat from '../../utils/openHubSpotChat';
import { AnalyticsContext } from '../ContextProvider/ContextProvider';

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
  width?: string;
  component?: string;
}

export const StrapiLinkButton: React.FC<StrapiLinkButtonProps> = ({
  link,
  component = 'StrapiLinkButton',
  ...buttonProps
}: StrapiLinkButtonProps) => {
  const adBlockDetected = useDetectAdBlock();
  const analyticsFunction = useContext(AnalyticsContext);

  const handleClick = () => {
    const buttonUrl =
      link.intercomLauncher && adBlockDetected
        ? 'mailto:hello@tree.ly'
        : strapiLinkUrl(link);

    analyticsFunction?.({
      type: 'track',
      props: {
        action: 'click',
        component,
        buttonText: link.text,
        buttonUrl,
      },
    });
  };

  if (link.intercomLauncher) {
    if (adBlockDetected) {
      return (
        <Button
          {...buttonProps}
          as={Link}
          href="mailto:hello@tree.ly"
          onClick={handleClick}
        >
          {link.text}
        </Button>
      );
    }

    return (
      <Button
        {...buttonProps}
        onClick={() => {
          handleClick();
          openHubSpotChat();
        }}
      >
        {link.text}
      </Button>
    );
  }

  return (
    <Button
      {...buttonProps}
      as={Link}
      href={strapiLinkUrl(link)}
      onClick={handleClick}
    >
      {link.text}
    </Button>
  );
};
