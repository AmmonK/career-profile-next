import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';

const useSocCodesByProgramCode = (socCode) => {
  const { status } = useSession();

  const formatUrl = (code) => `/api/proxy/programSocCodes?programCode=${code}`;

  const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

  return useQuery({
    queryKey: ['socCodes', socCode],
    queryFn: () =>
      fetch(proxyUrl(formatUrl(socCode))).then((res) => res.json()),
    enabled: status === AUTHENTICATED && socCode != null,
  });
};

export default useSocCodesByProgramCode;
