import express, { json } from "express";
import cors from "cors";
import servicesRoutes from "./route-methods/services";
import staffRoutes from "./route-methods/staff";
import userRoutes from "./route-methods/user";
import dotenv from "dotenv";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());

dotenv.config();
const PORT = process?.env?.PORT || 5000;

app.post("/api/signin", userRoutes.auth);
app.get("/api/me", userRoutes.authMe);

app.get("/api/services", servicesRoutes.get);
app.get("/api/staff", staffRoutes.get);
/* ***users *** */
app.post("/api/users", userRoutes.create);

module.exports = app;
