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

async function getClientsForEmployee(employeeID, orderID, orderFName, orderLName, orderActive) {
    console.log(orderActive);
    try {
        let pool = await sql.connect(config);
        let newClientsOfEmployee = await pool.request()
            .input('employeeID', sql.Int, employeeID)
            .input('orderID', sql.Bit, orderID)
            .input('orderFName', sql.Bit, orderFName)
            .input('orderLName', sql.Bit, orderLName)
            .input('orderActive', sql.Bit, orderActive)
            .execute('getClientsForEmployee');
        return newClientsOfEmployee.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function getListingByID(listingID) {
    try {
        let pool = await sql.connect(config);
        let listing = await pool.request()
            .input('ListingID', sql.Int, listingID)
            .execute('getListingTable')
        return listing.recordsets;
    } catch (error) {
        console.log(error);
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

async function getListingsForEmployee(employeeID) {
    try {
        let pool = await sql.connect(config);
        let newEmployeeListings = await pool.request()
            .input('EmployeeID', sql.Int, employeeID)
            .execute('getListingsByEmployeeID');
        return newEmployeeListings.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function getOfferCountFromListing(listingID) {
    try {
        let pool = await sql.connect(config);
        let newOfferCount = await pool.request()
            .input('ListingID', sql.Int, listingID)
            .output('OfferCount', sql.Int)
            .execute('getOfferCountFromListing');
        return newOfferCount.output.OfferCount;
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

async function addListing(EmployeeID, PostDate, Address) {
    try {
        let pool = await sql.connect(config);
        let newListing = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('CloseDate', sql.Date, null)
            .input('PostDate', sql.Date, PostDate)
            .input('Address', sql.VarChar, Address)
            .input('State', sql.Bit, 1)
            .execute('addListing');
        return newListing.recordsets;
    } catch (err) {
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
        console.log(err);
    }
}

async function updateListing(listingID, address) {
    try {
        let pool = await sql.connect(config);
        let updatedListing = await pool.request()
            .input('ID', sql.Int, listingID)
            .input('address', sql.VarChar, address)
            .execute('updateListing');
        return updatedListing.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function updateOffer(offerID, price, listing, client) {
    try {
        let pool = await sql.connect(config);
        let updatedOffer = await pool.request()
            .input('ID', sql.Int, offerID)
            .input('price', sql.Money, price)
            .input('listing', sql.Int, listing)
            .input('client', sql.Int, client)
            .execute('updateOffer');
        return updatedOffer.recordsets;
    } catch (err) {
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

async function closeListing(listingID, closeDate) {
    try {
        let pool = await sql.connect(config);
        let updatedListing = await pool.request()
            .input('ID', sql.Int, listingID)
            .input('closeDate', sql.Date, closeDate)
            .input('state', sql.Bit, 0)
            .execute('updateListing');
        return updatedListing.recordsets;
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
        console.log("login user failed", err, "username:" + username, "passwordHash:" + password);
    }
}

function getNewSalt() {
    return bcrypt.genSaltSync(10);;
}

function hashPassword(password, salt) {
    return bcrypt.hashSync(password, salt);
}

//For import
async function insertClient(ID, phoneNumber, address, email, active, firmID) {
    try {
        let pool = await sql.connect(config);
        let insertClient = await pool.request()
            .input('ID', sql.Int, ID)
            .input('phoneNumber', sql.Char, phoneNumber)
            .input('address', sql.VarChar, address)
            .input('email', sql.VarChar, email)
            .input('active', sql.Bit, active)
            .input('firmID', sql.Int, firmID)
            .execute('insertClient');
        return insertClient;
    } catch (err) {        
        console.log(err);
    }
}

async function insertFirm(ID, CompanyName, Address) {
    try {
        let pool = await sql.connect(config);
        let newClient = await pool.request()
            .input('ID', sql.Int, ID)
            .input('CompanyName', sql.VarChar, CompanyName)
            .input('address', sql.VarChar, Address)
            .execute('insertFirm');
        return newClient;
    } catch (err) {        
        console.log(err);
    }
}

async function insertEmployee(ID, username, passwordHash, adminAccess, firmID) {
    try {
        let pool = await sql.connect(config);
        let newEmployee = await pool.request()
            .input('ID', sql.Int, ID)
            .input('Username', sql.VarChar, username)
            .input('passwordHash', sql.VarChar, passwordHash)
            .input('adminAccess', sql.Bit, adminAccess)
            .input('firmID', sql.Int, firmID)
            .execute('insertEmployee');
        return newEmployee;
    } catch (err) {        
        console.log(err);
    }
}

async function insertListing(ID, employeeAssignDate, employeeID, address, postDate, closeDate, state) {
    try {
        let pool = await sql.connect(config);
        let newListing = await pool.request()
            .input('ID', sql.Int, ID)
            .input('employeeAssignDate', sql.Date, employeeAssignDate)
            .input('employeeID', sql.Int, employeeID)
            .input('address', sql.VarChar, address)
            .input('postDate', sql.Date, postDate)
            .input('closeDate', sql.Date, closeDate)
            .input('state', sql.Bit, state)
            .execute('insertListing')
        return newListing;
    } catch (err) {        
        console.log(err);
    }
}

async function insertOffer(price, listing ,client) {
    try {
        let pool = await sql.connect(config);
        let newOffer = await pool.request()
            .input('price', sql.Money, price)
            .input('listing', sql.Int, listing)
            .input('client', sql.Int, client)
            .execute('insertOffer')
        return newOffer;
    } catch (err) {        
        console.log(err);
    }
}

async function insertPerson(ID, fname, lname, dob) {
    try {
        let pool = await sql.connect(config);
        let newPerson = await pool.request()
            .input('ID', sql.Int, ID)
            .input('fname', sql.VarChar, fname)
            .input('lname', sql.VarChar, lname)
            .input('dob', sql.Date, dob)
            .execute('insertPerson')
        return newPerson;
    } catch (err) {        
        console.log(err);
    }
}

async function insertRepresent(client, employee) {
    try {
        let pool = await sql.connect(config);
        let newRepresent = await pool.request()
            .input('client', sql.Int, client)
            .input('employee', sql.Int, employee)
            .execute('insertRepresent')
        return newRepresent;
    } catch (err) {        
        console.log(err);
    }
}




async function addFirm(CompanyName, Address) {
    try{
        let pool = await sql.connect(config);
        let newFirm = await pool.request()
                .input('CompName', sql.VarChar, CompanyName)
                .input('Address', sql.VarChar, Address)
                .execute('addFirm');
            return newFirm.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function deleteFirm(firmID) {
    try {
        let pool = await sql.connect(config);
        let firmDeleted = await pool.request()
            .input('firmID', sql.Int, firmID)
            .execute('deleteFirm');
        return firmDeleted.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function getFirm(employeeID) {
    try {
        let pool = await sql.connect(config);
        let firmSelection = await pool.request()
            .input('employeeID', sql.Int, employeeID)
            .execute('getFirmFromEmployeeID');
        return firmSelection.recordsets;
    } catch (err) {        
        console.log(err);
    }
}

async function addEmployeeToFirm(employeeID, firmID) {
    try {
        let pool = await sql.connect(config);
        let employeeToFirm = await pool.request()
                .input('employeeID', sql.Int, employeeID)
                .input('firmID', sql.Int, firmID)
                .execute('addEmployeeToFirm');
            return employeeToFirm.recordsets;
    } catch (err) {
        console.log(err);
    }
}

async function checkAdminAccess(employeeID) {
    try {
        let pool = await sql.connect(config);
        let adminAccess = await pool.request()
                .input('employeeID', sql.Int, employeeID)
                .execute('checkAdminAccess');
            return adminAccess.recordsets;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getEmployeeByID: getEmployeeByID,
    getOffersByListing: getOffersByListing,
    getClientByID: getClientByID,
    getClients: getClients,
    getClientsForEmployee: getClientsForEmployee,
    getListingByID: getListingByID,
    getListings: getListings,
    getListingsForEmployee: getListingsForEmployee,
    getOfferCountFromListing: getOfferCountFromListing,
    addClient: addClient,
    addListing: addListing,
    addOffer: addOffer,
    updateClient: updateClient,
    updateOffer: updateOffer,
    updateListing: updateListing,
    deleteClient: deleteClient,
    addFirm: addFirm,
    deleteFirm: deleteFirm,
    getFirm: getFirm,
    addEmployeeToFirm: addEmployeeToFirm,
    checkAdminAccess: checkAdminAccess,
    updateClient: updateClient,
    addListing: addListing,
    getListings: getListings, 
    deleteListing: deleteListing,
    //for import
    deleteOffer: deleteOffer,
    closeListing: closeListing,
    registerNewUser: registerNewUser,
    loginUser: loginUser,,
    insertFirm: insertFirm,
    insertEmployee: insertEmployee,
    insertListing: insertListing,
    insertOffer: insertOffer,
    insertPerson: insertPerson,
    insertRepresent: insertRepresent
}