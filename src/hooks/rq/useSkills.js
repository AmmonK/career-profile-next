import { useQuery } from '@tanstack/react-query';

const useSkills = (clrData) => {
  const filteredData = clrData?.filter((item) =>
    item.achievement.id.startsWith('EMSI:')
  );
  const skillIds = filteredData?.map(
    (item) => item.achievement.id.split(':')[1]
  );

  const url = `${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/skills/versions/latest/skills`;

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ids: skillIds,
    }),
  };

  return useQuery({
    queryKey: ['skills', req],
    queryFn: () => fetch(url, req).then((res) => res.json()),
    enabled: clrData != null && Array.isArray(clrData) && clrData.length > 0,
  });
};

export default useSkills;
