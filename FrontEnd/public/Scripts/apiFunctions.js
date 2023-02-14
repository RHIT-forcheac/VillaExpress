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