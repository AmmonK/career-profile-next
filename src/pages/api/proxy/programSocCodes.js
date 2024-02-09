import { authorizedInstance, setAuthToken } from '@/utils/axios';
import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

export default async (req, res) => {

  const { programCode } = req.query;

  const session = await getSession({ req });

  if (session) {
    const token = await getTokenCookie(res, req);
    setAuthToken(token.accessToken);

    if (req.method === 'GET') {
      const formatUrl = (code) => `/programs/v3/programs?$filter=programId eq ${code}`;
      const socInfo = await authorizedInstance.get(formatUrl(programCode));
      return res.status(socInfo.status).json(socInfo.data);
    }
    return res.status(405).end();
  }
  return res.status(403).end();
};
