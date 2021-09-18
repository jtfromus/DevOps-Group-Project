const e = require('express');
let express = require('express');
let router = express.Router();

const gateway = require("../gateways/propertydb");

const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

// I like to log who is calling the web services
router.use(function (req, res, next) {
    const ip = utilities.getRequestIPAddress(req);
    logger.info("Properties request route " + req.originalUrl + " from " + ip);
    next();
});

// this is the top-level GET route for the /properties router
router.get('/',
  async function(request, response) {
  		const result = await gateway.fetchProperties();

        logger.info("success");

        utilities.sendResponse(response, 200, result);
        response.end();
    }
);

// this is the POST route for the /properties router
router.post('/',
    async function(request, response) {

        // check API key
        const apiKey = request.headers.api_key;
        if (!utilities.isAPIKeyValid(apiKey)) {
            utilities.sendResponse(response, 401, "Invalid Key");
            response.end();
            return;
        }

        const address = request.body.address;
        const city = request.body.city;
        const state = request.body.state;
        const zip = request.body.zip;

        const errMessage = [];
        if (!utilities.isValidAddress(address)) {
            errMessage.push({"Address out of range": "Address is not between 1 and 255 characters."});
        }
        if (!utilities.isValidCity(city)) {
            errMessage.push({"Invalid city name": "City is not between 1 and 50 characters."});
        }
        if (!utilities.isValidState(state)) {
            errMessage.push({"Invalid state name": "State is not exactly 2 characters."});
        }
        if (!utilities.isValidZip(zip)) {
            errMessage.push({"Invalid zip": "Zip is not between 5 and 10 characters."});
        }
        // no errors found
        if (errMessage.length == 0) {
            const result = await gateway.addProperty(address, city, state, zip);
            utilities.sendResponse(response, 200, [{"message": "added", "id": result.insertId}]);
        }
        else {
            utilities.sendResponse(response, 400, errMessage);
        }
        response.end();
    }
);

router.get('/:id',
    async function(request, response) {
        const id = request.params.id;
        // Check if id is a valid int
        if (utilities.isValidId(id)) {
            const result = await gateway.fetchProperty(id);
    
            if (result && result.length) {
                logger.info("success");
                utilities.sendResponse(response, 200, JSON.parse(JSON.stringify(result[0])));
            }
            else {
                logger.info("not found");
                utilities.sendResponse(response, 404, "Not found");
                //response.sendStatus(404);
            }
        }
        else {
            logger.info("bad request");
            utilities.sendResponse(response, 400, "Bad Request");
        }
        response.end();
    }
);

router.delete('/:id',
    async function(request, response) {

        // check API key
        const apiKey = request.headers.api_key;
        if (!utilities.isAPIKeyValid(apiKey)) {
            utilities.sendResponse(response, 401, "Invalid Key");
            response.end();
            return;
        }

        const id = request.params.id;
        // Check if id is a valid int
        if (utilities.isValidId(id)) {
            const result = await gateway.deleteProperty(id);

            if (result && result.affectedRows > 0) {
                logger.info("success");

                utilities.sendResponse(response, 200, "deleted");
            } else {
                logger.info("not found");
                utilities.sendResponse(response, 404, "Not found");
            }
        }
        else {
            logger.info("bad request");
            utilities.sendResponse(response, 400, "Bad Request");
        }
        response.end();        
    }
);

router.put('/:id',
    async function(request, response) {

        // check API key
        const apiKey = request.headers.api_key;
        if (!utilities.isAPIKeyValid(apiKey)) {
            utilities.sendResponse(response, 401, "Invalid Key");
            response.end();
            return;
        }

        const id = request.params.id;
        const address = request.body.address;
        const city = request.body.city;
        const state = request.body.state;
        const zip = request.body.zip;

        const errMessage = [];

        const doesPropExist = await gateway.fetchProperty(id);

        // Check for 404
        if ((doesPropExist && doesPropExist.length)) {
            
            // Check for 400
            if (!utilities.isValidAddress(address)) {
                errMessage.push({"Address out of range": "Address is not between 1 and 255 characters."});
            }
            if (!utilities.isValidCity(city)) {
                errMessage.push({"Invalid city name": "City is not between 1 and 50 characters."});
            }
            if (!utilities.isValidState(state)) {
                errMessage.push({"Invalid state name": "State is not exactly 2 characters."});
            }
            if (!utilities.isValidZip(zip)) {
                errMessage.push({"Invalid zip": "Zip is not between 5 and 10 characters."});
            }
            
            if (!address && !city && !state && !zip) {
                utilities.sendResponse(response, 400, "Bad Request");
            }
            // no errors found
            else if (errMessage.length == 0) {
                await gateway.updateProperty(id, address, city, state, zip);
                utilities.sendResponse(response, 200, [{"message": "updated"}]);
            }
            else {
                utilities.sendResponse(response, 400, errMessage);
            }
        } else {
            logger.info("not found");
            utilities.sendResponse(response, 404, "Not found")
        }
        response.end();
    }
)

module.exports = router;
