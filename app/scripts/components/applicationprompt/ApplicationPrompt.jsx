/** @jsx React.DOM */

define(['react', 'actions/client'], function(React, clientActions) {

    var HOT_KEYS = [ 13, 27 ];

    var ApplicationPrompt = React.createClass({

        componentDidMount: function() {
            this._disposed = false;

            this._bindEvents();
        },

        componentWillUnmount: function() {

            this._unbindEvents();

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
                                <button className={"btn btn-light margin-right-10 " + (this.props.prompt.hideCancel ? 'hide' : '') } onClick={this._onCancelClick}><div>{this.props.prompt.cancelBtnText}</div></button>
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
        },

        _bindEvents: function() {

            $(document).on('keydown', this._onDocumentKeyDown);

        },

        _unbindEvents: function() {

            $(document).off('keydown', this._onDocumentKeyDown);

        },

        _onDocumentKeyDown: function(e) {

            if(HOT_KEYS.indexOf(e.which) > -1) {

                if(e.which == 13) {
                    this._onConfirmClick();
                } else {
                    this._onCancelClick();
                }

            }

        }
    });

    return ApplicationPrompt;

});
