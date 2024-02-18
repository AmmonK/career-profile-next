import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AUTHENTICATED } from '@/utils/enum/session';
import { jobLevels } from '@/utils/enum/jobLevels';

const useJobPostings = (socCodes, remote, jobLevel, clrData, skills) => {
  const filteredData = clrData?.filter((item) =>
    item.achievement.id.startsWith('EMSI:')
  );
  const skillIds = filteredData?.map(
    (item) => item.achievement.id.split(':')[1]
  );

  const { status } = useSession();

  let socCodeArray = [];
  if (Array.isArray(socCodes)) {
    socCodeArray = socCodes[0]?.socCodes.map((socCode) => socCode.socCode);
  }

  const url = `${process.env.NEXT_PUBLIC_VENDORS_PROXY_URL}/lightcast/jpa/postings`;

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        onet: socCodeArray,
        when: 'active',
        city_name: ['Boston, MA'],
        employment_type_name: ['Full-time (> 32 hours)'],
        ...(remote && { remote_type: [1] }),
        ...(jobLevel === jobLevels.entryLevel && {
          min_years_experience: { lower_bound: 1, upper_bound: 1 },
        }),
        ...(jobLevel === jobLevels.midLevel && {
          min_years_experience: { lower_bound: 2, upper_bound: 4 },
        }),
        ...(jobLevel === jobLevels.seniorLevel && {
          min_years_experience: { lower_bound: 5 },
        }),
        ...(skills && { skills: skillIds }),
      },
      fields: [
        'id',
        'posted',
        'expired',
        'city_name',
        'company_name',
        'title_raw',
        'url',
        'score',
        'onet',
        'remote_type_name',
        'employment_type',
        'employment_type_name',
        'min_years_experience',
        'active_urls',
        'skills',
        'skills_name',
        'soc5_name',
      ],
      order: ['score'],
      limit: 20,
    }),
  };

  return useQuery({
    queryKey: ['jobPostings', { ...req }],
    queryFn: () => fetch(url, req).then((res) => res.json()),
    enabled:
      status === AUTHENTICATED &&
      socCodes != null &&
      socCodes != undefined &&
      socCodes?.length > 0,
  });
};

export default useJobPostings;
