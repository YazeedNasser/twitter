const UserController = require( '../controllers/UserController' );
const {UserType} = require( '../types/User_Type' );

module.exports = {
    type: UserType,
    resolve( parent , args ) {
        return UserController.getAll();
    }
}