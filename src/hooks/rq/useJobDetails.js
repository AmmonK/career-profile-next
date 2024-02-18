import { useQuery } from '@tanstack/react-query';

export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: ['jobDetail', jobId],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/jpa/postings/${jobId}`
      ).then((res) => res.json()),
    enabled: jobId != null && jobId != undefined && jobId != '',
  });
};
