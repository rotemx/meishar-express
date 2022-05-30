const
	express     = require('express'),
	app         = express(),
	port        = 3000,
	cors        = require('cors'),
	corsOptions = {
		// origin: 'http://localhost:4000',
		origin: '*',
	}
const {USERS}   = require("./db-mock/users-mock");

const jwt = require('jsonwebtoken');
const SECRET = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

function generateAccessToken(payload) {
	return jwt.sign(payload, SECRET, { expiresIn: '1800s' });
}

app.use(cors(corsOptions))

app.param(['id1', 'id2'], (req, res, next, value, name) => {
	
	console.log('run value, name', value, name);
	next()
	/*
	const user = USERS.find(u=>u.id===id);
	if (user) {
		req.user = user;
		console.log('found user', user);
		next();
	}
	else{
		console.error('unable to find user');
		next(new Error('failed to load user'))
	}
*/
})

// const bodyParser = require('body-parser');

app.use('/login', express.json());


const logRequest = (req, res, next) => {
	const {user, password} = req.body;
	console.log(`User ${user} is logged with password ${password}  `);
	next()
}

// const attachUserAndPassword = (req,res)=>{
// 	const {user, password } =  req.body;
// 	req.user = user;
// 	req.password = password;
// }

app.post('/login', logRequest, (req, res, next) => {
	
	const
		{user, password} = req.body,
		foundUser        = USERS.find(u => u.username === user);
	
	if (foundUser && foundUser.password === password)
	{
		res.json({token: generateAccessToken({user:foundUser})})
		
	}
	else
	{
		res.status(401);
		res.json({status:"Unauthorized"})
	}
	
});

app.get('/user/:id1/:id2ds', function (req, res, next) {
	console.log('called id1 with req.params', req.params);
	res.end()
});

// app.get('/user/:id1/:id5', function (req, res) {
// 	console.log('called id2 with req.params', req.params);
// 	res.end()
// });
//
//
// app.get('/user/:user', function (req, res) {
// 	res.json(req.user);
// });

app.use('/hello', (req, res, next) => {
	console.log('req.query');
	console.log(req.query);
	const {user, password} = req.query;
	
	if (USERS.find(item => item.username === user && item.password === password))
	{
		next();
	} else
	{
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



