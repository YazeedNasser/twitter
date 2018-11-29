const Formatter = require( '../helpers/Formatter' );

class BaseController{
    constructor(){
        this.statusCode = null,
        this.errors = [],
        this.message = null,
        this.data = null,
        this.Formatter = Formatter
    }

    setStatusCode(statusCode){
        this.statusCode = statusCode;
        return true;
    }

    getStatusCode(){
        return this.statusCode;
    }

    setErrors(errors){
        this.errors = this.Formatter.formatValidationErrors(errors);
        return;
    }

    getErrors(){
        return this.errors;
    }

    setMessage(message){
        this.message = message;
        return;
    }

    getMessage(){
        return this.message;
    }

    setData(data){
        this.data = data;
        return;
    }

    getData(){
        return this.data;
    }

    responseFormat(statusCode , errors=[] , message , data ){
        return{
            statusCode,
            errors,
            message,
            data
        }
    }

    respondWithErrors( errors ){
        this.setStatusCode(400);
        this.setErrors( errors );
        return this.responseFormat( this.getStatusCode() , this.getErrors());
    }

    respond( message , data) {
        this.setStatusCode(200);
        this.setData( data );
        this.setMessage( message );
        return this.responseFormat( this.getStatusCode() , null , this.getMessage() , this.getData() );
    }

    serverError(){
        this.setStatusCode(500);
        this.setErrors([{
            error: 'internal server error'
        }]);

        this.getMessage( 'internal server error' );
        return this.responseFormat( this.getStatusCode() , this.getErrors() , this.getMessage() )
    }
}

module.exports = BaseController;