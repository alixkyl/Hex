var Alea = require('alea');
var SimplexNoise = require('simplex-noise');
var verb=require('./verb.js');


/**
*HexMapGenerator
*/
module.exports.generate = function(options){
	console.time("generation");
	console.log("options:",options);
	var island=[
		[-0.5,-0.5,-0.5,-0.5,-0.5],
		[-0.5, 0, 0, 0,-0.5],
		[-0.5, 0, 1, 0,-0.5],
		[-0.5, 0, 0, 0,-0.5],
		[-0.5,-0.5,-0.5,-0.5,-0.5]
	];
	var cornerLL=[
		[-1,-1,-1,-1,1],
		[-1,-1,-1,-1,1],
		[1,1,-1,-1,1],
		[1,1,1,-1,1],
		[1,1,1,-1,1]
	];
	var cornerUL=[
		[1,1,1,-1,1],
		[1,1,1,-1,1],
		[1,1,1,-1,1],
		[1,1,-1,-1,1],
		[-1,-1,-1,-1,1]
	];
	var cornerUR=[
		[-1,1,1,1,1],
		[-1,1,1,1,1],
		[-1,1,1,1,1],
		[-1,-1,1,1,1],
		[-1,-1,-1,-1,1]
	];
	var cornerLR=[
		[-1,-1,-1,-1,1],
		[-1,-1,-1,-1,1],
		[-1,-1,1,1,1],
		[-1,1,1,1,1],
		[-1,1,1,1,1]
	];
	var profile =[ 
		[island,island,island,island],
		[island,island,island,island],
		[island,island,island,island],
		[island,island,island,island]
	];
	var width = options.width || 100;
	var height = options.height || 100;
	var landSea = options.landSea || 0;
	var seed = options.seed || 0;
	var patchSize = options.patchSize || 10;
	var noiseImpact = options.noiseImpact || 0;
	var degree = options.degree || 3;
	console.log("init:", width, height, seed, landSea, patchSize, noiseImpact, degree);
	
	var mapData=[];
	var nurbs = [];
	
	var presetProfile=[];
	/**
	*generatePresetProfile
	*/
	function generatePresetProfile(){
		var coef=[];
		for(var i=0;i<profile.length;i++){
			for(var j=0;j<profile[i].length;j++){
				var p = profile[j][i];
				for(var x=0; x<5;x++){
					if(!presetProfile[i*4+x]){
						coef[i*4+x]=[];
						presetProfile[i*4+x]=[];
					}
					for(var y = 0; y < 5; y++){
						if(!presetProfile[i*4+x][j*4+y]){
							coef[i*4+x][j*4+y] = 1;
							presetProfile[i*4+x][j*4+y] = p[y][x];
						}else{
							coef[i*4+x][j*4+y]++;
							presetProfile[i*4+x][j*4+y] += p[y][x];
						}
					}
				}
			}
		}
		for(var i=0;i<coef.length;i++){
			for(var j=0;j<coef[i].length;j++){
				presetProfile[i][j]=presetProfile[i][j]/coef[i][j];
			}
		}
	}
	
    var simplex = new SimplexNoise(new Alea(seed));
	function simplexPatchKnot(x,y){
		return simplex.noise2D(x, y);
	}
	function presetPatchKnot(x,y){
		return presetProfile[x][y];
	}
	/**
	*nurbsGenerator
	*/
	function nurbsGenerator(x,y,p,func){
		var controlPoints = [
			[
				[0, func(4*x, 4*y), 0],
				[0, func(4*x, 4*y+p), 1],
				[0, func(4*x, 4*y+2*p), 2],
				[0, func(4*x, 4*y+3*p), 3],
				[0, func(4*x, 4*y+4*p), 4]
			],
			[
				[1, func(4*x+p, 4*y), 0],
				[1, func(4*x+p, 4*y+p), 1],
				[1, func(4*x+p, 4*y+2*p), 2],
				[1, func(4*x+p, 4*y+3*p), 3],
				[1, func(4*x+p, 4*y+4*p), 4]
			],
			[
				[2, func(4*x+2*p, 4*y), 0],
				[2, func(4*x+2*p, 4*y+p), 1],
				[2, func(4*x+2*p, 4*y+2*p), 2],
				[2, func(4*x+2*p, 4*y+3*p), 3],
				[2, func(4*x+2*p, 4*y+4*p), 4]
			],
			[
				[3, func(4*x+3*p, 4*y), 0],
				[3, func(4*x+3*p, 4*y+p), 1],
				[3, func(4*x+3*p, 4*y+2*p), 2],
				[3, func(4*x+3*p, 4*y+3*p), 3],
				[3, func(4*x+3*p, 4*y+4*p), 4]
			],
			[
				[4, func(4*x+4*p, 4*y), 0],
				[4, func(4*x+4*p, 4*y+p), 1],
				[4, func(4*x+4*p, 4*y+2*p), 2],
				[4, func(4*x+4*p, 4*y+3*p), 3],
				[4, func(4*x+4*p, 4*y+4*p), 4]
			]
		];
		
		var degree = 3;
		var knots = [0, 0, 0, 0, 0.5, 1, 1, 1, 1];
		try{
			var nurbsSurface = new verb.geom.NurbsSurface.byKnotsControlPointsWeights( degree, degree, knots, knots, controlPoints);
		}catch(e){
			console.log(e);
		}
		return function(u, v) {
			return nurbsSurface.point(u, v);
		};
	}
	
	/**
	*getNurbsFunction
	*/
	function getNurbsFunction(d,w,h){
		if(!nurbs[d]){nurbs[d]=[];}
		if(!nurbs[d][w]){nurbs[d][w]=[];}
		if(!nurbs[d][w][h]){
			if(d>0){
				var p = Math.pow(2, d);
				nurbs[d][w][h] = nurbsGenerator(w*p,h*p,p,simplexPatchKnot);
			}else{
				nurbs[d][w][h] = nurbsGenerator(w,h,1,presetPatchKnot)
			}
		}
		return nurbs[d][w][h];
	}
	
	/**
	*getHeight
	*/
	function getHeight(hex){
		var w = Math.floor(hex.j/PatchWidth);
		var h = Math.floor(hex.i/PatchHeight);
		var result=getNurbsFunction(0,w,h)((hex.j-w*PatchWidth)/PatchWidth,(hex.i-h*PatchHeight)/PatchHeight)[1];
		for(var d = 1; d < degree; d++){
			
			var impact = 1/Math.pow(2,d);
			
			var size = patchSize*Math.pow(2,degree-d);

			w = Math.floor(hex.j/size);
			h = Math.floor(hex.i/size);
			
			result+=getNurbsFunction(d,w,h)((hex.j-w*size)/size,(hex.i-h*size)/size)[1];
		}
		return Math.max(-1,Math.min(1,result));
	}
	
	var PatchWidth = Math.floor(width/profile[0].length);
	var PatchHeight = Math.floor(height/profile.length);
	
    var hex;
	generatePresetProfile();
	for(var i=0;i<height;i++)
	{
		for(var j=0;j<width;j++)
		{
			var r= i ;
			var q = j - Math.floor(i/2);
			hex = {i:i,j:j,r:r,q:q};
			var h = getHeight(hex);
			var variation = simplex.noise2D(hex.r,hex.q)*noiseImpact;
			 hex.height = h+variation+landSea;
			hex.altitude = h;
			mapData.push(hex);
		}
	}	
	console.timeEnd("generation");
	return mapData;
};