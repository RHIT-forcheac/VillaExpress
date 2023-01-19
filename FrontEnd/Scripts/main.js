var rhit = rhit || {};

import Connection from './server.js';

rhit.logInUser = function () {
	/** function body */
};

rhit.registerUser = function (username, password) {

};

rhit.getNewPasswordSalt = function () {

};

rhit.hashPassword = function () {

};

rhit.main = function () {
	console.log("Ready");
	const conn = new Connection();
	conn.connect();
};

rhit.main();
