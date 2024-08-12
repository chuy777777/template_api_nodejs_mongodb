import config from "../config";
import mongoose from "mongoose";

let dbConnection;

module.exports = {
    connectToDb: function (callback) {
        mongoose.createConnection(config.URI_DB_CONNECTION).asPromise().then(conn => {
            dbConnection=conn;
            console.log("Database is connected");
            return callback();
        })
        .catch(err => {
            return callback(err);
        })
    },
    getDbConnection: function () {
      return dbConnection;
    }
}