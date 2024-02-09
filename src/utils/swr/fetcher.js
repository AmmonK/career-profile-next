import {
  unauthorizedInstance,
  unauthorizedSegmentInstance,
  proxyInstance,
} from '@/utils/axios';

export const unAuthorizedFetcher = (url) => unauthorizedInstance.get(url).then(({ data }) => data);
export const unAuthorizedPostFetcher = (req) => unauthorizedInstance
  .post(req.url, req.body).then(({ data }) => data);
export const proxyFetcher = (url) => proxyInstance.get(url).then(({ data }) => data);
export const unauthorizedSegmentFetcher = (url) => (
  unauthorizedSegmentInstance.get(url).then(({ data }) => data)
);
export default {
  unAuthorizedFetcher,
  unAuthorizedPostFetcher,
  unauthorizedSegmentFetcher,
};
