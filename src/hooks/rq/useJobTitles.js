import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import useLightcastToken from './useLightcastToken';

const useJobTitles = (search) => {
  const { data: tokenData } = useLightcastToken();

  const { status } = useSession();

  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenData?.access_token}`,
    },
    redirect: 'follow',
  };

  const url = `https://emsiservices.com/jpa/taxonomies/title?q=${search}&limit=10`;

  return useQuery({
    queryKey: ['jobTitles', search],
    queryFn: () => fetch(url, requestOptions).then((res) => res.json()),
    enabled:
      status === AUTHENTICATED &&
      search !== null &&
      search !== undefined &&
      search?.length > 3,
  });
};

export default useJobTitles;
