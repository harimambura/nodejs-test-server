const express = require('express'),
fs = require('fs');

var app = express();
app.use('/exit',(req, res, next)=>{
	res.send(
		`  <div class="hello">
		<h1>Command accepted!</h1>
		<p>Shut down...</p>
		</div>
		`
	);

});
app.use('/',(req, res, next)=>{
	if (req.path.indexOf('bundle.js') == -1) {
		fs.readFile('./public/index.html', 'utf8', (err, data) => {
			res.send(data);
			next();
		});
	} else {
		fs.readFile('./public/bundle.js', 'utf8', (err, data) => {
			res.send(data);
			next();
		});
	}		
	
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
