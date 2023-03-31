import { Router } from 'express';
import { getJwt, verifyJwt } from '../utils/jwt';
import { parsedEnv as env } from '../env/validate';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

router.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (id.trim() === env.ID.trim() && password.trim() === env.PASSWORD.trim()) {
    const token = getJwt({ _id: id as string });
    res.cookie('token', token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.send('Login Success');
  }

  return res.status(401).send('Login Failed');
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Logout Success');
});

router.get('/logs', async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Unauthorized');

  try {
    verifyJwt(token);
    const logs = await prisma.logs.findMany({});
    return res.json(logs).end();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
});

export default router;
