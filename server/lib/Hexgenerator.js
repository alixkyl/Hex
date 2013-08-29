var Alea = require('alea')
	,SimplexNoise = require('simplex-noise')
	,THREE = require('three');
(function() {
global.THREE=THREE;
require('./NURBSSurface.js')
var mapData={};
generateMap=function(size,seed,patchSize,noiseImpact){
	
	
	
	
	
    var simplex = new SimplexNoise(new Alea(seed+1));
    var simplexH = new SimplexNoise(new Alea(seed*2));
    
	for(i=0;i<size;i++)
	{
		for(j=0;j<size;j++)
		{
			var r= i ;
			var q = j - Math.floor(i/2);
			mapData[r+"_"+q] = {_id: r+"_"+q, name: r+"_"+q, r:r,q:q,height:0,moist:0 }
		}
	}
	
	
	// N=3
	// for(r=-N;r<=N;r++)
		// for(q=Math.max(-N, -r-N);q<=Math.min(N, -r+N);q++)
		// {
			// mapData[(r+delta.r)+"_"+(q+delta.q)] = {_id:(r+delta.r)+"_"+(q+delta.q), name: (r+delta.r)+"_"+(q+delta.q), r:r+delta.r,q:q+delta.q,heigh:0,moist:0 }
	
	
		// }
	
	console.log("initGeneration");
	var land_sea=0.1;
	var stepMap={};
	
	for(h in mapData) {
		var d=mapData[h];
		var offR = normalize_offset(d.r%3);
		var offQ = normalize_offset(d.q%3);
		var coord = cubic2grid(d.r,d.q);
		var e=0;
		if(offR==0 && offQ==1){
			var coord2 = cubic2grid(d.r,d.q-1);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==0 && offQ==2){
			var coord2 = cubic2grid(d.r,d.q+1);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==1 && offQ==0){
			var coord2 = cubic2grid(d.r-1,d.q);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==1 && offQ==1){
			var coord2 = cubic2grid(d.r-1,d.q-2);
			e=simplex.noise2D(coord2.x, coord2.y);
			coord2 = cubic2grid(d.r+2,d.q-1);
			e+=simplex.noise2D(coord2.x, coord2.y);
			coord2 = cubic2grid(d.r-1,d.q+2);
			e+=simplex.noise2D(coord2.x, coord2.y);
			e/=3;
		}else if(offR==1 && offQ==2){
			var coord2 = cubic2grid(d.r-1,d.q+1);
			e=0.8*simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==2 && offQ==0){
			var coord2 = cubic2grid(d.r+1,d.q);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==2 && offQ==1){
			var coord2 = cubic2grid(d.r+1,d.q-1);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==2 && offQ==2){
			var coord2 = cubic2grid(d.r-1,d.q+1);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==0 && offQ==0){
			var coord2 = cubic2grid(d.r,d.q);
			e=simplex.noise2D(coord2.x, coord2.y);
		}
		
		var p2=100;
		var fh=nurbsGenerator(function(rfx,rfy){
			var dfy=0;
			
			if(d.r<0)
				dfy=d.r-(p2-Math.abs(d.r%p2));
			else
				dfy=d.r-Math.abs(d.r%p2);
				
			var dfx=0;
			if(d.q<0)
				dfx=d.q-(p2-Math.abs(d.q%p2));
			else
				dfx=d.q-Math.abs(d.q%p2);
			dr=0/1;
			dq=0/1;
			
			if(rfx==1)
				dq = p2/2;
			else if(rfx==2)
				dq = p2/1;
				
			if(rfy==1)
				dr = p2/2;
			else if(rfy==2)
				dr = p2/1;
				
			vr = dfy + dr;
			vq = dfx + dq;
			
			var co = cubic2grid(vr,vq);
			
			return simplex.noise2D(co.x, co.y);
		});
		
		var dcr=0;
		if(d.r<0)
			dcr=(p2-Math.abs(d.r%p2))/p2;
		else
			dcr=Math.abs(d.r%p2)/p2;
			
		var dcq=0;
		if(d.q<0)
			dcq=(p2-Math.abs(d.q%p2))/p2;
		else
			dcq=Math.abs(d.q%p2)/p2;
		coefH=fh(dcq,dcr);
		stepMap[h]={elevation:makeHexVariation(d,seed,patchSize,3)+e*noiseImpact+land_sea,humidity:coefH.y};
	}
	console.log("step1");
	

	console.log("step2");
	console.log("Finalstep");
	for(h in mapData) {
		mapData[h].height=Math.floor(stepMap[h].elevation*10);
		mapData[h].moist=Math.floor(stepMap[h].humidity*10);
	}
	console.log("open");
	return mapData;
}
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

function normalize_offset(o){
	if(o == -2)
		return 1;
	if(o == -1)
		return 2;
	return o;
}

function cubic2grid(r,q){
	var x = Math.sqrt(3) * (q + r/2);
	var y = 3/2 * r;
	return {x:x,y:y};
}

function makeHexVariation(hex, seed, patchSize, degree){
	result=0;
	for(i=1;i<=degree;i++){
		var simplex = new SimplexNoise(new Alea(seed*i));
		patch=patchSize*Math.pow(2,i-1);
		var fh=nurbsGenerator(function(rfx,rfy){
			var dfy=0;
			
			if(hex.r<0)
				dfy=hex.r-(patch-Math.abs(hex.r%patch));
			else
				dfy=hex.r-Math.abs(hex.r%patch);
				
			var dfx=0;
			if(hex.q<0)
				dfx=hex.q-(patch-Math.abs(hex.q%patch));
			else
				dfx=hex.q-Math.abs(hex.q%patch);
			dr=0/1;
			dq=0/1;
			
			if(rfx==1)
				dq = patch/2;
			else if(rfx==2)
				dq = patch/1;
				
			if(rfy==1)
				dr = patch/2;
			else if(rfy==2)
				dr = patch/1;
				
			vr = dfy + dr;
			vq = dfx + dq;
			
			var co = cubic2grid(vr,vq);
			
			return simplex.noise2D(co.x, co.y);
		});
		var dcr=0;
		if(hex.r<0)
			dcr=(patch-Math.abs(hex.r%patch))/patch;
		else
			dcr=Math.abs(hex.r%patch)/patch;
			
		var dcq=0;
		if(hex.q<0)
			dcq=(patch-Math.abs(hex.q%patch))/patch;
		else
			dcq=Math.abs(hex.q%patch)/patch;
		var zsq=fh(dcq,dcr).y
		result=result+zsq/Math.pow(2,degree-i);
	}
	return result;
}

function nurbsGenerator(func){
	
	var nsControlPoints = [
		[
			new THREE.Vector4 ( 0, func(0,0), 0, 1 ),
			new THREE.Vector4 ( 0, func(0,1), 5, 1 ),
			new THREE.Vector4 ( 0, func(0,2), 10, 1 )
		],
		[
			new THREE.Vector4 ( 5, func(1,0), 0, 1 ),
			new THREE.Vector4 ( 5, func(1,1), 5, 1 ),
			new THREE.Vector4 ( 5, func(1,2), 10, 1 )
		],
		[
			new THREE.Vector4 ( 10, func(2,0), 0, 1 ),
			new THREE.Vector4 ( 10, func(2,1), 5, 1 ),
			new THREE.Vector4 ( 10, func(2,2), 10, 1 )
		]
	];
	var degree1 = 2;
	var degree2 = 2;
	var knots1 = [0, 0, 0, 1, 1, 1];
	var knots2 = [0, 0, 0, 1, 1, 1];
	var nurbsSurface = new global.THREE.NURBSSurface(degree1, degree2, knots1, knots2, nsControlPoints);

	return getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};
}
})();