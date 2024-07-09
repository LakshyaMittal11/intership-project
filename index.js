const express = require("express");
const port = process.env.PORT || 5000;
const db = require("./router/database-config")
const app = express(); 

app.use("/js",express.static(__dirname+"/public/js"));
console.log(__dirname);
app.use("/css",express.static(__dirname+"/public/css"));

app.use("/", require("./router/routes"));
db.connect((err)=>{
    if(err) throw err
    console.log("DATAbase is connected ");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
