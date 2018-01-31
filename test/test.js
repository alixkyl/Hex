var fs = require('fs');
var generator = require('../dist/main.js').Generator;
var generator = new generator({});
var res = generator.generate();
fs.writeFile('./test.json', JSON.stringify(res, null, 4), function (err, data) {
	if (err) {
		console.log(data);
		console.log(err);
	}
});