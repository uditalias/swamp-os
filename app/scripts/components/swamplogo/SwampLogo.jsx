/** @jsx React.DOM */

define(['react'], function(React) {

    var SwampLogo = React.createClass({
        render: function() {
            return (
                <div className="swamp-logo">
                    <h1 className="text-36 w700">
                        <div>Swamp</div>
                        <span>beta</span>
                    </h1>
                </div>
                );
        }
    });

    return SwampLogo;

});