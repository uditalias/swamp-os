define(['react', 'actions/client'], function(React, clientActions) {

    var ApplicationPrompt = React.createClass({

        componentDidMount: function() {
            this._disposed = false;
        },

        render: function() {

            if(!this._disposed) {
                setTimeout(function () {
                    $(this.getDOMNode()).find('.prompt').addClass('in');
                }.bind(this));
            }

            return (
                <div className="spread application-prompt">
                    <div className="application-prompt-inner flex flex-pack-center">
                        <div className="prompt">
                            <div className="padding-10" dangerouslySetInnerHTML={{ __html: this.props.prompt.text }}></div>
                            <div className="padding-10 flex flex-align-center">
                                <div className="flex-1"></div>
                                <button className="btn btn-light margin-right-10" onClick={this._onCancelClick}><div>{this.props.prompt.cancelBtnText}</div></button>
                                <button className="btn" onClick={this._onConfirmClick}><div className="padding-left-15 padding-right-15">{this.props.prompt.okBtnText}</div></button>
                            </div>
                        </div>
                    </div>
                </div>
                );
        },

        _onCancelClick: function() {
            this._disposed = true;
            $(this.getDOMNode()).find('.prompt').removeClass('in');
            setTimeout(function() {
                clientActions.responseApplicationPrompt(false);
            }, 200);
        },

        _onConfirmClick: function() {
            this._disposed = true;
            $(this.getDOMNode()).find('.prompt').removeClass('in');
            setTimeout(function() {
                clientActions.responseApplicationPrompt(true);
            }, 200);
        }
    });

    return ApplicationPrompt;

});