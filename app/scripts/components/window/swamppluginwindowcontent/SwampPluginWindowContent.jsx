/** @jsx React.DOM */

define([
        'react',
        'api/SwampPluginsAPI',
    ],
    function(React, SwampPluginsAPI) {

        var SwampPluginWindowContent = React.createClass({

            getInitialState: function() {
                return {};
            },

            componentDidMount: function() {

                this._$iframe = $(this.getDOMNode()).find('iframe');

                this._contentWindow = this._$iframe[0].contentWindow;

                this._injectAPI();

                this._bindIFrameEvents();

                this.props.plugin.on('message', this._onPluginMessage);
            },

            componentWillUnmount: function() {

                this._unbindIFrameEvents();

                this._$iframe = null;

                this._contentWindow.SAPI = null;

                this._contentWindow = null;

                this.props.plugin.unLoad();

                this.props.plugin.off('message', this._onPluginMessage);
            },

            render: function() {
                return (
                    <div className="swamp-plugin-window-content">
                        <iframe
                            className="spread"
                            src={this._getIFrameSrc()}>
                        </iframe>
                    </div>
                    );
            },

            _bindIFrameEvents: function() {

                this._$iframe.on('load', this._onIFrameLoad);

                $(this._contentWindow).on('mousedown', this._onFrameWindowMouseDown);
            },

            _unbindIFrameEvents: function() {
                this._$iframe.off('load', this._onIFrameLoad);

                $(this._contentWindow).off('mousedown', this._onFrameWindowMouseDown);
            },

            _onIFrameLoad: function() {
                this._injectCSS();
                this.props.plugin.dispatchLoadEvent();
            },

            _onFrameWindowMouseDown: function(e) {
                $(this.getDOMNode()).parent().trigger(e);
                return true;
            },

            _getSwampCSSElement: function() {
                return '<link rel="stylesheet" href="' + location.origin + '/styles/plugins.css" />';
            },

            _getIFrameSrc: function() {
                return this.props.plugin.basePath + this.props.plugin.main;
            },

            _injectAPI: function() {
                this._contentWindow.SAPI = new SwampPluginsAPI();

                this._contentWindow.SAPI.on('request', this.props.onPluginRequest);
            },

            _injectCSS: function() {
                if(this.props.plugin.config && this.props.plugin.config.useSwampStyle) {
                    $(this._contentWindow.document.head).append(this._getSwampCSSElement());
                }
            },

            _onPluginMessage: function(payload) {
                this._contentWindow.SAPI && this._contentWindow.SAPI.sendMessage(payload);
            }

        });

        return SwampPluginWindowContent;
    });