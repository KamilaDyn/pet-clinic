import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serviceNames: {
    type: Array,
    required: true,
  },
  image: {
    type: {
      fileName: String,
      authorName: String,
      platformLink: String,
    },
  },
});

staffSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
