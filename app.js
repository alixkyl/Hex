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
function generateMap(size,seed,smoothstep,pass){
	
	var mapData={};
	
	function getNeighbor(r,q,direction){
		neighbors =  [
			[+1,  0],  [+1, -1],  [ 0, -1],
			[-1,  0],  [-1, +1],  [ 0, +1] 
		] 
		d = neighbors[direction]
		return mapData[(r + d[0])+"_"+(q + d[1])]
	}
	function getNeighbors(h){
		var neighbors=[];
			for(i=0;i<6;i++){
				var n=getNeighbor(h.r,h.q,i);
				if(n)
					neighbors[i]=n;
			}
		return neighbors;
	}
	
	var SimplexNoise = require('simplex-noise'),
    simplexHeight = new SimplexNoise(function(){return 0.2;}),
	simplexwater = new SimplexNoise(Math.random);
    
	for(i=0;i<size;i++)
	{
		for(j=0;j<size;j++)
		{
			var r= i ;
			var q = j - Math.floor(i/2);
			mapData[r+"_"+q] = {_id: r+"_"+q, name: r+"_"+q, r:r,q:q,heigh:0,moist:0 }
		}
	}
	console.log("initGeneration");
	var land=0.5;
	var sea=0.5;
	var stepMap={};
	
	for(h in mapData) {
		var x = Math.sqrt(3) * (mapData[h].q + mapData[h].r/2);
		var y = 3/2 * mapData[h].r;
		var r1=simplexHeight.noise2D(x, y);
		e=r1;
		var r2=simplexwater.noise2D(x, y);
		w=r2;
		
		stepMap[h]={elevation:e, humidity:w};
	}
	console.log("step1");
	
	if(smoothstep){
		var tmpStepMap1={};
		for(h in mapData) {
			neighbors=getNeighbors(mapData[h]);
				var valid=0;
				var totalE=0;
				var totalH=0;
				if(!tmpStepMap1[h])
					tmpStepMap1[h]={};
				for(n in neighbors)
				{
					if(tmpStepMap1[neighbors[n].name]){
						totalE+=tmpStepMap1[neighbors[n].name].elevation;
						totalH+=tmpStepMap1[neighbors[n].name].humidity;
						valid++;
					}
				}
				if(valid){
					totalE/=valid;
					totalH/=valid;
				}
				totalE+=stepMap[h].elevation;
				totalH=Math.min(totalH+stepMap[h].humidity*stepMap[h].humidity,1-totalE);
			tmpStepMap1[h]={elevation:totalE, humidity:totalH};
		}
		stepMap=tmpStepMap1;
	}
	console.log("step2");
	
	for(p=0;p<pass;p++){
		var tmpStepMap2={};
		console.log("step2:"+p);
		for(h in stepMap) {
			neighbors=getNeighbors(mapData[h]);
			var working={}
			var total=0;
			if(!tmpStepMap2[h])
				tmpStepMap2[h]={elevation:0,humidity:0};
			for(n in neighbors)
			{
				if(!tmpStepMap2[neighbors[n].name])
					tmpStepMap2[neighbors[n].name]={elevation:0,humidity:0};
				working[n]=stepMap[h].elevation+stepMap[h].humidity-stepMap[neighbors[n].name].elevation;
				total+=working[n];
			}
			var m=stepMap[h].humidity;
			for(n in neighbors)
			{
				var v=Math.min(stepMap[h].elevation+stepMap[h].humidity-stepMap[neighbors[n].name].elevation,stepMap[h].humidity*working[n]/total);
				m-=v;
				tmpStepMap2[neighbors[n].name].humidity=Math.min(tmpStepMap2[neighbors[n].name].humidity+v,1);
			}
			tmpStepMap2[h].humidity=Math.min(tmpStepMap2[h].humidity+m,1);
		}
		for(h in stepMap) {
			if(stepMap[h].elevation>0)
			{
				if(tmpStepMap2[h].humidity>1-stepMap[h].elevation){
					tmpStepMap2[h].elevation=(tmpStepMap2[h].humidity-(1-stepMap[h].elevation))*0.01;
					tmpStepMap2[h].humidity=Math.min(tmpStepMap2[h].humidity,1-stepMap[h].elevation)
				}
			}
			else
			{
				tmpStepMap2[h].elevation=Math.max(-10,-tmpStepMap2[h].humidity);
			}
		}
		stepMap=tmpStepMap2;
	}
	console.log("Finalstep");
	for(h in mapData) {
		mapData[h].heigh=Math.floor(stepMap[h].elevation);
		mapData[h].moist=Math.floor(stepMap[h].humidity);
	}
	console.log("open");
	return mapData;
}
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	// Hex.find({ }, function (err, hexes){
			// if (err) // TODO handle err
			// console.log("error")
			// else
			  // socket.emit('data', { h: hexes });
		// })
	var mapData= generateMap(50,10,1,0);
	socket.emit('data', { h: mapData });

});

app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	
