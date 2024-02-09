import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { unAuthorizedPostFetcher as fetcher } from '@/utils/swr/fetcher';

const useJobPostings = (socCodes, options = {}) => {
  const { status } = useSession();


  let socCodeArray = [];
  if (Array.isArray(socCodes)) {
    socCodeArray = socCodes[0]?.socCodes.map((socCode) => socCode.socCode);;
  }

  const req = {
    url: `${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/jpa/postings`,
    body: {
      filter: {
        onet: socCodeArray,
        when: 'active',
        city_name: ['Boston, MA'],
        employment_type_name: ['Full-time (> 32 hours)'],
      },
      fields: [
        'id',
        'posted',
        'expired',
        'city_name',
        'company_name',
        'title_raw',
        'url',
        'score',
        'onet',
      ],
      order: ['score'],
      limit: 20,
    },
  };
  const { data, error } = useSWR(status === AUTHENTICATED && socCodes?.length ? req : null, fetcher, {
    revalidateOnFocus: false,
    ...options,
  });

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useJobPostings;
