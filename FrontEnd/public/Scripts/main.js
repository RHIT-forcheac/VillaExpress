var rhit = rhit || {};

import {
	loginUser,
	registerUser,
	addClient,
	getClients
} from "./apiFunctions.js"

rhit.loginRegesterManager = null;
rhit.clientManager = null;

rhit.LoginPageController = class {
	constructor() {
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
	constructor() {

		this.startPage = 0;
		this.currPage = 1;
		this.endPage = 0;
		rhit.clientManager = new rhit.ClientManager();

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
			this.updateView();
		};
		document.querySelector("#beginningPage").onclick = (event) => {
			rhit.clientManager.targetPage = this.startPage;
			this.updateView();
		}

		document.querySelector("#prevPage").onclick = (event) => {
			rhit.clientManager.targetPage -= 1;
			this.updateView();

		}

		document.querySelector("#nextPage").onclick = (event) => {
			rhit.clientManager.targetPage += 1;
			this.updateView();

		}

		document.querySelector("#lastPage").onclick = (event) => {
			rhit.clientManager.targetPage = this.endPage;
			this.updateView();

		}
		this.updateView();
	}

	updateView() {
		rhit.clientManager.getClients();

		document.querySelector("#startPageTxt").innerText = 1
		document.querySelector("#lastPageTxt").innerText = rhit.clientManager.pages;
	}
}

rhit.ClientManager = class {
	constructor() {
		this.prevPage = 0;
		this.targetPage = null;
		this.targetConfirmedPage = 0;
		this.maxRows = 12;
		this.pages = 0;
	};

	addClient = async function (clientJson) {
		const addClientStatus = await addClient(clientJson);
		console.log("client add status: ", addClientStatus);
	};

	getClients = async function () {
		const clientsListJson = await getClients();
		let tableBody = document.querySelector("#clientsTable");
		this.jsonToTbl(clientsListJson, tableBody);
		let table = document.querySelector("#clientsTable");
		let rowsInTableLen = table.rows.length; 
		if (this.targetPage == null){
			this.pages = Math.ceil(rowsInTableLen / this.maxRows);
			document.querySelector("#lastPageTxt").innerText = Math.ceil(rowsInTableLen / this.maxRows);
		}
		this.limitClients();
	}

	jsonToTbl = function (clientsJson, selector) {
		var columns = this.addAllColumnHeaders(clientsJson, selector);
		for (var i = 0; i < clientsJson.length; i++) {
			var row$ = $('<tr/>', {
				style: "display:none"
			});
			clientsJson[i].DateOfBirth = clientsJson[i].DateOfBirth.toString().substring(0, clientsJson[i].DateOfBirth.indexOf('T'));
			if (clientsJson[i].Active) {
				clientsJson[i].Active = 'T';
			} else {
				clientsJson[i].Active = 'F';
			}
			for (var colIndex = 0; colIndex < columns.length; colIndex++) {
				var cellValue = clientsJson[i][columns[colIndex]];
				if (cellValue == null) cellValue = "";
				let activeClass = "";
				switch (colIndex) {
					case 0:
						row$.append($('<th/>', {scope: "row"}).html(cellValue));
						break;
					case 7:
						if (cellValue == 'T') {
							activeClass = "table-success";
						} else {
							activeClass = "table-danger";
						}
						row$.append($('<td/>', {class: activeClass}).html(cellValue));
						break;
					default:
						row$.append($('<td/>').html(cellValue));
				}
			}
			$(selector).append(row$);
		}
	}

	addAllColumnHeaders = function (clientsJson, selector) {
		var columnSet = [];
		var headerTr$ = $('<tr/>');

		for (var i = 0; i < clientsJson.length; i++) {
			var rowHash = clientsJson[i];
			for (var key in rowHash) {
				if ($.inArray(key, columnSet) == -1) {
					columnSet.push(key);
					//headerTr$.append($('<th/>').html(key));
				}
			}
		}
		$(selector).append(headerTr$);

		return columnSet;
	}

	limitClients() {
		let table = document.querySelector("#clientsTable");
		let rowsInTable = table.rows;
		if (this.targetPage == null){
			for (let k = 2; k < this.maxRows; k++) {
				rowsInTable[k].style.display = "table-row";
			}
			this.targetPage = 0;
			this.targetConfirmedPage = this.targetPage;
		}
		else if (this.targetPage < 1 || this.targetPage > this.pages) {
			return;
		}
		else {
			for (let i = this.targetPage * this.maxRows + 2; i < this.targetPage * this.maxRows + this.maxRows; i++) {
				rowsInTable[i].style.display = "table-row";
			}
			if (this.targetPage != null){
				for (let j = this.prevPage * this.maxRows + 1; j < this.prevPage * this.maxRows + this.maxRows; j++) {
					rowsInTable[j].style.display = "none";
				}
			}
			this.prevPage = this.targetPage;
			this.targetConfirmedPage = this.targetPage;
		}
	};
}

rhit.main = function () {
	console.log("Ready");
	// rhit.loginRegesterManager = new rhit.LoginRegisterManager();
	// new rhit.LoginPageController();
	new rhit.ClientPageController();
};

rhit.main();