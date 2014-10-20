define(['actions/client'], function(clientActions) {

    function _initialize() {

        _bindEvents();

    }

    function _bindEvents() {

        window.onblur = _onWindowBlur;
        window.onfocus = _onWindowFocus;

    }


    function _onWindowBlur() {

        clientActions.browserBlured();

    }

    function _onWindowFocus() {

        clientActions.browserFocused();

    }

    return {
        initialize: _initialize
    }
});