import dotenv from "dotenv";

dotenv.config();

module.exports = {
  secret: "hello-kitty",
  mongo: {
    uri: null,
  },
  number: 123,
  flag: true,
  array: [1, 2, 3],
  object: {
    a: 1,
    b: 2,
  },
};
