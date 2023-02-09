var rhit = rhit || {};

import {
	getOffersByListing,
    addOffer,
} from "./apiFunctions.js"

//TODO: Create API functions/sprocs for offers

rhit.offerManager = null;

export class OfferPageController {
	constructor(listingID) {

		this.startPage = 0;
		this.currPage = 1;
		this.endPage = 0;
        this.listingID = listingID;
		rhit.offerManager = new OfferManager();

		document.querySelector("#submitAddOffer").onclick = (event) => {
			const inputJson = {
				Price: document.querySelector("#inputOfferValue").value,
                Listing: this.listingID,
				Client: document.querySelector("#inputClientID").value,
			}
            //TODO: Refactor for offer
			rhit.offerManager.addOffer(inputJson);
			this.updateView();
		};

		document.querySelector("#submitEditOffer").onclick = (event) => {
			let listingID = document.querySelector("#editClientDialogue").getAttribute("data-clientID");
			const inputJson = {
				price: document.querySelector("#inputNewOfferValue").value,
				client: document.querySelector("#inputNewClientID").value,
			}
            //TODO: Refactor for offer
			//rhit.offerManager.editClientInfo(inputJson);
			this.updateView();
		};

		document.querySelector("#beginningPage").onclick = (event) => {
			rhit.offerManager.targetPage = this.startPage;
			this.updateView();
		}

		document.querySelector("#prevPage").onclick = (event) => {
			rhit.offerManager.targetPage -= 1;
			this.updateView();

		}

		document.querySelector("#nextPage").onclick = (event) => {
			rhit.offerManager.targetPage += 1;
			this.updateView();

		}

		document.querySelector("#lastPage").onclick = (event) => {
			rhit.offerManager.targetPage = this.endPage;
			this.updateView();

		}
		this.updateView();
	}

	updateView() {
		rhit.offerManager.getOffers(this.listingID);

		document.querySelector("#startPageTxt").innerText = 1
		document.querySelector("#lastPageTxt").innerText = rhit.offerManager.pages;
	}
}

class OfferManager {
	constructor() {
		this.prevPage = 0;
		this.targetPage = null;
		this.targetConfirmedPage = 0;
		this.maxRows = 12;
		this.pages = 0;
	};

	addOffer = async function (offerJson) {
        //TODO: change addClient to offer when api function is made
		const addOfferStatus = await addOffer(offerJson);
	};

	getOffers = async function (listingID) {
		const offersListJson = await getOffersByListing(listingID);
		let tableBody = document.querySelector("#offersTable");
		this.jsonToTbl(offersListJson, tableBody);
		let table = document.querySelector("#offersTable");
		let rowsInTableLen = table.rows.length; 
		if (this.targetPage == null){
			this.pages = Math.ceil(rowsInTableLen / this.maxRows);
			document.querySelector("#lastPageTxt").innerText = Math.ceil(rowsInTableLen / this.maxRows);
		}
		this.limitOffers();
	}

	jsonToTbl = function (offersJson, selector) {
		var columns = this.addAllColumnHeaders(offersJson, selector);
		for (var i = 0; i < offersJson.length; i++) {
			var row$ = $('<tr/>', {
				id: `row${i}`,
				style: "display:none"
			});
			for (var colIndex = 0; colIndex < columns.length; colIndex++) {
				var cellValue = offersJson[i][columns[colIndex]];
				if (cellValue == null) cellValue = "";
				switch (colIndex) {
					case 0:
						row$.append($('<th/>', {scope: "row"}).html(cellValue));
						break;
					default:
						row$.append($('<td/>').html(cellValue));
				}
			}
			row$.data('index', i);
			let editButton = $('<td/>').html(`<button id="offerEditBtn${i}" class="tblColCont offerEditBtn" type="button" data-toggle="modal"
			data-target="#editOfferDialogue">
			<span id="editIcon" class="material-symbols-outlined">edit</span></button>`);
			let deleteButton = $('<td/>').html(`<button id="offerDeleteBtn${i}" class="tblColCont offerDeleteBtn" type="button">
			<span id="deleteIcon" class="material-symbols-outlined">delete</span></button>`);

			editButton.on("click", function() {
				let rowIndex = $(editButton).parent().data('index');   // jQuery
				let currentOffer = offersJson[rowIndex];
				let modal = document.querySelector("#editOfferDialogue")
                //TODO: Double check offerID matches json if errors
				modal.setAttribute("data-offerID", currentOffer.OfferID)
				document.querySelector("#inputNewOfferValue").value = currentOffer.Price;
				document.querySelector("#inputNewClientID").value = "#";
			})

			deleteButton.on("click", function() {
                //TODO: if this works double check clients.js and hange editButton here to deleteButton
				let rowIndex = $(deleteButton).parent().data('index');   // jQuery
				let currentOffer = offersJson[rowIndex];
				let offerId = currentOffer.OfferID;
                //TODO: refactor to offer when api function is made
				deleteClient(offerId);
			})

			row$.append(editButton);
			row$.append(deleteButton);
			$(selector).append(row$);
		}
	}

	addAllColumnHeaders = function (offersJson, selector) {
		var columnSet = [];
		var headerTr$ = $('<tr/>');

		for (var i = 0; i < offersJson.length; i++) {
			var rowHash = offersJson[i];
			for (var key in rowHash) {
				if ($.inArray(key, columnSet) == -1) {
					columnSet.push(key);
				}
			}
		}
		$(selector).append(headerTr$);

		return columnSet;
	}

	limitOffers() {
		let table = document.querySelector("#offersTable");
		let rowsInTable = table.rows;
		if (this.targetPage == null){
			for (let k = 2; k < this.maxRows; k++) {
                if (rowsInTable[k]){
                    rowsInTable[k].style.display = "table-row";
                }
                else {
                    break;
                }
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

	editOfferInfo(offerJson) {
        //TODO: change to offer when api function is implemented
		updateOffer(offerJson)
	}

    //TODO: implement delete for offer
	// deleteClient(clientID) {
	// 	deleteClient(clientID);
	// }
}