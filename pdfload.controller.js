'use strict';

var _ = require('lodash'),
    Token = require('./tokens'),
    fs = require('fs'),
    mime = require('mime');


exports.loadpdf = function(req, res) {
    var number = req.params.number;
    var token = req.query.token;

    //if token is not empty:
    if (!_.isEmpty(token)) {

        // if token is valid:
        if (Token.verify(req, res)) {

            var file = './docs/' + number + '.pdf';
            var fileStream = fs.createReadStream(file);
            var stat = fs.statSync('./docs/' + number + '.pdf');
            var mimetype = mime.lookup(file);

            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', mimetype);
            fileStream.pipe(res);
        }
    } else {
        res.render('login', {
            message: 'Please Log in',
            username: '',
            number: number
        });
    }
};
