const {src, dest, parallel, series, watch}  = require('gulp');
const browserSync                           = require('browser-sync').create(); // create connection
const pugGulp                               = require('gulp-pug');
const concat                                = require('gulp-concat');
const uglify                                = require('gulp-uglify-es').default;
const sass                                  = require('gulp-sass')(require('sass'));
const autoprefixer                          = require('gulp-autoprefixer');
const cleancss                              = require('gulp-clean-css');
const imagecomp                             = require('compress-images');
const del                                   = require('del');


function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,  // browser notifications
        online: false   // true - to get IP addresses for phones/tablets
    })
}

function scripts() {
    return src([ 
        // 'node_modules/jquery/dist/jquery.min.js',
        'app/js/**/*.js', 
        '!app/**/*.min.js', 
    ])
    .pipe(concat('app.min.js')) 
    .pipe(uglify()) 
    .pipe(dest('app/js/')) 
    .pipe(browserSync.stream())
}

function styles() {
    return src([
        'app/sass/cssReset.css',
        'app/sass/style.sass',
        'app/bem/**/*.sass'
    ])
    .pipe(sass()) 
    .pipe(concat('style.min.css')) 
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) 
    .pipe(cleancss( { 
        level: { 1: 
            { specialComments: 0 } 
        },
        // format: 'beautify'         // expanded      // comment that if you need compressed file
    } )) 
    .pipe(dest('app/css/')) 
    .pipe(browserSync.stream()) 
}



function pug() {
  return src('app/pug/index.pug')
    .pipe(pugGulp())
    .pipe(dest('./app/'));
}

async function images() {
	imagecomp(
        "app/imgSrc/**/*", 
		"app/img/", 
		{ compress_force: false, statistic: true, autoupdate: true }, false, 
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, 
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { 
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}





function cleanimg() {
	return del('app/img/**/*', { force: true }) // Удаляем всё содержимое папки "app/images/dest/"
}

function cleandist() {
	return del('dist/**/*', { force: true }) 
}





function buildcopy() {
	return src([ 
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/img/**/*',
		'app/**/*.html',
		], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('dist')) 
}
 

function startwatch() {
    watch(['app/sass/**/*', 'app/bem/**/*.sass'], styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);    
    watch('app/**/*.html').on('change', browserSync.reload);    // replace with pug??????????
    watch(['app/img/**/*', '!app/img/_dest/**/*'], images);
}



exports.browsersync = browsersync; // gulp browsersync  (command in the terminal)
exports.scripts     = scripts;
exports.styles      = styles;
exports.pug         = pug;
exports.images      = images;

exports.build       = series(cleandist, pug, styles, scripts, images, buildcopy);
exports.default     = parallel(pug, styles, scripts, images, browsersync, startwatch);   // default task

exports.cleanimg    = cleanimg;
exports.cleandist    = cleandist;





