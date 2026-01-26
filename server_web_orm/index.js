import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import path from "path";
import "./entities/associateModel.js";
import auth from "./routes/authRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import tasksRoute from "./routes/tasksRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1", auth);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/projects", projectsRoutes);
app.use("/api/v1/tasks", tasksRoute);

// alow access to images path on server
const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "assets/images")));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
