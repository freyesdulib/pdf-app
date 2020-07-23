'use strict';

var jwt = require('jsonwebtoken'),
    config = require('./config/config'),
    url = require('url'),
    Pdf = require('./pdfload.controller');

exports.create = function(username) {

    var tokenData = {
        sub: username,
        iss: 'https://pdf.library.du.edu'
    };
    var token = jwt.sign(tokenData, config.tokenSecret, {
        algorithm: config.tokenAlgo,
        expiresIn: config.tokenExpires
    });
    return token;
};

exports.verify = function(req, res) {

    var token = req.query.token;
    var number = req.params.number;

    if (token) {

        jwt.verify(token, config.tokenSecret, function(err, decoded) {

            if (err) {
                console.log("token verify error");
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }
        });
        return true;
    } else {

        res.render('login', {
            message: 'Please log in',
            username: '',
            number: number
        });
    }
};
