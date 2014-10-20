define([
        'react',
        'constants/SERVICE_STATE'
    ],
    function(React, SERVICE_STATE) {

        var ServiceWindowFooter = React.createClass({
            render: function() {

                var pid;
                if(this.props.service.state == SERVICE_STATE.RUN) {
                    pid = <div className="flex text-12">[{this.props.service.pid}]</div>
                }

                return (
                    <div className="flex service-footer padding-10 flex-align-center">
                        <div className="flex-1 flex flex-align-center text-14 color-alt-white">
                            <div className="flex margin-right-5">
                                <span>Status:</span>
                                <span className="margin-left-5 margin-right-5">
                                    <i className={'fa ' + (this.props.service.state == SERVICE_STATE.RUN ? 'fa-chain' : 'fa-chain-broken')}></i>
                                </span>
                                <span className="w500">
                                        {this.props.service.state == SERVICE_STATE.RUN ? 'Running' : 'Stopped'}
                                </span>
                            </div>
                            {pid}
                        </div>
                        <div className="flex service-actions">
                            <div>
                                <button onClick={this._onStartClick} className="btn" disabled={(this.props.service.state == SERVICE_STATE.RUN || this.props.service.state == SERVICE_STATE.RESTART)}><i className="fa fa-play"></i></button>
                            </div>
                            <div className="margin-left-5 margin-right-5">
                                <button onClick={this._onStopClick} className="btn" disabled={(this.props.service.state == SERVICE_STATE.STOP || this.props.service.state == SERVICE_STATE.RESTART)}><i className="fa fa-stop"></i></button>
                            </div>
                            <div>
                                <button onClick={this._onRestartClick} className="btn" disabled={(this.props.service.state == SERVICE_STATE.STOP)}><i className="fa fa-refresh"></i></button>
                            </div>
                        </div>
                    </div>
                    );
            },

            _onStartClick: function() {

                this.props.onStartClick();

            },

            _onStopClick: function() {

                this.props.onStopClick();

            },

            _onRestartClick: function() {

                this.props.onRestartClick();
            }
        });

        return ServiceWindowFooter;

    });