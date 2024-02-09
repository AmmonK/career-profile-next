import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
// import lightcastToken from '@/utils/lightcast/token';

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith('https://');
// const cookiePrefix = '__JobExp-';
// const domain = 'careers-stage.phoenix.edu';

async function refreshAccessToken(token) {
  const response = await fetch(process.env.COGNITO_TOKEN_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.COGNITO_CODE_CLIENT_ID,
      refresh_token: token.refreshToken,
    }),
  }).catch({
    ok: false,
  });

  if (!response.ok) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }

  const refreshedTokens = await response.json();

  return {
    ...token,
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  };
}

const nextAuthOptions = () => ({
  debug: process.env.NEXTAUTH_DEBUG,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CognitoProvider({
      id: 'cognito',
      clientId: process.env.COGNITO_CODE_CLIENT_ID,
      checks: 'nonce',
      wellKnown: `${process.env.COGNITO_CLIENT_ISSUER}/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: process.env.COGNITO_CLIENT_SCOPE,
          response_type: 'code',
        },
      },
      client: {
        token_endpoint_auth_method: 'none',
      },
      profile(profile) {
        return {
          id: profile.sub,
          personId: profile['custom:STUDENT_PERSON_ID'],
          name: profile.username || (profile.identities || [])[0]?.userId,
          email: profile.email,
          image: null,
          accessToken: profile.accessToken,
        };
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: (process.env.COGNITO_MAX_TOKEN_AGE_SECONDS || 3000) * 1000,
  },
  logger: {
    error(code, metadata) {
      console.log('Next Auth Error: ', code, metadata);
    },
    warn(code) {
      console.log('Next Auth Warning: ', code);
    },
    debug(code, metadata) {
      console.log('Next Auth Debug: ', code, metadata);
    },
  },
  callbacks: {
    async session({ session, token }) {
      // const lt = await lightcastToken();
      return {
        ...session,
        user: {
          ...session.user,
          personId: token.personId,
          // lightcastToken: lt,
        },
      };
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          personId: user.personId,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NEXTAUTH_URL.startsWith('https://')
          ? process.env.NEXT_PUBLIC_CAREERS_BASE_DOMAIN
          : 'localhost',
      },
    },
    // callbackUrl: {
    //   name: `${cookiePrefix}next-auth.callback-url`,
    //   options: {
    //     sameSite: 'lax',
    //     path: '/job-explorer',
    //     secure: true,
    //     domain: '.phoenix.edu',
    //   },
    // },
    // csrfToken: {
    //   name: `${cookiePrefix}next-auth.csrf-token`,
    //   options: {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path: '/job-explorer',
    //     secure: true,
    //     domain: domain,
    //   },
    // },
    // pkceCodeVerifier: {
    //   name: `${cookiePrefix}next-auth.pkce.code_verifier`,
    //   options: {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path: '/job-explorer',
    //     secure: useSecureCookies,
    //     domain: domain,
    //   },
    // },
    // state: {
    //   name: `${cookiePrefix}next-auth.state`,
    //   options: {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path: '/job-explorer',
    //     secure: useSecureCookies,
    //     domain: domain,
    //   },
    // },
    // nonce: {
    //   name: `${cookiePrefix}next-auth.nonce`,
    //   options: {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path: '/',
    //     secure: useSecureCookies,
    //   },
    // },
  },
});

// Abbreviated to shorten line
const NextAuthWrapper = (req, res) => NextAuth(req, res, nextAuthOptions(res));

export default NextAuthWrapper;
