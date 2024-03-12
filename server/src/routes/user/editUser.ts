import express from 'express';
import User from '../../schema/user';
import Appointment from '../../schema/appoitments';

const usersRouter = express.Router();

usersRouter.put('/:id', async (req, resp, next) => {
  const userId = req.params.id;
  const { appointmentsId } = req.body;

  const authorizationHeader = req.headers['authorization'];

  try {
    if (!authorizationHeader) {
      resp
        .status(400)
        .send({ error: 'You must be logged to register appointment' });
    }
    if (!appointmentsId) {
      resp.status(400).json({
        error: 'Bad Request - Missing appointmentsId in the request body',
      });
      return;
    }
    if (!userId) {
      resp.status(400).send({ error: 'user not found' });
    }

    const appointment = await Appointment.findById(appointmentsId).populate(
      'user',
      {
        id: 1,
      }
    );

    if (!appointment) {
      resp.status(400).json({
        error: 'Bad Request - cannot find appointment',
      });
      return;
    }

    const user = await User.findById(userId);
    const findAppointmentInUser = user?.appointments.includes(appointmentsId);

    if (findAppointmentInUser) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { appointments: appointmentsId } },

        { new: true }
      );
      resp.json(updatedUser);
      return;
    }

    if (appointment && appointment.reserved && user?.id !== appointment.user) {
      resp.status(400).send({ error: 'Appointment is actually reserved' });
      return;
    }

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $push: { appointments: appointmentsId } },
      { new: true }
    );

    if (!newUser) {
      resp.status(404).json({ error: 'updated user not found' });
    }

    resp.json(newUser);
  } catch (error: unknown) {
    let errorMessage = ' Something went wrong';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    resp.status(400).send(errorMessage);
    next();
  }
});

export default usersRouter;
