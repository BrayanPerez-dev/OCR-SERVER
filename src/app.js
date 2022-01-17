import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import documentRoute from "./routes/document.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import morgan from "morgan";
const app = express();

app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the server scanner intellityc",
    name: "server",
    description: "Server API-REST",
    author: "technosal",
  });
});

app.use("/api/document", documentRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

export default app;
