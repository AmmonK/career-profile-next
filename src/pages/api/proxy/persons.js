import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const personHandler = async (req, res) => {
  const session = await getSession({ req });

  // guard method
  if (req.method !== 'GET') return res.status(405).end();

  // guard session
  if (!session) return res.status(403).end();

  const token = await getTokenCookie(res, req);

  const formatUrl = (personId) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/persons/v1/person/${personId}/personName`;

  const personRequest = await fetch(formatUrl(session.user.personId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  return res.status(personRequest.status).json(await personRequest.json());
};

export default personHandler;
