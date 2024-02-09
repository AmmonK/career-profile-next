import axios from 'axios';

/*

Custom axios instance that we can append specific headers for auth
vs non auth instances

*/

export const unauthorizedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MICROSERVICE_BASE_URL,
});

/*
  ----------------- WARNING --------------------
  This Authorized Instance should only be used behind the proxy
  otherwise the auth token may be visible to the user.
*/

export const authorizedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const proxyInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
});

export const unauthorizedSegmentInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SEGMENT_BASE_URL,
});

export const setAuthToken = (token, type) => {
  const thisType = type || 'Bearer';
  if (token) {
    authorizedInstance.defaults.headers.common.Authorization = `${thisType} ${token}`;
  } else {
    delete authorizedInstance.defaults.headers.common.Authorization;
  }
};
