/** @jsx React.DOM */

define(
    [
        'react',
        'jsx!components/swampos/SwampOS',
        'jsx!components/error/Error',
        'jsx!components/loading/Loading',
        'services/browserService',
        'services/socketService'
    ],

    function(React, SwampOS, Error, Loading, browserService, socketService) {

        function _initialize() {

            $(function() {

                browserService.initialize();

                React.renderComponent(<Loading />, $('.app-container')[0]);

                socketService.setup()
                    .then(_onSwampSocketConnectionSuccess)
                    .catch(_onSwampSocketConnectionFail);

            });

        }

        function _onSwampSocketConnectionSuccess() {

            React.unmountComponentAtNode($('.app-container')[0]);

            React.renderComponent(<SwampOS />, $('.app-container')[0]);

        }

        function _onSwampSocketConnectionFail(err) {

            if(err) {
                try {
                    err = JSON.parse(err);
                } catch(e) {
                    err = err;
                }
            }

            React.unmountComponentAtNode($('.app-container')[0]);

            React.renderComponent(<Error error={err} />, $('.app-container')[0]);

        }

        return {
            initialize: _initialize
        }
    });