
module.exports=function(id,socket){

	var mapData=global.game.dataEngine.mapData;
	delta={q:0,r:0}
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
				}
			}
			socket.emit('maj',  localData );
		});
};