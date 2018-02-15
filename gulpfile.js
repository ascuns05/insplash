let gulp = require('gulp')
  , pug = require('gulp-pug')
  , sass = require('gulp-sass')
  , sourcemaps = require('gulp-sourcemaps')
  , connect = require('gulp-connect')
  ;


gulp.task('connect', () => {
  connect.server({
    port: 1337,
    livereload: 'on',
    root: './dist'
  })
});

gulp.task('pug', () => {
  gulp.src('app/**/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('sass', () => {
  gulp.src('app/sass/**/main.sass')
  .pipe(sourcemaps.init()) 
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) 
  .pipe(sourcemaps.write('./maps')) // folder for *.map files
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());
});

gulp.task('js', () => {
  gulp.src('app/js/**/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload());
});

gulp.task('img', () => {
  gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img'))
  .pipe(connect.reload());
});


gulp.task('watch', () => {
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/img/**/*', ['img']);
});

gulp.task('default', ['pug', 'connect', 'sass', 'js', 'img' , 'watch']);