import useSWRImmutable from 'swr';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { proxyFetcher as fetcher } from '@/utils/swr/fetcher';

export { proxyFetcher as fetcher } from '@/utils/swr/fetcher';

export const formatUrl = () => '/api/proxy/contactInfo';

/*
  We are using SWR Immutable here to avoid unnecessary rerenders.
  Use the swr mutate function to force this to refetch when needed
  (ie mutate(/api/proxy/persons); )
*/

const useContactInfo = (options = {}) => {
  const { status } = useSession();

  const { data, error } = useSWRImmutable(
    status === AUTHENTICATED ? formatUrl() : null,
    fetcher,
    { ...options }
  );

  return {
    contactInfo: data || {},
    isLoading: !data && !error,
    isError: error,
  };
};

export default useContactInfo;
