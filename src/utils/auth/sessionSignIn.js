import { signIn } from 'next-auth/react';

const sessionSignIn = () => {
  signIn('cognito');
};

export default sessionSignIn;
