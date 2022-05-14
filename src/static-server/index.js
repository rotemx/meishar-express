const
	express = require('express'),
	app     = express(),
	port = 4000;


app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));

app.listen(port, () => {
	console.log(`Static server listening on port ${port}`)
})
