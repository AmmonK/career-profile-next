import { authorizedInstance, setAuthToken } from '@/utils/axios';
import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const contactInfoHandler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const token = await getTokenCookie(res, req);
    setAuthToken(token.accessToken);

    if (req.method === 'GET') {
      const formatUrl = (personId) =>
        `/contacts/v1/addresses?linkId=${personId}&linkType=person`;
      const contactInfo = await authorizedInstance.get(
        formatUrl(session.user.personId)
      );
      return res.status(contactInfo.status).json(contactInfo.data);
    }
    return res.status(405).end();
  }
  return res.status(403).end();
};

export default contactInfoHandler;
