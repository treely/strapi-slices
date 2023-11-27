import { css } from '@emotion/react';
import { CDN_URI } from './api';

export const GLOBAL_STYLE = css`
  // GintoNord
  @font-face {
    font-family: 'GintoNord';
    src: url('${CDN_URI}/assets/v3/fonts/ABCGintoNord-Bold.woff2')
      format('woff2');
    font-style: normal;
    font-weight: 700;
    font-display: block;
  }
  // Inter
  @font-face {
    font-family: 'Inter';
    src: url('${CDN_URI}/assets/v3/fonts/Inter-Regular.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
    font-display: block;
  }
  @font-face {
    font-family: 'Inter';
    src: url('${CDN_URI}/assets/v3/fonts/Inter-Medium.woff2') format('woff2');
    font-style: normal;
    font-weight: 500;
    font-display: block;
  }
  @font-face {
    font-family: 'Inter';
    src: url('${CDN_URI}/assets/v3/fonts/Inter-SemiBold.woff2') format('woff2');
    font-style: normal;
    font-weight: 600;
    font-display: block;
  }
  @font-face {
    font-family: 'Inter';
    src: url('${CDN_URI}/assets/v3/fonts/Inter-Bold.woff2') format('woff2');
    font-style: normal;
    font-weight: 700;
    font-display: block;
  }
  // SpaceMono
  @font-face {
    font-family: 'SpaceMono';
    src: url('${CDN_URI}/assets/v3/fonts/SpaceMono-Bold.woff2') format('woff2');
    font-style: normal;
    font-weight: 700;
    font-display: block;
  }

  :root {
    --default-hero-height: calc(100vh - var(--boemly-space-24));
  }
`;
