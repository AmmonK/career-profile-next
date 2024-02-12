import { authorizedInstance, setAuthToken } from '@/utils/axios';
import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const clrHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const token = await getTokenCookie(res, req);
    setAuthToken(token.accessToken);

    if (req.method === 'GET') {
      const formatUrl = (personId) =>
        `/learnerrecord/v1/assertions?personId=${personId}`;
      const clrInfo = await authorizedInstance.get(
        formatUrl(session.user.personId)
      );
      return res.status(clrInfo.status).json(clrInfo.data);
    }
    return res.status(405).end();
  }
  return res.status(403).end();
};

export default clrHandler;
