import { Request, Response } from "express";

import staff from "../../db/staff.json";
import db from "../../db-function";

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    return res.status(200).json(staff);
  } catch (e) {
    return res.status(500).json({ message: `could not get treatments: ${e}` });
  }
}

export default {
  get,
};
