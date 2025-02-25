import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useCallback, useMemo } from 'react';
import UseInfiniteDataHookProps from './UseInfiniteDataHookProps';
import SWRData from '../SWRData';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';
import StrapiEvent from '../strapi/StrapiEvent';

const useEvents = ({
  getKey,
  batchSize,
}: {
  getKey: SWRInfiniteKeyLoader;
  batchSize: number;
}): UseInfiniteDataHookProps<IStrapiResponse<StrapiEvent[]>[]> => {
  const { data, isLoading, setSize, size, mutate } = useSWRInfinite<
    SWRData<IStrapiResponse<StrapiEvent[]>>
  >(getKey, { revalidateFirstPage: false, revalidateAll: false });

  const count: number | undefined = useMemo(() => {
    return data?.[0]?.body?.meta?.pagination?.total || 0;
  }, [data]);

  const isLoadingMore = useMemo(
    () => !!(size > 0 && data && typeof data[size - 1] === 'undefined'),
    [size, data]
  );

  const loadMore = useCallback(() => setSize(size + 1), [setSize, size]);

  const canLoadMore = useMemo(
    () => count !== undefined && size * batchSize < count,
    [count, size, batchSize]
  );

  return {
    data: data as any,
    isLoading,
    isLoadingMore,
    canLoadMore,
    refetch: mutate,
    loadMore,
    count,
  };
};

export default useEvents;
