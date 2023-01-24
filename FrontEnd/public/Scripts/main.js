var rhit = rhit || {};

import {loginUser, registerUser} from "./apiFunctions.js"

rhit.loginRegesterManager = null;

rhit.LoginPageController = class {
	constructor () {
		document.querySelector("#loginButton").onclick = (event) => {
			const username = document.querySelector("#usernameField").value;
			const password = document.querySelector("#passwordField").value;
			rhit.loginRegesterManager.logInUser(username, password);
		};
		
		document.querySelector("#registerButton").onclick = (event) => {
			const username = document.querySelector("#usernameField").value;
			const password = document.querySelector("#passwordField").value;
			rhit.loginRegesterManager.registerUser(username, password);
		};
	}

	updateView() {

	}
}

	rhit.LoginRegisterManager = class {
		constructor() {

		}

		logInUser = async function (username, password) {
			const loginStatus = await loginUser(username, password);
			console.log("login status: ", loginStatus);
			if (!!loginStatus) {
				window.location.href = "../homeScreen.html"
			}
			return loginStatus;
		};	

		registerUser = function (username, password) {
			var registerStatus = registerUser(username, password);
			console.log(registerStatus);
		};
}

rhit.main = function () {
	console.log("Ready");
	rhit.loginRegesterManager = new rhit.LoginRegisterManager();
	new rhit.LoginPageController();
};

rhit.main();
