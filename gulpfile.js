const {
    src,
    dest,
    watch,
    series,
} = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const path = {
    watch: {
        html: './**/*.html',
        scss: './src/scss/**/*.scss',
        js: './src/js/*.js',
    },
    sources: {
        scss: './src/scss/ytdemo.scss',
        js: './src/js/*.js',
    },
    dist: {
        css: './dist/css',
        js: './dist/js',
    },
}

const serve = (done) => {
    browserSync.init({
        server: './dist',
    })
    done()
}

const reload = (done) => {
    browserSync.reload()
    done()
}

const buildSass = (done) => {
    src(path.sources.scss)
        .pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(path.dist.css))
        .pipe(browserSync.stream())
    done()
}

const buildScripts = (done) => {
    src(path.sources.js)
        .pipe(concat('ytdemo.min.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(path.dist.js))
    reload(done)
}

const watchTasks = (done) => {
    watch(path.watch.html, series(reload))
    watch(path.watch.scss, series(buildSass))
    watch(path.watch.js, series(buildScripts))
    done()
}

exports.default = series(serve, buildSass, buildScripts, watchTasks)
