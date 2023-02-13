var rhit = rhit || {};

import {
	addClient,
	getClients,
	deleteClient,
	updateClient,
	getClientsForEmployee,
} from "./apiFunctions.js"

const urlParams = new URLSearchParams(window.location.search);

rhit.clientManager = null;
rhit.employeeID = urlParams.get("employeeID");

export class ClientPageController {
	constructor() {

		this.currPage = 1;
		this.endPage = 0;
		this.idFilter = '';
		this.fNameFilter = '';
		this.lNameFilter = '';
		this.activeFilter = '';
		rhit.clientManager = new ClientManager();

		document.querySelector("#submitAddClient").onclick = (event) => {
			const addressJson = {
				streetAddress: document.querySelector("#inputStreetAddress").value,
				city: document.querySelector("#inputCity").value,
				state: document.querySelector("#inputState").value,
				zip: document.querySelector("#inputZip").value,
			}
			const addressStr = `${addressJson.streetAddress}, ${addressJson.city}, ${addressJson.state}, ${addressJson.zip}`
			const inputJson = {
				FName: document.querySelector("#inputFirstName").value,
				LName: document.querySelector("#inputLastName").value,
				DateOfBirth: document.querySelector("#inputDateOfBirth").value,
				PhoneNumber: document.querySelector("#inputPhoneNumber").value,
				Address: addressStr,
				Email: document.querySelector("#inputEmail").value,
				Active: document.querySelector("#inputClientActive").value,
			}
			rhit.clientManager.addClient(inputJson);
			this.updateView();
			location.reload();
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
			rhit.clientManager.editClientInfo(inputJson);
			this.updateView();
			location.reload();
		};

		document.querySelector("#beginningPage").onclick = (event) => {
			rhit.clientManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#prevPage").onclick = (event) => {
			if (rhit.clientManager.targetPage - 1 >= 0){
				rhit.clientManager.targetPage -= 1;
				this.updateView();
			}
		}

		document.querySelector("#nextPage").onclick = (event) => {
			if (rhit.clientManager.targetPage + 1 < rhit.clientManager.pages){
				rhit.clientManager.targetPage += 1;
				this.updateView();
			}
		}

		document.querySelector("#lastPage").onclick = (event) => {
			if (rhit.clientManager.targetPage < rhit.clientManager.pages - 1){
				rhit.clientManager.targetPage = rhit.clientManager.pages - 1;
				this.updateView();
			}
		}

		document.querySelector("#idFilterArrow").onclick = (event) => {
			if (!this.idFilter){
				this.idFilter = 1;
				document.querySelector("#idFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			}
			else {
				this.idFilter = 0;
				document.querySelector("#idFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
			}
			rhit.clientManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#fNameFilterArrow").onclick = (event) => {
			if (!this.fNameFilter){
				this.fNameFilter = 1;
				document.querySelector("#fNameFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			}
			else {
				this.fNameFilter = 0;
				document.querySelector("#fNameFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
			}
			rhit.clientManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#lNameFilterArrow").onclick = (event) => {
			if (!this.lNameFilter){
				this.lNameFilter = 1;
				document.querySelector("#lNameFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			}
			else {
				this.lNameFilter = 0;
				document.querySelector("#lNameFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
			}
			rhit.clientManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#activeFilterArrow").onclick = (event) => {
			if (!this.activeFilter){
				this.activeFilter = 1;
				document.querySelector("#activeFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			}
			else {
				this.activeFilter = 0;
				document.querySelector("#activeFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
			}			
			rhit.clientManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#resetFiltersBtn").onclick = (event) => {
			this.idFilter = '';
			this.fNameFilter = '';
			this.lNameFilter = '';
			this.activeFilter = '';
			document.querySelector("#idFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			document.querySelector("#fNameFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			document.querySelector("#lNameFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			document.querySelector("#activeFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';	
			rhit.clientManager.targetPage = null;
			this.updateView();
		}
		this.updateView();
	}

	updateView() {
		console.log(rhit.clientManager.pages);
		rhit.clientManager.getClients(this.idFilter, this.fNameFilter, this.lNameFilter, this.activeFilter);

		document.querySelector("#startPageTxt").innerText = 1
		document.querySelector("#lastPageTxt").innerText = rhit.clientManager.pages;
	}
}

class ClientManager {
	constructor() {
		this.prevPage = 0;
		this.targetPage = null;
		this.targetConfirmedPage = 0;
		this.maxRows = 12;
		this.pages = 0;
	};

	addClient = async function (clientJson) {
		const addClientStatus = await addClient(clientJson);
	};

	getClients = async function (idFilter, fNameFilter, lNameFilter, activeFilter) {
		const clientsListJson = await getClientsForEmployee(rhit.employeeID, idFilter, fNameFilter, lNameFilter, activeFilter);
		document.querySelector("#clientsTableBody").innerHTML = "";
		let tableBody = document.querySelector("#clientsTable");
		this.jsonToTbl(clientsListJson, tableBody);
		let table = document.querySelector("#clientsTable");
		let rowsInTableLen = table.rows.length; 
		if (this.targetPage == null){
			this.pages = Math.ceil(rowsInTableLen / this.maxRows);
			console.log(this.pages);
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
			})

			deleteButton.on("click", function() {
				let rowIndex = $(editButton).parent().data('index');   // jQuery
				let currentClient = clientsJson[rowIndex];
				let clientId = currentClient.ClientID;
				deleteClient(clientId);
				location.reload();
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
		else {
			for (let i = this.targetPage * this.maxRows + 2; i < this.targetPage * this.maxRows + this.maxRows; i++) {
				if (rowsInTable[i]){
					rowsInTable[i].style.display = "table-row";
				}
			}
			if (this.targetPage != null){
				for (let j = this.prevPage * this.maxRows + 1; j < this.prevPage * this.maxRows + this.maxRows; j++) {
					if (rowsInTable[j]){
						rowsInTable[j].style.display = "none";
					}
				}
			}
			this.prevPage = this.targetPage;
			this.targetConfirmedPage = this.targetPage;
		}
	};

	editClientInfo(clientJson) {
		updateClient(clientJson)
	}
}