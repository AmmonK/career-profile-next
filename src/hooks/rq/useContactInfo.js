import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

import { proxyFetcher } from '@/utils/swr/fetcher';

const useContactInfo = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ['contactInfo'],
    queryFn: () => proxyFetcher('/api/proxy/contactInfo'),
    enabled: status === AUTHENTICATED,
  });
};

export default useContactInfo;
