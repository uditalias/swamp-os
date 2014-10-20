define(['react'], function(React) {

    var Loading = React.createClass({

        render: function() {
            return (
                <div className="loading flex flex-align-center flex-pack-center">
                    <div>
                        <div className="loading-text">Loading Swamp...</div>
                    </div>
                </div>
                );
        }
    });

    return Loading;

});