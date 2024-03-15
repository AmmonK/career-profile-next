import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import useLightcastToken from './useLightcastToken';

const useAllSkills = () => {
  const { data: tokenData } = useLightcastToken();

  const { status } = useSession();

  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenData?.access_token}`,
    },
  };

  const url = `https://emsiservices.com/skills/versions/latest/skills`;

  const translateData = (data) => {
    return data.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        skillType: item.type.name,
      };
    });
  };

  return useQuery({
    queryKey: ['allSkills'],
    queryFn: () =>
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then(translateData),
    enabled: status === AUTHENTICATED,
  });
};

export default useAllSkills;
