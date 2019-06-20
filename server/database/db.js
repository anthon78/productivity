const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");

//'mongodb://localhost:27017/taskData'
const CONNECTION_URL = process.env.MONGO_URI;
const DATABASE_NAME = 'taskData';
let db;

MongoClient.connect(CONNECTION_URL, {useNewURLParser: true}, (error,client) => {
  if (error) {
    console.log(error);
  } else {
    database = client.db(DATABASE_NAME);
  }
})

module.exports.getAll = (callback) => {
  collection = database.collection('acceptedTasks');
  collection.find({}).toArray((err,tasks) => {
    if (err) {
      callback(err);
    } else {
      callback(null,tasks);
    }
  })
}

module.exports.addTask = (task,callback) => {
  collection = database.collection("acceptedTasks");
  collection.insertOne(task, (err,result) => {
    if (err) {
      callback(err);
    } else {
      callback(null,result);
    }
  })
}

module.exports.deleteTask = (description, callback) => {
  collection = database.collection("acceptedTasks");
  collection.deleteOne({description : description}, (err,result) => {
    if (err) {
      callback(err);
    } else {
      callback(null,result);
    }
  })
}

module.exports.getStats = (callback) => {
  let o_id = new mongo.ObjectId("5d0a53121c9d4400004dba40");
  collection = database.collection("taskStats");
  collection.findOne({_id : o_id}, (err,result) => {
    if (err) {
      callback(err);
    } else {
      callback(null,result);
    }
  })
}

module.exports.setStats = (stats, callback) => {
  let o_id = new mongo.ObjectId("5d0a53121c9d4400004dba40");
  collection = database.collection("taskStats");
  collection.updateOne({_id : o_id},{$inc: {xp:stats.xp, tasksCompleted: 1, rejects: stats.rejects}}, (err,result) => {
    if (err) {
      callback(err);
    } else {
      callback(null,result);
    }
  })
}

