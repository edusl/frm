var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
//var plumber     = require('gulp-plumber');
var path        = require('path');
var svgSymbols  = require('gulp-svg-symbols');
var gutil       = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
      proxy: "localhost/phpbb32"
    });

    gulp.watch("images/svg/*.*", ['svg-sprite']).on('change', browserSync.reload);
    gulp.watch("styles/*/theme/*.*", ['sass']).on('change', browserSync.reload);
    gulp.watch("styles/*/template/*.html").on('change', browserSync.reload);


});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("styles/frm/theme/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ['last 5 versions'],
          cascade: false
        }))
        .pipe(sass.sync().on('error', sass.logError))

        .pipe(gulp.dest("styles/frm/theme/"))
        .pipe(browserSync.stream());
});

/**
 * SVG -> PNG fallback task
 */


/**
 * Sprites task
 */


 // Create svg sprite

 gulp.task('svg-sprite', function () {

     // Define source files

     return gulp.src( 'images/svg/*.svg' )

         // Run the svg-symbols module, whilst prefixing the created classnames
         .pipe(
             svgSymbols({
                 className: '.icon--%f',
                 svgClassname: 'svg-sprite',
                 title: false,
                 warn: false
             })
         )

         // Define where the respond is distributed to
         .pipe( gulp.dest( 'images/svg/dist/' ) )
 });



gulp.task('default', ['serve','svg-sprite']);
