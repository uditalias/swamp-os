/** @jsx React.DOM */

define(
    [
        'react',
        'jsx!components/swampos/SwampOS',
        'jsx!components/auth/Auth',
        'jsx!components/loading/Loading',
        'services/browserService',
        'services/authService'
    ],

    function(React, SwampOS, Auth, Loading, browserService, authService) {

        function _initialize() {

            $(function() {

                browserService.initialize();

                React.renderComponent(<Loading />, $('.app-container')[0]);

                authService.isAuthenticated()
                    .then(_onUserAuthenticatedSuccess)
                    .catch(_onUserAuthenticatedFail);
            });

        }

        function _onUserAuthenticatedSuccess() {

            React.unmountComponentAtNode($('.app-container')[0]);

            React.renderComponent(<SwampOS onLogout={_onLogout} />, $('.app-container')[0]);

        }

        function _onUserAuthenticatedFail(err) {

            React.unmountComponentAtNode($('.app-container')[0]);

            React.renderComponent(<Auth onLogin={_onLogin} onSignup={_onSignup} />, $('.app-container')[0]);

        }

        function _onLogin() {
            _onUserAuthenticatedSuccess();
        }

        function _onSignup() {
            
        }

        function _onLogout() {
            _onUserAuthenticatedFail();
        }

        return {
            initialize: _initialize
        }
    });
