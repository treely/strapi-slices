import StrapiAvatarWithName from './StrapiAvatarWithName';
import StrapiLink from './StrapiLink';

interface StrapiContactArea {
  id: number;
  title: string;
  text: string;
  avatar: StrapiAvatarWithName;
  button: StrapiLink;
}

export default StrapiContactArea;
