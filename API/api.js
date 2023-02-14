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
       clientJson.PhoneNumber, clientJson.Address, clientJson.Email, clientJson.Active, request.query.employeeID)
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

  router.route('/clientEmployee').get((request, response) => {
    let orderID = request.query.orderID
    let orderFName = request.query.orderFName;
    let orderLName = request.query.orderLName;
    let orderActive = request.query.orderActive
    console.log(typeof orderActive);
    if (orderID == ''){
      orderID = null;
    }
    else {
      orderID = Number(orderID);
    }
    if (orderFName == ''){
      orderFName = null;
    }
    else {
      orderFName = Number(orderFName);
    }
    if (orderLName == ''){
      orderLName = null;
    }
    else {
      orderLName = Number(orderLName);
    }
    if (orderActive == ''){
      orderActive = null;
    }
    else {
      orderActive = Number(orderActive);
    }
    console.log(orderActive);
    Db.getClientsForEmployee(request.query.employeeID, orderID, orderFName, orderLName, orderActive)
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
    Db.addListing(listingJSON.EmployeeId, listingJSON.PostDate, listingJSON.Address)
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

  router.route('/employeeListings/:employeeID').get((request, response) => {
    Db.getListingsForEmployee(request.params.employeeID)
    .then((data) => {
      response.json(data[0]);
    })    
  })

  router.route('/listing/:listingID').get((request, response) => {
    Db.getListingByID(request.params.listingID)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/listing/:listingID').delete((request, response) => {
    Db.deleteListing(request.params.listingID)
    .then((data) => {
      response.json(data[0]);
    })    
  })

  router.route('/closeListing/:listingID:closeDate').put((request, response) => {
    Db.closeListing(request.params.listingID, request.params.closeDate)
    .then((data) => {
      response.json(data[0]);
    })    
  })

  router.route('/listing/:listingID/:address').put((request, response) => {
    Db.updateListing(request.params.listingID, request.params.address)
    .then((data) => {
      response.json(data[0]);
    })    
  })

  router.route('/offer').get((request, response) => {
    let orderID = request.query.orderID;
    let orderPrice = request.query.orderPrice;
    if (orderID == ''){
      orderID = null;
    }
    else {
      orderID = Number(orderID);
    }
    if (orderPrice == ''){
      orderPrice = null;
    }
    else {
      orderPrice = Number(orderPrice);
    }
    Db.getOffersByListing(request.query.listingID, orderID, orderPrice)
    .then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/offerCount/:listingID').get((request, response) => {
    Db.getOfferCountFromListing(request.params.listingID)
    .then((data) => {
      response.json(data);
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

  router.route('/offer').put((request, response) => {
    let offerJson = request.body;
    console.log(offerJson);
    Db.updateOffer(offerJson.OfferID, offerJson.Price, offerJson.Listing, offerJson.Client)
    .then((data) => {
      response.json(data[0]);
    })
  })

