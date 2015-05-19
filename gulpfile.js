var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');

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
gulp.task('build-sync',function() {
    runSequence(['uglify-min','uglify-max'],'mocha');
});
gulp.task('watch', function() {
    var watcher = gulp.watch('./src/*.js', ['build-sync']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	var watcherTests = gulp.watch('./test/*.js', ['mocha']);
    watcherTests.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('mocha', function() {
    return gulp.src('test/test.js')
        .pipe(mocha());
});
gulp.task('uglify-min', function() {
    // create minified file 
    return gulp.src(files)
        .pipe(uglify(minFilename,{
            outSourceMap: true,
            wrap: "converter"
        }))
        .pipe(gulp.dest(distDir));
    
});
gulp.task('uglify-max', function() {
    // create non minified file for the browser
    return gulp.src(files)
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