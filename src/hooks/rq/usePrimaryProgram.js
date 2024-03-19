import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

const usePrimaryProgram = () => {
  const { status } = useSession();

  const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

  return useQuery({
    queryKey: ['primaryProgram'],
    queryFn: () =>
      fetch(proxyUrl('/api/proxy/primaryProgram')).then((res) => res.json()),
    enabled: status === AUTHENTICATED,
  });
};

export default usePrimaryProgram;
