define([
        'react',
        'actions/client',
        'jsx!components/topmenu/menuitem/MenuItem',
        'jsx!utils/jsxUtils'
    ],
    function(React, clientActions, MenuItem, jsxUtils) {

        var ContextMenu = React.createClass({

            componentDidMount: function() {

                this.cancelAutoCloseHandler = null;

                if(this.props.options) {
                    $('*:not(.context-menu ul li)').on('mousedown', this._onDocumentMouseDown);
                    this._handleAutoClose();
                }

            },

            componentWillUnmount: function() {

                $('*:not(.context-menu ul li)').off('mousedown', this._onDocumentMouseDown);

                this.cancelAutoCloseHandler && this.cancelAutoCloseHandler();
                this.cancelAutoCloseHandler = null;
            },

            render: function() {

                var className = "context-menu position-absolute ";

                className += !this.props.options ? 'hide' : '';

                return (
                    <div
                    className={className}
                    style={{ top: this.props.options.position.top + 'px', left: this.props.options.position.left + 'px' }}>
                        <div className="context-menu-tree">
                            {jsxUtils.buildMenuTree(this.props.options.items)}
                        </div>
                    </div>
                    );
            },

            _onDocumentMouseDown: function(e) {
                clientActions.clearContextMenu();

                $('*:not(.context-menu ul li)').off('mousedown', this._onDocumentMouseDown);
            },

            _handleAutoClose: function() {

                this.cancelAutoCloseHandler = jsxUtils.doWhenMouseDistance(this.getDOMNode(), 150, this._onDocumentMouseDown)

            }
        });

        return ContextMenu;
    });