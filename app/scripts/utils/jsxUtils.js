define([
        'react',
        'jsx!components/topmenu/menuitem/MenuItem'
    ],
    function(React, MenuItem) {

        var JsxUtils = {

            buildMenuTree: function(rawItems, subMenu) {

                var items = [];

                _.forEach(rawItems, function(value, key) {

                    if(value.lineBefore) {
                        items.push(<li key={_.guid()} className="sub-menu-separator"></li>);
                    }

                    if(value.items) {

                        var subMenu = this.buildMenuTree(value.items, true);

                        items.push(<MenuItem key={key} isEmpty={!Object.keys(value.items).length} isDisabled={value.disabled} title={key} subMenu={subMenu} />);

                    } else if(value.callback && typeof(value.callback) === 'function') {

                        items.push(<MenuItem key={key} title={value.title || key} onClick={value.callback} isDisabled={value.disabled} />);

                    }

                    if(value.lineAfter) {
                        items.push(<li key={_.guid()} className="sub-menu-separator"></li>);
                    }

                }.bind(this));

                return (<ul className={subMenu ? 'sub-menu' : ''}>{items}</ul>);

            },

            doWhenMouseDistance: function(element, distance, callback) {

                var onMouseMove = _.throttle(_onMouseMove.bind(this, $(element), distance, callback), 500);

                function _onMouseMove(el, dist, cb, evt) {

                    var elWidth     = el[0].scrollWidth,
                        elHeight    = el[0].scrollHeight,
                        elTop       = el.offset().top,
                        elLeft      = el.offset().left,
                        mouseTop    = evt.pageY,
                        mouseLeft   = evt.pageX;

                    if( (mouseTop - (elTop + elHeight) > dist) ||
                        (elTop - mouseTop > dist) ||

                        (mouseLeft - (elLeft + elWidth) > dist) ||
                        (elLeft - mouseLeft > dist)) {

                        $(document).off('mousemove', onMouseMove);
                        cb();
                    }
                }

                $(document).on('mousemove', onMouseMove);

                return function() {
                    $(document).off('mousemove', onMouseMove);
                }
            }
        };

        return JsxUtils;

    });