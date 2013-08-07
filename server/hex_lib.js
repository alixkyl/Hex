var Alea = require('alea')
	,SimplexNoise = require('simplex-noise');
exports.generateMap=function(size,seed,smoothstep,pass){
	
	var mapData={};
	
	
	
    var simplex = new SimplexNoise(new Alea(seed));
    
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
		var d=mapData[h];
		var offR = normalize_offset(d.r%3);
		var offQ = normalize_offset(d.q%3);
		var coord = cubic2grid(d.r,d.q);
		var w =0;
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
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==2 && offQ==0){
			var coord2 = cubic2grid(d.r+1,d.q);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==2 && offQ==1){
			var coord2 = cubic2grid(d.r+1,d.q-1);
			e=simplex.noise2D(coord2.x, coord2.y);
		}else if(offR==2 && offQ==2){
			var coord2 = cubic2grid(d.r-1,d.q+1);
			e=simplex.noise2D(coord2.x, coord2.y);
		}
		
		stepMap[h]={elevation:e+0.1, humidity:w};
	}
	console.log("step1");
	
	if(smoothstep){
		// var tmpStepMap1={};
		// for(h in mapData) {
			// var d = mapData[h];
			
			
		// }
		// stepMap=tmpStepMap1;
	}
	console.log("step2");
	
	for(p=0;p<pass;p++){
		
	}
	console.log("Finalstep");
	for(h in mapData) {
		mapData[h].heigh=Math.floor(stepMap[h].elevation*10);
		mapData[h].moist=Math.floor(stepMap[h].humidity);
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