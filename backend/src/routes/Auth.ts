import { Router, Request, Response } from 'express';

import { LoginUser, SignUpUser } from '../models/authmodels';
import { compare } from 'bcrypt-ts';

const apiRouter = Router();

import { insertUser, getUserByEmail } from '../utils/database/users';
import { NewUser } from '../utils/database/types';


import { AppRedisClient } from '../app';
import generateCookie from '../utils/cookies/generation';

async function handleLoginPostRequest(req: Request, res: Response): Promise<void> {
  if (!req.body) {
    res.send({ errors: 'Invalid json' });
    return;
  }
  console.log(req.body);
  const userData = LoginUser.createFromForm(req.body);
  if ('errors' in userData) {
    res.status(403).send({ errors: userData.errors });
    return;
  }
  try {
    const response = await getUserByEmail(userData.email);
    //if both are somehow undefined -> could lead to error. should fix!
    console.log(response, userData.password);
    const authStatus = await compare(userData.password, response?.password || '');
    //console.log(response?.password, userData.password, await compare(response?.password || "", userData.password))
    if (authStatus) {
      const cookie = generateCookie()
      AppRedisClient.setValue(cookie, {userid: response!.user_id, name: response!.name})
      res.cookie("user", cookie).status(200).send({ successful: { userId: response!.user_id } }); //todo add autoexpire both as cookie and redis state
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
    }
    await insertUser(newUser);
    res.send('Successful');
  } catch (error) {
    console.error('Database error', error);
    res.status(500).send({ error: '' });
    return;
  }
}


apiRouter.post('/login', handleLoginPostRequest);
apiRouter.post('/signup', handleSignupPostRequest);

export default apiRouter;
