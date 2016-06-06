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
	res.send(fs.readFileSync('./public/index.html'));
	next();
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
