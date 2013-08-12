(function() {
var mapData={};
generateMap=function(size,seed,smoothstep,pass){
	
	
	
	
	
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
		var coord2 = cubic2grid(d.r,d.q);
		v=simplex.noise2D(coord2.x, coord2.y);
		var dfx=coord2.x%100;
		var dfy=coord2.y%100;
		var fz=ff(function(rfx,rfy){
			return simplex.noise2D(coord2.x-dfx+rfx, coord2.y-dfy+rfy);
		});
		coef=fz(dfx/100,dfy/100);		
			
		stepMap[h]={elevation:coef+e, variation: v};
	}
	console.log("step1");
	
	if(smoothstep){
		var tmpStepMap1={};
		for(i2=0;i2<size;i2++){
			for(j2=size-1;j2>=0;j2--){
				var r= i2 ;
				var q = j2 - Math.floor(i2/2);
				var h=r+"_"+q;
				neighbors=getNeighbors(mapData[h]);
				var valid=0;
				var totalE=0;
				if(!tmpStepMap1[h])
					tmpStepMap1[h]={};
				for(n in neighbors)
				{
					totalE+=stepMap[neighbors[n].name].elevation;
					valid++;
				}
				if(valid)
					totalE/=valid;
				else
					totalE=stepMap[h].elevation;
				tmpStepMap1[h]={elevation:totalE};
			}
		}
		stepMap=tmpStepMap1;
		tmpStepMap1={};
		for(h in mapData) {
			neighbors=getNeighbors(mapData[h]);
			var valid=0;
			var totalE=0;
			if(!tmpStepMap1[h])
				tmpStepMap1[h]={};
			for(n in neighbors)
			{
				totalE+=stepMap[neighbors[n].name].elevation;
				valid++;
			}
			if(valid)
				totalE/=valid;
			else
				totalE=stepMap[h].elevation;
			tmpStepMap1[h]={elevation:totalE};
		}
		stepMap=tmpStepMap1;
	}

	console.log("step2");
	
	for(p=0;p<pass;p++){
		
	}
	console.log("Finalstep");
	for(h in mapData) {
		mapData[h].heigh=Math.floor(stepMap[h].elevation*10);
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
function ff(func){
	var nsControlPoints = [
		[
			new THREE.Vector4 ( 0, func(0,0), 0, 1 ),
			new THREE.Vector4 ( 0, func(0,5), 5, 1 ),
			new THREE.Vector4 ( 0, func(0,10), 10, 1 )
		],
		[
			new THREE.Vector4 ( 5, func(5,0), 0, 1 ),
			new THREE.Vector4 ( 5, func(5,5), 5, 5 ),
			new THREE.Vector4 ( 5, func(5,10), 10, 5 )
		],
		[
			new THREE.Vector4 ( 10, func(10,0), 0, 1 ),
			new THREE.Vector4 ( 10, func(10,5), 5, 1 ),
			new THREE.Vector4 ( 10, func(10,10), 10, 1 )
		]
	];
	var degree1 = 2;
	var degree2 = 2;
	var knots1 = [0, 0, 0, 1, 1, 1];
	var knots2 = [0, 0, 0, 1, 1, 1];
	var nurbsSurface = new THREE.NURBSSurface(degree1, degree2, knots1, knots2, nsControlPoints);

	return getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};
}
})();