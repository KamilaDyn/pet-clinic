import express, { json } from "express";
import cors from "cors";
import servicesRoutes from "./route-methods/services";
import staffRoutes from "./route-methods/staff";
import userRoutes from "./route-methods/user";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(json());

dotenv.config();
const PORT = process?.env?.PORT || 5000;

app.post("/api/signin", userRoutes.auth);

app.get("/api/services", servicesRoutes.get);
app.get("/api/staff", staffRoutes.get);
/* ***users *** */
app.post("/api/users", userRoutes.create);

export const startUp = async () => {
  // create appointments relevant to current date

  // eslint-disable-next-line no-console
  app.listen(PORT, () =>
    console.log(`Pet clinic server listening on port ${PORT}`)
  );
};

export default app;
