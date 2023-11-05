import mongoose from "mongoose";

const connectDB = (url) =>
{
    // useful when we will work with search functionlity latah.
    mongoose.set('strictQuery', true)
    
    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err))
}


export default connectDB