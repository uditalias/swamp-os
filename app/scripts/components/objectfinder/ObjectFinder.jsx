/** @jsx React.DOM */

define(['react', 'jsx!components/objectfinder/finderitem/FinderItem', 'perfectScrollbar'],

    function(React, FinderItem, perfectScrollbar) {

        var HOT_KEYS = [ 38, 40, 13];

        var ObjectFinder = React.createClass({
            getInitialState: function() {
                return { results: [], query: '' }
            },
            componentWillUnmount: function() {
                $('.object-finder .finder-results ul').perfectScrollbar('destroy');
            },
            componentDidMount: function() {

            },
            render: function() {

                var noResults;
                var items = [];

                if(this.state.query && this.state.results.length == 0) {
                    noResults = (
                        <div className="no-finder-results flex flex-align-center flex-pack-center text-center padding-15">
                            <div>
                                <div className="text-16 w400 margin-bottom-5">
                                No Objects found for query `<span className="w700 break-word">{this.state.query}</span>`
                                </div>
                                <div className="text-14 w300">
                                Try using a different search query
                                </div>
                            </div>
                        </div>
                        );
                }

                if(this.state.results.length > 0) {
                    _.forEach(this.state.results, function(service) {
                        items.push(
                            <FinderItem key={service.id} item={service} onClick={this._onItemClick} />
                        );
                    }.bind(this));

                    items = (<ul>{items}</ul>);
                } else {
                    $('.object-finder .finder-results ul').perfectScrollbar('destroy');
                }

                return (
                    <div className="object-finder">
                        <div className="finder-query">
                            <input type="text" placeholder="Search services and plugins..." ref="finder_input" onKeyDown={this._onFinderKeyDown} onKeyUp={this._onFinderKeyUp} />
                            <div onClick={this._clearQuery} className={(!this.state.query ? 'hidden' : '') + ' clear-query'}>
                                <i className="fa fa-times"></i>
                            </div>
                        </div>
                        {noResults}
                        <div className="finder-results">
                            {items}
                        </div>
                    </div>
                    );
            },

            _handleArrowDown: function() {
                if(!$('.finder-item.selected').length) {
                    $('.finder-item').first().addClass('selected')[0].scrollIntoView();
                } else {
                    var next = $('.finder-item.selected').removeClass('selected').next('.finder-item');
                    if(next.length) {
                        next.addClass('selected')[0].scrollIntoView();
                    } else {
                        $('.finder-item').first().addClass('selected')[0].scrollIntoView();
                    }

                    next = null;
                }
            },

            _handleArrowUp: function() {
                if(!$('.finder-item.selected').length) {
                    $('.finder-item').last().addClass('selected')[0].scrollIntoView();
                } else {
                    var prev = $('.finder-item.selected').removeClass('selected').prev();
                    if(prev.length) {
                        prev.addClass('selected')[0].scrollIntoView();
                    } else {
                        $('.finder-item').last().addClass('selected')[0].scrollIntoView();
                    }

                    prev = null;
                }
            },

            _handleNavigation: function(key) {

                if(!$('.finder-item').length) return false;

                if(key == 13) {
                    $('.finder-item.selected').trigger('click');
                } else {
                    if(key == 40) {
                        this._handleArrowDown();
                    } else {
                        this._handleArrowUp();
                    }
                }

                return false;
            },

            _clearSelectedItem: function() {
                $('.object-finder .finder-results .finder-item.selected').removeClass('selected');
            },

            _onFinderKeyUp: function(e) {

                e.preventDefault();
                e.stopPropagation();

                if(HOT_KEYS.indexOf(e.which) > -1) {
                    return this._handleNavigation(e.which);
                }

                this._clearSelectedItem();
                $('.object-finder .finder-results ul').scrollTop(0);

                var searchQuery = this.refs.finder_input.getDOMNode().value.trim();
                var results = [];

                if(searchQuery) {
                    results = _.filter(this.props.services, function(service) {
                        return service.name.toLowerCase().indexOf(searchQuery.toLowerCase().trim()) > -1;
                    });
                }

                this.setState({ results: results, query: searchQuery }, function() {
                    $('.object-finder .finder-results ul').perfectScrollbar();
                    $('.object-finder .finder-results ul').perfectScrollbar('update');
                });

                return false;

            },

            _onFinderKeyDown: function(e) {
                if(HOT_KEYS.indexOf(e.which) > -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            },

            _onItemClick: function() {
                this.setState({query: '', results: []});

                $(this.refs.finder_input.getDOMNode()).focus().val('');

                this.props.closeAction && this.props.closeAction();
            },

            _clearQuery: function() {
                this.setState({query: '', results: []});

                $(this.refs.finder_input.getDOMNode()).focus().val('');

            }
        });

        return ObjectFinder;

    });