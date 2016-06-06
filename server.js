const express = require('express');
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
	res.send(
		`  <div class="hello">
		    <h1>hi all</h1>
		    <p>say 'exit' to me...</p>
		  </div>
		`
	);
	next();
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
