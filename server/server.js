const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/connectDB");
const UserRouter = require("./src/routes/user.route");
const parityRoute = require("./src/routes/parity.route");
const userBetRoute = require("./src/routes/userBetRoute");
const initSocket = require("./src/utils/timmer");

connectDB();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", UserRouter);
app.use("/api", parityRoute);
app.use("/api", userBetRoute);

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

initSocket(server);