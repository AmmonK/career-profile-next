import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const clrHandler = async (req, res) => {
  const session = await getSession({ req });

  // guard method
  if (req.method !== 'GET') return res.status(405).end();

  // guard session
  if (!session) return res.status(403).end();

  const token = await getTokenCookie(res, req);
  const formatUrl = (personId) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/learnerrecord/v1/assertions?personId=${personId}`;

  const clrRequest = await fetch(formatUrl(session.user.personId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  return res.status(clrRequest.status).json(await clrRequest.json());
};

export default clrHandler;
