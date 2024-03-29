import express, { Response } from 'express';
import mongoose from 'mongoose';

import Appointment from '../schema/appoitments';
import { tokenRequest } from '../types/express';

const appointmentRouter = express.Router();

appointmentRouter.get('/:year/:month', async (request, response) => {
  try {
    const { year, month } = request.params;

    const yearInt = parseInt(year);
    const monthInt = parseInt(month);
    const startDate = new Date(yearInt, monthInt - 1, 1);
    const endDate = new Date(yearInt, monthInt, 0);

    const appointments = await Appointment.find({
      dateTime: {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString(),
      },
    });

    response.json(appointments);
  } catch (error) {
    console.log('error', error);

    response.status(500).send({ error: 'Internal Server Error' });
  }
});

appointmentRouter.get('/:id', async (req, resp) => {
  const id = req.params.id;
  const appointment = await Appointment.findById(id);

  if (appointment) {
    resp.json(appointment);
  } else {
    resp.status(404).send({ error: 'appointment not found' });
  }
});

appointmentRouter.post('/', async (req, resp, next) => {
  const body = req.body;

  try {
    const appointment = new Appointment({
      dateTime: body.dateTime,
      treatmentName: body.treatmentName,
      reserved: false,
    });
    const saveAppointment = await appointment.save();
    resp.status(200).json(saveAppointment);
  } catch (error: unknown) {
    let errorMessage = ' Something went wrong';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    resp.status(400).send(errorMessage);
    next();
  }
});

appointmentRouter.put('/:id', async (req: tokenRequest, resp: Response) => {
  const appointmentId = req.params.id;

  const user = req.user;
  if (!user) {
    return resp.status(401).json({ error: 'token is missing or invalid' });
  }
  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return resp.status(404).json({ error: 'appointment not found' });
    }

    if (appointment?.user && String(user._id) !== String(appointment?.user)) {
      return resp
        .status(400)
        .json({ error: 'appointment is reserved, choose different time' });
    }

    let update = {};

    if (appointment.user && appointment.user.equals(user._id)) {
      update = { $unset: { user: '' }, $set: { reserved: false } };
    } else {
      const userObjectId = new mongoose.Types.ObjectId(user._id);
      // If the user is not reserved, add or update the user key
      update = { $set: { user: user._id, reserved: true } };
    }

    const reserveAppointment = {
      user: user._id,
      reserved: !appointment.reserved,
    };

    const newAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      update,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );

    if (!newAppointment) {
      return resp.status(404).json({ error: 'updated appointment not found' });
    }

    return resp.json(newAppointment);
  } catch (error) {
    return resp.status(400).send(error);
  }
});
appointmentRouter.delete('/:id', async (req, resp) => {
  const id = req.params.id;
  try {
    await Appointment.findByIdAndDelete(id);
    resp.status(204).send({ message: 'Appointment deleted' }).end();
  } catch (error: unknown) {
    let errorMessage = ' Something went wrong';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    resp.status(400).send(errorMessage);
  }
});

export default appointmentRouter;
