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
	
var hexlib=require('./server/Hexgenerator.js');

delta={q:0,r:0}
				
mapData=generateMap(200,1,25,0.05,delta);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	// Hex.find({ }, function (err, hexes){
			// if (err) // TODO handle err
			// console.log("error")
			// else
			  // socket.emit('data', { h: hexes });
		// })
	//
	localData={};
	N=3
	for(r=-N;r<=N;r++)
	{
		for(q=Math.max(-N, -r-N);q<=Math.min(N, -r+N);q++)
		{
			if(mapData[(r+delta.r)+"_"+(q+delta.q)]==undefined)
				continue;
			var tmp=mapData[(r+delta.r)+"_"+(q+delta.q)];
			
			localData[r+"_"+q]={_id:tmp._id, name: tmp.name, r:r,q:q,height:tmp.height,moist:tmp.moist }
			console.log(localData[r+"_"+q])
	
		}
	}
	// socket.emit('data',  mapData );
	socket.emit('data',  localData );
	socket.on('move',function (data) {
		console.log("move "+data.r+" "+data.q)
		delta.r += data.r/1;
		delta.q += data.q/1;
		localData={};
		N=3
		for(r=-N;r<=N;r++)
		{
			for(q=Math.max(-N, -r-N);q<=Math.min(N, -r+N);q++)
			{
				if(mapData[(r+delta.r)+"_"+(q+delta.q)]==undefined)
					continue;
				var tmp=mapData[(r+delta.r)+"_"+(q+delta.q)];
				
				localData[r+"_"+q]={_id:tmp._id, name: tmp.name, r:r,q:q,height:tmp.height,moist:tmp.moist }
				console.log(localData[r+"_"+q])
		
			}
		}
		socket.emit('maj',  localData );
	});
});

app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	
