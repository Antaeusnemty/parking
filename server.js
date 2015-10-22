var express = require("express");
var server = express();

server.use(express.static(__dirname+""));

server.get("/", function(req, res){
  res.sendFile("index.html");

});
server.listen(3030, function(){
    console.log("Now listening on port 3030");
});
