import { getSession } from 'next-auth/react';

const tokenHandler = async (req, res) => {
  const session = await getSession({ req });

  // guard method
  if (req.method !== 'GET') return res.status(405).end();

  // guard session
  if (!session) return res.status(403).end();

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', 'Basic Og==');

  var urlencoded = new URLSearchParams();
  urlencoded.append('client_id', 'phoenix');
  urlencoded.append('client_secret', `${process.env.EMSI_CLIENT_SECRET}`);
  urlencoded.append('grant_type', 'client_credentials');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let tokenResponse = await fetch(
    'https://auth.emsicloud.com/connect/token',
    requestOptions
  )

  return res.status(tokenResponse.status).json(await tokenResponse.json());
};

export default tokenHandler;
