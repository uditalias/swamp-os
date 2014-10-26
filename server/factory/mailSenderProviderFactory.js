var Class = require('appolo-express').Class;

module.exports = Class.define({
    $config: {
        id: 'mailSenderProviderFactory',
        singleton: true,
        inject: ['env', 'mailChimpProvider']
    },

    get: function(){

        switch(this.env.mailSenderProvider) {
            case 'mailChimp':
            default:
                return this.mailChimpProvider;
        }
    }

});