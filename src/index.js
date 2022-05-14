const
	express = require('express'),
	app     = express()
	port = 3000;


//happens every time a user connects to get "/"
app.get('/', (req, res) => {
	res.send('Hello World!')
})

// happens once on each load
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})





