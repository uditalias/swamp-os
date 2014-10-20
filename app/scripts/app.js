requirejs.config({
    baseUrl: 'scripts',
    paths: {
        initializer: './initializer/initializer',
        AppDispatcher: './appDispatcher/appDispatcher',
        jquery: '../lib/jquery/dist/jquery',
        _: '../lib/lodash/dist/lodash',
        jqueryVisible: './lib/jquery-visible/jquery.visible',
        jqueryui: '../lib/jquery-ui/ui',
        bootstrap: '../lib/react-bootstrap',
        Q: '../lib/q/q',
        moment: '../lib/momentjs/moment',
        socketio: '../lib/socket.io-client/dist/socket.io',
        jsx: "../lib/require-jsx/jsx",
        JSXTransformer: '../lib/react/JSXTransformer',
        react: '../lib/react/react',
        EventEmitter: '../lib/eventEmitter/EventEmitter',
        Utils: './utils/utils',
        mixins: './utils/mixins',
        env: './config/development',
        pnglib: './lib/identicon.js/pnglib',
        Identicon: './lib/identicon.js/identicon',
        MD5: '../lib/blueimp-md5/js/md5',
        perfectScrollbar: '../lib/perfect-scrollbar/min/perfect-scrollbar-0.4.8.with-mousewheel.min'
    },
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
        'moment',
        'socketio',
        'stores/menuItemsStore',
        'stores/swampLogsStore',
        'stores/swampServicesStore'
    ],
    function(initializer) {

        initializer.initialize();

    });