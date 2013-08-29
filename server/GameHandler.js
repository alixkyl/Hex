
module.exports=new function(){
	global.game=this;
	require('./engine/GameEngine.js');
	require('./engine/DataEngine.js');
	Client=require('./Client.js');
	var clients={};
	
	this.init=function(){
		console.log('game => init')
		this.dataEngine.init();

	}

	this.clientConnect=function(id,socket){
		clients[id]=new Client(id,socket);
	}



	this.simulate=function(){
		console.log('game => simulate')

	}




}