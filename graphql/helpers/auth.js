const jwt = require('jsonwebtoken');

class Auth {
    extractToken(token){
        let extracted = jwt.decode(token)
        return extracted
    }
}

module.exports = new Auth();