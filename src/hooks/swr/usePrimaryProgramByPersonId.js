import useSWRImmutable from 'swr';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { proxyFetcher as fetcher } from '@/utils/swr/fetcher';

export { proxyFetcher as fetcher } from '@/utils/swr/fetcher';

export const formatUrl = () => '/api/proxy/primaryProgram';

const usePrimaryProgramByPersonId = (options = {}) => {
  const { status } = useSession();

  const { data, error } = useSWRImmutable(
    status === AUTHENTICATED ? formatUrl() : null,
    fetcher,
    { ...options }
  );

  let trimmedData = {};
  if (Array.isArray(data)) {
    trimmedData.code =
      data[0]?.externalSystemIds.programCodeVersion[0].split(':')[0];
  }

  return {
    programInfo: trimmedData || {},
    isLoading: !data && !error,
    isError: error,
  };
};

export default usePrimaryProgramByPersonId;
