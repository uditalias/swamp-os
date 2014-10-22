/** @jsx React.DOM */

define([
        'react',
        'bootstrap/OverlayTrigger',
        'bootstrap/Tooltip'
    ],
    function(React, OverlayTrigger, Tooltip) {

        var AggregatedDataChart = React.createClass({
            render: function() {

                var itemsList = this._buildChartItems();

                if(!itemsList) {
                    itemsList = <div className="spread no-data flex flex-align-center flex-pack-center">N/A</div>;
                } else {
                    setTimeout(function() {
                        $(this.getDOMNode()).find('ul li').css('width', $(this.getDOMNode()).width() / this.props.maxItems);
                    }.bind(this));
                }

                return (
                    <div className="aggregated-data-chart flex-1" style={{'borderTopColor': this.props.lineColor, 'borderBottomColor': this.props.lineColor}}>
                        {itemsList}
                    </div>
                    );
            },

            _buildChartItems: function() {

                if(this.props.aggregatedData.getAll().length == 0) {
                    return null;
                }

                var items = [];

                _.forEach(this.props.aggregatedData.getAll(), function(dataItem) {
                    items.push(
                        <OverlayTrigger key={dataItem.key} placement="top" animation="true" overlay={<Tooltip>{this.props.labelProcess(dataItem.value)}</Tooltip>}>
                            <li>
                                <div
                                    style={
                                        {height: ((dataItem.value / this.props.maxValue) * 100) + '%', backgroundColor: this.props.lineColor}
                                    }>
                                </div>
                            </li>
                        </OverlayTrigger>
                    )
                }.bind(this));

                return (<ul>{items}</ul>);

            }
        });

        return AggregatedDataChart;
    });