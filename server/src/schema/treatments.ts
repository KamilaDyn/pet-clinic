import mongoose from 'mongoose';

const treatmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  durationInMinutes: {
    type: Number,
    required: true,
  },
  image: {
    type: {
      fileName: String,
      authorName: String,
      platformLink: String,
    },
  },
  description: {
    type: String,
    required: true,
  },
});

treatmentsSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Treatments = mongoose.model('Treatments', treatmentsSchema);

export default Treatments;
