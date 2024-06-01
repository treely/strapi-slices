import axios from 'axios';
import qs from 'qs';
import { setupCache } from 'axios-cache-interceptor';
import { FPM_API_URI } from '../constants/api';

const fpmClient = setupCache(
  axios.create({
    baseURL: `${FPM_API_URI}/v1`,
    paramsSerializer: (p) => qs.stringify(p, { encodeValuesOnly: true }),
    timeout: 5000,
  })
);

export default fpmClient;
