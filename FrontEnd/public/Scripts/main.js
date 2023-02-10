var rhit = rhit || {};

import {
	loginUser,
	registerUser,
	addClient,
	getClients,
	deleteClient,
	updateClient,
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


rhit.ImportManager = class {
    constructor() {
        this.folderurl = '';
        this.clienturl = this.folderurl + '/Client.json';
        this.employeeurl = this.folderurl + '/Employee.json';
        this.firmurl = this.folderurl + '/Firm.json';
        this.listingurl = this.folderurl + '/Listing.json';
        this.offerurl = this.folderurl + '/Offer.json';
        this.personurl = this.folderurl + '/Person.json';
        this.representsurl = this.folderurl + '/Represents.json';

    };

	//!IMPORTANT: RUN person First
	insertClient = async function (clientJson) {
		const addClientStatus = await addClient(clientJson);
		console.log("client add status: ", addClientStatus);
	};

	loadClient = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(clienturl).toString());
		let data = json.data;
		for (let i = 0; i < data.length; i++) {
			let newID = data[i].ID;
			let newinfo = data[i].Information.split(", ");
			let newphone = newinfo[0];
			let newadd = newinfo[1];
			let newemail = newinfo[2];
			let newstate = data[i].State;
			let newfirmid = data[i].FirmID;

			//continue to sprocs
			const inputJson = {
				ID: newID,
				phoneNumber: newphone,
				address: newadd,
				email: newemail,
				active: newstate,
				firmID: newfirmid
			}
			rhit.ImportManager.insertClient(inputJson);
		}
	};

	insertFirm = async function (Json) {
		const addFirmStatus = await insertFirm(Json);
		console.log("Firm insert status: ", addFirmStatus);
	};

	loadFirm = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(firmurl).toString());
		let data = json.data;
		for (let i = 0; i < data.length; i++) {
			let newID = data[i].ID;
			let newName = data[i].CompanyName;
			let newAddress = data[i].Address

			//continue to sprocs
			const inputJson = {
				FirmID: newID,
				CompanyName: newName,
				Address: newAddress
			}
			rhit.ImportManager.insertFirm(inputJson);

			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
		}
	};


	insertEmployee = async function (Json) {
		const addEmployeeStatus = await insertEmployee(Json);
		console.log("Employee insert status: ", addEmployeeStatus);
	};

	loadEmployee = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(employeeurl).toString());
		let data = json.data;
		for (let i = 0; i < data.length; i++) {
			let newID = data[i].ID;
			let newCredentials = data[i].credentials.split(", ");
			let newUserName = data[i].Username;
			let newPasswordHash = newCredentials[1];
			let newAdmin = data[i].AdminAcess;
			let firmID = data[i].Firm;

			//continue to sprocs
			const inputJson = {
				ID: newID,
				Username: newUserName,
				PasswordHash: newPasswordHash,
				AdminAccess: newAdmin,
				FirmID: firmID

			}
			rhit.ImportManager.insertEmployee(inputJson);

			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
		}
	};

	insertListing = async function (Json) {
		const adtListingStatus = await insetListing(Json);
		console.log("Listing insert status: ", adtListingStatus);
	};

	loatListing = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(listingeurl).toString());
		let data = json.data;

		const map = new Map();
			map.set("Jan", "01");
			map.set("Feb", "02");
			map.set("Mar", "03");
			map.set("Apr", "04");
			map.set("May", "05");
			map.set("Jun", "06");
			map.set("Jul", "07");
			map.set("Aug", "08");
			map.set("Sep", "09");
			map.set("Oct", "10");
			map.set("Nov", "11");
			map.set("Dec", "12");

		for (let i = 0; i < data.length; i++) {
			let newID = data[i].ListingID;
			let employeeAssignDate = data[i].EmployeeAssignDate;
			let month = data[i].CloseMonth;
			let closeMonth = "";
			if(month == null) {
				closeMonth = null;
			}else{
				closeMonth = map.get(month);
			}
			let closeDate = data[i].CloseYear + "-" + closeMonth + 
				data[i].CloseDay;
			let postDate = data[i].PostDate;
			let address = data[i].Address;
			let state = data[i].state;
			let employeeID = data[i].EmployeeID;

		//continue to sprocs
			const inputJson = {
				ID: newID,
				employeeAssignDate: employeeAssignDate,
				employeeID: employeeID,
				address: address,
				postDate: postDate,
				closeDate: closeDate,
				state: state
			}
			rhit.ImportManager.insertListing(inputJson);

			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
		}
	};

	insertOffer = async function (Json) {
		const addOfferStatus = await insertOffer(Json);
		console.log("Offer insert status: ", addOfferStatus);
	};

	loadOffer = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(offerurl).toString());
		let data = json.data;
		for (let i = 0; i < data.length; i++) {
			let identifier = data[i].ListingIDIdentifier.split("-");
			let listing = identifier[0];
			let client = identifier[1];
			let price = data[i].Price;

			//continue to sprocs
			const inputJson = {
				price: price,
				listing: listing,
				client: client
			}
			rhit.ImportManager.insertOffer(inputJson);

			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
		}
	};

	insertPerson = async function (Json) {
		const addPersonStatus = await insertPerson(Json);
		console.log("Person insert status: ", addPersonStatus);
	};

	loadPerson = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(personurl).toString());
		let data = json.data;
		for (let i = 0; i < data.length; i++) {
			let ID = data[i].ID;
			let name = data[i].split(" ");
			let fname = name[0];
			let lname = name[1];
			let dob = data[i].DateOfBirth;

			//continue to sprocs
			const inputJson = {
				ID: ID,
				fname: fname,
				lname: lname,
				dob: dob
			}
			rhit.ImportManager.insertPerson(inputJson);

			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
		}
	};

	
	insertRepresent = async function (Json) {
		const addRepresentStatus = await insertRepresent(Json);
		console.log("Represent insert status: ", addRepresentStatus);
	};

	loadRepresent = function () {
		//const data = require();
		//console.log(data);
		let json = JSON.parse(fs.readFileSync(representurl).toString());
		let data = json.data;
		for (let i = 0; i < data.length; i++) {
			let represent = data[i].Represent.split("-");
			let client = represent[0];
			let employee = represent[1];

			//continue to sprocs
			const inputJson = {
				client:client,
				employee: employee
			}
			rhit.ImportManager.insertRepresent(inputJson);

			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
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