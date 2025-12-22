require("dotenv").config();

const express = require("express");
const process = require("process");
const cors = require("cors");

const connectDB = require("./config/db");
const ScheduledJob = require("./service/scheduledJob");

const { errorMiddleware } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT;
const app = express();

//MongoDB connect
connectDB();
ScheduledJob();

app.use(cors());

app.use(
  cors({
    origin: ["http://localhost", "http://localhost:80", "http://frontend"],
    credentials: true,
  })
);

//req - parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/hall", require("./routes/hallRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));

//middlewares
app.use(errorMiddleware);

app.use("/", (req, res) => {
  res.send("API is running....");
});

app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});
