const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASENAME}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((response)=>{
    console.log("database connected successfully !!");
}).catch((error)=>{
    console.log(`Error in mongo db databse:${error}`);
});