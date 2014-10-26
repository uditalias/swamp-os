/** @jsx React.DOM */

define(['react'], function(React) {

    var Button = React.createClass({
        render: function() {

            var text;
            if(this.props.loading) {
                text = this.props.loadingText || 'Loading...';
            } else {
                text = this.props.text || '';
            }

            return (
                <button className={this.props.className} disabled={this.props.loading} onClick={this.props.onClick}>
                    <div className={'flex flex-pack-center ' + this.props.innerClassName}>
                        {text}
                    </div>
                </button>
                );
        }
    });

    return Button;

});
