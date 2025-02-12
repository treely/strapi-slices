import SWRData from '../SWRData';

interface UseInfiniteDataHookProps<T> {
  data: SWRData<T[]>[] | undefined;
  isLoading: boolean;
  isLoadingMore: boolean;
  canLoadMore: boolean;
  refetch: () => void;
  loadMore: () => void;
  count: number;
}

export default UseInfiniteDataHookProps;
