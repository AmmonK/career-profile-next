import useSWRImmutable from 'swr';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { proxyFetcher as fetcher } from '@/utils/swr/fetcher';

export { proxyFetcher as fetcher } from '@/utils/swr/fetcher';

export const formatUrl = (code) =>
  `/api/proxy/programSocCodes?programCode=${code}`;

const useSocCodesByProgramCode = (socCode, options = {}) => {
  const { status } = useSession();

  const { data, error } = useSWRImmutable(
    status === AUTHENTICATED && socCode ? formatUrl(socCode) : null,
    fetcher,
    { ...options }
  );

  return {
    socCodes: data || {},
    isLoading: !data && !error,
    isError: error,
  };
};

export default useSocCodesByProgramCode;
