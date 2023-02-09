var rhit = rhit || {};

// import {
// 	getOffersByListing,
//     addOffer,
//     deleteOffer,
//     updateOffer,
// } from "./apiFunctions.js"

rhit.detailManager = null;

//TODO: What needs to be displayed on this page:
//  -Employee Assign Date
    // -Employee ID (Or first last name whichever is better) 
    // -The closing date if it has already closed
    // -The posting date
    // -The address
    // -(If time and works the property image and descr will display here as well)
    // -TODO:could be cool to do a bootstrap carsel if enough images are available

export class DetailPageController {
	constructor(listingID) {
        this.listingID = listingID;
		rhit.detailManager = new DetailManager();

		// document.querySelector("#submitAddOffer").onclick = (event) => {
		// 	const inputJson = {
		// 		Price: document.querySelector("#inputOfferValue").value,
        //         Listing: this.listingID,
		// 		Client: document.querySelector("#inputClientID").value,
		// 	}
		// 	rhit.detailManager.addOffer(inputJson);
		// 	this.updateView();
        //     location.reload();
		// };
		this.updateView();
	}

	updateView() {
        //TODO: refactor for details
		//rhit.detailManager.getOffers(this.listingID);
	}
}

class DetailManager {
	constructor() {

	};

	// addOffer = async function (offerJson) {
	// 	const addOfferStatus = await addOffer(offerJson);
	// };

	// getOffers = async function (listingID) {
	// 	const offersListJson = await getOffersByListing(listingID);
	// 	let tableBody = document.querySelector("#offersTable");
	// 	this.jsonToTbl(offersListJson, tableBody);
	// 	let table = document.querySelector("#offersTable");
	// 	let rowsInTableLen = table.rows.length; 
	// 	if (this.targetPage == null){
	// 		this.pages = Math.ceil(rowsInTableLen / this.maxRows);
	// 		document.querySelector("#lastPageTxt").innerText = Math.ceil(rowsInTableLen / this.maxRows);
	// 	}
	// 	this.limitOffers();
	// }
}