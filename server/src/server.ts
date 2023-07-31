import express from "express";
import cors from "cors";
import { Services } from "../../shared/types";
import servicesRoutes from "./route-methods/services";
import staffRoutes from "./route-methods/staff";
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config();
const PORT = process?.env?.PORT || 5000;

app.get("/api/services", servicesRoutes.get);
app.get("/api/staff", staffRoutes.get);

export const startUp = async () => {
  // create appointments relevant to current date

  // eslint-disable-next-line no-console
  app.listen(PORT, () =>
    console.log(`Pet clinic server listening on port ${PORT}`)
  );
};

export default app;
