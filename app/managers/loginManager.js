const jwt = require('jsonwebtoken');

module.exports = {

    /**
     * 
     * @param {*} data {id: '1', role: 'admin/user'}
     */

    signToken: function (data) {
        let token = jwt.sign(data, 'riasecret');
        return token;
    },

    decodeToken: function (token) {
        try {
            let decoded = jwt.verify(token, 'riasecret');
            return decoded;
        } catch(err){ 
            console.log(err);
            return false;
        }; 
        
    },

    authDecode: function (authHeader) {
        //console.log(authHeader)
        let crypto = authHeader.split(' ')[1];
        let auth = new Buffer.from(crypto, 'base64').toString().split(':');
        return auth;
        
    }

}