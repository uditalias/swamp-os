define(["react","actions/client","constants/WINDOW_OPEN_TRIGGER"],function(a,b,c){var d=a.createClass({displayName:"FinderItem",render:function(){return a.DOM.li({className:"finder-item flex flex-align-center",onClick:this._onItemClick},a.DOM.img({src:this.props.item.avatarBase64Url}),a.DOM.div({className:"margin-left-10 margin-right-10 flex-1 color-alt-white service-name"},this.props.item.name),a.DOM.div({className:"margin-right-10 text-12 service-status"},a.DOM.span({className:this.props.item.isRunning?"color-green":"color-red"},this.props.item.isRunning?"Running":"Stopped")))},_onItemClick:function(){this.props.onClick&&this.props.onClick(),b.openServiceWindow(this.props.item,c.FINDER)}});return d});