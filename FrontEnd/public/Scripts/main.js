var rhit = rhit || {};

import {LoginPageController} from "./login.js";
import {NavBarController, checkForRedirects, initializePage} from "./navBar.js";
import {ClientPageController} from "./clients.js";
import {ListingPageController} from "./listings.js"

rhit.currentUser = null;


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

	addClient = async function (clientJson) {
		const addClientStatus = await addClient(clientJson);
		console.log("client add status: ", addClientStatus);
	};

    loadClient = function (){
        //const data = require();
        //console.log(data);
        let json = JSON.parse(fs.readFileSync(clienturl).toString());
        let data = json.data;
        for(let i = 0; i < data.length; i++){
            let newID = data[i].ID;
            let newinfo = data[i].split(", ");
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
				email:newemail,
				active: newstate,
				firmID: newfirmid
			}
			rhit.ImportManager.insertClient(inputJson);
        }
    };

	addClient = async function (clientJson) {
		const addClientStatus = await addClient(clientJson);
		console.log("client add status: ", addClientStatus);
	};

    loadClient = function (){
        //const data = require();
        //console.log(data);
        let json = JSON.parse(fs.readFileSync(clienturl).toString());
        let data = json.data;
        for(let i = 0; i < data.length; i++){
            let newID = data[i].ID;
            let newName = data[i].CompanyName;
			let newAddress = data[i].Address
            
			//continue to sprocs
			const inputJson = {
				FirmID: newID,
				phoneNumber: newphone,
				address: newadd,
				email:newemail,
				active: newstate,
				firmID: newfirmid
			}
			rhit.ImportManager.insertClient(inputJson);
			
			//console.log('rhit.ImportManager.insertClient(inputJson); :>> ', rhit.ImportManager.insertClient(inputJson););
        }
    };
}


rhit.main = function () {
	console.log("Ready");
	checkForRedirects();
	initializePage();
};

rhit.main();