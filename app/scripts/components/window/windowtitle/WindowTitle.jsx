/** @jsx React.DOM */

define(['react'], function(React) {

    var WindowTitle = React.createClass({
        render: function() {

            var indicator;
            if(this.props.indicator) {
                var classes = 'indicator-' + this.props.indicator.color + ' flex flex-align-center';
                if(this.props.indicator.blink) {
                    classes += ' indicator-blink';
                }
                indicator = <div className={classes}><i className="fa fa-circle"></i></div>
            }

            var zoom;
            if(this.props.maximizable) {
                zoom = (
                    <div className="window-action" onClick={this._onZoomClick}>
                        <i className={this.props.isZoomed ? 'fa fa-angle-down' : 'fa fa-angle-up'}></i>
                    </div>
                    );
            }

            return (
                <div className="window-title flex flex-align-center" onDoubleClick={this._onMinimizeClick}>
                    <div className="flex-1 title-text">
                        {this.props.text}
                    </div>
                    <div className="flex">
                        {indicator}
                        {zoom}
                        <div className="window-action" onClick={this._onCloseClick}>
                            <i className="fa fa-times"></i>
                        </div>
                    </div>
                </div>
                );
        },

        _onCloseClick: function(e) {
            e.stopPropagation();
            e.preventDefault();

            this.props.onClose && this.props.onClose();

            return false;
        },

        _onZoomClick: function(e) {
            e.stopPropagation();
            e.preventDefault();

            this.props.onZoom && this.props.onZoom();

            return false;
        },

        _onMinimizeClick: function(e) {

            if(!this.props.minimizable) return false;

            e.stopPropagation();
            e.preventDefault();

            this.props.onMinimize && this.props.onMinimize();

            return false;
        }
    });

    return WindowTitle;

});