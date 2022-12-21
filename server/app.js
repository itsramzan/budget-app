// Import essential modules
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import database connection function
import dbConnection from "./config/dbConnection.js";

// Import essential routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import budgetRoute from "./routes/budgetRoute.js";

// Import notFound & errorHandling middlewares
import notFound from "./middlewares/notFound.js";
import errorHandling from "./middlewares/errorHandling.js";

// Invoke config function
config();

// Establish database connection
dbConnection();

// Initialize app
const app = express();

// Enable cors
app.use(cors({ origin: true, credentials: true }));

// Parse cookies
app.use(cookieParser());

// Parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use essential routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/budget", budgetRoute);

// Not found & error handling middlewares
app.use(notFound);
app.use(errorHandling);

// Listening to app
app.listen(process.env.PORT, (err) => {
  if (!err)
    console.log(`Server successfully running at port - ${process.env.PORT}`);
});
