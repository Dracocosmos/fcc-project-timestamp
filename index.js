// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// api endpoint 
app.get("/api/:date?", function(req, res) {
  let reqDate = req.params.date

  dateO = reqDate == undefined
    // if date parameter empty
    ? new Date()
    // if date is in a date format
    : new Date(reqDate)

  // if date is in unix format
  dateO = isNaN(dateO)
    ? new Date(+reqDate)
    : dateO

  // if date still invalid
  dateO = isNaN(dateO)
    ? res.json({ error: "Invalid Date" })
    : dateO

  // console.log(dateO)
  const returnO = {
    unix: Date.parse(dateO.toISOString()),
    utc: dateO.toUTCString(),
  }

  res.json({ unix: returnO.unix, utc: returnO.utc });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
