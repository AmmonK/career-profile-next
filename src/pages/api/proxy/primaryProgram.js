import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const programHandler = async (req, res) => {
  const session = await getSession({ req });

  // guard method
  if (req.method !== 'GET') return res.status(405).end();

  // guard session
  if (!session) return res.status(403).end();

  const token = await getTokenCookie(res, req);

  const formatUrl = (personId) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/student/v1/program/membershipsdetails?$filter=personId eq '${personId}' and primary eq true`;

  const programRequest = await fetch(formatUrl(session.user.personId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  
  if (programRequest.status !== 200) {
    // log error
    console.log('error programRequest.status', programRequest.status);
    return res.status(500).end();
    // return res.status(programRequest.status).end();
  }
  console.log('success programRequest.status', programRequest.status);
  return res.status(programRequest.status).json(await programRequest.json());
};

export default programHandler;
