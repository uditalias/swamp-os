var Class   = require('appolo-express').Class,
    _       = require('lodash');

module.exports = Class.define({
    $config: {
        id: 'util',
        singleton: true,
        inject: ['logger', 'env', 'UserModel', 'util']
    },

    parseMongoError: function(err, messages) {

        var field;

        if(err.code == 11000) {
            // this example is showing how to get the field `email` out of the err message
            field = err.message.split('index: ' + this.env.db_name + '.')[1].split('.$')[1];
            // now we have `email_1 dup key`
            field = field.split(' dup key')[0];
            field = field.substring(0, field.lastIndexOf('_')); // returns email
        }

        var errors = {};

        errors[field] = messages[err.code][field];

        return errors;
    }

});
