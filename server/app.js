import express from "express";
import connectDB from "./db/connectDB.js";
import AdminRoutes from "./routes/admin.route.js";
import UserRoutes from "./routes/teamspace.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Auth from "./middleware/Auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", AdminRoutes);
app.use("/api", Auth,UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
