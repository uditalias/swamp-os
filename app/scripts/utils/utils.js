define(function() {

    return {
        translateObjectKey: function(key) {
            key = key ? key.replace(/_/g, " ") : "";

            return key;
        }
    };

});