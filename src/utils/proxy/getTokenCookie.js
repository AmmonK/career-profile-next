/* eslint-disable import/no-anonymous-default-export */
import Cookies from 'cookies';
import CryptoJS from 'crypto-js';
import refreshToken from './refreshToken';
/*
 This function accepts http request and response,
 checks the token cookie,
 refreshes the token if necessary,
 and returns the decrypted application token

*/
export default async (res, req) => {
  const keys = [process.env.TOKEN_COOKIE_KEY];
  const cookies = new Cookies(req, res, { keys });
  const tokenCookie = cookies.get('je_application_token', {
    signed: true,
    path: '/',
  });
  if (tokenCookie === undefined) {
    // Init application token
    const encryptedToken = await refreshToken();
    cookies.set('je_application_token', encryptedToken, {
      signed: true,
      path: '/',
    });
    const tokenBytes = CryptoJS.AES.decrypt(
      encryptedToken,
      process.env.TOKEN_COOKIE_ENCRYPTION_KEY
    );
    return JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));
  }
  // Decrypt cookie token.
  const cookieTokenBytes = CryptoJS.AES.decrypt(
    tokenCookie,
    process.env.TOKEN_COOKIE_ENCRYPTION_KEY
  );
  const token = JSON.parse(cookieTokenBytes.toString(CryptoJS.enc.Utf8));
  // Leaving a buffer of 12 seconds to avoid failed calls while refreshing
  if (parseInt(token.expiration, 10) - Date.now() < 12000) {
    // Refresh application token
    const encryptedToken = await refreshToken();
    cookies.set('je_application_token', encryptedToken, {
      signed: true,
      path: '/',
    });
    const tokenBytes = CryptoJS.AES.decrypt(
      encryptedToken,
      process.env.TOKEN_COOKIE_ENCRYPTION_KEY
    );
    return JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));
  }
  return token;
};
