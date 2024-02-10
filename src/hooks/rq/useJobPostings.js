
import { useQuery} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import { unAuthorizedPostFetcher } from '@/utils/swr/fetcher';

const useJobPostings = (socCodes,remote) => {

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
        ...(remote && { remote_type: [1] }),
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
        'remote_type_name',
        'employment_type',
        'employment_type_name',
      ],
      order: ['score'],
      limit: 20,
    },
  };




  return useQuery({
    queryKey: ['jobPostings',{...req}],
    queryFn: () => unAuthorizedPostFetcher(req),
    enabled: status === AUTHENTICATED && socCodes!= null && socCodes != undefined && socCodes?.length > 0,
  });

};

export default useJobPostings;
