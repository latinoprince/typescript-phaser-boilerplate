module Namespace.Utils {
    export class Style {
        static defaultColor:String = "white"
        static highlightColor:String = "#FDFFB5"
        static navitem:any = {
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
        }

    }
}