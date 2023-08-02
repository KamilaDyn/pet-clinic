import { Request, Response } from "express";
import users from "../../db/users.json";
import db from "../../db-function";
import { createJWT, hashPassword } from "../auth";
import { AuthUser, PasswordHash } from "../types";
import { User } from "../../../shared/types";

async function auth(request: Request, response: Response) {
  const { email, password } = request.body;
  const users = await db.getUsers();
  // console.log(users);
}
function removePasswordAndAddToken(user: AuthUser): User {
  const { salt, keylen, iterations, hash, digest, ...cleanUser } = user;
  const token = createJWT(cleanUser);
  return { ...cleanUser, token };
}

async function create(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    console.log(request.body);

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
export default { auth, create };
