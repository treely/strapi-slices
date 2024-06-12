import Locale from './Locale';

type LocalizedEntity<Key extends string = any> = {
  [key in Key]: any;
} & {
  locale: Locale;
};

export default LocalizedEntity;
