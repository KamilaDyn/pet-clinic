import crypto from "crypto";
import pbkdf2 from "pbkdf2";
import { AuthUser, PasswordHash } from "./types";
import { User } from "../../shared/types";
import jsonwebtoken from "jsonwebtoken";

function hashPassword(password: string): PasswordHash {
  const salt = crypto.randomBytes(128).toString("base64");
  const iterations = 10000;
  const keylen = 64;
  const digest = "sha512";
  const hash = pbkdf2
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString();

  return {
    salt,
    hash,
    iterations,
    keylen,
    digest,
  };
}
function createJWT(user: User): string {
  return jsonwebtoken.sign(user, process.env.EXPRESS_SECRET);
}

function passwordIsValid(password: string, user: AuthUser): boolean {
  const attemptHash = pbkdf2.pbkdf2Sync(
    password,
    user.salt,
    user.iterations,
    user.keylen,
    user.digest
  );
  return user.hash === attemptHash.toString();
}

export { hashPassword, createJWT, passwordIsValid };
