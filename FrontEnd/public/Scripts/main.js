var rhit = rhit || {};

import {
	loginUser,
	registerUser,
	addClient,
	getClients,
	deleteClient,
	updateClient,
	getListings,
} from "./apiFunctions.js"

rhit.loginRegesterManager = null;
rhit.clientManager = null;
rhit.listingPageManager = null;

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

		document.querySelector("#submitEditClient").onclick = (event) => {
			let clientID = document.querySelector("#editClientDialogue").getAttribute("data-clientID");
			const addressJson = {
				streetAddress: document.querySelector("#inputNewStreetAddress").value,
				city: document.querySelector("#inputNewCity").value,
				state: document.querySelector("#inputNewState").value,
				zip: document.querySelector("#inputNewZip").value,
			}
			const addressStr = `${addressJson.streetAddress}, ${addressJson.city}, ${addressJson.state}, ${addressJson.zip}`
			const inputJson = {
				ClientID: parseInt(clientID),
				FName: document.querySelector("#inputNewFirstName").value,
				LName: document.querySelector("#inputNewLastName").value,
				DateOfBirth: document.querySelector("#inputNewDateOfBirth").value,
				PhoneNumber: document.querySelector("#inputNewPhoneNumber").value,
				Address: addressStr,
				Email: document.querySelector("#inputNewEmail").value,
				Active: document.querySelector("#inputNewClientActive").value,
			}
			console.log(inputJson);
			rhit.clientManager.editClientInfo(inputJson);
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
				id: `row${i}`,
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
			row$.data('index', i);
			let editButton = $('<td/>').html(`<button id="clientEditBtn${i}" class="tblColCont clientEditBtn" type="button" data-toggle="modal"
			data-target="#editClientDialogue">
			<span id="editIcon" class="material-symbols-outlined">edit</span></button>`);
			let deleteButton = $('<td/>').html(`<button id="clientDeleteBtn${i}" class="tblColCont clientDeleteBtn" type="button">
			<span id="deleteIcon" class="material-symbols-outlined">delete</span></button>`);

			editButton.on("click", function() {
				let rowIndex = $(editButton).parent().data('index');   // jQuery
				let currentClient = clientsJson[rowIndex];
				let modal = document.querySelector("#editClientDialogue")
				modal.setAttribute("data-clientID", currentClient.ClientID)
				let fullAddressArr = currentClient.Address.split(',');
				document.querySelector("#inputNewStreetAddress").value = fullAddressArr[0];
				document.querySelector("#inputNewCity").value = fullAddressArr[1];
				document.querySelector("#inputNewState").value = fullAddressArr[2];
				document.querySelector("#inputNewZip").value = fullAddressArr[3];
				document.querySelector("#inputNewFirstName").value = currentClient.FName;
				document.querySelector("#inputNewLastName").value = currentClient.LName;
				document.querySelector("#inputNewDateOfBirth").value = currentClient.DateOfBirth;
				document.querySelector("#inputNewPhoneNumber").value = currentClient.PhoneNumber;
				document.querySelector("#inputNewEmail").value = currentClient.Email;
				document.querySelector("#inputNewClientActive").value = currentClient.Active;
				console.log("editing client");
			})

			deleteButton.on("click", function() {
				let rowIndex = $(editButton).parent().data('index');   // jQuery
				let currentClient = clientsJson[rowIndex];
				let clientId = currentClient.ClientID;
				console.log(rowIndex);
				console.log(currentClient);
				console.log(clientId);
				deleteClient(clientId);
				console.log("deleting client");
			})

			row$.append(editButton);
			row$.append(deleteButton);
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

	editClientInfo(clientJson) {
		updateClient(clientJson)
	}

	// deleteClient(clientID) {
	// 	deleteClient(clientID);
	// }
}

rhit.ListingPageController = class {
	constructor() {
		rhit.listingPageManager = new rhit.ListingPageManager();
		this.updateView();
	}

	updateView() {
		rhit.listingPageManager.populateListings();
	}
}

rhit.ListingPageManager = class {
	constructor() {

	}

	getListings = async function() {
		const listingsJson = await getListings();
		return listingsJson;
	}

	createCard = function(currentRow, currentListing) {
		const newCol = document.createElement("div");
		newCol.className = "col";

		const newCard = document.createElement("div");
		newCard.className = "card";
		newCard.style = "width: 18rem;";

		const newImage = document.createElement("img");
		newImage.className = "card-img-top";
		newImage.src = "Insert source when populated in db";
		newImage.alt = "House image will go here";

		const newCardBody = document.createElement("div");
		newCardBody.className = "card-body";

		const newAddress = document.createElement("h5");
		newAddress.className = "card-title";
		newAddress.innerHTML = currentListing.address;

		const newDescription = document.createElement("p");
		newDescription.innerText = "Description of the lovely home";

		const newDetailsButton = document.createElement("a");
		newDetailsButton.href = "#";
		newDetailsButton.className = "btn btn-primary";
		newDetailsButton.innerHTML = "Details";

		const newOffersButton = document.createElement("button");
		newOffersButton.type = "button";
		newOffersButton.className = "btn btn-primary";
		newOffersButton.innerHTML = "Offers"

		const newIconCounter = document.createElement("span");
		newIconCounter.className = "badge badge-pill badge-success";
		//TODO: implement offers and replace with actual number
		newIconCounter.innerHTML = "4"

		newOffersButton.appendChild(newIconCounter);
		newCardBody.appendChild(newAddress);
		newCardBody.appendChild(newDescription);
		newCardBody.appendChild(newDetailsButton);
		newCardBody.appendChild(newOffersButton);
		newCard.appendChild(newImage);
		newCard.appendChild(newCardBody);
		newCol.appendChild(newCard);
		currentRow.appendChild(newCol);
	}
	
	//TODO: Create new row for every 3 cards
	createNewRow = function() {
		const newRow = document.createElement("div");
		newRow.className = "row";
		const element = document.getElementById("mainPage");
		element.appendChild(newRow);
		return newRow;
	}

	populateListings = async function() {
		const listingsJson = await this.getListings();
		console.log(listingsJson);
		const listingsCount = listingsJson.length;
		//console.log("#of listings", listingsCount);
		const numOfRows = Math.ceil(listingsCount/3);
		//console.log("# of rows", numOfRows);
		//loop for num of rows
		for (let i = 0; i < numOfRows; i ++){
			const newRow = this.createNewRow();
			//console.log(newRow);
			//TODO: Add up to three cards per row
			//3 because limit is 3 cards per row
			for (let j = 0; j < 3; j++){
				const currentListing = listingsJson.shift()
				this.createCard(newRow, currentListing);
			}
		}
	}

}

rhit.main = function () {
	console.log("Ready");
	// rhit.loginRegesterManager = new rhit.LoginRegisterManager();
	// new rhit.LoginPageController();
	// new rhit.ClientPageController();
	new rhit.ListingPageController();
};

rhit.main();