require('dotenv').config();

const PORT = process.env.PORT || 3003;
const MONGO_URL = process.env.MONGO_DB || '';

export default { PORT, MONGO_URL };
