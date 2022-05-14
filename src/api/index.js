const
	express     = require('express'),
	app         = express(),
	port        = 3000,
	cors        = require('cors'),
	corsOptions = {
		origin: 'http://localhost:4000',
	}
const {USERS}   = require("./db-mock/users-mock");

app.use(cors(corsOptions))


app.use('/hello', (req, res, next) => {
	console.log('req.query');
	console.log(req.query);
	const {user, password} = req.query;
	
	if (USERS.find(item => item.username === user && item.password === password)){
		next();
	}
	else {
		res.sendStatus(401)
	}
	
})

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



