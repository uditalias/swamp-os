"use strict";

var Class           = require('appolo-express').Class,
    mandrill		= require('mandrill-api/mandrill'),
    q               = require('q');

module.exports = Class.define({

    $config: {
        id: 'mailChimpProvider',
        singleton: true,
        inject: ['logger', 'env'],
        initMethod: 'initialize'
    },

    initialize: function() {

    },

    send: function(mailMessage){
        
    	var deferred = q.defer();

    	var client = new mandrill.Mandrill(this.env.mandrill_api_key);

    	var message = {
    		message: this._cookMessage(mailMessage),
    		async: true
    	};

    	client.messages.send(message, deferred.resolve, deferred.reject);

    	return deferred.promise;
    },

    _cookMessage: function(mailMessage) {
    	var metadata = {
            "html": mailMessage.body,
            "subject": mailMessage.subject,
            "from_email": mailMessage.from,
            "from_name": mailMessage.fromName || mailMessage.from,
            "to": mailMessage.to instanceof Array ? this._buildReceiversList(mailMessage.to) : [{
                "email": mailMessage.to,
                "name": mailMessage.toName || mailMessage.to,
                "type": "to"
            }],
            "headers": {
                "Reply-To": mailMessage.from
            }
        };

        return metadata;
    },

    _buildReceiversList: function(list) {
        var data = [];
        for(var i = 0, len = list.length; i < len; i++) {
            data.push({
                "email": list[i],
                "name": list[i],
                "type": "to"
            });
        }
        return data;
    }
});
