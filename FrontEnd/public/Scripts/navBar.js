var rhit = rhit || {};

import {LoginPageController} from "./login.js";
import {ClientPageController} from "./clients.js";
import {ListingPageController} from "./listings.js"
import {OfferPageController} from "./offer.js"
import { DetailPageController } from "./listingDetails.js";

rhit.navBarManager = null;
rhit.employeeID = null;

export class NavBarController{
	constructor() {
		rhit.navBarManager = new NavBarManager();

		document.querySelector("#homePageButton").onclick = (event) => {
			window.location.href = `../homeScreen.html?employeeID=${rhit.employeeID}`;
			this.initializePage();
		};

		document.querySelector("#clientsPageButton").onclick = (event) => {
			window.location.href = `../clients.html?employeeID=${rhit.employeeID}`;
			this.initializePage();
		};

        document.querySelector("#listingsPageButton").onclick = (event) => {
			window.location.href = `../listings.html?employeeID=${rhit.employeeID}`;
			this.initializePage();
		};

        document.querySelector("#firmPageButton").onclick = (event) => {
			window.location.href = `../firm.html?employeeID=${rhit.employeeID}`;
			this.initializePage();
		};

		document.querySelector("#menuSignOut").onclick = (event) => {
			window.location.href = `../index.html`;
			this.initializePage();
		};
	}

	updateView() {

	}
}

class NavBarManager {
	constructor() {

	}

}

export function checkForRedirects() {
	if (document.querySelector("#loginPage") && rhit.currentUser) {
		window.location.href = "../homeScreen.html";
	}
	if (!document.querySelector("#loginPage") && !! rhit.currentUser) {
		window.location.href = "/";
	}
};

export function initializePage() {
	const urlParams = new URLSearchParams(window.location.search);

	if(document.querySelector("#homePage")){
		console.log("You are on the home page");
		document.querySelector("#homePageButton").style.borderBottom = '0.214rem solid';
		rhit.employeeID = urlParams.get("employeeID");
		new NavBarController();
	}

	if(document.querySelector("#clientsMainPage")){
		console.log("You are on the clients page");
		rhit.employeeID = urlParams.get("employeeID");
		document.querySelector("#clientsPageButton").style.borderBottom = '0.214rem solid';
		new NavBarController();
		new ClientPageController();
	}

	if(document.querySelector("#listingsPage")){
		console.log("You are on the listings page");
		const employeeID = urlParams.get("employeeID");
		document.querySelector("#listingsPageButton").style.borderBottom = '0.214rem solid';
		rhit.employeeID = employeeID;
		new NavBarController();
		new ListingPageController(employeeID);
	}

	if(document.querySelector("#firmPage")){
		console.log("You are on the firm page");
		rhit.employeeID = urlParams.get("employeeID");
		document.querySelector("#firmPageButton").style.borderBottom = '0.214rem solid';
		new NavBarController();
		//TODO: Add firm controller when page is finished
		//new ClientPageController();
	}

	if(document.querySelector("#offersPage")){
		console.log("You are on the offers page");
		rhit.employeeID = urlParams.get("employeeID");
		const listingID = urlParams.get("listingID");
		new NavBarController();
		new OfferPageController(listingID);
	}

	if(document.querySelector("#detailPage")){
		console.log("You are on the details page");
		rhit.employeeID = urlParams.get("employeeID");
		const listingID = urlParams.get("listingID");
		new NavBarController();
		new DetailPageController(listingID);
	}

	if(document.querySelector("#loginPage")){
		console.log("You are on the login page");
		new LoginPageController();
	}
}