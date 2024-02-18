import {
  unauthorizedInstance,
  proxyInstance,
} from '@/utils/axios';

export const unAuthorizedFetcher = (url) =>
  unauthorizedInstance.get(url).then(({ data }) => data);
export const unAuthorizedPostFetcher = (req) =>
  unauthorizedInstance.post(req.url, req.body).then(({ data }) => data);
export const proxyFetcher = (url) =>
  proxyInstance.get(url).then(({ data }) => data);

export default {
  unAuthorizedFetcher,
  unAuthorizedPostFetcher,
  proxyFetcher,
};

const proxyUrl = (url) => `${process.env.NEXT_PUBLIC_BASE_PATH}${url}`;

