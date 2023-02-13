var rhit = rhit || {};

import {
	getEmployeeByID,
	getListingByID,
	closeListing,
	deleteListing,
} from "./apiFunctions.js"

const urlParams = new URLSearchParams(window.location.search);

rhit.detailManager = null;
rhit.employeeID = urlParams.get("employeeID");

//TODO: What needs to be displayed on this page:
// -(If time and works the property descr will display here as well)

export class DetailPageController {
	constructor(listingID) {
		this.listingID = listingID;
		rhit.detailManager = new DetailManager(rhit.employeeID, this.listingID);

		document.querySelector("#closeListingButton").onclick = (event) => {
			rhit.detailManager.closeCurrentListing();
			this.updateView();
		    location.reload();
		};

		document.querySelector("#submitEditListing").onclick = (event) => {
			const inputJson = {
                OfferID: offerId,
				Price: document.querySelector("#inputNewOfferValue").value,
                Listing: this.listingID,
				Client: clientId,
			}
            //TODO: Refactor for offer
			rhit.offerManager.editOfferInfo(inputJson);
			this.updateView();
            location.reload();
		};

		document.querySelector("#deleteListing").onclick = (event) => {
			rhit.detailManager.deleteCurrentListing();
			this.updateView();
			window.history.back()
		};

		this.updateView();
	}

	updateView() {
		rhit.detailManager.populateCards();
	}
}

class DetailManager {
	constructor(employeeID, listingID) {
		this.employeeID = employeeID;
		this.listingID = listingID;
	}

	editCurrentListing = async function () {
		
	}

	deleteCurrentListing = async function () {
		await deleteListing(this.listingID)
	}

	closeCurrentListing = async function () {
		let closeDate = new Date();
		await closeListing(this.listingID, closeDate);
	}

	getAssignedEmployee = async function () {
		return await getEmployeeByID(this.employeeID);
	}

	getListingDetails = async function () {
		return await getListingByID(this.listingID);
	}

	populateCards = async function () {
		let employeeJsonRaw = await this.getAssignedEmployee();
		let employeeJSON = employeeJsonRaw[0];
		console.log(employeeJSON);
		console.log("Employee: ", employeeJSON);
		let listingDetailsJsonRaw = await this.getListingDetails();
		let listingDetailsJSON = listingDetailsJsonRaw[0];
		console.log("Listing: ", listingDetailsJSON);

		document.querySelector("#employeeUsername").innerHTML += employeeJSON.Username
		document.querySelector("#employeeName").innerHTML += employeeJSON.FName + " " + employeeJSON.LName

		var newPostDate = new Date(listingDetailsJSON.PostDate);
		let newPostDateFinal = new Intl.DateTimeFormat('en-US').format(newPostDate);
		let newCloseDateFinal;

		if (!listingDetailsJSON.CloseDate) {
			document.querySelector("#closeDate").innerHTML += "Currently Active";
		}
		else {
			var newCloseDate = new Date(listingDetailsJSON.CloseDate);
			let newCloseDateFinal = new Intl.DateTimeFormat('en-US').format(newCloseDate);
			document.querySelector("#closeDate").innerHTML += newCloseDateFinal;
		}

		document.querySelector("#postDate").innerHTML += newPostDateFinal;

		document.querySelector('#address').innerHTML += listingDetailsJSON.Address;
		document.querySelector('#description').innerHTML += "Desc can go here when DB is updated";
		
	}
}