import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  dateTime: {
    type: String,
    required: true,
  },
  treatmentName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

appointmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
