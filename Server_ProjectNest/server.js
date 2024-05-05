const { default: mongoose } = require("mongoose");
console.log(process.env.NODE_ENV);

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => {
    console.log(err.message);
  });
