/** @jsx React.DOM */

define(['react', 'constants/SERVICE_STATE'], function(React) {

    var ServiceWindowFooter = React.createClass({
        render: function() {
            return (
                <div className="flex service-header padding-10 flex-align-center">
                    <img src={this.props.service.avatarBase64Url} className="service-photo" />
                    <div className="service-desc flex-1">{this.props.service.description}</div>
                     <div className="flex">
                        <button className="btn margin-right-5">
                            <div className="text-14 w300 color-blue"><i className="fa fa-terminal"></i> Out log</div>
                        </button>
                         <button className="btn">
                             <div className="text-14 w300 color-red"><i className="fa fa-terminal"></i> Error log</div>
                         </button>
                    </div>
                </div>
                );
        }
    });

    return ServiceWindowFooter;
});