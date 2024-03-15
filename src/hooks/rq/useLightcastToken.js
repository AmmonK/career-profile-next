import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

const useLightcastToken = () => {

  const tokenUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

  const { status } = useSession();
  

  return useQuery({
    queryKey: ['lightcastToken'],
    queryFn: () => fetch(tokenUrl('/api/lightcast/token')).then((res) => res.json()),
    enabled: status === AUTHENTICATED
  });
};

export default useLightcastToken;