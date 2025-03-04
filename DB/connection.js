import mongoose from 'mongoose';


const connectDB = async ()=>{
    return await mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("connected successfully to DB");
    })
    .catch((error)=>{
        console.log(`error connecting to DB!! ${error.message}`);
    })
}

export default connectDB;