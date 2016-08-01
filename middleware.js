var bodyParser = require('body-parser');

var jsonParser = bodyParser.json(); // json access to the body

module.exports = {
    jsonParser: jsonParser
}