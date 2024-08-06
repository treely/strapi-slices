import axios from 'axios';
import qs from 'qs';
import { setupCache } from 'axios-cache-interceptor';
import { STRAPI_URI } from '../../constants/strapi';

const strapiClient = setupCache(
  axios.create({
    baseURL: `${STRAPI_URI}/api`,
    paramsSerializer: (p) => qs.stringify(p, { encodeValuesOnly: true }),
    timeout: 60_000,
  }),
  {
    ttl:
      STRAPI_URI.includes('127.0.0.1') || STRAPI_URI.includes('localhost')
        ? 0
        : 10 * 60 * 1000, // 10 minutes
  }
);

export default strapiClient;
