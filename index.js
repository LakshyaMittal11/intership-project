const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./router/database-config");

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); 
  } else {
    console.log("Database is connected");
  }
});

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));

app.use("/", require("./router/routes"));
app.use("/api", require("./controller/auth"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});