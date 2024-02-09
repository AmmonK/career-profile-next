import { useQuery} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import { proxyFetcher } from '@/utils/swr/fetcher';

const usePrimaryProgram = () => {
  const { status } = useSession();

  // let trimmedData = {};
  // if (Array.isArray(data)) {
  //   trimmedData.code =
  //     data[0]?.externalSystemIds.programCodeVersion[0].split(':')[0];
  // }

  return useQuery({
    queryKey: ['primaryProgram'],
    queryFn: () => proxyFetcher('/api/proxy/primaryProgram'),
    enabled: status === AUTHENTICATED
  });
};

export default usePrimaryProgram;
