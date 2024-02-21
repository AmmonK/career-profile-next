import { getSession } from 'next-auth/react';
import getTokenCookie from '@/utils/proxy/getTokenCookie';

const socHandler = async (req, res) => {
  const session = await getSession({ req });

  // guard method
  if (req.method !== 'GET') return res.status(405).end();

  // guard session
  if (!session) return res.status(403).end();

  const { programCode } = req.query;
  const token = await getTokenCookie(res, req);

  const formatUrl = (code) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/v3/programs?$filter=programId eq ${code}`;

  const socRequest = await fetch(formatUrl(programCode), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  if (socRequest.status !== 200) {
    // log error
    console.log('error socRequest.status', socRequest.status);
    return res.status(500).end();
    // return res.status(socRequest.status).end();
  }
  console.log('success socRequest.status', socRequest.status);
  return res.status(socRequest.status).json(await socRequest.json());
};

export default socHandler;
