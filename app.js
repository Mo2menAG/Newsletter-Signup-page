const express = require("express")
const request = require("request")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

// parse the body of the post request
app.use(bodyParser.urlencoded({
  extended: true
}))

// to make our local files accessiable by server
app.use(express.static("puplic"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.first
  const lastName = req.body.second
  const email = req.body.email
  console.log(lastName);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data)

  const url = "https://us1.api.mailchimp.com/3.0/lists/7ac549c15b"
  const options = {
    method: "POST",
    auth: "Moamen:0e16481843dc649beba700fa79023abb-us1"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      response.on("data", function(data) {
        console.log(JSON.parse(data));
      })
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failier.html")
    }

  })

  request.write(jsonData)
  request.end()

})

app.post("/failier", function(req, res){
  console.log("xx");
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is runing at port 3000");
})

// api key
// d3942e7cee84dad9b6304ae7d8243fd9-us1

// list
// 7ac549c15b

// https://mandrillapp.com/api/1.0/templates/update \
