define(['react', 'jsx!components/topmenu/menuitem/MenuItem', 'jsx!utils/jsxUtils'], function(React, MenuItem, jsxUtils) {

    var WindowMenu = React.createClass({
        render: function() {
            return (
                <div className="window-menu flex">
                    <div className="menu-tree flex-1">
                        {jsxUtils.buildMenuTree(this.props.items)}
                    </div>
                </div>
                );
        }
    });

    return WindowMenu;

});