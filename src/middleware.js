// export { default } from "next-auth/middleware"

import { withAuth } from 'next-auth/middleware';

export default withAuth(
  {
    pages: {
      signIn: '/auth/signin',
    },
    // callbacks: {
    //   authorized: async ({ token }) => {
    //     console.log('authorized');
    //     console.log(token);
    //     return Promise.resolve(token);
    //   },
    // }
  }
);
