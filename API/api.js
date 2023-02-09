var  Db = require('./dboperations');
var  Employee = require('./employee');
var  Client = require('./client');
var Listing = require('./listing');
var Firm = require('./firm');
var Offer = require('./offer');
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
  
  router.route('/employee').get((request, response) => {
    Db.getEmployeeByID(request.query.id).then((data) => {
      response.json(data[0]);
    })
  })

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

  router.route('/client/:clientID').delete((request, response) => {
    Db.deleteClient(request.params.clientID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/firm').post((request, response) => {
    let firmJSON = request.body;
    Db.addFirm(firm.JSON.CompanyName, firmJSON.Address)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/firm/:firmID').delete((request, response) => {
    Db.deleteFirm(request.params.firmID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/firm/:employeeID').get((request, response) => {
    Db.getFirm(request.params.employeeID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/firm/:employeeID/:firmID').post((request, response) => {
    Db.addEmployeeToFirm(request.params.employeeID, request.params.firmID)
    .then((data) => {
      response.json(data[0]);
    })  
  })

  router.route('/:employeeID').get((request, response) => {
    Db.checkAdminAccess(request.params.employeeID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/client').put((request, response) => {
    let clientJson = request.body;
    Db.updateClient(clientJson.ClientID, clientJson.FName, clientJson.LName, clientJson.DateOfBirth,
       clientJson.PhoneNumber, clientJson.Address, clientJson.Email, clientJson.Active)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/client/:clientID').get((request, response) => {
    Db.getClientByID(request.params.clientID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/listing').post((request, response) => {
    let listingJSON = request.body;
    Db.addListing(listingJSON.EmployeeAssignDate, listingJSON.CloseDate, listingJSON.PostDate, 
      listingJSON.Address, listingJSON.State)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/listing').get((request, response) => {
    Db.getListings()
    .then((data) => {
      response.json(data[0]);
    })    
  })

  router.route('listing/:listingID').delete((request, response) => {
    console.log(request.params.listingID);
    Db.deleteListing(request.params.listingID)
    .then((data) => {
      response.json(data[0]);
    })    
  })

  router.route('/offer/:listingID').get((request, response) => {
    Db.getOffersByListing(request.params.listingID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/offer').post((request, response) => {
    let offerJson = request.body;
    Db.addOffer(offerJson.Price, offerJson.Listing, offerJson.Client)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/offer/:offerID').delete((request, response) => {
    Db.deleteOffer(request.params.offerID)
    .then((data) => {
      response.json(data[0]);
    })
  })

