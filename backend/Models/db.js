const mongoose=require("mongoose");
const mongo_url=process.env.mongo_url;
mongoose.connect(mongo_url)
  .then(()=>{
    console.log("MongoDB connected");
  }).catch((err)=>{
    console.log("MongoDB Connection Error",err);
  })