//imports
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
const db = require('./database/db.js')
const port = process.env.PORT;


//middlewear
app.use(bodyparser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public/')));

//routes
app.get('/api/acceptedTasks', (req,res) => {
  db.getAll((err,tasks) => {
    if (err) {
      console.log("Error retrieving accepted tasks", err);
    } else {
      res.send(tasks);
    }
  })
})

app.post('/api/acceptedTasks', (req,res) => {
  let task = req.body;
  db.addTask(task,(err,tasks) => {
    if (err) {
      console.log("Error retrieving accepted tasks", err);
    } else {
      res.send(tasks);
    }
  })
})

//listen
app.listen(port, console.log(`listening on port ${port}`))
