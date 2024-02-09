import { useQuery} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import { proxyFetcher } from '@/utils/swr/fetcher';


export const formatUrl = (code) =>
  `/api/proxy/programSocCodes?programCode=${code}`;

const useSocCodesByProgramCode = (socCode,) => {
  const { status } = useSession();

  // const { data, error } = useSWRImmutable(
  //   status === AUTHENTICATED && socCode ? formatUrl(socCode) : null,
  //   fetcher,
  //   { ...options }
  // );

  // return {
  //   socCodes: data || {},
  //   isLoading: !data && !error,
  //   isError: error,
  // };

  return useQuery({
    queryKey: ['socCodes'],
    queryFn: () => proxyFetcher(formatUrl(socCode)),
    enabled: status === AUTHENTICATED && socCode != null 
  });
};

export default useSocCodesByProgramCode;
