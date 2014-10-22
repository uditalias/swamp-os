/** @jsx React.DOM */

define(['react', 'Utils'], function(React, Utils) {

    var MenuItem = React.createClass({

        componentDidMount: function() {

        },

        componentWillUnmount: function() {

        },

        render: function() {

            var title = Utils.translateObjectKey(this.props.title);
            var subMenuIcon = '';
            if(this.props.subMenu) {
                subMenuIcon = (
                    <div className="sub-menu-icon">
                        <i className="fa fa-caret-right"></i>
                    </div>
                    );
            }

            var className;
            if( (this.props.subMenu && this.props.isEmpty) || this.props.isDisabled) {
                className = 'disabled';
            }

            return (
                <li onClick={this._onItemClick} className={className}>
                    <div className='menu-item-label text-14'>
                        {title}
                    </div>
                    {subMenuIcon}
                    {this.props.subMenu}
                </li>
                );
        },

        _onItemClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            if(this.props.isDisabled) return false;

            this.props.onClick && this.props.onClick();

            $('.menu-tree ul .sub-menu').hide();

            window.setTimeout(function() {

                $('.menu-tree ul .sub-menu').css('display', '');

            }, 500);

            return false;
        }
    });

    return MenuItem;

});