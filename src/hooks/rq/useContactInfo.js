import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

const useContactInfo = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ['contactInfo'],
    queryFn: () =>
      fetch(proxyUrl('/api/proxy/contactInfo')).then((res) => res.json()),
    enabled: status === AUTHENTICATED,
  });
};

export default useContactInfo;
