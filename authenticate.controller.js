'use strict';

var _ = require('lodash'),
    Pdf = require('./pdfload.controller'),
    Token = require('./tokens'),
    Service = require('./authenticate.service'),
    url = require('url');


exports.login = function(req, res) {

    if (!_.isEmpty(req.body)) {

        var username = req.body.username,
            password = req.body.password,
            number = req.body.number;

        Service.authenticate(username, password, number, function(isAuth) {
            if (isAuth.auth === true) {
                var token = Token.create(username);
                token = encodeURIComponent(token);

                req.query.token = token;
                req.params.number = number;

                res.redirect('/pdf/' + number + '?token=' + token);

            } else if (isAuth.auth === false) {

                res.render('login', {
                    message: 'Authentication Failed. Please Try Aagain.',
                    username: req.body.username,
                    number: number
                });
            }
        });
    } else {
        res.render('login', {
            message: 'Please log in.',
            username: '',
            number: number
        });
    }
};
