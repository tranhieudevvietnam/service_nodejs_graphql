// // console.log('hello')

// import config from "config";

// const secret= config.get('secret');
// const number= config.get('number');

// console.log('secret:',secret);
// console.log('number:',number,typeof config.get('number'));


import {Mongo} from './mongo';
import { Schema } from "mongoose";

const UserModel = Mongo.model(
    "User",
    new Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: String, enum: ["male", "female"], default: "male" },
        active: { type: Boolean, default: false },
        age: { type: Number, default: 18 },
        foods: { type: [String], default: [] },
      },
      { timestamps: true }
    )
  );
  async function run() {
    await UserModel.remove({});
  
    await UserModel.insertMany([
      { name: "John", email: "join@gmail.com", password: "123456" },
      { name: "Jane", email: "jane@gmail.com", password: "123456" },
    ]);
  
    const users = await UserModel.find();
    console.log("users", users);
  }

  run()