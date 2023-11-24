import IStrapi from './IStrapi';

interface IStrapiResponse<D> extends IStrapi<D> {
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: object;
}

export default IStrapiResponse;
