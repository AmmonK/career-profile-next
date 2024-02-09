import { useQuery} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { proxyFetcher } from '@/utils/swr/fetcher';

const useUserInfo = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => proxyFetcher('/api/proxy/persons'),
    enabled: status === AUTHENTICATED
  });

};

export default useUserInfo;
