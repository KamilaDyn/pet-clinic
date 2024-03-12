import logger from '../utils/logger';
import User from '../schema/user';
import { Request, Response, NextFunction } from 'express';
import { User as UserType } from '../types/user';
import jwt from 'jsonwebtoken';

interface tokenRequest extends Request {
  token?: string | null;
  user?: UserType | null;
}
interface JwtPayload {
  id: string;
}
const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (
  request: tokenRequest,
  response: Response,
  next: NextFunction
): void => {
  const authorization = request.headers['authorization'];
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
    response.status(401).json({ error: 'token is not provided' });
  }
  next();
};

const userExtractor = async (
  request: tokenRequest,
  response: Response,
  next: NextFunction
) => {
  if (!request.token) {
    request.user = null;
  } else {
    if (process.env.EXPRESS_SECRET) {
      try {
        const decodedToken = jwt.verify(
          request.token,
          process.env.EXPRESS_SECRET
        ) as JwtPayload;
        if (!decodedToken.id) {
          request.user = null;
        } else {
          request.user = await User.findById(decodedToken.id);
        }
        next();
      } catch (err) {
        response.status(400).json({ error: err });
      }
    } else {
      next();
    }
  }
};
const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id, please try again.' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
