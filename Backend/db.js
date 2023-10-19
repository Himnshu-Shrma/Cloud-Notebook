// Connecting to mongo

const mongoose= require('mongoose')
const mongoURL="mongodb://0.0.0.0:27017/iNotebook"
mongoose.set("strictQuery", false);
connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("Connected to Mongo");
    })
}
// Now we need to export the function
module.exports=connectToMongo;
