class Formatter {
    formatValidationErrors( errors ) {
        let keys = Object.keys(errors);
        let value = Object.values(errors);
        let returnedFormat = [];
        for ( let i = 0; i < keys.length; i++ ) {
            returnedFormat.push({
                error : Array.isArray( value[i] ) ? value[i][0] : value[i],
                path : keys[i]
            })
        }
        return returnedFormat;
    }
}

module.exports = new Formatter();