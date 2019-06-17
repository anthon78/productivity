//imports
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT;


//middlewear
app.use(bodyparser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public/')));

//routes


//listen
app.listen(port, console.log(`listening on port ${port}`))
