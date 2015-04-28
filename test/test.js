var assert = require("assert");
var converter = require("../dist/rgbatokml");
describe('converter', function(){
    describe('#rgbaToHex()', function(){
        it('should return f0f0f0 1 when the input is "240,240,240,1"', function(){
            var expected = {color: "f0f0f0", op: 1};
            var actual = converter.rgbaToHex("240,240,240,1");
            assert.equal(expected.color, actual.color);
            assert.equal(expected.op,actual.op);
        })
        it('should return d27250 0.8 when the input is "210,114,80,0.8"', function(){
            var expected = {color: "d27250", op: 0.8};
            var actual = converter.rgbaToHex("210,114,80,0.8");
            assert.equal(expected.color, actual.color);
            assert.equal(expected.op,actual.op);
        })
    })
})