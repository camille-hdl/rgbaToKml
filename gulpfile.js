var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');

var minFilename = "rgbatokml.min.js";
var fullFilename = "rgbatokml.js";
var sourceDir = "src/";
var distDir = "dist";

// used for uglify, order matters
var files = [
    "rgbatokml.js"
];
files = files.map(function(file) { return sourceDir+file;});


gulp.task('default', function() {
    
});
gulp.task('watch', function() {
    var watcher = gulp.watch('./src/*.js', ['uglify']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('uglify', function() {
    // create minified file 
    gulp.src(files)
        .pipe(uglify(minFilename,{
            outSourceMap: true,
            wrap: "converter"
        }))
        .pipe(gulp.dest(distDir));
    // create non minified file for the browser
    gulp.src(files)
        .pipe(uglify(fullFilename,{
            outSourceMap: false,
            wrap: "converter",
            compress: false,
            mangle: false,
            output: {
                beautify: true,
                preamble: "/* rgbaToKml.js - convert color formats : RGBA ,Hex ,RBG(kml) - https://github.com/Eartz/rgbaToKml */"
            }
        }))
        .pipe(gulp.dest(distDir));
});