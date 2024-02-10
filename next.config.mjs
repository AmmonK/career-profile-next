/** @type {import('next').NextConfig} */

// const NextFederationPlugin = require('@module-federation/nextjs-mf');
import NextFederationPlugin from '@module-federation/nextjs-mf'

const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  compiler: {
    removeConsole: Boolean(process.env.REMOVE_CONSOLE_LOGGING),
    emotion: true,
    reactRemoveProperties: { properties: ['data-testid$'] },
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'shell',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            careerToolsNavbarMFE:
              'careerToolsNavbarMFE@https://careers-stage.phoenix.edu/apps/nav-bar/remoteEntry.js',
            skillsIdentifier:
              'skillsIdentifier@https://d2f3ls6q5wavo7.cloudfront.net/st/remoteEntry.js',
          },
          shared: {},
        })
      );
    }
    return config;
  },
  env: {
    COGNITO_CODE_CLIENT_ID: process.env.COGNITO_CODE_CLIENT_ID,
    COGNITO_CLIENT_ISSUER: process.env.COGNITO_CLIENT_ISSUER,
    COGNITO_CLIENT_SCOPE: process.env.COGNITO_CLIENT_SCOPE,
    COGNITO_TOKEN_URI: process.env.COGNITO_TOKEN_URI,
    COGNITO_LOGOUT_URI: process.env.COGNITO_LOGOUT_URI,
    HIGHLIGHT_SKILL_COLOR: process.env.HIGHLIGHT_SKILL_COLOR,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_LOGIN_REDIRECT: process.env.NEXT_PUBLIC_LOGIN_REDIRECT,
    AUTHDEPOT_LOGOUT_URI: process.env.AUTHDEPOT_LOGOUT_URI,
    COGNITO_MAX_TOKEN_AGE_SECONDS: process.env.COGNITO_MAX_TOKEN_AGE_SECONDS,
    NEXTAUTH_DEBUG: process.env.NEXTAUTH_DEBUG,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MICROSERVICE_PREFIX: process.env.MICROSERVICE_PREFIX,
    TEALIUM_ENVIRONMENT: process.env.TEALIUM_ENVIRONMENT,
    NEXT_PUBLIC_VSU_LINK: process.env.NEXT_PUBLIC_VSU_LINK,
    SMARTY_AUTH_ID: process.env.SMARTY_AUTH_ID,
    SMARTY_AUTH_TOKEN: process.env.SMARTY_AUTH_TOKEN,
    NEXT_PUBLIC_AUTH_OFF: process.env.NEXT_PUBLIC_AUTH_OFF,
    NEXT_PUBLIC_FEATURE_PENDO: process.env.NEXT_PUBLIC_FEATURE_PENDO,
    NEXT_PUBLIC_FEATURE_USE_MFE_NAVIGATION:
      process.env.NEXT_PUBLIC_FEATURE_USE_MFE_NAVIGATION,
    SKILL_IDENTIFIER_URL: process.env.SKILL_IDENTIFIER_URL,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_OPTIMIZE_ID: process.env.GOOGLE_OPTIMIZE_ID,
    NEXT_PUBLIC_FEATURE_ENTRY_LEVEL:
      process.env.NEXT_PUBLIC_FEATURE_ENTRY_LEVEL,
    NEXT_PUBLIC_SCRIPTS_ENABLED: process.env.NEXT_PUBLIC_SCRIPTS_ENABLED,
    NEXT_PUBLIC_CAREER_HUB_URL: process.env.NEXT_PUBLIC_CAREER_HUB_URL,
    NEXT_PUBLIC_ENABLE_DEVTOOLS: process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS,
    NEXT_PUBLIC_USE_JOBTITLE: process.env.NEXT_PUBLIC_USE_JOBTITLE,
    NEXT_PUBLIC_NAVBAR_MFE_URL: process.env.NEXT_PUBLIC_NAVBAR_MFE_URL,
    SUB_DOMAIN_NAME: process.env.SUB_DOMAIN_NAME,
    NEXT_PUBLIC_CAREERS_BASE_DOMAIN:
      process.env.NEXT_PUBLIC_CAREERS_BASE_DOMAIN,
    NEWRELIC_ACCOUNT_ID: process.env.NEWRELIC_ACCOUNT_ID,
    NEWRELIC_TRUST_KEY: process.env.NEWRELIC_TRUST_KEY,
    NEWRELIC_AGENT_ID: process.env.NEWRELIC_AGENT_ID,
    NEWRELIC_LICENSE_KEY: process.env.NEWRELIC_LICENSE_KEY,
    NEWRELIC_APPLICATION_ID: process.env.NEWRELIC_APPLICATION_ID,
    NEXT_PUBLIC_USE_CAREERS: process.env.NEXT_PUBLIC_USE_CAREERS,
    NEXT_PUBLIC_CAREERS_SAVED_PAGE: process.env.NEXT_PUBLIC_CAREERS_SAVED_PAGE,
    NEXT_PUBLIC_USE_FAQ: process.env.NEXT_PUBLIC_USE_FAQ,
    DEVCYCLE_SDK_KEY: process.env.DEVCYCLE_SDK_KEY,
    NEXT_PUBLIC_INTERVIEW_CALENDAR: process.env.NEXT_PUBLIC_INTERVIEW_CALENDAR,
    EMSI_CLIENT_SECRET: process.env.EMSI_CLIENT_SECRET,
    NEXT_PUBLIC_CAREERS_BY_DEGREE: process.env.NEXT_PUBLIC_CAREERS_BY_DEGREE,
    NEXT_PUBLIC_FEEDBACK_MODAL: process.env.NEXT_PUBLIC_FEEDBACK_MODAL,
    NEXT_PUBLIC_EXPLORE_CAREERS: process.env.NEXT_PUBLIC_EXPLORE_CAREERS,
    APP_MS_COGNITO_SECRET: process.env.APP_MS_COGNITO_SECRET,
    APP_MS_COGNITO_CLIENT_ID: process.env.APP_MS_COGNITO_CLIENT_ID,
    TOKEN_COOKIE_KEY: process.env.TOKEN_COOKIE_KEY,
    TOKEN_COOKIE_ENCRYPTION_KEY: process.env.TOKEN_COOKIE_ENCRYPTION_KEY,
    NEXT_PUBLIC_USE_TALENT_SOURCE: process.env.NEXT_PUBLIC_USE_TALENT_SOURCE,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/jobs',
        permanent: true,
      },
      {
        source: '/',
        destination: '/job-explorer',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
