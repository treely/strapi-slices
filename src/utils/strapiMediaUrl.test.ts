import { STRAPI_URI } from '../constants/strapi';
import { strapiMediaMock } from '../test/strapiMocks/strapiMedia';
import strapiMediaUrl from './strapiMediaUrl';

const fileSizes: ('xSmall' | 'small' | 'medium' | 'large' | 'xLarge')[] = [
  'xSmall',
  'small',
  'medium',
  'large',
  'xLarge',
];

describe('The strapiMediaUrl util', () => {
  it('returns the native url if no preferredUrl parameter is given', () => {
    const result = strapiMediaUrl({ data: strapiMediaMock });

    expect(result).toBe(`${STRAPI_URI}${strapiMediaMock.attributes.url}`);
  });

  it('returns the native url if `native` is given as the preferredUrl parameter', () => {
    const result = strapiMediaUrl({ data: strapiMediaMock }, 'native');

    expect(result).toBe(`${STRAPI_URI}${strapiMediaMock.attributes.url}`);
  });

  it('returns the native url if the extension of the image file is `.svg`', () => {
    const result = strapiMediaUrl(
      {
        data: {
          ...strapiMediaMock,
          attributes: {
            ...strapiMediaMock.attributes,
            ext: '.svg',
          },
        },
      },
      'medium'
    );

    expect(result).toBe(`${STRAPI_URI}${strapiMediaMock.attributes.url}`);
  });

  fileSizes.forEach(
    (fileSize: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge') => {
      it(`returns the ${fileSize} url if '${fileSize}' is given as the preferredUrl parameter`, () => {
        const result = strapiMediaUrl({ data: strapiMediaMock }, fileSize);

        expect(result).toBe(
          `${STRAPI_URI}${strapiMediaMock.attributes.formats[fileSize]?.url}`
        );
      });
    }
  );
});
