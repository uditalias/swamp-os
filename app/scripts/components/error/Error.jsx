/** @jsx React.DOM */

define(['react'], function(React) {

    var Error = React.createClass({

        render: function() {
            return (
                <div className="error flex flex-align-center flex-pack-center">
                    <div>
                        <div className="error-text">
                            <div>Connection Error</div>
                            <div className={ this.props.error ? 'text-18 error-message' : 'hidden' }>({this.props.error.message})</div>
                        </div>
                    </div>
                </div>
                );
        }
    });

    return Error;

});