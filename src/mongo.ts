import config from "config";
import mongoose from "mongoose";


const mongoUri=config.get<string>('mongo.uri');
const connection= mongoose.createConnection(mongoUri);
connection.on('connected',()=>{
    console.log('mongo connected....');
});

export const Mongo= connection;