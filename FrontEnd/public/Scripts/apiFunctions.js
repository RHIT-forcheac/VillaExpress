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
        const response = await fetch(`http://localhost:8090/api/employee/?username=${username}?password=${password}`,{
            method: 'POST',
        });
        const myJson = await response.json(); 
        return myJson
    }