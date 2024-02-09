import create from 'zustand';
import { useQuery } from 'react-query';
import { unAuthorizedFetcher as fetcher } from '@/utils/swr/fetcher';

const jobDetailStore = create((set) => ({
  jobDetail: null,
  fetchJobDetail: async (jobId) => {
    console.log('fetching job detail', jobId);
    // const response = await fetcher(`${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/jpa/postings/${jobId}`);
    // useQ
    set({ jobDetail: response.data });
  },
  setJobDetail: (jobDetail) => {
    console.log('setting job detail', jobDetail.data.id);
    set({ jobDetail: jobDetail.data });
  },
}));

export const useJobDetail = (jobId) => {
  const { jobDetail, setJobDetail } = jobDetailStore();

  useQuery(
    ['jobDetail', jobId],
    () =>
      fetcher(
        `${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/jpa/postings/${jobId}`
      ),
    {
      onSuccess: setJobDetail,
    }
  );

  return jobDetail;
};
