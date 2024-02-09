import { signOut } from 'next-auth/react';

function sessionSignOut() {
  const logoutUri = `${process.env.COGNITO_LOGOUT_URI}?client_id=${process.env.COGNITO_CODE_CLIENT_ID}&logout_uri=${process.env.AUTHDEPOT_LOGOUT_URI}?callback=${process.env.NEXT_PUBLIC_LOGIN_REDIRECT}`;
  signOut({
    callbackUrl: logoutUri,
  }).then(() => {
    sessionStorage.clear();
    window.location.assign(logoutUri);
  });
}

export default sessionSignOut;
