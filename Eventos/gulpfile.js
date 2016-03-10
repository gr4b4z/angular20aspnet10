var gulp = require('gulp');
var ts = require('gulp-typescript');


gulp.task('transpile:js', function() {
    
 var tsProject = ts.createProject('app.js/tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(ts(tsProject));  

    return tsResult.js.pipe(gulp.dest("wwwroot/app"));
        
});
gulp.task('copy:libs', function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest('wwwroot/lib'))
});

gulp.task('copy:others', function() {
    return gulp.src(["app.js/**/*.html","app.js/**/*.css"])
        .pipe(gulp.dest("wwwroot"));
});

gulp.task('default', ['copy:libs','transpile:js','copy:others'], function() {

});


gulp.task('watch', ['default'], function() {
    gulp.watch(["app.js/**/*.ts"],'transpile:js');
    gulp.watch([!"app.js/**/*.ts"],'copy:others');
});
