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
	checkForRedirects();
	initializePage();
};

rhit.main();