var Alea = require('alea');
var SimplexNoise = require('simplex-noise');
var THREE = require('three');
global.THREE=THREE;
require('./NURBSSurface.js');


/**
*HexMapGenerator
*/
module.exports.generate = function(options){
	console.log("options:",options);
	var width = options.width || 100;
	var height = options.height || 100;
	var landSea = options.landSea || 0.1;
	var seed = options.seed || 0;
	var patchSize = options.patchSize || 10;
	var noiseImpact = options.noiseImpact || 0.05;
	var degree = options.degree || 4;
	console.log("init:", width, height, seed, landSea, patchSize, noiseImpact, degree);
	
	var mapData=[];
	var nurbs = [];
    simplex = new SimplexNoise(new Alea(seed));
	
	/**
	*nurbsGenerator
	*/
	function nurbsGenerator(x,y,size){
		var nsControlPoints = [
			[
				new THREE.Vector4 ( 0, simplex.noise2D(x, y), 0, 1 ),
				new THREE.Vector4 ( 0, simplex.noise2D(x, y+size/2), 5, 1 ),
				new THREE.Vector4 ( 0, simplex.noise2D(x, y+size), 10, 1 )
			],
			[
				new THREE.Vector4 ( 5, simplex.noise2D(x+size/2, y), 0, 1 ),
				new THREE.Vector4 ( 5, simplex.noise2D(x+size/2, y+size/2), 5, 1 ),
				new THREE.Vector4 ( 5, simplex.noise2D(x+size/2, y+size), 10, 1 )
			],
			[
				new THREE.Vector4 ( 10, simplex.noise2D(x+size, y), 0, 1 ),
				new THREE.Vector4 ( 10, simplex.noise2D(x+size, y+size/2), 5, 1 ),
				new THREE.Vector4 ( 10, simplex.noise2D(x+size, y+size), 10, 1 )
			]
		];
		var degree1 = 2;
		var degree2 = 2;
		var knots1 = [0, 0, 0, 1, 1, 1];
		var knots2 = [0, 0, 0, 1, 1, 1];
		var nurbsSurface = new THREE.NURBSSurface(degree1, degree2, knots1, knots2, nsControlPoints);

		return function(u, v) {
			return nurbsSurface.getPoint(u, v);
		};
	}
	/**
	*getNurbsFunction
	*/
	function getNurbsFunction(d,w,h){
		if(!nurbs[d]){nurbs[d]=[];}
		if(!nurbs[d][w]){nurbs[d][w]=[];}
		if(!nurbs[d][w][h]){
			nurbs[d][w][h] = nurbsGenerator(w*Math.pow(2, degree - d),h*Math.pow(2, degree - d),Math.pow(2, degree - d));
		}
		return nurbs[d][w][h];
	}

	/**
	*getHeight
	*/
	function getHeight(hex){
		var result = 0;
		for(var d = 1; d <= degree; d++){
			var size = patchSize*Math.pow(2,d-1);
			var w = Math.floor(hex.r/size);
			var h = Math.floor(hex.q/size);
			var impact = d/degree;
			result+=getNurbsFunction(d,w,h)((hex.r-w*size)/size,(hex.q-h*size)/size).y*impact;
		}
		return result;
	}
	
	var nbPatchInWidth = Math.ceil(width/(patchSize*Math.pow(2,degree-1)));
	var nbPatchInHeight = Math.ceil(height/(patchSize*Math.pow(2,degree-1)));

    var hex;
	for(var i=0;i<height;i++)
	{
		for(var j=0;j<width;j++)
		{
			var r= i ;
			var q = j - Math.floor(i/2);
			hex = {r:r,q:q};
			var h = getHeight(hex);
			var variation = simplex.noise2D(hex.r,hex.q)*noiseImpact+landSea;
			hex.height = h+variation;
			mapData.push(hex);
		}
	}	
	console.log('end: ',mapData.length);
	return mapData;
};