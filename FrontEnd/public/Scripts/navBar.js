var rhit = rhit || {};

import {LoginPageController} from "./login.js";
import {ClientPageController} from "./clients.js";
import {ListingPageController} from "./listings.js"
import {OfferPageController} from "./offer.js"

rhit.navBarManager = null;

export class NavBarController{
	constructor() {
		rhit.navBarManager = new NavBarManager();
        //rhit.currentPage = 'homePage'

        //TODO: Build on clicks for navbar links
		document.querySelector("#homePageButton").onclick = (event) => {
			//TODO: Navigate to proper page and construct correct controller
			console.log("home clicked");
			window.location.href = "../homeScreen.html";
			this.initializePage();
		};

		document.querySelector("#clientsPageButton").onclick = (event) => {
            //TODO: Navigate to proper page and construct correct controller
			console.log("clients clicked");
			window.location.href = "../clients.html";
			this.initializePage();
		};

        document.querySelector("#listingsPageButton").onclick = (event) => {
			//TODO: Navigate to proper page and construct correct controller
			window.location.href = "../listings.html";
			this.initializePage();
		};

        document.querySelector("#firmPageButton").onclick = (event) => {
			//TODO: Navigate to proper page and construct correct controller
			window.location.href = "../firm.html";
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
	if (!document.querySelector("#loginPage") && !!rhit.currentUser) {
		window.location.href = "/";
	}
};

export function initializePage() {
	const urlParams = new URLSearchParams(window.location.search);

	if(document.querySelector("#homePage")){
		console.log("You are on the home page");
		new NavBarController();
	}

	if(document.querySelector("#clientsMainPage")){
		console.log("You are on the clients page");
		new ClientPageController();
	}

	if(document.querySelector("#listingsPage")){
		console.log("You are on the listings page");
		new ListingPageController();
	}

	if(document.querySelector("#firmPage")){
		console.log("You are on the firm page");
		//TODO: Add firm controller when page is finished
		//new ClientPageController();
	}

	if(document.querySelector("#offersPage")){
		console.log("You are on the offers page");
		const listingID = urlParams.get("listingID");
		new OfferPageController(listingID);
	}

	if(document.querySelector("#loginPage")){
		console.log("You are on the login page");
		new LoginPageController();
	}
}