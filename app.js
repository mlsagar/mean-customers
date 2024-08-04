require("dotenv").config;
require("./data/database-connection");

const express = require("express");
const routes = require("./routes");
const application = express();

application.use(express.json());
application.use(express.urlencoded({extended: true}));

application.use("/api", (request, response, next)=> {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    response.setHeader("Access-Control-Allow-Methods", "PATCH");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    next();
})

application.use("/api", routes);

application.listen(3000, console.log("Application listening at port", 3000))