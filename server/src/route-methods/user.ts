import { Request, Response, NextFunction } from "express";
import db from "../../db-function";
import { createJWT, hashPassword, passwordIsValid } from "../auth";
import { AuthUser } from "../types";
import { User } from "../../../shared/types";
import jsonwebtoken from "jsonwebtoken";
const jwt = require("jsonwebtoken");

function removePasswordAndAddToken(user: AuthUser): User {
  const { salt, keylen, iterations, hash, digest, ...cleanUser } = user;

  const token = createJWT(cleanUser);

  return { ...cleanUser, token };
}

async function create(request: Request, response: Response): Promise<Response> {
  try {
    const { email, password } = request.body;

    const exitingUsers = await db.getUsers();
    const takenEmail = exitingUsers.map((user) => user.email).includes(email);
    if (takenEmail) {
      return response.status(400).json({ message: "Email is already in use" });
    }
    const userPasswordData = hashPassword(password);
    const newUser = await db.addUser({ email, ...userPasswordData });

    const user = removePasswordAndAddToken(newUser);

    return response.status(201).json({ user });
  } catch (e) {
    return response.status(500).json({ message: `could not add user: ${e} ` });
  }
}
async function auth(request: Request, response: Response): Promise<Response> {
  const { email, password } = request.body;
  const users = await db.getUsers();
  const validUser = users.reduce(
    (foundUser: AuthUser | null, user) =>
      user.email === email && passwordIsValid(password, user)
        ? user
        : foundUser,
    null
  );

  if (!validUser)
    return response.status(400).json({ message: "Invalid logins" });
  const user = removePasswordAndAddToken(validUser);

  return response.status(200).json({ user });
}

async function authMe(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.header("Authorization")?.replace("bearer ", "");

  if (!token) {
    return response.status(403).json({ message: "Access danied" });
  }

  try {
    const user = jsonwebtoken.verify(token, process.env.EXPRESS_SECRET);
    return response.json(user);
  } catch (err) {
    return response.status(401).json({ message: "Invalid token" });
  }
  next();
}

export default { auth, create, authMe };
