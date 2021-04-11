const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const bodyParser = require('body-parser');
const users = require('./data').userDB;

var port = process.env.PORT || 3000,
	http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-login-system.log', new Date().toISOString() + ' - ' + entry + '\n');
};

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/register', async(req, res) => {
	try {
		let foundUser = users.find((data) => req.body.username === data.username);
		if(!foundUser) {

			let hashPassword = await bcrypt.hash(req.body.password, 10);
			let newUser = {
				id: Date.now(),
				username: req.body.username,
				password: hashPassword,
			};
			
			users.push(newUser);
			console.log('User list', users);
			
			res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./index.html'>Login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
		} else {
			res.send("<div align ='center'><h2>User already registered</h2></div><br><br><div align='center'><a href='./registration.html'>Register different user</a></div>");
		}
	} catch {
		res.send("Internal server error");
	}
});

app.post("/login", async(req, res) => {
	try {
		let foundUser = users.find((data) => req.body.username === data.username);
		if(foundUser) {
			
			let submittedPass = req.body.password;
			let storedPass = foundUser.password;
			
			const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
			if(passwordMatch) {
				let usrname = foundUser.username;
				res.send(`<div align ='center'><h2>Login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./index.html'>Logout</a></div>`);
			} else {
				res.send("<div align ='center'><h2>Login failed due to invalid username or password</h2></div><br><br><div align ='center'><a href='./index.html'>login again</a></div>");
			}
		} else {
			let fakePass = `$2$0$2$1sdlfjdsklkskdkk`;
			await bcrypt.compare(req.body.password, fakePass);
			
			res.send("<div align ='center'><h2>Login failed due to invalid username or password</h2></div><br><br><div align ='center'><a href='./index.html'>Login again</a></div>");
		}
		
	} catch {
		res.send("Internal server error");
	}
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://server:' + port + '/');