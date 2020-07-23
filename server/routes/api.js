var express = require('express');
var router = express.Router();
var Auth = require('../../authenticate.controller');
var Pdf = require('../../pdfload.controller');
var Token = require('../../tokens');


router.post('/login', function(req, res, next) {
    Auth.login(req, res);
});

router.get('/login', function(req, res, next) {
    Auth.login(req, res);
});

router.get('/pdf/:number', function(req, res, next) {
    Pdf.loadpdf(req, res);
});

module.exports = router;
