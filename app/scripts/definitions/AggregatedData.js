define([
        'constants/AGGREGATED_LIST_TYPE'
    ],

    function(AGGREGATED_LIST_TYPE) {

        function AggregatedData(type, maxItems) {

            this.id = _.guid();
            this.type = type || AGGREGATED_LIST_TYPE.FIFO;
            this.maxItems = maxItems || 0;

            this._freezed = false;
            this._queuedData = [];
            this._data = [];
        }

        AggregatedData.prototype.each = function(callback) {
            var i, len;

            for(i = 0, len = this._data.length; i < len; i++) {
                callback(this._data[i], i, false);
            }

            for(i = 0, len = this._queuedData.length; i < len; i++) {
                callback(this._queuedData[i], i, true);
            }
        };

        AggregatedData.prototype.add = function(item) {

            if(this._freezed) {

                this._queuedData.push(item);

            } else {

                this._data.push(item);

                if(this.maxItems > 0 && this.count() > this.maxItems) {
                    return this._automatedRemove();
                }

            }

        };

        AggregatedData.prototype.remove = function(index) {

            this._data.splice(index, 1);

        };

        AggregatedData.prototype.get = function(index) {

            return this._data[index];

        };

        AggregatedData.prototype.getAll = function() {

            return this._data;

        };

        AggregatedData.prototype.clear = function() {

            this._data.length = 0;

        };

        AggregatedData.prototype.toggleFreeze = function() {

            if(this._freezed) {

                this.unfreeze();

            } else {

                this.freeze();

            }

        };

        AggregatedData.prototype.freeze = function() {
            if(!this._freezed) {

                this._freezed = true;

            }
        };

        AggregatedData.prototype.unfreeze = function() {
            if(this._freezed) {

                this._freezed = false;

                _.pushAll(this._data, this._queuedData);

                this._queuedData.length = 0;
            }
        };

        AggregatedData.prototype.count = function() {

            return this._data.length;

        };

        AggregatedData.prototype.getLast = function() {
            return this.get(this.count() - 1);
        };

        AggregatedData.prototype._automatedRemove = function() {
            switch(this.type) {
                case AGGREGATED_LIST_TYPE.FIFO:
                    this.remove(0);
                    break;
                case AGGREGATED_LIST_TYPE.LIFO:
                    this.remove(this.count() - 1);
                    break;
            }
        };


        return AggregatedData;

    });