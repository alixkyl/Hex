var hexlib=require('../lib/Hexgenerator.js');
(function(){
	global.game.dataEngine=this;
	this.mapData={};

	this.init=function(){
		console.log('DataEngine => init')
		this.mapData=generateMap(200,1,25,0.05);

	}

	
})();