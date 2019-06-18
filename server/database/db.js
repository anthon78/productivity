const MongoClient = require("mongodb").MongoClient;

//'mongodb://localhost:27017/taskData'
const CONNECTION_URL = process.env.MONGO_URI;
const DATABASE_NAME = 'taskData';

module.exports.getAllAccepted = (callback) => {
  MongoClient.connect(CONNECTION_URL, {useNewURLParser: true}, (error,client) => {
    if (error) {
      callback(error);
    } else {
      database = client.db(DATABASE_NAME);
      collection = database.collection('acceptedTasks');
      collection.find({}).toArray((err,tasks) => {
        if (err) {
          callback(err);
        } else {
          callback(null,tasks);
        }
      })
    }
  })
}

module.exports.addToAccepted = (task,callback) => {
  MongoClient.connect(CONNECTION_URL, {useNewURLParser: true}, (error,client) => {
    if (error) {
      callback(error);
    } else {
      database = client.db(DATABASE_NAME);
      collection = database.collection("acceptedTasks");
      collection.insertOne(task, (err,result) => {
        if (err) {
          callback(err);
        } else {
          callback(null,result);
        }
      })
    }
  })
}