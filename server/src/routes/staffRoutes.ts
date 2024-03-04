import express from 'express';

import Staff from '../schema/staff';

const staffRoutes = express.Router();

staffRoutes.get('/', async (_request, response) => {
  const appointments = await Staff.find({});

  response.json(appointments);
});

staffRoutes.get('/:id', async (req, resp) => {
  const id = req.params.id;
  const employer = await Staff.findById(id);

  if (employer) {
    resp.json(employer);
  } else {
    resp.status(404).send({ error: 'person not found' });
  }
});

export default staffRoutes;
