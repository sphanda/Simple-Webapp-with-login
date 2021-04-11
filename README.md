# Basic login system

Objective of this project is to create a basic login system. Application uses Node.js & Express framework in the backend, renders HTML pages to register new users & allow them to login.

 - Registered users are stored in-memory and no database / file system is involved.
 - User credentials are hashed via bcrypt for password security.
 - Once application is brought down / restarted, all registered users are deleted.
 

# To use the application

	- register new users by click on `Register as a new user` on the home page `index.html`
	- choose an appropriate username & password to register
	- system allows multiple user registration, register multiple users
	- successful registration message is displayed on the screen
	- after successfully registered, click on `login` link
	- system validates the login credentials & lets authenticated users into the application
	- if authentication is successful, `login successfully` message is displayed on the screen
			- next, user can logout of the application
	- if login credentials are invalid, an error message is displayed on the screen


# Application access locally

Here are the steps to run the application locally

	- Install Node JS from `https://nodejs.org/en/download/`
	- Unpackage the zip file to your chosen local directory
	- Install the node modules - `express, bcryptjs & body-parser` in the same directory
		`npm install express bcrypt body-parser --save`
	- Run `node app.js`
	- Access application at `http://localhost:3000`


	Express - flexible node.js application framework that helps build APIs easily & quickly.
	Bcrypt JS - library to hash passwords
	Body-parser - required to handle `HTTP post` request in express JS. Incoming request body is extracted into `req.body`


#Package structure

	sample-login-system
		|
		|--- node_modules
		|--- index.html
		|--- registration.html
		|--- app.js
		|--- data.js
		|--- package.json
		|--- EBSampleApp-Nodejs.iml
		|--- .npmrc
		|--- cron.yaml
		|--- .ebextensions
		|		|--- logging.config
		|--- README.md
