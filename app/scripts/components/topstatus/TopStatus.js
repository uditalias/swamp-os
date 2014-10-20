define(['react', 'jsx!components/countindicator/CountIndicator'], function(React, CountIndicator) {

    var TopStatus = React.createClass({
        render: function() {
            return (
                <div className="top-status flex flex-align-center text-14 w400">
                    <div className="margin-right-10 flex-1 flex flex-align-center">
                        <CountIndicator count={this.props.servicesCount} /> <div className="margin-left-5">Services</div>
                    </div>
                    <div className="margin-right-5 flex flex-align-center">
                        <CountIndicator count={this.props.runningServicesCount} /> <div className="margin-left-5">Running</div>
                    </div>
                    <span>&middot;</span>
                    <div className="margin-left-5 flex flex-align-center">
                        <CountIndicator count={this.props.stoppedServicesCount} /> <div className="margin-left-5">Stopped</div>
                    </div>
                </div>
                );
        }
    });

    return TopStatus;
});