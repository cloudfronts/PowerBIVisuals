var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var DialGauge1450749964276;
        (function (DialGauge1450749964276) {
            DialGauge1450749964276.gaugeChartProps = {
                values: {
                    minValue: { objectName: 'values', propertyName: 'minValue' },
                    maxValue: { objectName: 'values', propertyName: 'maxValue' },
                    rStart: { objectName: 'values', propertyName: 'rStart' },
                    rEnd: { objectName: 'values', propertyName: 'rEnd' },
                    yStart: { objectName: 'values', propertyName: 'yStart' },
                    yEnd: { objectName: 'values', propertyName: 'yEnd' },
                    pointerValue: { objectName: 'values', propertyName: 'pointerValue' },
                    percentage: { objectName: 'values', propertyName: 'percentage' },
                    cityName: { objectName: 'values', propertyName: 'cityName' }
                },
                general: {
                    formatString: { objectName: 'general', propertyName: 'formatString' },
                    lable: { objectName: 'general', propertyName: 'lable' },
                }
            };
            DialGauge1450749964276.gaugeChartRoleNames = {
                min: 'min',
                max: 'max',
                yStart: 'yellowStart',
                yEnd: 'yellowEnd',
                rStart: 'redStart',
                rEnd: 'redEnd',
                pointerValue: 'pointerValue',
                percentage: 'percentage',
                cityName: 'cityName'
            };
            var ConfigGauge = (function () {
                function ConfigGauge() {
                }
                return ConfigGauge;
            })();
            DialGauge1450749964276.ConfigGauge = ConfigGauge;
            var DialGauge = (function () {
                function DialGauge() {
                }
                DialGauge.DefaultStyleProperties = function () {
                    return {
                        values: {
                            min: 0,
                            max: 100,
                            yStart: 0,
                            yEnd: 0,
                            rStart: 0,
                            rEnd: 0,
                            pointerValue: 0,
                            percentage: 0,
                            cityName: ''
                        },
                        general: {
                            lable: '',
                        }
                    };
                };
                //Convert a DataView into a view model
                DialGauge.converter = function (dataView, options) {
                    var gaugeModel;
                    if (!dataView) {
                        return;
                    }
                    var dataViewCategorical = dataView.categorical;
                    if (dataViewCategorical === null || dataViewCategorical.values.length === 0 || dataView.metadata === null || dataView.metadata.columns.length === 0)
                        return;
                    var defaultSettings = this.DefaultStyleProperties();
                    var objects = dataView.metadata.objects;
                    if (objects) {
                        defaultSettings.values.max = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.maxValue, defaultSettings.values.max);
                        defaultSettings.values.min = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.minValue, defaultSettings.values.min);
                        defaultSettings.values.rStart = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.rStart, defaultSettings.values.rStart);
                        defaultSettings.values.rEnd = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.rEnd, defaultSettings.values.rEnd);
                        defaultSettings.values.yStart = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.yStart, defaultSettings.values.yStart);
                        defaultSettings.values.yEnd = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.yEnd, defaultSettings.values.yEnd);
                        defaultSettings.values.percentage = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.percentage, defaultSettings.values.percentage);
                        defaultSettings.values.pointerValue = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.pointerValue, defaultSettings.values.pointerValue);
                        defaultSettings.values.cityName = powerbi.DataViewObjects.getValue(objects, DialGauge1450749964276.gaugeChartProps.values.cityName, defaultSettings.values.cityName);
                    }
                    var categories, categoryValues, categoryValuesLen = 1;
                    if (dataViewCategorical.categories) {
                        categories = dataViewCategorical.categories[0];
                        categoryValues = categories.values;
                        categoryValuesLen = categoryValues.length;
                    }
                    for (var idx = 0; idx < categoryValuesLen; idx++) {
                        var Maximum = undefined, minimum = undefined, redstart = undefined, redend = undefined, yellowstrat = undefined, yellowend = undefined, PointerValue = undefined, percentage = undefined, cityName = undefined;
                        var values = dataViewCategorical.values;
                        var metadataColumns = dataView.metadata.columns;
                        for (var i = 0; i < values.length; i++) {
                            var col = metadataColumns[i];
                            var currentVal = values[i].values[idx] || 0;
                            if (col && col.roles) {
                                if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.max]) {
                                    Maximum = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.min]) {
                                    minimum = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.rStart]) {
                                    redstart = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.rEnd]) {
                                    redend = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.yStart]) {
                                    yellowstrat = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.yEnd]) {
                                    yellowend = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.percentage]) {
                                    percentage = currentVal.toFixed(6) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.pointerValue]) {
                                    PointerValue = currentVal.toFixed(2) / 1;
                                }
                                else if (col.roles[DialGauge1450749964276.gaugeChartRoleNames.cityName]) {
                                    cityName = currentVal;
                                }
                            }
                        }
                        if (Maximum === undefined) {
                            Maximum = defaultSettings.values.max;
                        }
                        if (minimum === undefined) {
                            minimum = defaultSettings.values.min;
                        }
                        if (Maximum === minimum) {
                            if (Maximum === 0)
                                Maximum = defaultSettings.values.max;
                            if (!(minimum === 0))
                                minimum = defaultSettings.values.min;
                        }
                        if (minimum > Maximum) {
                            var tempmin = minimum;
                            minimum = Maximum;
                            Maximum = tempmin;
                        }
                        if (redstart === undefined) {
                            redstart = defaultSettings.values.rStart;
                        }
                        if (redend === undefined) {
                            redend = defaultSettings.values.rEnd;
                        }
                        if (yellowstrat === undefined) {
                            yellowstrat = defaultSettings.values.yStart;
                        }
                        if (yellowend === undefined) {
                            yellowend = defaultSettings.values.yEnd;
                        }
                        if (percentage === undefined) {
                            percentage = defaultSettings.values.percentage;
                        }
                        if (PointerValue === undefined) {
                            PointerValue = defaultSettings.values.pointerValue;
                        }
                        if (cityName === undefined) {
                            cityName = defaultSettings.values.cityName;
                        }
                        if (redstart > redend) {
                            var tempred = redstart;
                            redstart = redend;
                            redend = tempred;
                        }
                        if (yellowstrat > yellowend) {
                            var tempyellow = yellowstrat;
                            yellowstrat = yellowend;
                            yellowend = tempyellow;
                        }
                        if (Maximum < yellowend) {
                            Maximum = yellowend;
                        }
                        if (Maximum < redend) {
                            Maximum = redend;
                        }
                        if (minimum > yellowstrat) {
                            minimum = yellowstrat;
                        }
                        if (minimum > redstart) {
                            minimum = redstart;
                        }
                        if (!isNaN(Maximum) && !isNaN(minimum) && !isNaN(redstart) && !isNaN(redend) && !isNaN(yellowstrat) && !isNaN(yellowend) && !isNaN(PointerValue) && !isNaN(percentage)) {
                            defaultSettings.values = {
                                max: Maximum,
                                min: minimum,
                                rStart: redstart,
                                rEnd: redend,
                                yStart: yellowstrat,
                                yEnd: yellowend,
                                pointerValue: PointerValue,
                                percentage: percentage,
                                cityName: cityName
                            };
                        }
                    }
                    gaugeModel = {
                        gaugeChartSettings: defaultSettings
                    };
                    return gaugeModel;
                };
                /*One Time Setup*/
                DialGauge.prototype.init = function (options) {
                    var bdy = d3.select(options.element.get(0));
                    this.clearCatcher = visuals.appendClearCatcher(bdy);
                    var svg = this.svg = d3.select(options.element.get(0)).append('svg');
                    this.initConfig();
                    this.text = svg.append('text');
                    this.body = svg.attr("class", "gauge").attr("width", this.config.size).attr("height", this.config.size);
                };
                DialGauge.prototype.initConfig = function () {
                    this.config = new ConfigGauge();
                    this.config.label = "sample";
                    this.initConfigOnRezise(250, 250);
                    // this.config.size = 250;
                    // this.config.size = this.config.size * 0.9;
                    // this.config.raduis = this.config.size * 0.97 / 2;
                    // this.config.cx = this.config.size / 2;
                    // this.config.cy = this.config.size / 2;
                    this.config.majorTicks = 5;
                    this.config.minorTicks = 2;
                    this.config.greenColor = "#109618";
                    this.config.yellowColor = "#FF9900";
                    this.config.redColor = "#DC3912";
                    this.config.transitionDuration = 500;
                    this.config.greenZonesName = "Max</br>";
                    this.config.redZonesName = "Actual</br>";
                    this.config.yellowZonesName = "Target</br>";
                    this.config.PointerName = ""; //Actual</br>";
                };
                DialGauge.prototype.initConfigOnRezise = function (Height, Width) {
                    //  var bdy = d3.select(".gauge");
                    //this.clearCatcher = appendClearCatcher(bdy);
                    var size = 250;
                    if (Height > Width) {
                        size = Width;
                    }
                    else {
                        size = Height;
                    }
                    this.config.size = size;
                    this.config.size = this.config.size * 0.9;
                    this.config.raduis = this.config.size * 0.97 / 2;
                    this.config.cx = this.config.size / 2;
                    this.config.cy = this.config.size / 2;
                    this.svg.selectAll("*").remove();
                };
                /* Called for data, size, formatting changes*/
                DialGauge.prototype.update = function (options) {
                    if (!options.dataViews && !options.dataViews[0])
                        return;
                    var dataView = options.dataViews[0];
                    var viewport = options.viewport;
                    var model = DialGauge.converter(dataView, options);
                    if (!model) {
                        return;
                    }
                    this.initConfig();
                    this.initConfigOnRezise(viewport.height, viewport.width);
                    this.model = model;
                    var settings = model.gaugeChartSettings;
                    this.config.minVal = settings.values.min;
                    this.config.maxVal = settings.values.max;
                    this.config.range = this.config.maxVal - this.config.minVal;
                    this.config.greenZones = [{ from: settings.values.min, to: settings.values.max }];
                    this.config.yellowZones = [{ from: settings.values.yStart, to: settings.values.yEnd }];
                    this.config.redZones = [{ from: settings.values.rStart, to: settings.values.rEnd }];
                    var height = viewport.height;
                    var width = viewport.width;
                    var duration = options.suppressAnimations ? 0 : 1000;
                    this.svg.attr({ 'height': height, 'width': width });
                    this.draw(width, height, duration);
                };
                DialGauge.prototype.draw = function (width, height, duration) {
                    this.body.append("svg:circle").attr("cx", this.config.cx).attr("cy", this.config.cy).attr("r", this.config.raduis).style("fill", "#ccc").style("stroke", "#000").style("stroke-width", "0.5px");
                    this.body.append("svg:circle").attr("cx", this.config.cx).attr("cy", this.config.cy).attr("r", 0.9 * this.config.raduis).style("fill", "#fff").style("stroke", "#e0e0e0").style("stroke-width", "2px");
                    for (var index in this.config.greenZones) {
                        this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, this.config.greenColor, this.config.greenZonesName);
                    }
                    if (this.config.yellowZones[index].to >= this.config.redZones[index].to) {
                        for (var index in this.config.yellowZones) {
                            this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, this.config.yellowColor, this.config.yellowZonesName);
                        }
                        for (var index in this.config.redZones) {
                            this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, this.config.redColor, this.config.redZonesName);
                        }
                    }
                    else {
                        for (var index in this.config.redZones) {
                            this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, this.config.redColor, this.config.redZonesName);
                        }
                        for (var index in this.config.yellowZones) {
                            this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, this.config.yellowColor, this.config.yellowZonesName);
                        }
                    }
                    this.config.label = this.model.gaugeChartSettings.values.cityName;
                    if (undefined != this.config.label) {
                        var fontSize = Math.round(this.config.size / 9);
                        this.body.append("svg:text").attr("x", this.config.cx).attr("y", this.config.cy / 1.8 + fontSize / 2).attr("dy", fontSize / 2).attr("text-anchor", "middle").text(this.config.label).style("font-size", fontSize / 1.5 + "px").style("fill", "#333").style("stroke-width", "0px");
                    }
                    if (undefined != this.model.gaugeChartSettings.values.pointerValue) {
                        var fontSize = Math.round(this.config.size / 9);
                        // this.body.append("svg:text")
                        this.body.select(".RedEndContainer").remove();
                        var perContainer = this.body.append("svg:g").attr("class", "RedEndContainer");
                        perContainer.append("svg:text").attr("x", this.config.cx).attr("y", this.config.cy * 1.5 + fontSize / 2).attr("dy", fontSize / 2).attr("text-anchor", "middle").text(this.getFormattedValue(this.model.gaugeChartSettings.values.pointerValue)).style("font-size", fontSize + "px").style("fill", "#333").style("stroke-width", "0px");
                    }
                    if (undefined != this.model.gaugeChartSettings.values.percentage) {
                        var fontSize = Math.round(this.config.size / 9);
                        // this.body.append("svg:text")
                        this.body.select(".PercentageContainer").remove();
                        var formatter = visuals.valueFormatter.create({ format: "0.00 %;-0.00 %;0.00 %", value: 1, allowFormatBeautification: true });
                        var PercentValueDisplay = formatter.format(this.model.gaugeChartSettings.values.percentage);
                        var perContainer = this.body.append("svg:g").attr("class", "PercentageContainer");
                        perContainer.append("svg:text").attr("x", this.config.cx).attr("y", this.config.cy * 2 + fontSize / 2).attr("dy", fontSize / 2).attr("text-anchor", "middle").text(PercentValueDisplay).style("font-size", fontSize + "px").style("fill", "#333").style("stroke-width", "0px");
                    }
                    var settingvalue = this.model.gaugeChartSettings;
                    var fontSize = Math.round(this.config.size / 16);
                    var majorDelta = this.config.range / (this.config.majorTicks - 1);
                    for (var major = settingvalue.values.min; major <= settingvalue.values.max; major += majorDelta) {
                        var minorDelta = majorDelta / this.config.minorTicks;
                        for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.maxVal); minor += minorDelta) {
                            var point1 = this.valueToPoint(minor, 0.75);
                            var point2 = this.valueToPoint(minor, 0.85);
                            this.body.append("svg:line").attr("x1", point1.x).attr("y1", point1.y).attr("x2", point2.x).attr("y2", point2.y).style("stroke", "#666").style("stroke-width", "1px");
                        }
                        var point1 = this.valueToPoint(major, 0.7);
                        var point2 = this.valueToPoint(major, 0.85);
                        this.body.append("svg:line").attr("x1", point1.x).attr("y1", point1.y).attr("x2", point2.x).attr("y2", point2.y).style("stroke", "#333").style("stroke-width", "2px");
                        if (major == settingvalue.values.min || major == settingvalue.values.max) {
                            var point = this.valueToPoint(major, 0.63);
                            var FormattedMajorValue = this.getFormattedValue(major);
                            this.body.append("svg:text").attr("x", point.x).attr("y", point.y).attr("dy", fontSize / 3).attr("text-anchor", major == settingvalue.values.min ? "start" : "end").text(FormattedMajorValue).style("font-size", fontSize + "px").style("fill", "#333").style("stroke-width", "0px");
                        }
                    }
                    var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");
                    var midValue = (settingvalue.values.min + settingvalue.values.max) / 2;
                    var pointerPath = this.buildPointerPath(midValue);
                    var pointerLine = d3.svg.line().x(function (d) {
                        return d.x;
                    }).y(function (d) {
                        return d.y;
                    }).interpolate("basis");
                    var value = settingvalue.values.pointerValue; //this.config.minVal;
                    //  var pointerValue = Math.round(value);
                    var pointerValue = value;
                    if (value > settingvalue.values.max)
                        pointerValue = settingvalue.values.max + 0.02 * this.config.range;
                    else if (value < settingvalue.values.min)
                        pointerValue = settingvalue.values.min - 0.02 * this.config.range;
                    var targetRotation = (this.valueToDegrees(pointerValue) - 90);
                    var currentRotation = this._currentRotation || targetRotation;
                    this._currentRotation = targetRotation;
                    var step = 1;
                    var rotation = currentRotation + (targetRotation - currentRotation) * step;
                    var div = d3.select("body").append("div").attr("class", "CFtooltip").style("opacity", 0);
                    var formattedPointerValue = this.getFormattedValue(settingvalue.values.pointerValue);
                    pointerContainer.selectAll("path").data([pointerPath]).enter().append("svg:path").attr("d", pointerLine).style("fill", "#dc3912").style("stroke", "#c63310").style("fill-opacity", 0.7).attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(" + rotation + ")");
                    // .on("mouseover", function (d) {
                    //     div.transition()
                    //         .duration(200)
                    //         .style("opacity", .9);
                    //    // div.html( "Actual</br>" + formattedPointerValue)
                    //     div.html( formattedPointerValue)
                    //         .style("left", (d3.event.clientX) + "px")
                    //         .style("top", (d3.event.clientY - 28) + "px");
                    // })
                    // .on("mouseout", function (d) {
                    //     div.transition()
                    //         .duration(500)
                    //         .style("opacity", 0);
                    // })
                    pointerContainer.append("svg:circle").attr("cx", this.config.cx).attr("cy", this.config.cy).attr("r", 0.12 * this.config.raduis).style("fill", "#4684EE").style("stroke", "#666").style("opacity", 1);
                    var fontSize = Math.round(this.config.size / 10);
                    pointerContainer.selectAll("text").data([midValue]).enter().append("svg:text").attr("x", this.config.cx).attr("y", this.config.size - this.config.cy / 4 - fontSize).attr("dy", fontSize / 2).attr("text-anchor", "middle").style("font-size", fontSize + "px").style("fill", "#000").style("stroke-width", "0px");
                    this.redraw(settingvalue.values.rEnd, 0);
                };
                DialGauge.prototype.redraw = function (value, transitionDuration) {
                    var pointerContainer = this.body.select(".pointerContainer");
                    // pointerContainer.selectAll("text").text(Math.round(value));
                    var pointer = pointerContainer.selectAll("path");
                    pointer.transition().duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration);
                };
                DialGauge.prototype.buildPointerPath = function (value) {
                    var delta = this.config.range / 13;
                    var head = this.valueToPointForBP(value, 0.85);
                    var head1 = this.valueToPointForBP(value - delta, 0.12);
                    var head2 = this.valueToPointForBP(value + delta, 0.12);
                    var tailValue = value - (this.config.range * (1 / (270 / 360)) / 2);
                    var tail = this.valueToPointForBP(tailValue, 0.28);
                    var tail1 = this.valueToPointForBP(tailValue - delta, 0.12);
                    var tail2 = this.valueToPointForBP(tailValue + delta, 0.12);
                    return [head, head1, tail2, tail, tail1, head2, head];
                };
                DialGauge.prototype.valueToPointForBP = function (value, factor) {
                    var point = this.valueToPoint(value, factor);
                    point.x -= this.config.cx;
                    point.y -= this.config.cy;
                    return point;
                };
                DialGauge.prototype.getFormattedValue = function (val) {
                    var formater = visuals.valueFormatter.create({ value: 0 });
                    var formattedValue = val.toString();
                    if ((val >= 100000) && (val < 1000000000)) {
                        formater = visuals.valueFormatter.create({ value: 1e6 });
                    }
                    else if (val >= 1000000000) {
                        formater = visuals.valueFormatter.create({ value: 1e9 });
                    }
                    else {
                        formater = visuals.valueFormatter.create({ value: 0 });
                    }
                    formattedValue = formater.format(val);
                    return formattedValue;
                };
                DialGauge.prototype.drawBand = function (start, end, color, ToolTipText) {
                    if (0 >= end - start)
                        return;
                    var formattedEndValue = this.getFormattedValue(end);
                    var div = d3.select("body").append("div").attr("class", "CFtooltip").style("opacity", 0);
                    this.body.append("svg:path").style("fill", color).attr("d", d3.svg.arc().startAngle(this.valueToRadians(start)).endAngle(this.valueToRadians(end)).innerRadius(0.65 * this.config.raduis).outerRadius(0.85 * this.config.raduis)).attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(270)").on("mouseover", function (d) {
                        div.transition().duration(200).style("opacity", .9);
                        div.html(ToolTipText + formattedEndValue.toString()).style("left", (d3.event.clientX) + "px").style("top", (d3.event.clientY - 28) + "px");
                    }).on("mouseout", function (d) {
                        div.transition().duration(500).style("opacity", 0);
                    });
                    //    if(color!= this.config.greenColor) {
                    //      var fontSize = Math.round(this.config.size / 16);
                    //         var point = this.valueToPoint(end, 0.63);
                    //         var midval=this.config.range/2;
                    //         
                    //         this.body.append("svg:text")
                    //             .attr("x", point.x)
                    //             .attr("y", point.y)
                    //             .attr("dy", fontSize / 3)
                    //             .attr("text-anchor",midval > end ? "start":"end")
                    //            .text(end.toString())
                    //             .style("font-size", fontSize + "px")
                    //             .style("fill", "#333")
                    //             .style("stroke-width", "0px");
                    //     }
                };
                DialGauge.prototype.valueToDegrees = function (value) {
                    return value / this.config.range * 270 - (this.config.minVal / this.config.range * 270 + 45);
                };
                DialGauge.prototype.valueToRadians = function (value) {
                    return this.valueToDegrees(value) * Math.PI / 180;
                };
                DialGauge.prototype.valueToPoint = function (value, factor) {
                    return {
                        x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
                        y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value))
                    };
                };
                /*About to remove your visual, do clean up here */
                DialGauge.prototype.destroy = function () {
                };
                // public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
                //     var data = this.model;
                //     if (!data) {
                //         return;
                //     }
                //     var objectName = options.objectName;
                //     switch (objectName) {
                //         case 'values':
                //             return this.enumerateValues(data);
                //         case 'general':
                //             var instances: VisualObjectInstance[] = [];
                //             var general: VisualObjectInstance = {
                //                 objectName: 'general',
                //                 displayName: 'General',
                //                 selector: null,
                //                 properties: {
                //                     lable: data.gaugeChartSettings.general.lable
                //                 }
                //             }
                //             instances.push(general);
                //             return instances;
                //     }
                // }
                DialGauge.prototype.enumerateValues = function (data) {
                    var settings = data.gaugeChartSettings;
                    return [{
                        selector: null,
                        objectName: 'values',
                        displayName: 'Values',
                        properties: {
                            min: settings.values.min,
                            max: settings.values.max,
                            rStart: settings.values.rStart,
                            rEnd: settings.values.rEnd,
                            yStart: settings.values.yStart,
                            yEnd: settings.values.yEnd,
                            percentage: settings.values.percentage,
                            cityName: settings.values.cityName,
                            pointerValue: settings.values.pointerValue
                        }
                    }];
                };
                DialGauge.capabilities = {
                    dataRoles: [
                        {
                            name: 'min',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Min'
                        },
                        {
                            name: 'max',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Max'
                        },
                        {
                            name: 'yellowStart',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Target Start'
                        },
                        {
                            name: 'yellowEnd',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Target End'
                        },
                        {
                            name: 'redStart',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Actual Start'
                        },
                        {
                            name: 'redEnd',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Actual End'
                        },
                        {
                            name: 'pointerValue',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Pointer Value'
                        },
                        {
                            name: 'percentage',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Percentage'
                        },
                        {
                            name: 'cityName',
                            kind: powerbi.VisualDataRoleKind.Measure,
                            displayName: 'Chart Name'
                        }
                    ],
                    objects: {
                        general: {
                            displayName: powerbi.data.createDisplayNameGetter('Visual_General'),
                            properties: {
                                lable: {
                                    type: { string: true },
                                    displayName: 'Wiggle2'
                                }
                            },
                        },
                        values: {
                            displayName: 'Data values',
                            properties: {
                                minValue: {
                                    displayName: 'Min',
                                    type: { numaric: true }
                                },
                                maxValue: {
                                    displayName: 'Max',
                                    type: { numaric: true }
                                },
                                rStart: {
                                    displayName: 'Actual Start',
                                    type: { numaric: true }
                                },
                                rEnd: {
                                    displayName: 'Actual End',
                                    type: { numaric: true }
                                },
                                yStart: {
                                    displayName: 'Target Start',
                                    type: { numaric: true }
                                },
                                yEnd: {
                                    displayName: 'Target End',
                                    type: { numaric: true }
                                },
                                pointerValue: {
                                    displayName: 'Pointer',
                                    type: { numaric: true }
                                },
                                percentage: {
                                    displayName: 'Percentage',
                                    type: { numaric: true }
                                }
                            },
                        }
                    },
                    dataViewMappings: [{
                        conditions: [
                            {
                                'min': { max: 1 },
                                'max': { max: 1 },
                                'yellowStart': { max: 1 },
                                'yellowEnd': { max: 1 },
                                'redStart': { max: 1 },
                                'resEnd': { max: 1 },
                                'pointerValue': { max: 1 },
                                'percentage': { max: 1 }
                            }
                        ],
                        categorical: {
                            general: {
                                select: [
                                    { bind: { to: 'formatString' } },
                                    { bind: { to: 'lable' } }
                                ]
                            },
                            values: {
                                select: [
                                    { bind: { to: 'min' } },
                                    { bind: { to: 'max' } },
                                    { bind: { to: 'yellowStart' } },
                                    { bind: { to: 'yellowEnd' } },
                                    { bind: { to: 'redStart' } },
                                    { bind: { to: 'redEnd' } },
                                    { bind: { to: 'pointerValue' } },
                                    { bind: { to: 'percentage' } },
                                    { bind: { to: 'cityName' } },
                                ]
                            }
                        }
                    }]
                };
                return DialGauge;
            })();
            DialGauge1450749964276.DialGauge = DialGauge;
        })(DialGauge1450749964276 = visuals.DialGauge1450749964276 || (visuals.DialGauge1450749964276 = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.DialGauge1450749964276 = {
                name: 'DialGauge1450749964276',
                class: 'DialGauge1450749964276',
                capabilities: powerbi.visuals.DialGauge1450749964276.DialGauge.capabilities,
                custom: true,
                create: function () { return new powerbi.visuals.DialGauge1450749964276.DialGauge(); }
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
