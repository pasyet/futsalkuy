if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
// const port = process.env.PORT || 4001
const routerIndex = require("./routes/index.js");
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", routerIndex);
// app.listen(port, () => console.log('Working port', port))

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app;
