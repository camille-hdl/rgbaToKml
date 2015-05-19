/* rgbaToKml.js
Convert colors from rgba to KML or CSS hex formats.
camille.hodoul@gmail.com
*/
var converter = (function() {
    "use strict";
    var errors = Object.create(null) || {};
    errors.invOpacity = "invalid opacity value";
    errors.invComponent = "invalid component value";
    errors.nanComponent = "component is NaN";
    errors.nanOpacity = "opacity is NaN";
    return { 
        rgbaToHex: function(rgba) {
            var comp = rgba.split(',');
            comp = comp.map(Number);
            comp.map(function(component) {
                if(isNaN(component)) {
					// one of the colors or alpha is NaN
                    throw new TypeError(errors.nanComponent);
                }
                else if(component < 0 || component > 255) {
					// one of the colors or alpha isn't in range
                    throw new Error(errors.invComponent);
                }
            });
            var colors = {
                r: comp[0],
                g: comp[1] || 0,
                b: comp[2] || 0
            };
            
            var op = (typeof comp[3] !== "undefined") ? comp[3] : 1;
            if(isNaN(op)) {
				// opacity is NaN
                throw new TypeError(errors.nanOpacity);
            }
            else if(op < 0 || op > 1) {
				// opacity isn't in range
                throw new Error(errors.invOpacity);
            }
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
            if(typeof op === "undefined") {
                op = 1;
            }
            op = Number(op);
            if (isNaN(op)) {
				// opacity is NaN
                throw new TypeError(errors.nanOpacity);
            }
            else if(op > 1 || op < 0) {
				// opacity isn't in range
                throw new Error(errors.invOpacity);
            }
            for(var component in colors) {
                if(colors.hasOwnProperty(component)) {
                    var temp = parseInt(colors[component],16);
                    if(isNaN(temp)) {
						// one of the colors is NaN
                        throw new TypeError(errors.nanComponent);
                    }
                    if(temp > 255 || temp < 0) {
						// color isn't in range
                        throw new Error(errors.invComponent);
                    }
                }
            }
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
            comp.map(function(component) {
                if(isNaN(component)) {
					// one of the colors or alpha is NaN
                    throw new TypeError(errors.nanComponent);
                }
                else if(component < 0 || component > 255) {
					// color not in range
                    throw new Error(errors.invComponent);
                }
            });
            var colors = {
                r: comp[0],
                g: comp[1] || 0,
                b: comp[2] || 0
            };
            
            var op = (typeof comp[3] !== "undefined") ? comp[3] : 1;
            if(isNaN(op)) {
				// opacity is NaN
                throw new TypeError(errors.nanOpacity);
            }
            else if(op < 0 || op > 1) {
				// opacity is not in range
                throw new Error(errors.invOpacity);
            }
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
			for(var component in colors) {
                if(colors.hasOwnProperty(component)) {
                    var temp = parseInt(colors[component],16);
                    if(isNaN(temp)) {
						// one of the components is NaN
                        throw new TypeError(errors.nanComponent);
                    }
                    if(temp > 255 || temp < 0) {
						// component isn't in range
                        throw new Error(errors.invComponent);
                    }
                }
            }
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