/** @jsx React.DOM */

define([
        'react',
        'jsx!components/window/swampservicewindowcontent/servicewindowfooter/ServiceWindowFooter',
        'jsx!components/window/swampservicewindowcontent/servicewindowdata/ServiceWindowData',
        'jsx!components/window/swampservicewindowcontent/servicewindowheader/ServiceWindowHeader',
        'jsx!components/window/swampservicewindowcontent/servicewindowperformance/ServiceWindowPerformance',
        'constants/SERVICE_STATE',
        'constants/SWAMP_MODE',
        'constants/PROMPTS',
        'actions/client',
        'env'
    ],
    function(React, ServiceWindowFooter, ServiceWindowData, ServiceWindowHeader, ServiceWindowPerformance, SERVICE_STATE, SWAMP_MODE, PROMPTS, clientActions, env) {

        var SwampServiceWindowContent = React.createClass({

            getInitialState: function() {
                return {};
            },

            componentDidMount: function() {

                this._bindEvents();

            },

            componentWillUnmount: function() {

                this._unbindEvents();

            },

            render: function() {
                return (
                    <div className="flex-1 flex flex-vbox swamp-service-window-content">

                        <ServiceWindowHeader service={this.props.service} />

                        <div className="flex-1 flex flex-vbox">

                            <ServiceWindowData service={this.props.service} onPrompt={this._onPrompt} />

                            <ServiceWindowPerformance service={this.props.service} />

                        </div>

                        <ServiceWindowFooter service={this.props.service} onStartClick={this._startService} onStopClick={this._stopService} onRestartClick={this._restartService} />

                    </div>
                    );
            },

            _stopService: function() {
                if(env.info.mode == SWAMP_MODE.REMOTE) {
                    this._prompt(PROMPTS.REMOTE_SERVICE_STOP.format(this.props.service.name), function() {
                        clientActions.stopService(this.props.service.id);
                    }.bind(this));
                } else {
                    clientActions.stopService(this.props.service.id);
                }
            },

            _startService: function() {
                if(env.info.mode == SWAMP_MODE.REMOTE) {
                    this._prompt(PROMPTS.REMOTE_SERVICE_START.format(this.props.service.name), function() {
                        clientActions.startService(this.props.service.id);
                    }.bind(this));
                } else {
                    clientActions.startService(this.props.service.id);
                }
            },

            _restartService: function() {
                if(env.info.mode == SWAMP_MODE.REMOTE) {
                    this._prompt(PROMPTS.REMOTE_SERVICE_RESTART.format(this.props.service.name), function() {
                        clientActions.restartService(this.props.service.id);
                    }.bind(this));
                } else {
                    clientActions.restartService(this.props.service.id);
                }
            },

            _prompt: function(text, onConfirm, onCancel) {
                clientActions.windowPrompt(this.props.windowId, text, onConfirm, onCancel);
            },

            _bindEvents: function() {

                $(this.getDOMNode()).on('contextmenu', this._onContextMenuClick);

                this.props.service.on('contextMenuRestart', this._restartService);
                this.props.service.on('contextMenuStart', this._startService);
                this.props.service.on('contextMenuStop', this._stopService);
                this.props.service.on('contextMenuForceStop', this._stopService);

            },

            _unbindEvents: function() {

                $(this.getDOMNode()).off('contextmenu', this._onContextMenuClick);

                this.props.service.off('contextMenuRestart', this._restartService);
                this.props.service.off('contextMenuStart', this._startService);
                this.props.service.off('contextMenuStop', this._stopService);
                this.props.service.off('contextMenuForceStop', this._stopService);
            },

            _onContextMenuClick: function(e) {

                e.stopPropagation();
                e.preventDefault();

                clientActions.showContextMenu(this.props.service.getContextMenu(), { top: e.pageY, left: e.pageX });

                return false;

            }

        });

        return SwampServiceWindowContent;
    });