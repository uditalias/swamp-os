/** @jsx React.DOM */

define(['react', 'actions/client', 'constants/WINDOW_OPEN_TRIGGER'], function(React, clientActions, WINDOW_OPEN_TRIGGER) {

    var FinderItem = React.createClass({
        render: function() {
            return (
                <li className="finder-item flex flex-align-center" onClick={this._onItemClick}>
                    <img src={this.props.item.avatarBase64Url} />
                    <div className="margin-left-10 margin-right-10 flex-1 color-alt-white service-name">{this.props.item.name}</div>
                    <div className="margin-right-10 text-12 service-status">
                        <span className={this.props.item.isRunning ? 'color-green' : 'color-red'}>{this.props.item.isRunning ? 'Running' : 'Stopped'}</span>
                    </div>
                </li>
                );
        },

        _onItemClick: function() {
            this.props.onClick && this.props.onClick();

            clientActions.openServiceWindow(this.props.item, WINDOW_OPEN_TRIGGER.FINDER);
        }
    });

    return FinderItem;

});