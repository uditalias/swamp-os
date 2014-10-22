/** @jsx React.DOM */

define(['react'], function(React) {

    var PanelGripper = React.createClass({

        componentDidMount: function() {

            this._topPanelSelector = this.props.panels.top;
            this._bottomPanelSelector = this.props.panels.bottom;
            this._isMouseDown = false;
            this._$gripper = $(this.getDOMNode());
            this._gripperHeight = this._$gripper.outerHeight();
            this._$parent = this._$gripper.parent();

            this._$parent.on('mousemove', this._onParentSurfaceMouseMove);
            this._$parent.on('mouseup', this._onGripperMouseUp);
            $(window).on('resize', this._setInitialPanelsHeight);


            this._setInitialPanelsHeight();

        },

        componentWillUnmount: function() {

            this._$parent.off('mousemove', this._onParentSurfaceMouseMove);
            this._$parent.off('mouseup', this._onGripperMouseUp);
            $(window).off('resize', this._setInitialPanelsHeight);

        },

        render: function() {
            return (
                <div className="panel-gripper flex flex-align-center flex-pack-center" onMouseDown={this._onGripperMouseDown}>
                    <div className="inner-gripper"></div>
                </div>
                );
        },

        _setInitialPanelsHeight: function() {

            var parentHeight = this._$parent.height();
            var initialPanelHeight = (parentHeight - this._gripperHeight) / 2;

            initialPanelHeight = initialPanelHeight < this.props.minPanelHeight ? this.props.minPanelHeight : initialPanelHeight;

            $(this._topPanelSelector).css('height',  initialPanelHeight);
            $(this._bottomPanelSelector).css('height',  initialPanelHeight);

        },

        _moveGripper: function(evt) {

            var parentHeight = this._$parent.height() - this._gripperHeight;
            var diff = $(window).outerHeight() - parentHeight;

            var topPanelHeight = parentHeight - (parentHeight - evt.pageY + diff - this._gripperHeight);
            var bottomPanelHeight = parentHeight - evt.pageY + diff - this._gripperHeight;

            if(topPanelHeight < this.props.minPanelHeight) {
                topPanelHeight = this.props.minPanelHeight;
                bottomPanelHeight = parentHeight - topPanelHeight;
            }

            if(bottomPanelHeight < this.props.minPanelHeight) {
                bottomPanelHeight = this.props.minPanelHeight;
                topPanelHeight = parentHeight - bottomPanelHeight;
            }

            $(this._topPanelSelector).css('height', topPanelHeight);
            $(this._bottomPanelSelector).css('height', bottomPanelHeight);

        },

        _onGripperMouseDown: function(evt) {

            this._isMouseDown = true;

            this._$gripper.addClass('active');

            this.props.gripperStart && this.props.gripperStart()

        },

        _onGripperMouseUp: function(evt) {

            this._isMouseDown = false;

            this._$gripper.removeClass('active');

            this.props.gripperEnd && this.props.gripperEnd();

        },

        _onParentSurfaceMouseMove: function(evt) {

            if(this._isMouseDown) {

                this._moveGripper(evt);

            }

        }

    });

    return PanelGripper;
});