import User from '../schema/user';
import express from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginRouter = express.Router();
// const getTokenFrom = (request: any) => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '');
//   }

//   return null;
// };

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && isPasswordCorrect)) {
      return response
        .status(401)
        .json({ error: 'Invalid username or password' });
    }
    const userToken = {
      username: user.username,
      id: user._id,
    };
    // const decodedToken = jwt.verify(getTokenFrom(request), process.env.EXPRESS_SECRET);
    // const user2 = await User.findById(decodedToken.id);

    const token = jwt.sign(userToken, process.env.EXPRESS_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user._id });
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong ';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    return response.status(400).send(errorMessage);
  }
});

export default loginRouter;
