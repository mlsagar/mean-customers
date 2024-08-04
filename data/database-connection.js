const mongoose = require("mongoose");
require("./customer-model");
mongoose.connect("mongodb://localhost:27017/meanCustomers")

mongoose.connection.on("connected", () => console.log("Mongoose Connected"));
mongoose.connection.on("disconnected", () => console.log("Mongoose disConnected"));
mongoose.connection.on("error", (error) => console.log("Mongoose error", error));

process.on("SIGINT", ()=> {
    mongoose.connection.close().then(()=> {
        console.log("Process interrupted");
        process.exit(0);
    })
})