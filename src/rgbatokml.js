/* rgbaToKml.js
Convert colors from rgba to KML or CSS hex formats.
camille.hodoul@gmail.com
*/
var converter = (function() {
    "use strict";
    return { 
        rgbaToHex: function(rgba) {
            var comp = rgba.split(',');
            comp = comp.map(Number);
            var colors = {
                r: comp[0],
                g: comp[1] || 0,
                b: comp[2] || 0
            };
            var op = comp[3] || 1;
            colors.r = colors.r.toString(16);
            colors.g = colors.g.toString(16);
            colors.b = colors.b.toString(16);
            if (colors.r.length < 2) colors.r = "0" + colors.r;
            if (colors.g.length < 2) colors.g = "0" + colors.g;
            if (colors.b.length < 2) colors.b = "0" + colors.b;

            return { 
                color: colors.r + colors.g + colors.b,
                op: op
            };
        },
        hexToRgba: function(hex, op) {
            var colors = {
                r: hex.substr(0, 2),
                g: hex.substr(2, 2) || "00",
                b: hex.substr(4, 2) || "00"
            };
            op = Number(op);
            if (isNaN(op)) op = 1;
            return {
                r: parseInt(colors.r, 16),
                g: parseInt(colors.g, 16),
                b: parseInt(colors.b, 16),
                a: op
            };
        },
        rgbaToKml: function(rgba) {
            var comp = rgba.split(',');
            comp = comp.map(Number);
            var colors = {
                r: comp[0],
                g: comp[1] || 0,
                b: comp[2] || 0
            };
            var op = Number(comp[3] || 1);
            op = parseInt(op * 255, 10);
            op = op.toString(16);

            colors.b = colors.b.toString(16);
            colors.g = colors.g.toString(16);
            colors.r = colors.r.toString(16);
            if (op.length < 2) op = "0" + op;
            if (colors.b.length < 2) colors.b = "0" + colors.b;
            if (colors.g.length < 2) colors.g = "0" + colors.g;
            if (colors.r.length < 2) colors.r = "0" + colors.r;
            return op + colors.b + colors.g + colors.r;
        },
        kmlToRgba: function(kml) {
            var colors = {
                a: kml.substr(0, 2) || "FF",
                r: kml.substr(6, 2) || "00",
                g: kml.substr(4, 2) || "00",
                b: kml.substr(2, 2) || "00"
            };
            var output = {
                r: parseInt(colors.r, 16),
                g: parseInt(colors.g, 16),
                b: parseInt(colors.b, 16),
                a: parseInt(colors.a, 16)
            };
            // avoid weird floating point things
            output.a = Math.round(output.a / 255 * 100) / 100;
            return output;
        }
    };
})();
exports.rgbaToHex = converter.rgbaToHex;
exports.rgbaToKml = converter.rgbaToKml;
exports.kmlToRgba = converter.kmlToRgba;
exports.hexToRgba = converter.hexToRgba;
if(typeof module !== "undefined") {
    module.exports = exports;
}