/** @jsx React.DOM */

define([
        'react',
        'jsx!components/topmenu/TopMenu',
        'jsx!components/desktop/Desktop',
        'jsx!components/notificationspanel/NotificationsPanel',
        'jsx!components/applicationprompt/ApplicationPrompt',
        'jsx!components/contextmenu/ContextMenu',
        'stores/swampApplicationStore',
        'stores/swampLogsStore',
        'stores/swampServicesStore',
        'stores/swampPluginsStore',
        'stores/menuItemsStore',
        'stores/swampWindowsStore',
        'stores/swampIconsStore'
    ],
    function(React, TopMenu, Desktop, NotificationsPanel, ApplicationPrompt, ContextMenu, swampApplicationStore, swampLogsStore, swampServicesStore, swampPluginsStore, menuItemsStore, swampWindowsStore, swampIconsStore) {

        var THROTTLED_CHANGE_HANDLER_TIME = 300;

        function getAppState() {
            return {
                logs: swampLogsStore.getAll(),
                services: swampServicesStore.getAll(),
                plugins: swampPluginsStore.getAll(),
                servicesCount: swampServicesStore.count(),
                runningServicesCount: swampServicesStore.runningServicesCount(),
                stoppedServicesCount: swampServicesStore.stoppedServiceCount(),
                unreadNotificationsCount: swampLogsStore.getUnreadCount(),
                menu: menuItemsStore.getAll(),
                windows: swampWindowsStore.getAll(),
                icons: swampIconsStore.getAll()
            };
        }

        var SwampOS = React.createClass({

            getInitialState: function() {

                return getAppState();

            },

            componentDidMount: function() {

                this._throttledChangeHandler = _.throttle(this._onChange, THROTTLED_CHANGE_HANDLER_TIME, { leading: true });

                swampApplicationStore.addChangeListener(this._throttledChangeHandler);
                swampServicesStore.addChangeListener(this._throttledChangeHandler);
                swampPluginsStore.addChangeListener(this._throttledChangeHandler);
                swampLogsStore.addChangeListener(this._throttledChangeHandler);
                menuItemsStore.addChangeListener(this._throttledChangeHandler);
                swampWindowsStore.addChangeListener(this._throttledChangeHandler);
                swampIconsStore.addChangeListener(this._throttledChangeHandler);
            },

            componentWillUnmount: function() {
                swampApplicationStore.removeChangeListener(this._throttledChangeHandler);
                swampLogsStore.removeChangeListener(this._throttledChangeHandler);
                swampServicesStore.removeChangeListener(this._throttledChangeHandler);
                swampPluginsStore.removeChangeListener(this._throttledChangeHandler);
                menuItemsStore.removeChangeListener(this._throttledChangeHandler);
                swampWindowsStore.removeChangeListener(this._throttledChangeHandler);
                swampIconsStore.removeChangeListener(this._throttledChangeHandler);

                this._throttledChangeHandler = null;
            },

            render: function() {
                return (
                    <div className="swamp-os flex flex-vbox">

                        {this._getApplicationPrompt()}

                        <TopMenu
                            items={this.state.menu}
                            services={this.state.services}
                            plugins={this.state.plugins}
                            servicesCount={this.state.servicesCount}
                            runningServicesCount={this.state.runningServicesCount}
                            stoppedServicesCount={this.state.stoppedServicesCount}
                            unreadNotificationsCount={this.state.unreadNotificationsCount}
                        />

                        <NotificationsPanel isOpen={swampLogsStore.isPanelOpen()} logs={this.state.logs} />

                        <Desktop
                            isNotificationsPanelOpen={swampLogsStore.isPanelOpen()}
                            windows={this.state.windows}
                            icons={this.state.icons}
                        />

                        {this._getContextMenu()}

                    </div>);
            },

            _onChange: function() {

                this.setState(getAppState());

            },

            _getApplicationPrompt: function() {

                if(swampApplicationStore.hasPrompt()) {
                    return <ApplicationPrompt prompt={swampApplicationStore.getPrompt()} />;
                }

                return null;
            },

            _getContextMenu: function() {
                if(swampApplicationStore.hasContextMenu()) {
                    return <ContextMenu options={swampApplicationStore.getContextMenu()} />
                }
            }
        });

        return SwampOS;

    });