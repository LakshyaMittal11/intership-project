const express = require("express");
const port = process.env.PORT || 5000;

const app = express(); 

app.use("/js",express.static(__dirname+"/public/js"));
console.log(__dirname);
app.use("/css",express.static(__dirname+"/public/css"));

app.use("/", require("./router/routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
