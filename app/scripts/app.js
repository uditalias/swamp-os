var paths = {
    initializer: './initializer/initializer',
    AppDispatcher: './appDispatcher/appDispatcher',
    jquery: '../lib/jquery/dist/jquery.min',
    _: '../lib/lodash/dist/lodash.min',
    jqueryVisible: './lib/jquery-visible/jquery.visible',
    jqueryui: '../lib/jquery-ui/ui',
    bootstrap: '../lib/react-bootstrap',
    Q: '../lib/q/q',
    moment: '../lib/momentjs/min/moment.min',
    socketio: '../lib/socket.io-client/dist/socket.io.min',
    EventEmitter: '../lib/eventEmitter/EventEmitter.min',
    Utils: './utils/utils',
    mixins: './utils/mixins',
    env: './config/' + ENV_NAME,
    pnglib: './lib/identicon/pnglib',
    Identicon: './lib/identicon/identicon',
    MD5: '../lib/blueimp-md5/js/md5.min',
    perfectScrollbar: '../lib/perfect-scrollbar/min/perfect-scrollbar-0.4.8.with-mousewheel.min'
};

if(ENV_NAME == 'development') {
    paths['JSXTransformer'] = '../lib/react/JSXTransformer';
    paths['jsx'] = './lib/require-jsx/jsx';
    paths['react'] = '../lib/react/react';
} else {
    paths['jsx'] = './lib/require-jsx/jsx.prod';
    paths['react'] = '../lib/react/react.min';
}

requirejs.config({
    baseUrl: 'scripts',
    paths: paths,
    shim: {
        jqueryui: {
            deps: ['jquery']
        }
    }
});

require([
        'jsx!initializer',
        'jquery',
        'jqueryui/core',
        'jqueryui/widget',
        'jqueryui/mouse',
        'jqueryui/position',
        'jqueryui/draggable',
        'jqueryui/resizable',
        '_',
        'mixins',
        'socketio',
        'stores/menuItemsStore',
        'stores/swampLogsStore',
        'stores/swampServicesStore'
    ],
    function(initializer) {

        initializer.initialize();

    });
