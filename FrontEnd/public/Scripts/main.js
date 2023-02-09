var rhit = rhit || {};

import {LoginPageController} from "./login.js";
import {NavBarController, checkForRedirects, initializePage} from "./navBar.js";
import {ClientPageController} from "./clients.js";
import {ListingPageController} from "./listings.js"

rhit.currentUser = null;

rhit.main = function () {
	console.log("Ready");
	checkForRedirects();
	initializePage();
};

rhit.main();