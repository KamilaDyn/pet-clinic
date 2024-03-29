import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

const appointmentSchema = new mongoose.Schema({
  dateTime: {
    type: String,
    required: true,
  },
  treatmentName: {
    type: String,
    required: true,
  },
  reserved: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

appointmentSchema.plugin(uniqueValidator);
appointmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
