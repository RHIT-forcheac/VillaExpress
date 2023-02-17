export async function getFirms() {
    try {
    const response = await fetch(`http://localhost:8090/api/firm`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getEmployeeByID(id) {
    try {
    const response = await fetch(`http://localhost:8090/api/employee?id=${id}`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getOffersByListing(listingID, orderID, orderPrice) {
    try {
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
    } catch (err) {
        console.log(err);
    }
}

export async function getListings() {
    try {
    const response = await fetch(`http://localhost:8090/api/listing`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getListingsForEmployee(employeeID) {
    try {
    const response = await fetch(`http://localhost:8090/api/employeeListings/${employeeID}`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getListingByID(listingID) {
    try {
    const response = await fetch(`http://localhost:8090/api/listing/${listingID}`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getOfferCountFromListing(listingID) {
    try{
    const response = await fetch(`http://localhost:8090/api/offerCount/${listingID}`, {
        method: 'GET',
        accept: '/*'
    });
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
    } catch (err) {
        console.log(err);
    } 
}

export async function getClientByID(clientID) {
    try{
    const response = await fetch(`http://localhost:8090/api/client/${clientID}`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getClients() {
    try{
    const response = await fetch(`http://localhost:8090/api/client`);
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function getClientsForEmployee(employeeID, orderID, orderFName, orderLName, orderActive) {
    try {
    const response = await fetch(`http://localhost:8090/api/clientEmployee/?` + new URLSearchParams({
        employeeID: employeeID,
        orderID: orderID,
        orderFName: orderFName,
        orderLName: orderLName,
        orderActive: orderActive
    }));
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function addFirm(firmJSON) {
    try {
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
    } catch (err) {
        console.log(err);
    } 
}

export async function addClient(clientJson, employeeID) {
    try {
    const response = await fetch(`http://localhost:8090/api/client?employeeID=${employeeID}`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientJson),
    });
    return response;
    } catch (err) {
        console.log(err);
    }   
}

export async function addListing(listingJSON) {
    try {
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
    } catch (err) {
        console.log(err);
    }
}

export async function addOffer(offerJson) {
    try {
    const response = await fetch(`http://localhost:8090/api/offer`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerJson),
    });
    return response;   
    } catch (err) {
        console.log(err);
    }
}

export async function updateClient(clientJson) {
    try {
    const response = await fetch(`http://localhost:8090/api/client`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientJson),
    });
    return response;
    } catch (err) {
        console.log(err);
    }
}

export async function updateOffer(offerJson) {
    try {
    const response = await fetch(`http://localhost:8090/api/offer`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerJson),
    });
    return response
    } catch (err) {
        console.log(err);
    }
}

export async function updateListing(listingID, address) {
    try {
    const response = await fetch(`http://localhost:8090/api/listing/${listingID}/${address}`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
        }
    });
    return response
    } catch (err) {
        console.log(err);
    }
}

export async function deleteClient(clientID) {
    try {
    const response = await fetch(`http://localhost:8090/api/client/${clientID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    //const myJson = await response.json();
    return response
    } catch (err) {
        console.log(err);
    }
}

export async function deleteListing(listingID) {
    try {
    const response = await fetch(`http://localhost:8090/api/listing/${listingID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function deleteOffer(offerID) {
    try {
    const response = await fetch(`http://localhost:8090/api/offer/${offerID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    return response
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFirm(firmID) {
    try {
    const response = await fetch(`http://localhost:8090/api/firm/${firmID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function closeListing(listingID, closeDate) {
    try {
    const response = await fetch(`http://localhost:8090/api/closeListing/${listingID}&${closeDate}`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
        },
    });
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}

export async function loginUser(username, password) {
    try {
    const response = await fetch(`http://localhost:8090/api/employee/${username}&${password}`, {
        method: 'GET',
        accept: '/*'
    });
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
    } catch (err) {
        console.log(err);
    }
}

export async function registerUser(username, password) {
    try {
    const response = await fetch(`http://localhost:8090/api/employee/?username=${username}?password=${password}`, {
        method: 'POST',
    });
    const myJson = await response.json();
    return myJson
    } catch (err) {
        console.log(err);
    }
}