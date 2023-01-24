var config = require('./dbconfig');
const sql = require('mssql');
const bcrypt = require('bcrypt');


//get all employees
async function getEmployees() {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query("SELECT * from Employee");
        return employees.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getEmployeeByUsername(username) {
    try {
        let pool = await sql.connect(config);
        let employee = await pool.request()
            .input('input_parameter', sql.Int, username)
            .query("SELECT * from Employee where Username = @input_parameter");
        return employee.recordsets;
    } catch (error) {
        console.log(error);
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

async function getSaltFromUsername(username) {
    try {
        let pool = await sql.connect(config);
        let employeeSalt = await pool.request()
            .input('Username', sql.NVarChar, username)
            .output('result', sql.VarChar(60))
            .execute('getSaltFromUsername');
        return employeeSalt.output.result;
    } catch (err) {
        console.log(err);
    }
}

async function getHashFromUsername(username) {
    try {
        let pool = await sql.connect(config);
        let employeeHash = await pool.request()
            .input('Username', sql.NVarChar, username)
            .output('result', sql.VarChar(60))
            .execute('getHashFromUsername');
        return employeeHash.output.result;
    } catch (err) {
        console.log(err);
    }
}

async function loginUser(username, password) {
    try {
        const dbSalt = await getSaltFromUsername(username);
        let pool = await sql.connect(config);
        let loginStatus = await pool.request()
            .input('username', sql.VarChar, username)
            .input('passwordHash', sql.VarChar, password)
            .output('result', sql.Bit)
            .execute('logInUser')
        return loginStatus.output.result;
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
    getEmployees: getEmployees,
    getEmployeeByUsername: getEmployeeByUsername,
    registerNewUser: registerNewUser,
    loginUser: loginUser,
}