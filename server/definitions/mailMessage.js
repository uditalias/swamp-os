'use strict';
var Class           = require('appolo-express').Class;

module.exports = Class.define({

    $config: {
        id: 'mailMessage',
        singleton: false,
        inject: ['env', 'mailTemplatesManager']
    },

    constructor: function(type, from, fromName, to, toName, payload) {

        this._payload = this._parsePayloadData(payload);
        this._type = type;

        this.from = from;
        this.to = to;
        this.fromName = fromName;
        this.toName = toName;

        this.subject = '';
        this.body = '';
    },

    initialize: function() {

        return this.mailTemplatesManager.get(this._type)

            .then(this._onMailTemplateReady.bind(this));

    },

    _parsePayloadData: function(payload) {

        if(!payload) {
            return {};
        }

        if(typeof payload != 'object'){
            return {};
        }

        return payload;

    },

    _onMailTemplateReady: function(tpl) {

        this.body = tpl.body_tpl(this._payload);

        this.subject = tpl.subject_tpl(this._payload);

    }
});