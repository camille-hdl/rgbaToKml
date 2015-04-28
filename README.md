# rgbaToKml
This small javascript lib allows you to convert colors from rgba notation to hexadecimal CSS or KML formats, or the other way around.

Try it live here : <http://eartz.github.io/rgbaToKml/>


## usage
In the browser, this file adds a single `converter` object to the global namespace.  
In node, you can require it : `var converter = require('src/rgbatokml');`  

You can access the conversion functions like so :
````
var hex = converter.rgbaToHex("240,15,240,0.8");
hex.color; // "f00ff0"
hex.op; // 0.8

var rgba = converter.kmlToRgba("ffF009AF");
rgba; // {r:175,g:9,b:240,a:1}

var kml = converter.rgbaToKml("241,180,20,0.7");
kml; // "b214b4f1"
````

## author
camille.hodoul [at] gmail
@Eartz_HC