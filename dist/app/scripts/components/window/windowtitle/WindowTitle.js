define(["react"],function(a){var b=a.createClass({displayName:"WindowTitle",render:function(){var b;if(this.props.indicator){var c="indicator-"+this.props.indicator.color+" flex flex-align-center";this.props.indicator.blink&&(c+=" indicator-blink"),b=a.DOM.div({className:c},a.DOM.i({className:"fa fa-circle"}))}var d;return this.props.maximizable&&(d=a.DOM.div({className:"window-action",onClick:this._onZoomClick},a.DOM.i({className:this.props.isZoomed?"fa fa-angle-down":"fa fa-angle-up"}))),a.DOM.div({className:"window-title flex flex-align-center",onDoubleClick:this._onMinimizeClick},a.DOM.div({className:"flex-1 title-text"},this.props.text),a.DOM.div({className:"flex"},b,d,a.DOM.div({className:"window-action",onClick:this._onCloseClick},a.DOM.i({className:"fa fa-times"}))))},_onCloseClick:function(a){return a.stopPropagation(),a.preventDefault(),this.props.onClose&&this.props.onClose(),!1},_onZoomClick:function(a){return a.stopPropagation(),a.preventDefault(),this.props.onZoom&&this.props.onZoom(),!1},_onMinimizeClick:function(a){return this.props.minimizable?(a.stopPropagation(),a.preventDefault(),this.props.onMinimize&&this.props.onMinimize(),!1):!1}});return b});