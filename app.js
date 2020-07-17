
// create an express app
const express = require("express")

//import express from 'express';
const app = express()
module.exports = app;
// use the express-static middleware
app.use(express.static("src/covid19"))

// define the first route
app.get("/", function (req, res) {
    res.send("<h1>Covid-19 in Basque Country</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));
