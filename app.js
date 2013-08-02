// var express = require('express')
	// ,app=express()
	// , server = require('http').createServer(app)
	// , io = require('socket.io').listen(server);
	// var path = require('path')
	// , port = process.env.PORT || 3000;

// // New call to compress content
// app.configure(function() {
	// this.use("/", express.static(__dirname + '/../client/index.html'));
	// this.set('views', path.join(__dirname, 'views'));
	// this.set('view engine', 'ejs');
	// this.use(express.static(path.join(__dirname, '/public')));
	// this.use("/static", express.static(__dirname + '/../client'));
  
	// // Allow parsing cookies from request headers
	// this.use(express.cookieParser());
	// // Session management
	// // Internal session data storage engine, this is the default engine embedded with connect.
	// // Much more can be found as external modules (Redis, Mongo, Mysql, file...). look at "npm search connect session store"  
	// this.sessionStore = new  express.session.MemoryStore({ reapInterval: 10*1000 })
	// this.use(express.session({ 
		// store: this.sessionStore
		// , cookie: {path: '/', httpOnly: true, maxAge:10*1000}
		// , secret: 'topsecret'   
	// }));
	// // Allow parsing form data
	// this.use(express.bodyParser());
// });



var   express = require('express')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	// , path = require('path')
	, port = process.env.PORT || 3000;
	
var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	


app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
var mapData={};
var HexSchema = mongoose.Schema({
		_id: String
		,name: String
		,r: Number
		,q: Number
		,type: Number
		})
		
		var Hex = mongoose.model('Hex', HexSchema)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	if (!module.parent) {
	  server.listen(port)
	}
	console.log("open");
	generateMap(50,10);
	// for(h in mapData)
		// mapData[h].save();
	});

function generateMap(size,seed){
	var SimplexNoise = require('simplex-noise'),
    simplexHeight = new SimplexNoise(Math.random),
	simplexwater = new SimplexNoise(Math.random);
    
	for(i=0;i<size;i++)
	{
		for(j=0;j<size;j++)
		{
			var r= i ;
			var q = j - Math.floor(i/2);
			mapData[r+"_"+q] = new Hex({_id: r+"_"+q, name: r+"_"+q, r:r,q:q,type:2 })
		}
	}
	console.log("initGeneration");
	var land=0.5;
	var sea=0.5;
	var stepMap={};
	for(h in mapData) {
		var x = Math.sqrt(3) * (mapData[h].q + mapData[h].r/2);
		var y = 3/2 * mapData[h].r;
		e=simplexHeight.noise2D(x, y);
		// w=simplexwater.noise2D(mapData[h].r, mapData[h].q);
		stepMap[h]={elevation:e};//, humidity:w};
	}
	// for(h in stepMap) {
		// stepMap[h]={elevation:simplexHeight.noise2D(mapData[h].r, mapData[h].q), humidity:simplexwater.noise2D(mapData[h].r, mapData[h].q)};
	// }
	console.log("Finalstep");
	for(h in mapData) {
		mapData[h].type=Math.floor(stepMap[h].elevation*10);
		console.log(mapData[h].type);
	}
	console.log("open");

}
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	// Hex.find({ }, function (err, hexes){
			// if (err) // TODO handle err
			// console.log("error")
			// else
			  // socket.emit('data', { h: hexes });
		// })
	socket.emit('data', { h: mapData });

});

app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	
