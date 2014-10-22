/** @jsx React.DOM */

define([
        'react',
        'env',
        'jsx!components/swamplogo/SwampLogo',
        'jsx!components/window/Window',
        'actions/client'
    ],
    function(React, env, SwampLogo, Window, clientActions) {

        var contextMenu = {
            minimize_all: {
                callback: function() {
                    clientActions.minimizeAllWindows();
                }
            },
            close_all: {
                callback: function() {
                    clientActions.closeAllWindows();
                }
            },
            arrange_windows: {
                callback: function() {
                    clientActions.arrangeAllWindows();
                }
            }
        };

        var Desktop = React.createClass({

            componentDidMount: function() {

                this._bindEvents();

            },

            componentWillUnmount: function() {

                this._unbindEvents();

            },

            render: function() {

                return (
                    <div className={"flex-1 desktop " + (this.props.isNotificationsPanelOpen ? 'notifications-panel-open' : '')}>
                        <SwampLogo />
                        <div className="windows-canvas">
                            {this._buildWindows()}
                        </div>
                        <div className="swamp-version">
                            v{env.version}
                        </div>
                    </div>
                    );
            },

            _buildIcons: function() {
                var icons = [];

                _.forEach(this.props.windows, function(icon) {
                    icons.push(
                        <Icon descriptor={icon} />
                    );
                });

                return icons;
            },

            _buildWindows: function() {
                var windows = [];

                _.forEach(this.props.windows, function(win) {
                    windows.push(<Window key={win.id} descriptor={win} containerSelector={'.desktop .windows-canvas'} />);
                });

                return windows;
            },

            _onMouseDown: function(e) {

                clientActions.focusWindow(null);

            },

            _onContextMenuClick: function(e) {

                e.stopPropagation();
                e.preventDefault();

                clientActions.showContextMenu(contextMenu, { top: e.pageY, left: e.pageX });

                return false;

            },

            _bindEvents: function() {

                $(this.getDOMNode()).on('mousedown', this._onMouseDown);
                $(this.getDOMNode()).on('contextmenu', this._onContextMenuClick);

            },

            _unbindEvents: function() {

                $(this.getDOMNode()).off('mousedown', this._onMouseDown);
                $(this.getDOMNode()).off('contextmenu', this._onContextMenuClick);

            }
        });

        return Desktop;

    });