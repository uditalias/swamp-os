define(["react","jsx!components/topmenu/menuitem/MenuItem"],function(a,b){var c={buildMenuTree:function(c,d){var e=[];return _.forEach(c,function(c,d){if(c.lineBefore&&e.push(a.DOM.li({key:_.guid(),className:"sub-menu-separator"})),c.items){var f=this.buildMenuTree(c.items,!0);e.push(b({key:d,isEmpty:!Object.keys(c.items).length,isDisabled:c.disabled,title:d,subMenu:f}))}else c.callback&&"function"==typeof c.callback&&e.push(b({key:d,title:c.title||d,onClick:c.callback,isDisabled:c.disabled}));c.lineAfter&&e.push(a.DOM.li({key:_.guid(),className:"sub-menu-separator"}))}.bind(this)),a.DOM.ul({className:d?"sub-menu":""},e)},doWhenMouseDistance:function(a,b,c){function d(a,b,c,d){var f=a[0].scrollWidth,g=a[0].scrollHeight,h=a.offset().top,i=a.offset().left,j=d.pageY,k=d.pageX;(j-(h+g)>b||h-j>b||k-(i+f)>b||i-k>b)&&($(document).off("mousemove",e),c())}var e=_.throttle(d.bind(this,$(a),b,c),500);return $(document).on("mousemove",e),function(){$(document).off("mousemove",e)}}};return c});