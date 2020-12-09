import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";// dotenv is to read from a .env file that'll store your environment variables like PORT or MONGODB URL
//to enable es6 import syntax isntead of the 'require(package)' syntax, go to the package.json & enter 'type': 'module'
// also, for nodemon, you do a script in package.json like this: "start": "nodemon index.js"

import postRoutes from "./routes/posts.js"; //have to include '.js' extension here

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes); // the posts homepage'll be localhost:8000/posts
app.get('/', (req, res) => {
  res.send('Hello memories api')// this is something we'll see on the actual deployed version
})

//https://www.mongodb.com/cloud/atlas
// const CONNECTION_URL =
//   "mongodb+srv://Raul1234:Raul1234@raulbarriga.cnx2s.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;// heroku's gonna populate the PORT so we take it out from the server.js file

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
