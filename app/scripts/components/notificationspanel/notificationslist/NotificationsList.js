define(['react', 'jqueryVisible'], function(React, jqueryVisible) {

    var NotificationsList = React.createClass({

        componentDidMount: function() {

            $(this.getDOMNode()).find('ul.list-items').perfectScrollbar();
            $(this.getDOMNode()).find('ul.list-items').on('scroll', this._onListScroll);

        },

        componentWillUnmount: function() {

            $(this.getDOMNode()).find('ul.list-items').perfectScrollbar('destroy');
            $(this.getDOMNode()).find('ul.list-items').off('scroll', this._onListScroll);

        },

        render: function() {
            return (
                <div className="notifications-list flex flex-vbox">
                    <div className="list-title w400">{this.props.title}</div>
                    <ul className="list-items flex-1">
                        {this._buildListItems()}
                    </ul>
                </div>
                );
        },

        _buildListItems: function() {

            if(!this.props.items.length) {
                return (
                    <div className="no-items flex flex-pack-center flex-align-center text-18 color-alt-white w100">
                        <div>No Notifications :(</div>
                    </div>
                    );
            }

            var rawItems = _.clone(this.props.items).reverse(),
                items = [],
                date,
                groups = {};

            _.forEach(rawItems, function(item) {
                date = item.time.format('DD.MM.YYYY');
                if(!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(
                    <li className="text-14 color-alt-white" key={item.id}>
                        <span className="margin-right-10">{item.time.format('HH:mm:ss')}</span>
                        <span>{item.text}</span>
                    </li>
                );
            });

            _.forEach(groups, function(group, date) {
                items.push(
                    <li key={date}>
                        <div className="group-title">{date}</div>
                        <ul className="group-items">{group}</ul>
                    </li>
                );
            });

            return items;
        },

        _onListScroll: function() {

            var parent;

            $('.list-items li .group-title').each(function() {

                parent = $(this).parent();

                if(parent.visible(true)) {

                    if(parent.position().top > 0) {
                        $(this).css({'top': 0, 'bottom': 'auto'});
                    } else {

                        if( parent.position().top + parent.outerHeight() - $(this).outerHeight() >= 0 ) {
                            $(this).css({'top': Math.abs(parent.position().top), 'bottom': 'auto'});
                        } else {
                            $(this).css({'top': 'auto', 'bottom': 0});
                        }
                    }

                } else {
                    $(this).css({ 'top': 0, 'bottom': 'auto' });
                }

                parent = null;
            });

            parent = null;
        }
    });

    return NotificationsList;
});