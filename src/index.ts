import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express, { NextFunction, Request, Response } from 'express';
import cookieparser from 'cookie-parser';
import { parsedEnv as env } from './env/validate';
import { getJwt, verifyJwt } from './utils/jwt';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', env.ALLOWED_ORIGIN],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return next(new CustomError('Token is not provided', 401));

  try {
    const { _id } = verifyJwt(token);
    res.send(`Hello ${_id}`);
  } catch (error) {
    next(new CustomError('Invalid Token', 401));
  }
});

app.post('/login', (req: Request, res: Response) => {
  const { id, password } = req.body;

  console.log(id, password);
  console.log(env);

  // set expires infinte

  if (id === env.ID && password === env.PASSWORD) {
    const token = getJwt({ _id: id as string });
    res.cookie('token', token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.send('Login Success');
  }

  return res.send('Login Failed');
});

app.get('/logs', async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) return res.send('Token is not provided').redirect('/login');

  try {
    verifyJwt(token);
    const logs = await prisma.logs.findMany({});
    res.json(logs);
  } catch (error) {
    console.log(error);
    res.send('Invalid Token').redirect('/login');
  }
});

app.use((err: CustomError, req: Request, res: Response, next: any) => {
  console.log(err);
  if (err.statusCode) return res.status(err.statusCode).send(err.message);
  res.status(500).send('Internal Server Error');
});

async function start() {
  try {
    (await import('./env/validate')).parsedEnv;
    (await import('dotenv')).config();

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
