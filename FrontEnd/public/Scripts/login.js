var rhit = rhit || {};

import {
	loginUser,
	registerUser,
	getEmployeeByID,
} from "./apiFunctions.js"

import {NavBarController} from "./navBar.js"

rhit.loginRegesterManager = null;

export class LoginPageController{
	constructor() {
		rhit.loginRegesterManager = new LoginRegisterManager();

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

class LoginRegisterManager {
	constructor() {

	}

	logInUser = async function (username, password) {
		const loginStatusArr = await loginUser(username, password);
		console.log("login status: ", loginStatusArr[0]);
		if (!!loginStatusArr[0]) {
			rhit.currentUser = await getEmployeeByID(loginStatusArr[1]);
			window.location.href = "../homeScreen.html"
            //new NavBarController();
		}
		return loginStatusArr[0];
	};

	registerUser = function (username, password) {
		var registerStatus = registerUser(username, password);
		console.log(registerStatus);
	};
}