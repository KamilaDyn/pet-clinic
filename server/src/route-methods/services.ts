import { Request, Response } from 'express';

import services from '../../db/services';

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    return res.status(200).json(services);
  } catch (e) {
    return res.status(500).json({ message: `could not get treatments: ${e}` });
  }
}

export default {
  get,
};
