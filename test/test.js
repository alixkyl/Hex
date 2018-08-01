var fs = require('fs');
var Generator = require('../dist/index.js').Generator;
var generator = new Generator({});
generator.generate().then(function(res){
	fs.writeFile('./test/results/test3.json', JSON.stringify(res, null, 4), function (err, data) {
		if (err) {
			console.log(data);
			console.log(err);
		}
	});
});
