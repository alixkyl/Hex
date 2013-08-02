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

io.sockets.on('connection', function (socket) {
	Hex.find({ }, function (err, hexes){
			if (err) // TODO handle err
			console.log("error")
			else
			  socket.emit('data', { h: hexes });
		})
  
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});
	
var HexSchema = mongoose.Schema({
		name: String
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
	  console.log("open")
	  
		
		// for(i=0;i<10;i++)
			// for(j=0;j<10;j++)
			// {
				// var r= i ;
				// var q = j - Math.floor(i/2);
				// var h = new Hex({ name: r+"_"+q, r:r,q:q,type:2 })
				// h.save();
			// }
		
	});