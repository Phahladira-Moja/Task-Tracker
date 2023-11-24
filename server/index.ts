import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import express, { Request, Response, Application } from "express";

const authRouter = require("./routes/auth_routes");
const tasksRouter = require("./routes/tasks_routes");

//For env File
dotenv.config();

const app: Application = express();

// parse application/json
app.use(bodyParser.json());

// Add middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update with the allowed origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use Helmet!
app.use(helmet());

// Use Morgan!
app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  legacyHeaders: false,
  message: "You have exceeded your 20 requests per 5 minute limit.",
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/v1/users", authRouter);
app.use("/api/v1/tasks", tasksRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
