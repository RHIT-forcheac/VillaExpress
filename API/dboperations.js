var config = require('./dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');


//get all employees
// async function getEmployees() {
//     try {
//         let pool = await sql.connect(config);
//         let employees = await pool.request().query("SELECT * from Employee");
//         return employees.recordsets;
//     } catch (error) {
//         console.log(error);
//     }
// }

async function getEmployeeByID(id) {
    try {
        let pool = await sql.connect(config);
        let employee = await pool.request()
            .input('EmployeeID', sql.Int, id)
            .execute('getEmployeeTable')
        return employee.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getOffersByListing(listingID) {
    try {
        let pool = await sql.connect(config);
        let newOffersList = await pool.request()
            .input('listingID', sql.Int, listingID)
            .execute('getOffersByListing');
        return newOffersList.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function getClientByID(clientId) {
    try {
        let pool = await sql.connect(config);
        let client = await pool.request()
            .input('ClientID', sql.Int, clientId)
            .execute('getClientTable')
        return client.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getClients() {
    try {
        let pool = await sql.connect(config);
        let newClientsList = await pool.request()
            .execute('getClients');
        return newClientsList.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function getListings() {
    try {
        let pool = await sql.connect(config);
        let newListingsList = await pool.request()
            .execute('getListings');
        return newListingsList.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function addClient(fName, lName, dob, phoneNumber, address, email, active) {
    try {
        console.log("dob", dob);
        let pool = await sql.connect(config);
        let newClient = await pool.request()
            .input('fname', sql.VarChar, fName)
            .input('lname', sql.VarChar, lName)
            .input('dob', sql.Date, dob)
            .input('phoneNumber', sql.Char, phoneNumber)
            .input('address', sql.VarChar, address)
            .input('email', sql.VarChar, email)
            .input('active', sql.Bit, active)
            .execute('addClient');
        return newClient.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function addListing(EmployeeAssignDate, CloseDate, PostDate, Address, State) {
    try {
        let pool = await sql.connect(config);
        let newListing = await pool.request()
            .input('EmployeeAssignDate', sql.Date, EmployeeAssignDate)
            .input('CloseDate', sql.Date, CloseDate)
            .input('PostDate', sql.Date, PostDate)
            .input('Address', sql.VarChar, Address)
            .input('State', sql.VarChar, State)
            .execute('addListing');
        return newListing.recordsets;
    } catch(err) {
        console.log(err);
    }
}

async function addOffer(price, listing, client) {
    try {
        let pool = await sql.connect(config);
        let newOffer = await pool.request()
            .input('Price', sql.Money, price)
            .input('Listing', sql.Int, listing)
            .input('Client', sql.Int, client)
            .execute('addOffer');
        return newOffer.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function updateClient(clientID, fName, lName, dob, phoneNumber, address, email, active) {
    try {
        let pool = await sql.connect(config);
        let newClient = await pool.request()
            .input('clientID', sql.Int, clientID)
            .input('fname', sql.VarChar, fName)
            .input('lname', sql.VarChar, lName)
            .input('dob', sql.Date, dob)
            .input('phoneNumber', sql.Char, phoneNumber)
            .input('address', sql.VarChar, address)
            .input('email', sql.VarChar, email)
            .input('active', sql.Bit, active)
            .execute('updateClient');
        return newClient.recordsets;
    } catch(err) {
        console.log(err);
    }
}

async function deleteListing(listingID) {
    try {
        let pool = await sql.connect(config);
        let listingDeleted = await pool.request()
            .input('listingID', sql.Int, listingID)
            .execute('deleteListing');
        return listingDeleted.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function deleteClient(clientID) {
    try {
        let pool = await sql.connect(config);
        let clientDeleted = await pool.request()
            .input('clientID', sql.Int, clientID)
            .execute('deleteClient');
        return clientDeleted.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function deleteOffer(offerID) {
    try {
        let pool = await sql.connect(config);
        let offerDeleted = await pool.request()
            .input('OfferID', sql.Int, offerID)
            .execute('deleteOffer');
        return offerDeleted.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function registerNewUser(username, password) {
    try {
        var salt = getNewSalt();
        var hash = hashPassword(password, salt);
        let pool = await sql.connect(config);
        let newEmployee = await pool.request()
            .input('EmployeeID', sql.Int, 4)
            .input('Username', sql.NVarChar, username)
            .input('PasswordHash', sql.NVarChar, hash)
            .input('PasswordSalt', sql.NVarChar, salt)
            .execute('registerUser');
        return newEmployee.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function loginUser(username, password) {
    try {
        let pool = await sql.connect(config);
        let loginStatus = await pool.request()
            .input('username', sql.VarChar, username)
            .input('passwordHash', sql.VarChar, password)
            .output('result', sql.Bit)
            .output('employeeID', sql.Int)
            .execute('logInUser')
        return [loginStatus.output.result, loginStatus.output.employeeID];
    } catch (err) {
        console.log("login user failed", err, "username:" +  username, "passwordHash:" + password);
    }
}

function getNewSalt() {
    return bcrypt.genSaltSync(10);;
}

function hashPassword(password, salt) {
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    getEmployeeByID: getEmployeeByID,
    getOffersByListing: getOffersByListing,
    getClientByID: getClientByID,
    getClients: getClients,
    getListings: getListings, 
    addClient: addClient,
    addListing: addListing,
    addOffer: addOffer,
    updateClient: updateClient,
    deleteClient: deleteClient,
    deleteListing: deleteListing,
    deleteOffer: deleteOffer,
    registerNewUser: registerNewUser,
    loginUser: loginUser,
}