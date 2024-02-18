/* eslint-disable import/no-anonymous-default-export */
import QueryString from 'qs';
import CryptoJS from 'crypto-js';
/**
 * This function retrieves a valid application access token and returns the encrypted version.
 */

export default async () => {
  const authWord = CryptoJS.enc.Utf8.parse(
    `${process.env.APP_MS_COGNITO_CLIENT_ID}:${process.env.APP_MS_COGNITO_SECRET}`
  );
  const authEncoded = CryptoJS.enc.Base64.stringify(authWord);
  const authorizationHeader = `Basic ${authEncoded}`;
  const data = QueryString.stringify({
    grant_type: 'client_credentials',
  });
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authorizationHeader,
      Cookie: 'XSRF-TOKEN=7c80f503-0907-4e33-8d7e-41335f169505',
    },
    body: data,
  };

  const response = await fetch(process.env.COGNITO_TOKEN_URI, config);
  if (response.ok) {
    const tokenResponse = await response.json();
    const token = {
      accessToken: tokenResponse.access_token,
      expiration: tokenResponse.expires_in + Date.now(),
    };
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.TOKEN_COOKIE_ENCRYPTION_KEY
    ).toString();
    return encryptedToken;
  }
  throw new Error('Failed to get access token.');
};
