var rhit = rhit || {};

import {
	getOffersByListing,
    addOffer,
    deleteOffer,
    updateOffer,
} from "./apiFunctions.js"

//TODO: Create API functions/sprocs for offers
//TODO: fix pages not functioning properly

rhit.offerManager = null;

export class OfferPageController {
	constructor(listingID) {

		this.startPage = 0;
		this.currPage = 1;
		this.endPage = 0;
        this.listingID = listingID;
		this.idFilter = '';
		this.offerFilter = '';
		rhit.offerManager = new OfferManager();

		document.querySelector("#submitAddOffer").onclick = (event) => {
			const inputJson = {
				Price: document.querySelector("#inputOfferValue").value,
                Listing: this.listingID,
				Client: document.querySelector("#inputClientID").value,
			}
			rhit.offerManager.addOffer(inputJson).then((params) => {
				rhit.offerManager.targetPage = null;
				this.updateView();
			});
		};

		document.querySelector("#submitEditOffer").onclick = async (event) => {
			let offerId = document.querySelector("#editOfferDialogue").getAttribute("data-offerID");
            let clientId = document.querySelector("#inputNewClientID").value
            if (!clientId) {
                clientId = null;
            }
            console.log(offerId);
			const inputJson = {
                OfferID: offerId,
				Price: document.querySelector("#inputNewOfferValue").value,
                Listing: this.listingID,
				Client: clientId,
			}
			await rhit.offerManager.editOfferInfo(inputJson).then((params) => {
				rhit.offerManager.targetPage = null;
				this.updateView();
			});
		};

		document.querySelector("#submitDeleteOffer").onclick = async (event) => {
			let offerID = document.querySelector("#deleteOfferDialogue").getAttribute("data-offerID");
			await rhit.offerManager.deleteOffer(offerID).then((params) => {
				rhit.offerManager.targetPage = null;
				this.updateView();
			});
		};

		document.querySelector("#beginningPage").onclick = (event) => {
			rhit.offerManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#prevPage").onclick = (event) => {
			if (rhit.offerManager.targetPage - 1 >= 0){
				rhit.offerManager.targetPage -= 1;
				this.updateView();
			}
		}

		document.querySelector("#nextPage").onclick = (event) => {
			if (rhit.offerManager.targetPage + 1 < rhit.offerManager.pages){
				rhit.offerManager.targetPage += 1;
				this.updateView();
			}
		}

		document.querySelector("#lastPage").onclick = (event) => {
			if (rhit.offerManager.targetPage < rhit.offerManager.pages - 1){
				rhit.offerManager.targetPage = rhit.offerManager.pages - 1;
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
			rhit.offerManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#offerFilterArrow").onclick = (event) => {
			if (!this.offerFilter){
				this.offerFilter = 1;
				document.querySelector("#offerFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			}
			else {
				this.offerFilter = 0;
				document.querySelector("#offerFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_more</span>';
			}			
			rhit.offerManager.targetPage = null;
			this.updateView();
		}

		document.querySelector("#resetFiltersBtn").onclick = (event) => {
			this.idFilter = '';
			this.offerFilter = '';
			document.querySelector("#idFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';
			document.querySelector("#offerFilterArrow").innerHTML = '<span class="material-symbols-outlined">expand_less</span>';	
			rhit.offerManager.targetPage = null;
			this.updateView();
		}

		this.updateView();
	}

	updateView() {
		console.log(rhit.offerManager.targetPage);
		rhit.offerManager.getOffers(this.listingID, this.idFilter, this.offerFilter);
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
		const addOfferStatus = await addOffer(offerJson);
		return addOfferStatus;
	};

	getOffers = async function (listingID, idFilter, offerFilter) {
		const offersListJson = await getOffersByListing(listingID, idFilter, offerFilter);
		document.querySelector("#offersTableBody").innerHTML = "";
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
			let deleteButton = $('<td/>').html(`<button id="offerDeleteBtn${i}" class="tblColCont offerDeleteBtn" type="button"
			data-toggle="modal"data-target="#deleteOfferDialogue">
			<span id="deleteIcon" class="material-symbols-outlined">delete</span></button>`);

			editButton.on("click", function() {
				let rowIndex = $(editButton).parent().data('index');   // jQuery
				let currentOffer = offersJson[rowIndex];
				let modal = document.querySelector("#editOfferDialogue")
				modal.setAttribute("data-offerID", currentOffer.OfferID)
				document.querySelector("#inputNewOfferValue").value = currentOffer.Price;
			})

			deleteButton.on("click", function() {
                let rowIndex = $(deleteButton).parent().data('index'); 
				let currentOffer = offersJson[rowIndex];
				let modal = document.querySelector("#deleteOfferDialogue");
				modal.setAttribute("data-offerID", currentOffer.OfferID);
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

	editOfferInfo(offerJson) {
		let editOfferStatus = updateOffer(offerJson);
		return editOfferStatus;
	}

	deleteOffer = async function(offerID) {
		let deleteOfferStatus = deleteOffer(offerID);
		return deleteOfferStatus;
	}
}