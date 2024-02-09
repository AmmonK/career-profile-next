import { useQuery } from '@tanstack/react-query';
import { unAuthorizedFetcher as fetcher } from '@/utils/swr/fetcher';

export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: ['jobDetail', jobId],
    queryFn: () =>
      fetcher(
        `${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/jpa/postings/${jobId}`
      ),
    enabled: jobId != null && jobId != undefined,
  });
};
