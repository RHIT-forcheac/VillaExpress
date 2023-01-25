var rhit = rhit || {};

import {loginUser, registerUser, addClient} from "./apiFunctions.js"

rhit.loginRegesterManager = null;
rhit.clientManager = null;

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

rhit.ClientPageController = class {
	constructor () {
		document.querySelector("#submitAddClient").onclick = (event) => {
			const addressJson = {
				streetAddress: document.querySelector("#inputStreetAddress").value,
				city: document.querySelector("#inputCity").value,
				state: document.querySelector("#inputState").value,
				zip: document.querySelector("#inputZip").value,
			}
			const addressStr = `${addressJson.streetAddress}, ${addressJson.city}, ${addressJson.state}, ${addressJson.zip}`
			const inputJson = {
				fname: document.querySelector("#inputFirstName").value,
				lname: document.querySelector("#inputLastName").value,
				dob: document.querySelector("#inputDateOfBirth").value,
				phoneNumber: document.querySelector("#inputPhoneNumber").value,
				address: addressStr,
				email: document.querySelector("#inputEmail").value,
				active: document.querySelector("#inputClientActive").value,
			}

			rhit.clientManager.addClient(inputJson);
		};
	}

	updateView() {

	}
}

rhit.ClientManager = class {
	constructor() {

	}

	addClient = async function (clientJson) {
		const addClientStatus = await addClient(clientJson);
		console.log("client add status: ", addClientStatus);
	};	
}

rhit.main = function () {
	console.log("Ready");
	// rhit.loginRegesterManager = new rhit.LoginRegisterManager();
	// new rhit.LoginPageController();
	rhit.clientManager = new rhit.ClientManager();
	new rhit.ClientPageController();
};

rhit.main();
