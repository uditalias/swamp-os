/** @jsx React.DOM */

define([
        'react',
        'constants/SERVICE_STATE',
        'constants/PROMPTS',
        'constants/SWAMP_MODE',
        'constants/WINDOW_OPEN_TRIGGER',
        'constants/INTERNAL_PLUGINS',
        'jsx!components/selectbox/SelectBox',
        'bootstrap/OverlayTrigger',
        'bootstrap/Tooltip',
        'actions/client',
        'stores/swampPluginsStore',
        'moment',
        'env'
    ],
    function(React, SERVICE_STATE, PROMPTS, SWAMP_MODE, WINDOW_OPEN_TRIGGER, INTERNAL_PLUGINS, SelectBox, OverlayTrigger, Tooltip, clientActions, swampPluginsStore, moment, env) {

        var _DEFAULT_ENV_SELECTION = 'Select Env...';

        var ServiceWindowData = React.createClass({

            getInitialState: function() {
                return {
                    selectedEnvironment: this.props.service.runningEnvironment
                }
            },

            render: function() {
                var restartButton;

                if(this.state.selectedEnvironment != this.props.service.runningEnvironment) {
                    restartButton =
                        <div className="">
                            <button onClick={this._confirmChangeSelectedEnv} className="btn margin-right-5"><div className={'text-14 w300 ' + (this.props.service.state == SERVICE_STATE.RUN ? 'color-yellow' : 'color-green')}>{ this.props.service.state == SERVICE_STATE.RUN ? 'Restart' : 'Start'}</div></button>
                            <button className="btn margin-right-5" onClick={this._cancelChangeSelectedEnv}><div className="w300 color-red text-14">Cancel</div></button>
                        </div>
                }

                return (
                    <div className="service-data text-14">

                        <div className="flex data-row">
                            <div className="flex flex-1 padding-right-10 data-col flex-align-center">
                                <div className="flex-1">Started</div>
                                <div className="w500">{this.props.service.startTime ? (moment(this.props.service.startTime).fromNow()) : '-'}</div>
                            </div>

                            <div className="flex flex-1 padding-left-10 data-col flex-align-center">
                                <div className="flex-1">Change Env</div>
                                <div className="flex">
                                {restartButton}
                                    <SelectBox options={Object.keys(this.props.service.environments)} selected={this.state.selectedEnvironment || _DEFAULT_ENV_SELECTION} onChange={this._onEnvSelectBoxChange} />
                                </div>
                            </div>
                        </div>

                        <div className="flex data-row">

                            <div className="flex flex-1 padding-right-10 data-col flex-align-center">
                                <div className="flex-1">Process ID</div>
                                <div className="w500">{this.props.service.pid || '-'}</div>
                            </div>

                            <div className="flex flex-1 padding-left-10 data-col flex-align-center">
                                <div className="flex-1">Current Env</div>
                                <div className="w500 flex flex-align-center">
                                    <div>{this.props.service.runningEnvironment || '-'}</div>
                                    <div className="cursor-pointer margin-left-10">
                                        <button className="btn" onClick={this._onEnvEditClick}><i className="fa fa-gear"></i></button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex data-row">
                            <div className="flex flex-1 data-col flex-align-center">
                                <div className="flex-1">Service Path</div>
                                <OverlayTrigger placement="top" overlay={<Tooltip>{this.props.service.path}</Tooltip>}>
                                    <div className="w500 text-truncate">{this.props.service.path}</div>
                                </OverlayTrigger>
                            </div>

                            <div className="flex flex-1 data-col flex-align-center">
                                <div className="flex-1">Service Script</div>
                                <div className="w500">{this.props.service.script || '-'}</div>
                            </div>
                        </div>

                    </div>
                    );
            },

            _onEnvSelectBoxChange: function(selectedValue, oldValue) {

                this.props.service.setSelectedEnvironment(selectedValue);

                this.setState({ selectedEnvironment: selectedValue });

            },

            _confirmChangeSelectedEnv: function() {
                if(this.props.service.isRunning) {

                    if(env.info.mode == SWAMP_MODE.REMOTE) {
                        this.props.onPrompt && this.props.onPrompt(PROMPTS.REMOTE_SERVICE_RESTART_WITH_ENV.format('restart', this.props.service.name, this.state.selectedEnvironment), function() {
                            clientActions.restartService(this.props.service.id);
                        }.bind(this));
                    } else {
                        clientActions.restartService(this.props.service.id);
                    }
                } else {
                    if(env.info.mode == SWAMP_MODE.REMOTE) {
                        this.props.onPrompt && this.props.onPrompt(PROMPTS.REMOTE_SERVICE_RESTART_WITH_ENV.format('start', this.props.service.name, this.state.selectedEnvironment), function() {
                            clientActions.startService(this.props.service.id);
                        }.bind(this));
                    } else {
                        clientActions.startService(this.props.service.id);
                    }
                }
            },

            _cancelChangeSelectedEnv: function() {
                this.props.service.setSelectedEnvironment(this.props.service.runningEnvironment);

                this.setState({ selectedEnvironment: this.props.service.runningEnvironment});
            },

            _onEnvEditClick: function() {
                var plugin = swampPluginsStore.getByName(INTERNAL_PLUGINS.ENVIRONMENTS_EDITOR);

                if(plugin) {
                    clientActions.openPluginWindow(plugin, WINDOW_OPEN_TRIGGER.TOP_MENU);

                    if(plugin.isLoaded()) {
                        plugin.sendMessage(this.props.service.name);
                    } else {
                        plugin.on('loaded', this._onEnvEditorPluginLoaded);
                    }
                }
            },

            _onEnvEditorPluginLoaded : function() {

                var plugin = swampPluginsStore.getByName(INTERNAL_PLUGINS.ENVIRONMENTS_EDITOR);

                plugin.sendMessage(this.props.service.name);

                if(plugin) {
                    plugin.off('loaded', this._onEnvEditorPluginLoaded);
                }
            }
        });

        return ServiceWindowData;
    });