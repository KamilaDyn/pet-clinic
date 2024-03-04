import express from 'express';

import Treatments from '../schema/treatments';

const treatmentsRoutes = express.Router();

treatmentsRoutes.get('/', async (_request, response) => {
  const appointments = await Treatments.find({});

  response.json(appointments);
});

treatmentsRoutes.get('/:id', async (req, resp) => {
  const id = req.params.id;
  const treatment = await Treatments.findById(id);

  if (treatment) {
    resp.json(treatment);
  } else {
    resp.status(404).send({ error: 'treatment not found' });
  }
});

export default treatmentsRoutes;
