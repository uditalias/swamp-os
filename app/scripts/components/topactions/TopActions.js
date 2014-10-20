define([
        'react',
        'jsx!components/objectfinder/ObjectFinder',
        'jsx!components/countindicator/CountIndicator',
        'actions/client'
    ],
    function(React, ObjectFinder, CountIndicator, clientActions) {

        var TopActions = React.createClass({

            componentDidMount: function() {

                $('.desktop').on('click', this._onDocumentClick);

            },
            componentWillUnmount: function() {

                $('.desktop').off('click', this._onDocumentClick);

            },
            render: function() {

                var notificationsCount;
                if(this.props.unreadNotificationsCount) {
                    notificationsCount = <CountIndicator count={this.props.unreadNotificationsCount} offset={-13} />;
                }

                return (
                    <div className="top-actions flex">
                        <div className="action-trigger flex flex-align-center" dataAutoClose="true" ref="search_trigger" onClick={this._onActionClick.bind(this, 'search_trigger')}>
                            <i className="fa fa-search"></i>
                            <div className="action-view" onClick={this._onActionViewClick}>
                                <ObjectFinder services={this.props.services} closeAction={this._closeAction.bind(this, 'search_trigger')} />
                            </div>
                        </div>
                        <div className="action-trigger flex flex-align-center" ref="notifications_trigger" onClick={this._onActionClick.bind(this, 'notifications_trigger')}>
                            <i className="fa fa-flag"></i>
                        </div>
                        <div className="unread-notifications-counter">
                            {notificationsCount}
                        </div>
                    </div>
                    );
            },

            _getActiveActionRef: function() {
                return _.filter(this.refs, function(ref) {

                    return $(ref.getDOMNode()).hasClass('active');

                }.bind(this))[0];
            },

            _closeAction: function(ref, e) {
                if(this.refs[ref]) {
                    $(this.refs[ref].getDOMNode()).removeClass('active');
                }
            },

            _onActionClick: function(ref, e) {

                var activeActionRef = this._getActiveActionRef();
                if(activeActionRef && activeActionRef.props.ref != ref) {
                    if(activeActionRef.props.dataAutoClose) {
                        $(activeActionRef.getDOMNode()).removeClass('active');
                    }
                }

                activeActionRef = null;

                if(this.refs[ref]) {

                    var $el = $(this.refs[ref].getDOMNode());
                    $el.toggleClass('active');

                    switch(ref) {
                        case 'search_trigger':
                            if($el.hasClass('active')) {
                                $('.object-finder .finder-query input').focus();
                            }
                            break;
                        case 'notifications_trigger':
                            clientActions.toggleNotificationsPanel($el.hasClass('active'));
                            break;
                    }

                }

            },

            _onActionViewClick: function(e) {
                e.preventDefault();
                e.stopPropagation();

                return false;
            },

            _onDocumentClick: function(e) {

                var activeActionRef = this._getActiveActionRef();
                if(activeActionRef && activeActionRef.props.dataAutoClose) {
                    $(activeActionRef.getDOMNode()).removeClass('active');
                }

                activeActionRef = null;

            }
        });

        return TopActions;
    });