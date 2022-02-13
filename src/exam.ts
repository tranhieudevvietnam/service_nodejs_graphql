import { MovieModel } from "./movie.model";
import moment from "moment";

async function run() {
  const result = await MovieModel.findOneAndUpdate(
    {
      name: "Titanic",
    },
    { $set: { name: "Titanic 2" } },
    { new: true }
  );
  console.log("result", result);
}

export default run;
