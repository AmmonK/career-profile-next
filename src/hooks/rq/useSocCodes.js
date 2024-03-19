import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import usePrimaryProgram from '@/hooks/rq/usePrimaryProgram';

const useSocCodesByProgramCode = () => {
  const { status } = useSession();

  const { data: primaryProgramInfo, status: primaryProgramStatus } =
    usePrimaryProgram();

  const socCode =
    primaryProgramInfo != null &&
    Array.isArray(primaryProgramInfo) &&
    primaryProgramInfo.length > 0
      ? primaryProgramInfo[0]?.externalSystemIds.programCodeVersion[0].split(
          ':'
        )[0]
      : null;

  const formatUrl = (code) => `/api/proxy/programSocCodes?programCode=${code}`;

  const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

  return useQuery({
    queryKey: ['socCodes', socCode],
    queryFn: () =>
      fetch(proxyUrl(formatUrl(socCode))).then((res) => res.json()),
    enabled: status === AUTHENTICATED && socCode !== null && socCode !== '' && socCode !== undefined,
  });
};

export default useSocCodesByProgramCode;
