import React from 'react';
import { CaretRightIcon, GlobeIcon } from '@phosphor-icons/react';
import LinkedInIcon from '../../icons/LinkedInIcon';
import StrapiLinkWithIcon from '../../models/strapi/StrapiLinkWithIcon';
import StrapiLinkButton from '../StrapiLinkButton';
import { StrapiLinkButtonProps } from '../StrapiLinkButton/StrapiLinkButton';

export interface StrapiLinkButtonWithIconProps
  extends Omit<StrapiLinkButtonProps, 'link'> {
  link: StrapiLinkWithIcon;
}

export const StrapiLinkButtonWithIcon: React.FC<
  StrapiLinkButtonWithIconProps
> = ({ link, ...props }: StrapiLinkButtonWithIconProps) => {
  const getLinkIcon = (destination: string) => {
    switch (destination) {
      case 'linkedin': {
        return <LinkedInIcon />;
      }
      case 'web': {
        return <GlobeIcon />;
      }
      default: {
        return <CaretRightIcon />;
      }
    }
  };

  return (
    <StrapiLinkButton
      {...props}
      link={link.link}
      rightIcon={getLinkIcon(link.destination)}
    />
  );
};
