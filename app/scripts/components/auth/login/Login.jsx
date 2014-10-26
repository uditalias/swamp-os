/** @jsx React.DOM */

define([
        'react',
        'services/authService',
        'constants/AUTH_SCREEN_PHASE',
        'constants/WINDOW_TYPE',
        'jsx!components/button/Button',
        'jsx!components/window/Window',
        'definitions/SwampWindow',
        'MD5',
        'Identicon',
        'pnglib'
    ],

    function(React, authService, AUTH_SCREEN_PHASE, WINDOW_TYPE, Button, Window, SwampWindow, MD5, Identicon, pnglib) {

        var ERROR_CODES = {
            "InvalidUserNameOrPassword": "Invalid <span class='hightlight'>username</span> and/or <span class='hightlight'>password</span>. Please try again."
        };

        var Login = React.createClass({

            getInitialState: function() {
                return {
                    loginPhase: false,
                    invalidUsername: false,
                    invalidPassword: false,
                    username: '',
                    defaultIdenticon: _.guid()
                }
            },

            render: function() {

                var options = this._getLoginScreenWindowOptions();

                var payload = this._getLoginScreenDescriptorPayload();

                this.windowDescriptor = new SwampWindow(WINDOW_TYPE.SCREEN, payload, options);

                this.windowDescriptor.focus();

                this._triggerInputEvent('username', 'focus');

                return (
                    <Window descriptor={this.windowDescriptor} containerSelector={'.auth'}>
                        <div className="auth-window padding-10">

                            <div className="user-photo text-center margin-bottom-10">
                                <img src={this._renderUserPhoto()} />
                            </div>

                            <div>
                                <form onSubmit={this._onSubmit}>
                                    <div className="margin-bottom-5">
                                        <input type="text" ref="username" placeholder="username" onKeyUp={this._onUsernameKeyUp} className={ this.state.invalidUsername ? 'invalid' : '' } disabled={this.state.loginPhase} />
                                    </div>
                                    <div className="margin-bottom-5">
                                        <input type="password" ref="password" placeholder="password" className={ this.state.invalidPassword ? 'invalid' : '' } disabled={this.state.loginPhase} />
                                    </div>
                                    <div className="flex flex-align-center">
                                        <div className="flex-1">
                                            <Button className="btn btn-light" innerClassName="margin-left-10 margin-right-10" onClick={this._onLoginClick} loading={this.state.loginPhase} text="login" />
                                        </div>
                                        <div className="text-12">
                                            <a className="cursor-pointer" onClick={this._onForgetClick}>Forgot Password or Username</a>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="auth-window-footer flex flex-align-center">
                                <div className="color-alt-white margin-right-5">Don't have an account?</div>
                                <button className="btn" onClick={this._onSignupClick}>signup</button>
                            </div>
                        </div>
                    </Window>
                );
            },

            _onLoginClick: function() {

                var username = this.refs.username.getDOMNode().value,
                    password = this.refs.password.getDOMNode().value,
                    valid    = true;

                if(!username || !password) {
                    valid = false;
                }

                this.setState({ loginPhase: (!!password && !!username), invalidPassword: !password, invalidUsername: !username });

                if(!valid) {
                    return;
                }

                authService.login(username, password)
                    .then(this._onLoginSuccess)
                    .catch(this._onLoginFail);

            },

            _onLoginSuccess: function(response) {

                this.props.onLogin();

            },

            _onLoginFail: function(response) {

                this.props.showAlert(ERROR_CODES[response.error]);

                this.setState({ loginPhase: false });

                this._triggerInputEvent('username', 'blur');

            },

            _onSignupClick: function() {

                this.props.setPhaseScreen && this.props.setPhaseScreen(AUTH_SCREEN_PHASE.SIGNUP);

            },

            _onForgetClick: function() {

                this.props.setPhaseScreen && this.props.setPhaseScreen(AUTH_SCREEN_PHASE.FORGOT_PASSWORD);

            },

            _onSubmit: function() {
                return false;
            },

            _getLoginScreenWindowOptions: function() {
                return {
                    size: {
                        width: 300,
                        height: 300
                    },
                    minimizable: false,
                    maximizable: false,
                    draggable: true,
                    resizable: false,
                    closable: false
                };
            },

            _getLoginScreenDescriptorPayload: function() {
                return {
                    name: 'login',
                    config: {
                        title: 'Swamp OS Login'
                    }
                };
            },

            _renderUserPhoto: function() {

                var username = this.state.username;

                var identiconBase64 = new window.Identicon(MD5(username || this.state.defaultIdenticon), 60, 0, [49, 57, 72]).toString();

                return "data:image/png;base64," + identiconBase64;
            },

            _onUsernameKeyUp: function(e) {
                var username = this.refs.username.getDOMNode().value;
                this.setState({ username: username });
            },

            _triggerInputEvent: function(ref, evt) {

                setTimeout(function() {

                    $(this.refs[ref].getDOMNode())[evt]();

                }.bind(this));

            }
        });

        return Login;
});
