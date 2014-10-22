/** @jsx React.DOM */

define([
        'react',
        'jsx!components/topmenu/menuitem/MenuItem',
        'jsx!components/topstatus/TopStatus',
        'jsx!components/topactions/TopActions',
        'jsx!utils/jsxUtils'
    ],
    function(React, MenuItem, TopStatus, TopActions, jsxUtils) {

        var TopMenu = React.createClass({

            componentDidMount: function() {

            },

            componentWillUnmount: function() {

            },

            render: function() {

                var menuTree = jsxUtils.buildMenuTree(this.props.items);

                return (
                    <div className="top-menu flex">
                        <div className="flex-1 menu-tree">
                            {menuTree}
                        </div>
                        <div className="flex">

                            <TopActions
                                services={this.props.services}
                                unreadNotificationsCount={this.props.unreadNotificationsCount}
                            />

                            <TopStatus
                                servicesCount={this.props.servicesCount}
                                runningServicesCount={this.props.runningServicesCount}
                                stoppedServicesCount={this.props.stoppedServicesCount}
                            />
                        </div>
                    </div>
                    );
            }
        });

        return TopMenu;

    });