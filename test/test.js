var assert = require("assert");
var converter = require("../dist/rgbatokml.min.js");
describe('converter', function(){
    describe('#rgbaToHex()', function(){
        it('should return f0f0f0 1 when the input is "240,240,240,1"', function(){
            var expected = {color: "f0f0f0", op: 1};
            var actual = converter.rgbaToHex("240,240,240,1");
            assert.equal(expected.color, actual.color);
            assert.equal(expected.op,actual.op);
        });
        it('should return d27250 0.8 when the input is "210,114,80,0.8"', function(){
            var expected = {color: "d27250", op: 0.8};
            var actual = converter.rgbaToHex("210,114,80,0.8");
            assert.equal(expected.color, actual.color);
            assert.equal(expected.op,actual.op);
        });
        it('should return d27250 0 when the input is "210,114,80,0"', function(){
            var expected = {color: "d27250", op: 0};
            var actual = converter.rgbaToHex("210,114,80,0");
            
            assert.equal(expected.color, actual.color);
            assert.equal(expected.op,actual.op);
        });
        it('should return opacity should default to 1 when the input is "240,240,240"', function(){
            var expected = {color: "f0f0f0", op: 1};
            var actual = converter.rgbaToHex("240,240,240");
            assert.equal(expected.color, actual.color);
            assert.equal(expected.op,actual.op);
        });
        it('should throw when the input has NaN "240,aaaaa,240,0.7"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToHex("240,aaaaa,240,0.7");
            },TypeError);
        });
        it('should throw when opacity is invalid "240,60,240,-2"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToHex("240,60,240,-2");
            },Error);
        });
        it('should throw when opacity is invalid "240,60,240,999"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToHex("240,60,240,999");
            },Error);
        });
        it('should throw when opacity is NaN "240,60,240,aaaa"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToHex("240,60,240,aaaa");
            },TypeError);
        });
        it('should throw when color components are wrong "240,9999,240"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToHex("240,9999,240");
            },Error);
        });
    });
    describe('#hexToRgba()', function(){
        it('should default opacity to 1 when the input is "f5a0f9"', function(){
            var expected = {r:245,g:160,b:249,a:1};
            var actual = converter.hexToRgba("f5a0f9");
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
        it('should return 245,160,249,0.2 when the input is "f5a0f9 0.2"', function(){
            var expected = {r:245,g:160,b:249,a:0.2};
            var actual = converter.hexToRgba("f5a0f9",0.2);
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
        it('should return 240,240,240,0 when the input is "f0f0f0 0"', function(){
            var expected = {r:240,g:240,b:240,a:0};
            var actual = converter.hexToRgba("f0f0f0",0);
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
        it('should throw when opacity is invalid "f0f0f0 -999 or azaez or 999"', function(){
            assert.throws(function() {
                var actual = converter.hexToRgba("f0f0f0",-999);
            },Error);
            assert.throws(function() {
                var actual = converter.hexToRgba("f0f0f0","azeaze");
            },TypeError);
            assert.throws(function() {
                var actual = converter.hexToRgba("f0f0f0",999);
            },Error);
        });
        it('should throw when components are invalid "zzf0f0 1"', function(){
            assert.throws(function() {
                var actual = converter.hexToRgba("zzf0f0",1);
            },TypeError);
        });
        it('should default components to 00 when missing "ff 1"', function(){
            var expected = {r:255,g:0,b:0,a:1};
            var actual = converter.hexToRgba("ff",1);
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
    });
    describe('#rgbaToKml()', function(){
        it('should return fff0f0f0 when the input is "240,240,240,1"', function(){
            var expected = "fff0f0f0";
            var actual = converter.rgbaToKml("240,240,240,1");
            assert.equal(expected, actual);
        });
        it('should return 66fa14b4 when the input is "180,20,250,0.4"', function(){
            var expected = "66fa14b4";
            var actual = converter.rgbaToKml("180,20,250,0.4");
            assert.equal(expected, actual);
        });
        it('opacity should default to ff if input is "180,20,250"', function(){
            var expected = "fffa14b4";
            var actual = converter.rgbaToKml("180,20,250");
            assert.equal(expected, actual);
        });
        it('should throw when the input has NaN "240,aaaaa,240,0.7"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToKml("240,aaaaa,240,0.7"); 
            },TypeError);
        });
		it('should throw when opacity is NaN "240,120,240,aze"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToKml("240,120,240,aze"); 
            },TypeError);
        });
		it('should throw when opacity is not in range "240,120,240,99"', function(){
            assert.throws(function() {
                var actual = converter.rgbaToKml("240,120,240,99"); 
            },Error);
        });
        
    });
	describe('#kmlToRgba()', function(){
		it('should return 173,0,255,0.69 when the input is "afff00ad"', function(){
            var expected = {r:173,g:0,b:255,a:0.69};
            var actual = converter.kmlToRgba("afff00ad");
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
		it('should return 173,173,255,0.53 when the input is "88ffadad"', function(){
            var expected = {r:173,g:173,b:255,a:0.53};
            var actual = converter.kmlToRgba("88ffadad");
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
		it('should throw when components are not in range "ttffadad"', function(){
            assert.throws(function() {
                var actual = converter.kmlToRgba("ttffadad");
            },TypeError);
        });
		it('should default to 00 for every missing component "ffff"', function(){
			var expected = {r:0,g:0,b:255,a:1};
            var actual = converter.kmlToRgba("ffff");
            assert.equal(expected.r, actual.r);
            assert.equal(expected.g, actual.g);
            assert.equal(expected.b, actual.b);
            assert.equal(expected.a,actual.a);
        });
	});
});