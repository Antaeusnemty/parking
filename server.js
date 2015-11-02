var express = require("express");
var server = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var Schema = mongoose.Schema;
var spotSchema = new Schema({
    latitude: Number,
    longitude: Number,
    available: Boolean,
});

mongoose.connect("mongodb://localhost/spotDB");

var Spot = mongoose.model('Spot', spotSchema);

server.use(express.static(__dirname+""));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get("/", function(req, res){
  res.sendFile("index.html");

});

server.post("/api/spots", function(req, res){
  console.log(req.body);
 var spot = new Spot({
   latitude: req.body.latitude.toFixed(1),
   longitude: req.body.longitude.toFixed(1),
   available: req.body.available,
 });
 spot.save(function(err){
   if(err) console.error(err);

   console.log(spot);
   res.json(spot);
 });
});

server.get("/api/spots", function(req,res){
  Spot.find({}, function(err, spots){
    if(err) res.json({error: err});

    res.json(spots);
  });
});

server.get('/api/spots/:id', function (req, res){
    Spot.find({_id:req.params.id}, function (err, spot){
          if(err) res.json({error: err});

          res.json(spot);
  });
});
server.get('/api/spots/:lat/:lon', function (req, res) {
    Spot.find({latitude:req.params.lat.toFixed(1), longitude:req.params.lon.toFixed(1)}, function(err, spot){
          if(err) res.json({error: err});

          res.json(spot);
    });
})

server.put('/api/spots/:id', function (req, res){
  Spot.findOneAndUpdate({_id: req.params.id}, {available: req.body.available} ,function(err, spot){
    if(err) throw err;

    res.json({message: "spot availability updated"});
  });
});

server.put('/api/spots/:lat/:lon', function(req, res){
    Spot.findOneAndUpdate({latitude: req.params.lat, longitude: req.params.lon}, {available: req.body.available} ,function(err, spot){
        if(err) throw err;

        res.json({message: 'updated!'});
    });
});

server.listen(3030, function(){
    console.log("Now listening on port 3030");
});
