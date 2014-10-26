/** @jsx React.DOM */

define([
        'react',
        'constants/AUTH_SCREEN_PHASE',
        'stores/swampApplicationStore',
        'jsx!components/auth/login/Login',
        'jsx!components/auth/signup/Signup',
        'jsx!components/auth/forgotpassword/ForgotPassword',
        'jsx!components/applicationprompt/ApplicationPrompt',
        'actions/client'
    ],

    function(React, AUTH_SCREEN_PHASE, swampApplicationStore, Login, Signup, ForgotPassword, ApplicationPrompt, clientActions) {

    var THROTTLED_CHANGE_HANDLER_TIME = 100;

    var Auth = React.createClass({

        getInitialState: function() {
            return {
                phase: AUTH_SCREEN_PHASE.LOGIN,
                render: 0
            };
        },

        componentDidMount: function() {

            this._throttledChangeHandler = _.throttle(this._onChange, THROTTLED_CHANGE_HANDLER_TIME, { leading: true });

            swampApplicationStore.addChangeListener(this._throttledChangeHandler);

        },

        componentWillUnmount: function() {

            swampApplicationStore.removeChangeListener(this._throttledChangeHandler);

        },

        render: function() {
            return (
                <div className="auth flex flex-align-center flex-pack-center">

                    {this._getApplicationPrompt()}

                    <div>
                        {this._getPhaseScreen()}
                    </div>
                </div>
            );
        },

        _getPhaseScreen: function() {
            switch(this.state.phase) {
                case AUTH_SCREEN_PHASE.LOGIN:
                    return <Login setPhaseScreen={this._setPhaseScreen} onLogin={this._onLoginSuccess} showAlert={this._showAlert} />;
                    break;
                case AUTH_SCREEN_PHASE.SIGNUP:
                    return <Signup setPhaseScreen={this._setPhaseScreen} onSignup={this._onSignupSuccess} showAlert={this._showAlert} />;
                    break;
                case AUTH_SCREEN_PHASE.FORGOT_PASSWORD:
                    return <ForgotPassword setPhaseScreen={this._setPhaseScreen} showAlert={this._showAlert} />;
                    break;
            }
        },

        _setPhaseScreen: function(phase) {

            this.setState({ phase: phase });

        },

        _onLoginSuccess: function() {

            this.props.onLogin && this.props.onLogin();

        },

        _onSignupSuccess: function() {

            this.props.onSignup && this.props.onSignup();

        },

        _getApplicationPrompt: function() {

            if(swampApplicationStore.hasPrompt()) {
                return <ApplicationPrompt prompt={swampApplicationStore.getPrompt()} />;
            }

            return null;

        },

        _onChange: function() {

            this.setState({ render: this.state.render++ });

        },

        _showAlert: function(text) {

            clientActions.applicationPrompt(text, null, null, true);

        }
    });

    return Auth;
});
