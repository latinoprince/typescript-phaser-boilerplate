var Namespace;
(function (Namespace) {
    var Utils;
    (function (Utils) {
        var Style = (function () {
            function Style() {
            }
            return Style;
        }());
        Style.defaultColor = "white";
        Style.highlightColor = "#FDFFB5";
        Style.navitem = {
            base: {
                font: '30pt Arial',
                align: 'left',
                srokeThickness: 4
            },
            default: {
                fill: Style.defaultColor,
                stroke: 'rgba(0,0,0,0)'
            },
            inverse: {
                fill: 'black',
                stroke: 'black'
            },
            hover: {
                fill: Style.highlightColor,
                stroke: 'rgba(200,200,200,0.5)'
            }
        };
        Utils.Style = Style;
    })(Utils = Namespace.Utils || (Namespace.Utils = {}));
})(Namespace || (Namespace = {}));
//# sourceMappingURL=Style.js.map