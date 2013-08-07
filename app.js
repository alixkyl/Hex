var   express = require('express')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, port = process.env.PORT || 3000;
	
// var mongoose = require('mongoose');
	// mongoose.connect('mongodb://localhost/test');
	// var db = mongoose.connection;
	


app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// var HexSchema = mongoose.Schema({
		// _id: String
		// ,name: String
		// ,r: Number
		// ,q: Number
		// ,heigh: Number
		// ,moist: Number
		// })
		
		// var Hex = mongoose.model('Hex', HexSchema)
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
	// if (!module.parent) {
	  // server.listen(port)
	// }
	// console.log("open");
	
	// // for(h in mapData)
		// // mapData[h].save();
	// });

if (!module.parent) {
	  server.listen(port)
	}
	
var hexlib=require('./server/hex_lib.js');

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	// Hex.find({ }, function (err, hexes){
			// if (err) // TODO handle err
			// console.log("error")
			// else
			  // socket.emit('data', { h: hexes });
		// })
	var mapData= hexlib.generateMap(50,10,1,0);
	socket.emit('data', { h: mapData });

});

app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	
