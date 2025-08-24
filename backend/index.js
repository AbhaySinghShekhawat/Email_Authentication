let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");

require("dotenv").config();

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);

app.use(cookieParser());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
