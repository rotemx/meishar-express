const
	express     = require('express'),
	app         = express(),
	port        = 3000,
	cors        = require('cors'),
	corsOptions = {
		origin: 'http://localhost:4000',
	}

app.use(cors(corsOptions))

//happens every time a user connects to get "/"
app.get('/hello', (req, res) => {
	res.set('Content-Type', 'text/html');
	
	res.json('Hello World!');
})

app.use("/", express.static('public'));


// happens once on each load
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

console.log('this is phase 2');



