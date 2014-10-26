"use strict";

var Class   = require('appolo-express').Class,
    _       = require('lodash'),
    fs      = require('fs'),
    path    = require('path'),
    q       = require('q'),
    ejs     = require('ejs');

module.exports = Class.define({

    $config: {
        id: 'mailTemplatesManager',
        singleton: true,
        inject: ['env']
    },

    get: function (type) {

        var deferred = q.defer();

        var tplUrl, title;

        tplUrl = path.resolve('./server/views/mailTemplates/' + type + '.ejs');

        title = this.env.mail_subject[type] || '';

        if (tplUrl) {

            fs.readFile(tplUrl, { encoding: 'utf8' }, this._onTemplateFileRead.bind(this, deferred, title, tplUrl))

        } else {

            deferred.reject("can't find mail template for type: " + type);

        }

        return deferred.promise;

    },

    _onTemplateFileRead: function (deferred, title, tplUrl, err, data) {

        if (err) {

            deferred.reject(err);

        } else {

            try {
                var tpl = ejs.compile(data, { filename: tplUrl });

                var subject = ejs.compile(title);

                deferred.resolve({ body_tpl: tpl, subject_tpl: subject });

            } catch(e) {

                deferred.reject(e);

            }

        }
    }

});
