import mongoose from "mongoose";


 const Connection = async () =>{
    const URL = 'mongodb://localhost:27017/messangerclone'
    try{
        await mongoose.connect(URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log('dataBaseConnected');
    }
    catch(error){
        console.log(error);
    }
}

export default Connection;