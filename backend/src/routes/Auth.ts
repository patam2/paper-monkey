import { Router, Request, Response } from 'express';
import { LoginUser, SignUpUser } from '../models/authmodels';
import { compare } from 'bcrypt-ts';
import { insertUser, getUserByEmail } from '../utils/database/users';
import { NewUser } from '../utils/database/types';
import { AppRedisClient } from '../app';
import generateCookie from '../utils/cookies/generation';
import cookieCheckingMiddleware from '../utils/cookies/cookie-middleware';

const cookieParser = require('cookie-parser');
const apiRouter = Router();

apiRouter.use(cookieParser());

async function handleLoginPostRequest(req: Request, res: Response): Promise<void> {
  if (!req.body) {
    res.send({ errors: 'Invalid json' });
    return;
  }

  const userData = LoginUser.createFromForm(req.body);
  if ('errors' in userData) {
    res.status(403).send({ errors: userData.errors });
    return;
  }

  try {
    const response = await getUserByEmail(userData.email);
    
    // If any are undefined somehow, return 403. 
    if (!userData.password || !response!.password) {
      res.status(403).send({ errors: 'Wrong password' });
      return;
    }

    // Compare form password and stored passwords
    const authStatus = await compare(userData.password, response!.password);
    
    if (authStatus) {
      const cookie = generateCookie();
      AppRedisClient.setValue(cookie, { userid: response!.user_id, name: response!.name }, 86400);
      res
        .cookie('user', cookie, { maxAge: 86400 * 1000 })
        .status(200)
        .send({ successful: { userId: response!.user_id } });
    } else {
      res.status(403).send({ errors: 'Wrong password' });
    }
  } catch {
    res.status(403).send({ errors: 'authentication failed!' });
  }
}

async function handleSignupPostRequest(req: Request, res: Response): Promise<void> {
  if (!req.body) {
    res.send({ errors: '' });
    return;
  }

  const userData = SignUpUser.createFromForm(req.body);
  if ('errors' in userData) {
    res.send({ errors: userData.errors });
    return;
  }

  try {
    const newUser: NewUser = {
      email: userData.email,
      name: userData.name,
      password: userData.password,
    };

    if (await getUserByEmail(newUser.email)) {
      res.status(500).send({ error: 'User already existing' });
      return;
    }

    await insertUser(newUser);
    res.send('Successful');
  } catch (error) {
    console.error('Database error', error);
    res.status(500).send({ error: '' });
    return;
  }
}

async function handleLogoutRequest(req: Request, res: Response): Promise<void> {
  try {
    AppRedisClient.deleteValue(req.cookies['user']);
    res
      .clearCookie('user')
      .status(200)
      .send({ status: 'successful' });
    return;
  } catch (error) {
    res.status(503).send('Error');
  }
}

apiRouter.post('/login', handleLoginPostRequest);
apiRouter.post('/signup', handleSignupPostRequest);
apiRouter.post('/logout', cookieCheckingMiddleware, handleLogoutRequest);

export default apiRouter;