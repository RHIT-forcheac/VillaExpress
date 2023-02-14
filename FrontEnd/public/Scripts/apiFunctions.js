export async function getFirms() {
    const response = await fetch(`http://localhost:8090/api/firm`);
    const myJson = await response.json();
    return myJson
}

export async function getEmployeeByID(id) {
    const response = await fetch(`http://localhost:8090/api/employee?id=${id}`);
    const myJson = await response.json();
    return myJson
}

export async function getOffersByListing(listingID, orderID, orderPrice) {
    const response = await fetch(`http://localhost:8090/api/offer/?` + new URLSearchParams({
        listingID: listingID,
        orderID: orderID,
        orderPrice: orderPrice
    }));
    const myJson = await response.json();
    const finalJson = [];
    for (let i = 0; i < myJson.length; i  ++) {
        const associatedClientJSON = await getClientByID(myJson[i].Client);
        const newOfferJSON = {
            OfferID: myJson[i].OfferID,
            Price: myJson[i].Price,
            FName: associatedClientJSON[0].FName,
            LName: associatedClientJSON[0].LName,
        }
        finalJson.push(newOfferJSON);
    }
    return finalJson
}

export async function getListings() {
    const response = await fetch(`http://localhost:8090/api/listing`);
    const myJson = await response.json();
    return myJson
}

export async function getListingsForEmployee(employeeID) {
    const response = await fetch(`http://localhost:8090/api/employeeListings/${employeeID}`);
    const myJson = await response.json();
    return myJson
}

export async function getListingByID(listingID) {
    const response = await fetch(`http://localhost:8090/api/listing/${listingID}`);
    const myJson = await response.json();
    return myJson
}

export async function getOfferCountFromListing(listingID) {
    const response = await fetch(`http://localhost:8090/api/offerCount/${listingID}`, {
        method: 'GET',
        accept: '/*'
    });
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
}

export async function getClientByID(clientID) {
    const response = await fetch(`http://localhost:8090/api/client/${clientID}`);
    const myJson = await response.json();
    return myJson
}

export async function getClients() {
    const response = await fetch(`http://localhost:8090/api/client`);
    const myJson = await response.json();
    return myJson
}

export async function getClientsForEmployee(employeeID, orderID, orderFName, orderLName, orderActive) {
    const response = await fetch(`http://localhost:8090/api/clientEmployee/?` + new URLSearchParams({
        employeeID: employeeID,
        orderID: orderID,
        orderFName: orderFName,
        orderLName: orderLName,
        orderActive: orderActive
    }));
    const myJson = await response.json();
    return myJson
}

export async function addFirm(firmJSON) {
    const response = await fetch(`http://localhost:8090/api/firm`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listingJSON),
    });
    const myJson = await response.json();
    return myJson
}

export async function addClient(clientJson, employeeID) {
    const response = await fetch(`http://localhost:8090/api/client?employeeID=${employeeID}`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientJson),
    });
    return response;
}

export async function addListing(listingJSON) {
    const response = await fetch(`http://localhost:8090/api/listing`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listingJSON),
    });
    const myJson = await response.json();
    return myJson
}

export async function addOffer(offerJson) {
    const response = await fetch(`http://localhost:8090/api/offer`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerJson),
    });
    return response;
}

export async function updateClient(clientJson) {
    const response = await fetch(`http://localhost:8090/api/client`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientJson),
    });
    return response;
}

export async function updateOffer(offerJson) {
    const response = await fetch(`http://localhost:8090/api/offer`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerJson),
    });
    return response
}

export async function updateListing(listingID, address) {
    const response = await fetch(`http://localhost:8090/api/listing/${listingID}/${address}`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
        }
    });
    return response
}

export async function updateFirm(firmID, CompanyName, Address) {
    const response = await fetch(`http://localhost:8090/api/firm/${firmID}/${CompanyName}/${Address}`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
        }
    });
    return response
}

export async function deleteClient(clientID) {
    const response = await fetch(`http://localhost:8090/api/client/${clientID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    //const myJson = await response.json();
    return response
}

export async function getClientByID(clientID) {
    const response = await fetch(`http://localhost:8090/api/client/${clientID}`);
    const myJson = await response.json();
    return myJson
}

export async function getClients() {
    const response = await fetch(`http://localhost:8090/api/client`);
    const myJson = await response.json();
    return myJson
}

export async function addFirm(firmJson) {
    const response = await fetch(`http://localhost:8090/api/firm`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(firmJson),
    });
    const myJson = await response.json();
    return myJson
}

export async function deleteFirm(firmID) {
    const response = await fetch(`http://localhost:8090/api/firm/${firmID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
}

export async function getFirm(employeeID) {
    const response = await fetch(`http://localhost:8090/api/firm/${employeeID}`); 
    const myJson = await response.json();
    return myJson
}

export async function addEmployeeToFirm(employeeID, firmID) {
    const response = await fetch(`http://localhost:8090/api/firm/${employeeID}/${firmID}`);
    const myJSON = await response.json();
    return myJSON
}

export async function checkAdminAccess(employeeID) {
    const response = await fetch(`http://localhost:8090/api/${employeeID}`);
    const myJSON = await response.json();
    return myJSON
}

export async function addListing(listingJSON) {
    const response = await fetch(`http://localhost:8090/api/listing`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listingJSON),
    });
    const myJson = await response.json();
    return myJson
}

export async function deleteListing(listingID) {
    const response = await fetch(`http://localhost:8090/api/listing/${listingID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
}

export async function deleteOffer(offerID) {
    const response = await fetch(`http://localhost:8090/api/offer/${offerID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    return response
}

export async function deleteFirm(firmID) {
    const response = await fetch(`http://localhost:8090/api/firm/${firmID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
}

export async function closeListing(listingID, closeDate) {
    const response = await fetch(`http://localhost:8090/api/closeListing/${listingID}&${closeDate}`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
}

export async function loginUser(username, password) {
    const response = await fetch(`http://localhost:8090/api/employee/${username}&${password}`, {
        method: 'GET',
        accept: '/*'
    });
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
}

export async function registerUser(username, password) {
    const response = await fetch(`http://localhost:8090/api/employee/?username=${username}?password=${password}`, {
        method: 'POST',
    });
    const myJson = await response.json();
    return myJson
}