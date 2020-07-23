'use strict';

module.exports = {
	ldap: process.env.LDAP_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenAlgo: process.env.TOKEN_ALGO,
    tokenExpires: process.env.TOKEN_EXPIRES
};
