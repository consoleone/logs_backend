import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express, { NextFunction, Request, Response } from 'express';
import cookieparser from 'cookie-parser';
import { parsedEnv as env } from './env/validate';
import { getJwt, verifyJwt } from './utils/jwt';
import cors from 'cors';
import path from 'path';
import router from './router/api';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:4000', env.ALLOWED_ORIGIN],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', router);

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use((err: CustomError, req: Request, res: Response, next: any) => {
  if (err.statusCode) return res.status(err.statusCode).send(err.message);
  res.status(500).send('Internal Server Error');
});

async function start() {
  try {
    (await import('./env/validate')).parsedEnv;

    await prisma.$connect();
    app.listen(4000, () => {
      console.log('Express server is running on port 4000');
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();

class CustomError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
