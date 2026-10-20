import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<400', 'p(99)<800'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const postId = Math.floor(Math.random() * 10) + 1;
  const res = http.get(`${BASE_URL}/posts/${postId}/comments`, {
    tags: { name: 'GET /posts/{id}/comments' },
  });

  console.log(`GET /posts/${postId}/comments -> status: ${res.status}, response time: ${res.timings.duration} ms`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
