const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/user.routes");
const PORT = process.env.PORT || 8000;
require("./db/connection");

app.use(express.json({limit:'50mb'}));

app.use("/",userRoute);

app.listen(PORT,()=>{
  console.log(`Server is running on port:${PORT}`);
});
