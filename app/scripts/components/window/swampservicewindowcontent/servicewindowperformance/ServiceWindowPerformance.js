define(['react', 'jsx!components/aggregateddatachart/AggregatedDataChart', 'env'], function(React, AggregatedDataChart, env) {

    var ServiceWindowPerformance = React.createClass({
        render: function() {


            return (
                <div className="flex-1 flex flex-vbox service-performance">
                    <div className="chart-wrapper cpu-data flex-1 flex flex-vbox padding-10">
                        <div className="flex margin-bottom-5">
                            <div className="flex-1 color-alt-white">Process CPU Usage</div>
                            <div className="color-white">{this.props.service.cpuData.getLast() ? this.props.service.cpuData.getLast().value + '%' : 'N/A'}</div>
                        </div>
                        <AggregatedDataChart labelProcess={this._processCpuLabel} aggregatedData={this.props.service.cpuData} minValue={0} maxValue={100} maxItems={30} itemClass={'cpu-chart-item'} lineColor={'#38B44A'} />
                    </div>
                    <div className="chart-wrapper memory-data flex-1 flex flex-vbox padding-10">
                        <div className="flex margin-bottom-5">
                            <div className="flex-1 color-alt-white">Process Memory Usage</div>
                            <div className="color-white">{this.props.service.memoryData.getLast() ? _.bytesToSize(this.props.service.memoryData.getLast().value) : 'N/A'} / <span className="color-alt-white">{_.bytesToSize(env.info.totalmem)}</span></div>
                        </div>
                        <AggregatedDataChart labelProcess={this._processMemoryLabel} aggregatedData={this.props.service.memoryData} minValue={0} maxValue={env.info.totalmem} maxItems={30} itemClass={'memory-chart-item'} lineColor={'#19B6EE'} />
                    </div>
                </div>
                );
        },

        _processMemoryLabel: function(value) {
            return _.bytesToSize(value);
        },

        _processCpuLabel: function(value) {
            return value + '%';
        }
    });

    return ServiceWindowPerformance;

});