var express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

// Handling request 

app.post("/request", (req, res) => {
    res.json([{
       password: req.body.name,
       salt: req.body.designation
    }])
 })

app.listen(8080);