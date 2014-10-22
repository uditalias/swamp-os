define(["react","env","jsx!components/swamplogo/SwampLogo","jsx!components/window/Window","actions/client"],function(a,b,c,d,e){var f={minimize_all:{callback:function(){e.minimizeAllWindows()}},close_all:{callback:function(){e.closeAllWindows()}},arrange_windows:{callback:function(){e.arrangeAllWindows()}}},g=a.createClass({displayName:"Desktop",componentDidMount:function(){this._bindEvents()},componentWillUnmount:function(){this._unbindEvents()},render:function(){return a.DOM.div({className:"flex-1 desktop "+(this.props.isNotificationsPanelOpen?"notifications-panel-open":"")},c(null),a.DOM.div({className:"windows-canvas"},this._buildWindows()),a.DOM.div({className:"swamp-version"},"v",b.version))},_buildIcons:function(){var a=[];return _.forEach(this.props.windows,function(b){a.push(Icon({descriptor:b}))}),a},_buildWindows:function(){var a=[];return _.forEach(this.props.windows,function(b){a.push(d({key:b.id,descriptor:b,containerSelector:".desktop .windows-canvas"}))}),a},_onMouseDown:function(){e.focusWindow(null)},_onContextMenuClick:function(a){return a.stopPropagation(),a.preventDefault(),e.showContextMenu(f,{top:a.pageY,left:a.pageX}),!1},_bindEvents:function(){$(this.getDOMNode()).on("mousedown",this._onMouseDown),$(this.getDOMNode()).on("contextmenu",this._onContextMenuClick)},_unbindEvents:function(){$(this.getDOMNode()).off("mousedown",this._onMouseDown),$(this.getDOMNode()).off("contextmenu",this._onContextMenuClick)}});return g});