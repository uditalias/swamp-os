define(["react"],function(a){var b=a.createClass({displayName:"Error",render:function(){return a.DOM.div({className:"error flex flex-align-center flex-pack-center"},a.DOM.div(null,a.DOM.div({className:"error-text"},a.DOM.div(null,"Connection Error"),a.DOM.div({className:this.props.error?"text-18 error-message":"hidden"},"(",this.props.error.message,")"))))}});return b});