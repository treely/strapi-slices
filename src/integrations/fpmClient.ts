import axios from 'axios';
import qs from 'qs';
import { setupCache } from 'axios-cache-interceptor';
import { FPM_API_URI } from '../constants/api';

const fpmClient = setupCache(
  axios.create({
    baseURL: `${FPM_API_URI}/v1`,
    paramsSerializer: (p) => qs.stringify(p, { encodeValuesOnly: true }),
    timeout: 5000,
  }),
  {
    ttl:
      FPM_API_URI.includes('127.0.0.1') || FPM_API_URI.includes('localhost')
        ? 0
        : 10 * 60 * 1000, // 10 minutes
  }
);

export default fpmClient;
