const express = require('express');
var app = express();
app.use('/',(req, resp)=>{
	req.send(
		`  <div class="hello">
		    <h1>hi all</h1>
		    <p>olololoo</p>
		  </div>
		`
	);
});
