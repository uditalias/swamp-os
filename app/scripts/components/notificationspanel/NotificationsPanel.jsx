/** @jsx React.DOM */

define([
        'react',
        'jsx!components/notificationspanel/notificationslist/NotificationsList',
        'jsx!components/panelgripper/PanelGripper',
    ],
    function(React, NotificationsList, PanelGripper) {

        var NotificationsPanel = React.createClass({

            componentDidMount: function() {

            },

            componentWillUnmount: function() {

            },
            render: function() {

                var out = <NotificationsList items={this.props.logs.out} title="Swamp Out Notifications" />;
                var error = <NotificationsList items={this.props.logs.error} title="Swamp Error Notifications" />;

                return (
                    <div className={'notifications-panel ' + (this.props.isOpen ? 'open' : '') }>
                        <div className="panel-inner">
                            <div className="inner-shadow"></div>
                            <div className="notifications-list-wrapper out-notifications">
                                {this.props.isOpen ? out : ''}
                            </div>
                            <PanelGripper gripperStart={this._onGripperStart} gripperEnd={this._onGripperEnd} minPanelHeight={100} panels={{ top: '.out-notifications', bottom: '.err-notifications' }} />
                            <div className="notifications-list-wrapper err-notifications">
                                {this.props.isOpen ? error : ''}
                            </div>
                        </div>
                    </div>
                    );
            },

            _onGripperStart: function() {

                $(this.getDOMNode()).addClass('active');

            },

            _onGripperEnd: function() {

                $(this.getDOMNode()).removeClass('active');

            }
        });

        return NotificationsPanel;
    });