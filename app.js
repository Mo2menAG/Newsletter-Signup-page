const express = require("express")
const request = require("request")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

// parse the body of the post request
app.use(bodyParser.urlencoded({extended: true}))

// to make our local files accessiable by server
app.use(express.static("puplic"))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    var firstName = req.body.first
    var secondName = req.body.second
    var email = req.body.email
    console.log(secondName);
})

app.listen(3000, function(){
  console.log("Server is runing at port 3000");
})
