import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const contactInfoHandler = async (req, res) => {
  const session = await getSession({ req });

  // guard method
  if (req.method !== 'GET') return res.status(405).end();

  // guard session
  if (!session) return res.status(403).end();

  const token = await getTokenCookie(res, req);
  const formatUrl = (personId) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts/v1/addresses?linkId=${personId}&linkType=person`;

  const contactRequest = await fetch(formatUrl(session.user.personId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  if (contactRequest.status !== 200) {
    // log error
    return res.status(contactRequest.status).end();
  }

  return res.status(contactRequest.status).json(await contactRequest.json());
};

export default contactInfoHandler;
