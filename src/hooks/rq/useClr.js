import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

const useClr = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ['clr'],
    queryFn: () => fetch(proxyUrl('/api/proxy/clr')).then((res) => res.json()),
    enabled: status === AUTHENTICATED,
  });
};

export default useClr;
