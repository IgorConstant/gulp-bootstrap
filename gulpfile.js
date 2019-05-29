//Função para Compilar o Sass.
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

//Função para compilar o SASS
function compilarSass() {
    return gulp
        .src('styles/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
}

//Função para executar o SASS
gulp.task('sass', compilarSass);


//Função para Concat do JS
function gulpJS() {
    return gulp.src(['node_modules/popper.js/dist/umd/popper.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.stream());
}

gulp.task('mainjs', gulpJS);


//Função para Iniciar o Browser Sync
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

//Tarefa para iniciar o Browser Sync
gulp.task('browser-sync', browser);


//Função para "Espionar as Alterações no Projeto"
function watchproject() {
    gulp.watch('styles/*.scss', compilarSass);
    gulp.watch('*.html').on('change', browserSync.reload);
}

//Tarefa para iniciar o Watch
gulp.task('watch', watchproject);

//Tarefa padrão para executar o Gulp 
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));