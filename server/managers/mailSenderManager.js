"use strict";

var Class           = require('appolo-express').Class,
    _               = require('lodash');

module.exports = Class.define({

    $config: {
        id: 'mailSenderManager',
        singleton: true,
        properties:[{
            name: '_createMailMessage',
            factoryMethod: 'mailMessage'
        }],
        inject: ['env', 'logger','mailSenderProvider']
    },

    sendMail: function(data){

        var payload = data.payload || {};
        var fromEmail = data.sender;
        var fromName = data.senderName;
        var toEmail = data.receiver;
        var toName = data.receiverName;
        var type = data.type;

        payload.appDomain = this.env.app_domain;

        var mailMessage = this._createMailMessage(type, fromEmail, fromName, toEmail, toName, payload);

        return mailMessage.initialize()
            .then(this.mailSenderProvider.send.bind(this.mailSenderProvider, mailMessage))
            .fail(this._onMailMessageError.bind(this));

    },

    _onMailMessageError: function(e) {
        this.logger.error("failed to send mail",{ err: e.message });
        throw e;
    }

});
