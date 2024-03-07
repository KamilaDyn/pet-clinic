import User from '../schema/user';

import express from 'express';

const bcrypt = require('bcryptjs');
const usersRouter = express.Router();

usersRouter.get('/', async (_, response) => {
  try {
    // without password
    const users = await User.find({})
      .populate('appointments', { treatmentName: 1, dateTime: 1 })
      .select('-passwordHash');

    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});
usersRouter.get('/:id', async (request, response) => {
  const userId = request.params.id;
  try {
    // without password

    const user = await User.findById(userId)
      .populate('appointments', { treatmentName: 1, dateTime: 1 })
      .select('-passwordHash');

    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

usersRouter.post('/', async (req, resp, next) => {
  const { username, password, name, email } = req.body;

  const existingUser = await User.findOne({ username });

  try {
    if (password.length < 4) {
      resp.status(400).send({ error: 'password is too short, min 4 letters' });
    }
    if (username.length < 3) {
      resp
        .status(400)
        .send({ error: 'username is too short, min 3 characters length' });
    }
    if (existingUser) {
      resp.status(400).json({ error: 'username is already taken' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
      email,
      appointments: [],
    });
    const saveUser = await user.save();
    resp.status(201).json(saveUser);
  } catch (error: unknown) {
    let errorMessage = ' Something went wrong ';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    resp.status(400).send(errorMessage);
    next();
  }
});

usersRouter.put('/', async (req, resp, next) => {
  const { username, password, name } = req.body;
  const existingUser = await User.findOne({ username });

  try {
    if (password.length < 4) {
      resp.status(400).send({ error: 'password is too short, min 4 letters' });
    }
    if (username.length < 3) {
      resp
        .status(400)
        .send({ error: 'username is too short, min 3 characters length' });
    }
    if (existingUser) {
      resp.status(400).json({ error: 'username is already taken' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const saveUser = await user.save();
    resp.status(201).json(saveUser);
  } catch (error: unknown) {
    let errorMessage = ' Something went wrong';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    resp.status(400).send(errorMessage);
    next();
  }
});
export default usersRouter;
