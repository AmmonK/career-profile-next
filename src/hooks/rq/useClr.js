import { useQuery} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { proxyFetcher } from '@/utils/swr/fetcher';

const useClr = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ['clr'],
    queryFn: () => proxyFetcher('/api/proxy/clr'),
    enabled: status === AUTHENTICATED
  });

};

export default useClr;
