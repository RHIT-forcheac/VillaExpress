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

export async function getOffersByListing(listingId) {
    const response = await fetch(`http://localhost:8090/api/offer/${listingId}`);
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

export async function addClient(clientJson) {
    const response = await fetch(`http://localhost:8090/api/client`, {
        method: 'POST',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientJson),
    });
    const myJson = await response.json();
    return myJson
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

export async function updateClient(clientJson) {
    const response = await fetch(`http://localhost:8090/api/client`, {
        method: 'PUT',
        headers: {
            'Accept': '/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientJson),
    });
    const myJson = await response.json();
    return myJson
}

export async function deleteClient(clientID) {
    const response = await fetch(`http://localhost:8090/api/client/${clientID}`, {
        method: 'DELETE',
        headers: {
            'Accept': '/*',
        },
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