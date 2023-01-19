var rhit = rhit || {};

// const express = require('express');
// const app = express();
import sql from 'mssql';
//const sql = require("mssql");

export default rhit.Connection = class {
    constructor() {
        this.sqlConfig = {
            user: 'forcheac',
            password: 'N00dl3s11!',
            server: 'titan.csse.rose-hulman.edu',
            database: 'VillaExpress',
            options: {
                trustServerCertificate: true
              }
        };
    }

    async connect () {
        try {
            await sql.connect(this.sqlConfig);
            const result = await sql.query`select * from employee`
            console.dir(result)
        } catch (err) {
            console.log(err);
        }
    }
}

