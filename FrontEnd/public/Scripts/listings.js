var rhit = rhit || {};
//TODO: Add images (if time not high priority)
//  unsplash has real estate images and an accompanying api
//TODO: have offers badge display number of actual offers (probably will need a new sproc)

import {
	getListings,
	getOfferCountFromListing,
} from "./apiFunctions.js"

rhit.listingPageManager = null;

export class ListingPageController {
	constructor() {
		rhit.listingPageManager = new ListingPageManager();
		this.updateView();
	}

	updateView() {
		rhit.listingPageManager.populateListings();
	}
}

class ListingPageManager {
	constructor() {

	}

	getListings = async function() {
		const listingsJson = await getListings();
		return listingsJson;
	}

	createCard = async function(currentRow, currentListing) {
		const newCol = document.createElement("div");
		newCol.className = "col";

		const newCard = document.createElement("div");
		newCard.className = "card";
		newCard.style = "width: 18rem;";

		const newImage = document.createElement("img");
		newImage.className = "card-img-top";
		newImage.src = "Insert source when populated in db";
		newImage.alt = "House image will go here";

		const newCardBody = document.createElement("div");
		newCardBody.className = "card-body";

		const newAddress = document.createElement("h5");
		newAddress.className = "card-title";
		newAddress.innerHTML = currentListing.Address;

		const newDescription = document.createElement("p");
		newDescription.innerText = "Description of the lovely home";

		let newDetailsButton = document.createElement("button");
        newDetailsButton.type = "button";
		newDetailsButton.className = "btn btn-primary";
		newDetailsButton.innerHTML = "Details";

        newDetailsButton.onclick = ((event) => {
            console.log("Details clicked for listing: ", currentListing.ListingID);
            window.location.href = `../listingDetails.html?listingID=${currentListing.ListingID}`;
        })

		let newOffersButton = document.createElement("button");
		newOffersButton.type = "button";
		newOffersButton.className = "btn btn-primary";
		newOffersButton.innerHTML = "Offers"

        newOffersButton.onclick = ((event) => {
            window.location.href = `../offers.html?listingID=${currentListing.ListingID}`;
        })

		const newIconCounter = document.createElement("span");
		newIconCounter.className = "badge badge-pill badge-success";
		//TODO: implement offers and replace with actual number
		newIconCounter.innerHTML = await getOfferCountFromListing(currentListing.ListingID);

		newOffersButton.appendChild(newIconCounter);
		newCardBody.appendChild(newAddress);
		newCardBody.appendChild(newDescription);
		newCardBody.appendChild(newDetailsButton);
		newCardBody.appendChild(newOffersButton);
		newCard.appendChild(newImage);
		newCard.appendChild(newCardBody);
		newCol.appendChild(newCard);
		currentRow.appendChild(newCol);
	}
	
	createNewRow = function() {
		const newRow = document.createElement("div");
		newRow.className = "row";
		const element = document.getElementById("listingsPage");
		element.appendChild(newRow);
		return newRow;
	}

	populateListings = async function() {
		const listingsJson = await this.getListings();
		console.log(listingsJson);
		const listingsCount = listingsJson.length;
		const numOfRows = Math.ceil(listingsCount/3);
		for (let i = 0; i < numOfRows; i ++){
			const newRow = this.createNewRow();
			for (let j = 0; j < 3; j++){
				const currentListing = listingsJson.shift()
                if (currentListing) {
                    this.createCard(newRow, currentListing);
                }
			}
		}
	}

}
