import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

const useUserInfo = () => {
  const { status } = useSession();

  const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () =>
      fetch(proxyUrl('/api/proxy/persons')).then((res) => res.json()),
    enabled: status === AUTHENTICATED,
  });
};

export default useUserInfo;
