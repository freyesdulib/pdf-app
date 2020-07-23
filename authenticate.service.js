'use strict';

var request = require('request'),
	config = require('./config/config');

exports.authenticate = function(username, password, number, callback) {

    request.post({
            url: config.ldap,
            form: {
                username: username,
                password: password
            },
            headers: {
                "Content-Type": "application/json"
            }
        },
        function(err, headers, res) {
            if (err) {
                console.log(err);
            }
            var responseObj = JSON.parse(res);
            callback(responseObj);
        });
};
