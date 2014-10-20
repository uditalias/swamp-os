define(['react'], function(React) {

    var SelectBox = React.createClass({

        getInitialState: function() {
            return { selected: this.props.selected };
        },

        componentDidMount: function() {

        },

        componentWillUnmount: function() {

        },

        render: function() {
            var selectOptions = [];

            _.forEach(this.props.options, function(option) {
                selectOptions.push(<li className={option == this.props.selected ? 'active' : ''} onClick={this._onItemClick} value={option} key={option}>{option}</li>)
            }.bind(this));

            return (
                <div className="select-box" onClick={this._toggle}>
                    <div className="flex select-box-label w400 text-14 btn flex-align-center">
                        <div className="margin-right-10 flex-1">{this.props.selected}</div>
                        <div><i className="fa fa-caret-up"></i><i className="fa fa-caret-down"></i></div>
                    </div>
                    <ul>{selectOptions}</ul>
                </div>
                );
        },

        _toggle: function() {

            $(this.getDOMNode()).toggleClass('active');

        },

        _onItemClick: function(e) {

            var value = $(e.target).attr('value');

            if(value && value != this.props.selected) {

                this.props.onChange && this.props.onChange(value, this.state.selected);

                this.setState({ selected: value });
            }
        }
    });

    return SelectBox;
});