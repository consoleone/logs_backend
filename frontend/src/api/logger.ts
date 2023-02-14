import { z } from 'zod';
import axios from 'axios';

axios.defaults.baseURL = 'https://gatewayde.dev.radixportfolio.info';

// add cookie to all requests

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

const logs = z.array(
  z.object({
    tag: z.string(),
    time: z.string(),
    data: z.object({
      log: z.string(),
      date: z.number(),
      source: z.string(),
      container_id: z.string(),
      container_name: z.string(),
    }),
    id: z.number(),
  })
);

export const getLogs = async () => {
  const { data } = await axios.get('/logger/logs', { withCredentials: true });
  return logs.parse(data);
};

export const login = async (id: string, password: string) => {
  const { data } = await axios.post(
    '/logger/login',
    { id, password },
    { withCredentials: true }
  );
  return data;
};
