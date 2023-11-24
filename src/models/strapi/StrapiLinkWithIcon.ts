import StrapiLink from './StrapiLink';

interface StrapiLinkWithIcon {
  id: number;
  link: StrapiLink;
  destination: 'other' | 'linkedin' | 'web';
}

export default StrapiLinkWithIcon;
