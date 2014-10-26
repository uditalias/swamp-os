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

        };

        var Signup = React.createClass({

            getInitialState: function() {
                return {
                    signupPhase: false,
                    invalidUsername: false,
                    invalidEmail: false,
                    invalidPassword: false,
                    username: '',
                    defaultIdenticon: _.guid()
                }
            },

            componentDidMount: function() {

                

            },

            componentWillUnmount: function() {



            },

            render: function() {

                var options = this._getSignupScreenWindowOptions();

                var payload = this._getSignupScreenDescriptorPayload();

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
                                        <input type="text" ref="username" onKeyUp={this._onUsernameKeyUp} placeholder="username" className={ this.state.invalidUsername ? 'invalid' : '' } disabled={this.state.signupPhase} />
                                    </div>
                                    <div className="margin-bottom-5">
                                        <input type="text" ref="email" placeholder="email" className={ this.state.invalidEmail ? 'invalid' : '' } disabled={this.state.signupPhase} />
                                    </div>
                                    <div className="margin-bottom-5">
                                        <input type="password" ref="password" placeholder="password" className={ this.state.invalidPassword ? 'invalid' : '' } disabled={this.state.signupPhase} />
                                    </div>
                                    <div>
                                        <Button className="btn btn-light" innerClassName="margin-left-10 margin-right-10" onClick={this._onSignupClick} loading={this.state.signupPhase} text="signup" />
                                    </div>
                                </form>
                            </div>
                            <div className="auth-window-footer flex flex-align-center">
                                <div className="color-alt-white margin-right-5">Have an account?</div>
                                <button className="btn" onClick={this._onLoginClick}>login</button>
                            </div>
                        </div>
                    </Window>
                );
            },

            _onSignupClick: function() {

                var username = this.refs.username.getDOMNode().value,
                    email    = this.refs.email.getDOMNode().value,
                    password = this.refs.password.getDOMNode().value,
                    valid    = true;

                if(!username || !password || !email) {
                    valid = false;
                }

                this.setState({ signupPhase: (!!password && !!username && !!email), invalidPassword: !password, invalidUsername: !username, invalidEmail: !email });

                if(!valid) {
                    return;
                }

                authService.signup(username, email, password)
                    .then(this._onSignupSuccess)
                    .catch(this._onSignupFail);

            },

            _onSignupSuccess: function(response) {

                this.props.onSignup();

            },

            _onSignupFail: function(response) {

                this.props.showAlert(this._buildErrorList(response.error));

                this.setState({ signupPhase: false });

                this._triggerInputEvent('username', 'blur');

            },

            _onLoginClick: function() {

                this.props.setPhaseScreen && this.props.setPhaseScreen(AUTH_SCREEN_PHASE.LOGIN);

            },

            _onSubmit: function() {
                return false;
            },

            _getSignupScreenWindowOptions: function() {
                return {
                    size: {
                        width: 300,
                        height: 340
                    },
                    minimizable: false,
                    maximizable: false,
                    draggable: true,
                    resizable: false,
                    closable: false
                };
            },

            _getSignupScreenDescriptorPayload: function() {
                return {
                    name: 'signup',
                    config: {
                        title: 'Swamp OS Signup'
                    }
                };
            },

            _renderUserPhoto: function() {
                var identiconBase64 = new window.Identicon(MD5(this.state.username || this.state.defaultIdenticon), 60, 0, [49, 57, 72]).toString();
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

            },

            _buildErrorList: function(errors) {
                var domErrors = [];
                domErrors.push('<ul class="auth-errors-list list-unstyled">');
                for(var errorKey in errors) {
                    for(var i = 0; i < errors[errorKey].length; i++) {
                        domErrors.push('<li>' + errors[errorKey][i] + '</li>');
                    }
                }
                domErrors.push('</ul>');

                return '<div>' + domErrors.join('') + '</div>';
            }
        });

        return Signup;
});
