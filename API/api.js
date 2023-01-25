var  Db = require('./dboperations');
var  Employee = require('./employee');
var  Client = require('./client');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Villa API is runnning at ' + port);

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });
   
   
//   router.route('/employee').get((request, response) => {
//     Db.getEmployees().then((data) => {
//       response.json(data[0]);
//     })
//   })
  
//   router.route('/employee/:username').get((request, response) => {
//     Db.getEmployeeByUsername(request.params.username).then((data) => {
//       response.json(data[0]);
//     })
//   })

  router.route('/employee/:username&:password').get((request, response) => {
    Db.loginUser(request.params.username, request.params.password).then(data  => {
        response.json(data);  
    })
  })

  router.route('/employee/:username:password').post((request, response) => {
    Db.registerNewUser(request.params.username, request.params.password).then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/client').post((request, response) => {
    let clientJson = request.body;
    Db.addClient(clientJson.FName, clientJson.LName, clientJson.DateOfBirth,
       clientJson.PhoneNumber, clientJson.Address, clientJson.Email, clientJson.Active)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/client').get((request, response) => {
    Db.getClients()
    .then((data) => {
      response.json(data[0]);
    })
  })