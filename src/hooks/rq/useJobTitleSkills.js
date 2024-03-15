import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import useLightcastToken from './useLightcastToken';

const useJobTitleSkills = (search) => {
  const { data: tokenData } = useLightcastToken();

  const { status } = useSession();

  const body = {
    "filter": {
        "when": "active",
        "title_name": [
            `${search}`
        ]
    },
    "rank": {
        "limit": 5,
        "by": "unique_postings"
    }
}

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenData?.access_token}`,
    },
    redirect: 'follow',
    body: JSON.stringify(body)
  };



  const url = `https://emsiservices.com/jpa/rankings/skills`;

  return useQuery({
    queryKey: ['jobTitleSkills', body],
    queryFn: () => fetch(url, requestOptions).then((res) => res.json()),
    enabled:
      status === AUTHENTICATED &&
      search !== null &&
      search !== undefined &&
      search?.length > 3,
  });
};

export default useJobTitleSkills;
