define(['react'], function(React) {

    var CountIndicator = React.createClass({

        componentDidMount: function() {
            this._prevCount = 0;
            this._offset = this.props.offset || -20;
        },

        render: function() {

            var prevCount = this._prevCount;
            var newCount = this.props.count;


            var elements;
            if(prevCount != newCount) {

                if(prevCount > newCount) {

                    elements = (
                        <div className="indicator-count-wrapper" ref="indicatorWrapper">
                            <div>{prevCount}</div>
                            <div>{newCount}</div>
                        </div>
                        );

                    if(this.refs.indicatorWrapper) {

                        var $el = $(this.refs.indicatorWrapper.getDOMNode());

                        $el.css('margin-top', 0);

                        setTimeout(function() {

                            $el.animate({'margin-top': this._offset}, 150, function() {
                                this._prevCount = newCount;

                                $el = null;
                            }.bind(this));

                        }.bind(this));
                    }

                } else {
                    elements = (
                        <div className="indicator-count-wrapper" ref="indicatorWrapper">
                            <div>{newCount}</div>
                            <div>{prevCount}</div>
                        </div>
                        );

                    if(this.refs.indicatorWrapper) {

                        var $el = $(this.refs.indicatorWrapper.getDOMNode());

                        $el.css('margin-top', this._offset);

                        setTimeout(function() {

                            $el.animate({'margin-top': 0}, 150, function() {
                                this._prevCount = newCount;

                                $el = null;
                            }.bind(this));

                        }.bind(this));
                    }
                }

            } else {
                elements = <div className="indicator-count-wrapper" ref="indicatorWrapper"><div>{newCount}</div><div>{prevCount}</div></div>;
            }

            return(
                <div className="count-indicator">
                    {elements}
                </div>
                );
        }
    });

    return CountIndicator;
});