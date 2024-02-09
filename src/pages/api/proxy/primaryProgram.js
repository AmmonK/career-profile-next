import { authorizedInstance, setAuthToken } from '@/utils/axios';
import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const token = await getTokenCookie(res, req);
    setAuthToken(token.accessToken);

    if (req.method === 'GET') {
      const formatUrl = (personId) => `/student/v1/program/membershipsdetails?$filter=personId eq '${personId}' and primary eq true`;
      const userInfo = await authorizedInstance.get(formatUrl(session.user.personId));
      return res.status(userInfo.status).json(userInfo.data);
    }
    return res.status(405).end();
  }
  return res.status(403).end();
};
