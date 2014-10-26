"use strict";

module.exports = {

    name: 'all',

    mongodb: 'mongodb://192.168.50.4:27017/swamp-os',

    db_name: 'swamp-os',

    mandrill_api_key: 'gMEnfqq1lGGYtCZ9CIggIg',

    session_secret: '5fc86d4f76e4451f9da0fbee0e399593',

    json_token_secret: '31d6c5069749415ea106b65e25555da7',

    app_domain: 'http://swamp.herokuapp.com/',

    mail_subject: {
        account_activation: 'Welcome to Swamp OS - Account Activation'
    },

    mail_sender_address: 'do-not-replay@swampos.com',

    port: 80
};
