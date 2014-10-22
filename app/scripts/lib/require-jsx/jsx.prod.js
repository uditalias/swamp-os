'use strict';

define(function() {

    var buildMap = {};

    return {
        write: function (pluginName, name, write) {
            if (buildMap.hasOwnProperty(name)) {
                var text = buildMap[name];
                write.asModule(pluginName + "!" + name, text);
            }
        },
        version: '0.1',
        load: function(name, parentRequire, onload, config) {
            parentRequire([name], function(value) {
                onload(value);
            });
        }
    }
});