module powerbi.visuals.samples {
    export var gaugeChartProps = {
        values: {
            minValue: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'minValue' },
            maxValue: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'maxValue' },
            rStart: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'rStart' },
            rEnd: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'rEnd' },
            yStart: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'yStart' },
            yEnd: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'yEnd' },
            pointerValue: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'pointerValue' },
            percentage: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'percentage' },
            cityName: <DataViewObjectPropertyIdentifier>{ objectName: 'values', propertyName: 'cityName' }
        },
        general: {
            formatString: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'formatString' },
            lable: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'lable' },

        }

    }
    export interface GaugeChartSettings {
        values: {
                min: number;
                max: number;
                yStart: number;
                yEnd: number;
                rStart: number;
                rEnd: number;
                pointerValue: number;
                percentage: number;
                cityName: string;
        };
        general: {
                lable: string;
        }
    }
    //model
    export interface GaugeChartModel {
        gaugeChartSettings: GaugeChartSettings;
    }
    export var gaugeChartRoleNames = {
        min: 'min',
        max: 'max',
        yStart: 'yellowStart',
        yEnd: 'yellowEnd',
        rStart: 'redStart',
        rEnd: 'redEnd',
        pointerValue: 'pointerValue',
        percentage: 'percentage',
        cityName: 'cityName'
    }
    export class ConfigGauge {
        size: number;
        label: string;
        minVal: number;
        maxVal: number;
        majorTicks: number;
        minorTicks: number;
        raduis: number;
        cx: number;
        cy: number;
        range: number;
        greenColor: string;
        yellowColor: string;
        redColor: string;
        transitionDuration: number;
        greenZones: any;
        yellowZones: any;
        redZones: any;
        greenZonesName: string;
        yellowZonesName: string;
        redZonesName: string;
        PointerName:string;
    }
    export class DialGauge implements IVisual {

        public static capabilities: VisualCapabilities = {
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
                    displayName: data.createDisplayNameGetter('Visual_General'),
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
                        'min': { max: 1 }, 'max': { max: 1 }, 'yellowStart': { max: 1 }, 'yellowEnd': { max: 1 }, 'redStart': { max: 1 },
                        'resEnd': { max: 1 }, 'pointerValue': { max: 1 }, 'percentage': { max: 1 }
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
            }
            ]
        };

        private svg: D3.Selection;
        private text: D3.Selection;
        private body: D3.Selection;
        private model: GaugeChartModel;
        private dataView: DataView;
        private config: ConfigGauge;
        private clearCatcher: D3.Selection;


        public static DefaultStyleProperties(): GaugeChartSettings {
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
                    cityName:''
                },
                general: {
                    lable: '',
                }
            }
        }

        //Convert a DataView into a view model
        public static converter(dataView: DataView, options: VisualUpdateOptions): GaugeChartModel {
            var gaugeModel: GaugeChartModel;
            if (!dataView) {
                return;
            }

            var dataViewCategorical = dataView.categorical;
            if (dataViewCategorical === null || dataViewCategorical.values.length === 0
                || dataView.metadata === null || dataView.metadata.columns.length === 0)
                return;

            var defaultSettings = this.DefaultStyleProperties();
            var objects = dataView.metadata.objects;
            if (objects) {
                defaultSettings.values.max = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.maxValue, defaultSettings.values.max);
                defaultSettings.values.min = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.minValue, defaultSettings.values.min);
                defaultSettings.values.rStart = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.rStart, defaultSettings.values.rStart);
                defaultSettings.values.rEnd = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.rEnd, defaultSettings.values.rEnd);
                defaultSettings.values.yStart = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.yStart, defaultSettings.values.yStart);
                defaultSettings.values.yEnd = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.yEnd, defaultSettings.values.yEnd);
                defaultSettings.values.percentage = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.percentage, defaultSettings.values.percentage);
                defaultSettings.values.pointerValue = DataViewObjects.getValue<number>(objects, gaugeChartProps.values.pointerValue, defaultSettings.values.pointerValue);
                defaultSettings.values.cityName = DataViewObjects.getValue<string>(objects, gaugeChartProps.values.cityName, defaultSettings.values.cityName);

            }



            var categories,
                categoryValues,
                categoryValuesLen = 1;


            if (dataViewCategorical.categories) {
                categories = dataViewCategorical.categories[0];
                categoryValues = categories.values;
                categoryValuesLen = categoryValues.length;
            }

            for (var idx = 0; idx < categoryValuesLen; idx++) {
                var Maximum: number = undefined, minimum: number = undefined,
                redstart: number = undefined, redend: number = undefined,
                yellowstrat: number = undefined, yellowend: number = undefined,
                PointerValue: number = undefined, percentage: number = undefined,
                cityName: string = undefined;                    


                var values = dataViewCategorical.values;
                var metadataColumns = dataView.metadata.columns;

                for (var i = 0; i < values.length; i++) {

                    var col = metadataColumns[i];
                    var currentVal = values[i].values[idx] || 0;
                    if (col && col.roles) {
                        if (col.roles[gaugeChartRoleNames.max]) {
                            Maximum = currentVal.toFixed(2)/1 ;
                        } else if (col.roles[gaugeChartRoleNames.min]) {
                            minimum = currentVal.toFixed(2)/1;
                        } else if (col.roles[gaugeChartRoleNames.rStart]) {
                            redstart = currentVal.toFixed(2)/1;
                        } else if (col.roles[gaugeChartRoleNames.rEnd]) {
                            redend = currentVal.toFixed(2)/1;
                        } else if (col.roles[gaugeChartRoleNames.yStart]) {
                            yellowstrat = currentVal.toFixed(2)/1;
                        } else if (col.roles[gaugeChartRoleNames.yEnd]) {
                            yellowend = currentVal.toFixed(2)/1;
                        } else if (col.roles[gaugeChartRoleNames.percentage]) {
                            percentage = currentVal.toFixed(6)/1;
                        } else if (col.roles[gaugeChartRoleNames.pointerValue]) {
                            PointerValue = currentVal.toFixed(2)/1;
                        } else if (col.roles[gaugeChartRoleNames.cityName]) {
                            cityName  = currentVal;
                        }
                    }
                }
                if (Maximum === undefined) {
                    Maximum = defaultSettings.values.max;
                }
                if (minimum === undefined) {
                    minimum = defaultSettings.values.min;
                }


                if(Maximum=== minimum)
                {
                    if(Maximum===0)
                        Maximum = defaultSettings.values.max;
                    if (!(minimum === 0))
                        minimum = defaultSettings.values.min;
                }
                if(minimum>Maximum)
                {
                    var tempmin=minimum;
                    minimum=Maximum;
                    Maximum=tempmin;
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
                if(redstart>redend)
                {
                    var tempred=redstart;
                    redstart=redend;
                    redend=tempred;
                }
                if(yellowstrat>yellowend)
                {
                    var tempyellow=yellowstrat;
                    yellowstrat=yellowend;
                    yellowend=tempyellow;
                }
                
                if(Maximum<yellowend)
                {
                    Maximum=yellowend;
                }
                if(Maximum<redend)
                {
                    Maximum=redend;
                }
                
                if(minimum>yellowstrat)
                {
                    minimum=yellowstrat;
                }
                if(minimum>redstart)
                {
                    minimum=redstart;
                }
                
                if (!isNaN(Maximum) && !isNaN(minimum) &&
                    !isNaN(redstart) && !isNaN(redend) &&
                    !isNaN(yellowstrat) && !isNaN(yellowend) &&
                    !isNaN(PointerValue) && !isNaN(percentage)) {
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
            }
            return gaugeModel;
        }
        /*One Time Setup*/

        public init(options: VisualInitOptions): void {

            var bdy = d3.select(options.element.get(0));
        this.clearCatcher = appendClearCatcher(bdy);

        var svg = this.svg = d3.select(options.element.get(0))
            .append('svg');

        this.initConfig();

        this.text = svg.append('text');
        this.body = svg.attr("class", "gauge")
            .attr("width", this.config.size)
            .attr("height", this.config.size);
    }
    public initConfig() {
        this.config = new ConfigGauge();
        this.config.label = "sample";
        
        this.initConfigOnRezise(250,250);
        
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

        this.config.greenZonesName="Max</br>";
        this.config.redZonesName="Actual</br>";
        this.config.yellowZonesName="Target</br>";
        this.config.PointerName="";//Actual</br>";
    }
    public initConfigOnRezise(Height:number,Width:number) {
        //  var bdy = d3.select(".gauge");
        //this.clearCatcher = appendClearCatcher(bdy);
        
        var size=250;
        if(Height>Width)
        {
            size= Width;
        }
        else{
            size=Height;
        }
            
        this.config.size = size;

        this.config.size = this.config.size * 0.9;
        this.config.raduis = this.config.size * 0.97 / 2;
        this.config.cx = this.config.size / 2;
        this.config.cy = this.config.size / 2;
         this.svg.selectAll("*").remove();
    }

    /* Called for data, size, formatting changes*/
    public update(options: VisualUpdateOptions) {
        if (!options.dataViews && !options.dataViews[0]) return;
        var dataView = options.dataViews[0];
        var viewport = options.viewport;
        var model: GaugeChartModel = DialGauge.converter(dataView, options);
        if (!model) {
            return;
        }
        this.initConfig();
        this.initConfigOnRezise(viewport.height,viewport.width);

        this.model = model

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
    }
    public draw(width: number, height: number, duration: number) {
        this.body.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", this.config.raduis)
            .style("fill", "#ccc")
            .style("stroke", "#000")
            .style("stroke-width", "0.5px");


        this.body.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", 0.9 * this.config.raduis)
            .style("fill", "#fff")
            .style("stroke", "#e0e0e0")
            .style("stroke-width", "2px");


        for (var index in this.config.greenZones) {
            this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, this.config.greenColor,this.config.greenZonesName);
        }

        if(this.config.yellowZones[index].to >= this.config.redZones[index].to)

        {
            for (var index in this.config.yellowZones) {
                this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, this.config.yellowColor,this.config.yellowZonesName);
            }

            for (var index in this.config.redZones) {
                this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, this.config.redColor,this.config.redZonesName);

            }
        }
        else
        {
            for (var index in this.config.redZones) {
                this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, this.config.redColor,this.config.redZonesName);
            }
        
            for (var index in this.config.yellowZones) {
                this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, this.config.yellowColor,this.config.yellowZonesName);
            }
        }
        this.config.label = this.model.gaugeChartSettings.values.cityName;
        if (undefined != this.config.label) {
            var fontSize = Math.round(this.config.size / 9);
            this.body.append("svg:text")
                .attr("x", this.config.cx)

                .attr("y", this.config.cy / 1.8 + fontSize / 2)
                .attr("dy", fontSize / 2)
                .attr("text-anchor", "middle")
                .text(this.config.label)
                .style("font-size", fontSize/1.5 + "px")
                .style("fill", "#333")
                .style("stroke-width", "0px");
        }
        if (undefined != this.model.gaugeChartSettings.values.pointerValue) {
            var fontSize = Math.round(this.config.size / 9);
            // this.body.append("svg:text")
            this.body.select(".RedEndContainer").remove();

            var perContainer = this.body.append("svg:g").attr("class", "RedEndContainer");

            perContainer.append("svg:text")
                .attr("x", this.config.cx)
                .attr("y", this.config.cy * 1.5 + fontSize / 2)
                .attr("dy", fontSize / 2)
                .attr("text-anchor", "middle")
                .text(this.getFormattedValue(this.model.gaugeChartSettings.values.pointerValue))
                .style("font-size", fontSize + "px")
                .style("fill", "#333")
                .style("stroke-width", "0px");
            // var transitionDuration;
            // var perccont = perContainer.selectAll("path");
            // perccont.transition()
            //     .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration);
            
        }

        if (undefined != this.model.gaugeChartSettings.values.percentage) {
            var fontSize = Math.round(this.config.size / 9);
            // this.body.append("svg:text")
            this.body.select(".PercentageContainer").remove();
            var formatter = valueFormatter.create({ format: "0.00 %;-0.00 %;0.00 %", value: 1, allowFormatBeautification: true });
            var PercentValueDisplay= formatter.format(this.model.gaugeChartSettings.values.percentage);
            var perContainer = this.body.append("svg:g").attr("class", "PercentageContainer");

            perContainer.append("svg:text")
                .attr("x", this.config.cx)
                .attr("y", this.config.cy * 2 + fontSize / 2)
                .attr("dy", fontSize / 2)
                .attr("text-anchor", "middle")
                .text(PercentValueDisplay)
                .style("font-size", fontSize + "px")
                .style("fill", "#333")
                .style("stroke-width", "0px");
            // var transitionDuration;
            // var perccont = perContainer.selectAll("path");
            // perccont.transition()
            //     .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration);
            
        }
        var settingvalue = this.model.gaugeChartSettings;

        var fontSize = Math.round(this.config.size / 16);
        var majorDelta = this.config.range / (this.config.majorTicks - 1);
        for (var major = settingvalue.values.min; major <= settingvalue.values.max; major += majorDelta) {
            var minorDelta = majorDelta / this.config.minorTicks;
            for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.maxVal); minor += minorDelta) {
                var point1 = this.valueToPoint(minor, 0.75);
                var point2 = this.valueToPoint(minor, 0.85);

                this.body.append("svg:line")
                    .attr("x1", point1.x)
                    .attr("y1", point1.y)
                    .attr("x2", point2.x)
                    .attr("y2", point2.y)
                    .style("stroke", "#666")
                    .style("stroke-width", "1px");
            }

            var point1 = this.valueToPoint(major, 0.7);
            var point2 = this.valueToPoint(major, 0.85);

            this.body.append("svg:line")
                .attr("x1", point1.x)
                .attr("y1", point1.y)
                .attr("x2", point2.x)
                .attr("y2", point2.y)
                .style("stroke", "#333")
                .style("stroke-width", "2px");

            if (major == settingvalue.values.min || major == settingvalue.values.max) {
                var point = this.valueToPoint(major, 0.63);

                var FormattedMajorValue= this.getFormattedValue(major);
                this.body.append("svg:text")
                    .attr("x", point.x)
                    .attr("y", point.y)
                    .attr("dy", fontSize / 3)
                    .attr("text-anchor", major == settingvalue.values.min ? "start" : "end")
                    .text(FormattedMajorValue)
                    .style("font-size", fontSize + "px")
                    .style("fill", "#333")
                    .style("stroke-width", "0px");

            }
        }// end of for loop


        var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");

        var midValue = (settingvalue.values.min + settingvalue.values.max) / 2;

        var pointerPath = this.buildPointerPath(midValue);

        var pointerLine = d3.svg.line()
            .x(function (d) { return d.x })
            .y(function (d) { return d.y })
            .interpolate("basis");
        var value = settingvalue.values.pointerValue;//this.config.minVal;
        //  var pointerValue = Math.round(value);
        var pointerValue = value;
        if (value > settingvalue.values.max) pointerValue = settingvalue.values.max + 0.02 * this.config.range;
        else if (value < settingvalue.values.min) pointerValue = settingvalue.values.min - 0.02 * this.config.range;
        var targetRotation = (this.valueToDegrees(pointerValue) - 90);
        var currentRotation = this._currentRotation || targetRotation;
        this._currentRotation = targetRotation;
        var step = 1;
        var rotation = currentRotation + (targetRotation - currentRotation) * step;


        var div = d3.select("body").append("div")   
            .attr("class", "CFtooltip")               
            .style("opacity", 0);
                
        var formattedPointerValue=this.getFormattedValue(settingvalue.values.pointerValue);
            
        pointerContainer.selectAll("path")
            .data([pointerPath])
            .enter()
            .append("svg:path")
            .attr("d", pointerLine)
            .style("fill", "#dc3912")
            .style("stroke", "#c63310")
            .style("fill-opacity", 0.7)
            .attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(" + rotation + ")")
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
                
        pointerContainer.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", 0.12 * this.config.raduis)
            .style("fill", "#4684EE")
            .style("stroke", "#666")
            .style("opacity", 1);

        var fontSize = Math.round(this.config.size / 10);
        pointerContainer.selectAll("text")
            .data([midValue])
            .enter()
            .append("svg:text")
            .attr("x", this.config.cx)
            .attr("y", this.config.size - this.config.cy / 4 - fontSize)
            .attr("dy", fontSize / 2)
            .attr("text-anchor", "middle")
            .style("font-size", fontSize + "px")
            .style("fill", "#000")
            .style("stroke-width", "0px");

        this.redraw(settingvalue.values.rEnd, 0);

    }
    public redraw(value: number, transitionDuration: number) {

        var pointerContainer = this.body.select(".pointerContainer");
        // pointerContainer.selectAll("text").text(Math.round(value));

        var pointer = pointerContainer.selectAll("path");
        pointer.transition()
            .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration);
    }

    public buildPointerPath(value: number) {
        var delta = this.config.range / 13;

        var head = this.valueToPointForBP(value, 0.85);
        var head1 = this.valueToPointForBP(value - delta, 0.12);
        var head2 = this.valueToPointForBP(value + delta, 0.12);

        var tailValue = value - (this.config.range * (1 / (270 / 360)) / 2);
        var tail = this.valueToPointForBP(tailValue, 0.28);
        var tail1 = this.valueToPointForBP(tailValue - delta, 0.12);
        var tail2 = this.valueToPointForBP(tailValue + delta, 0.12);

        return [head, head1, tail2, tail, tail1, head2, head];
    }

    public valueToPointForBP(value: number, factor: number) {
        var point = this.valueToPoint(value, factor);
        point.x -= this.config.cx;
        point.y -= this.config.cy;
        return point;
    }
        
    public getFormattedValue(val :number){
        
        var formater= valueFormatter.create({value:0});
          
        var formattedValue=val.toString();
        if((val>= 100000) &&( val < 1000000000))
        {
            formater= valueFormatter.create({ value: 1e6});
        }
        else if(val >= 1000000000)
        {                
            formater= valueFormatter.create({ value: 1e9});
        }
        else
        { 
            formater= valueFormatter.create({ value: 0});
        }
        formattedValue= formater.format(val);
        return formattedValue;
    }
        
    public drawBand(start: number, end: number, color: string,ToolTipText: string) {
        if (0 >= end - start) return;
          
        var formattedEndValue=this.getFormattedValue(end);
             
        var div = d3.select("body").append("div")   
            .attr("class", "CFtooltip")               
            .style("opacity", 0);
                
        this.body.append("svg:path")
            .style("fill", color)
            .attr("d", d3.svg.arc()
                .startAngle(this.valueToRadians(start))
                .endAngle(this.valueToRadians(end))
                .innerRadius(0.65 * this.config.raduis)
                .outerRadius(0.85 * this.config.raduis))
            .attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(270)")
            .on("mouseover", function(d) {      
                div.transition()        
                    .duration(200)      
                    .style("opacity", .9);      
                div .html(ToolTipText+ formattedEndValue.toString() )  
                    .style("left", (d3.event.clientX) + "px")     
                    .style("top", (d3.event.clientY - 28) + "px");    
            })                  
                .on("mouseout", function(d) {       
                    div.transition()        
                        .duration(500)      
                        .style("opacity", 0);   
                })
        ;
                
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
    }
    private valueToDegrees(value: number) {
        return value / this.config.range * 270 - (this.config.minVal / this.config.range * 270 + 45);
    }

    private valueToRadians(value: number) {
        return this.valueToDegrees(value) * Math.PI / 180;
    }

    private valueToPoint(value: number, factor: number) {
        return {
            x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
            y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value))
        };
    }


    /*About to remove your visual, do clean up here */
    public destroy() { }

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

    private enumerateValues(data: GaugeChartModel): VisualObjectInstance[] {
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
    }

}


}