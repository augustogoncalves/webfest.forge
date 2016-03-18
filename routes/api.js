var config = require('../config-view-and-data');
var lmv = require('view-and-data');
var lmv = new lmv(config);

var express = require('express');
var router = express.Router();

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

router.post('/refreshToken', /*jsonParser, */function (req, res) {
    lmv.getToken().then(function(response) {
        res.send(response.access_token);
    });
});

module.exports = router;