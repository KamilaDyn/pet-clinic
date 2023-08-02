import { log } from "console";
import { NewUser } from "../../shared/types";
import { AuthUser, NewAuthUser } from "../src/types";
import { resolve } from "path";
//get a reference to the filepath module
const fs = require("fs");

export enum filenames {
  user = "./db/users.json",
}
type JsonDataType = AuthUser;

function jsonReader<ItemType extends JsonDataType>(
  filePath: filenames
): Promise<ItemType[]> {
  // const data = await fs.readFile(filePath);
  // return JSON.parse(data.toString());
  return new Promise((resolve, reject) =>
    fs.readFile(filePath, "utf8", (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(fileData);
          resolve(jsonData);
        } catch (perseError) {
          reject(perseError);
        }
      }
    })
  );
}
/* write data to file*/

async function jsonWrite(filePath, newData) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const updateData = JSON.stringify(newData, null, 2);

          fs.writeFile(filePath, updateData, "utf8", (writeErr) => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve(updateData);
            }
          });
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

async function getUsers(): Promise<AuthUser[]> {
  return jsonReader(filenames.user);
}

async function addUser(newUserData: NewAuthUser): Promise<AuthUser> {
  const users = await getUsers();
  const ids: number[] = Object.values(users).map((u) => u.id);
  const maxId = ids.reduce((tempMaxId: number, itemId: number) => {
    return itemId > tempMaxId ? itemId : tempMaxId;
  }, 0);
  const newUserId = maxId + 1;
  const newUser = { ...newUserData, id: newUserId };
  await jsonWrite(filenames.user, [...users, newUser]);
  return newUser;
}

export default { addUser, getUsers };
