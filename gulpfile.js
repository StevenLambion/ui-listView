var project = require("./package.json");

var gulp = require("gulp");
var gutil = require("gulp-util");
var debug = require("gulp-debug");
var concat = require("gulp-concat");
var iife = require("gulp-iife");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var runSequence = require("run-sequence");

var es = require("event-stream");

var ngAnnotate = require("gulp-ng-annotate");
var templateCache = require("gulp-angular-templatecache");
var babel = require("gulp-babel");

var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish")

var del = require("del");

var karma = require("karma").server;
 
var paths = {
    src: {
        root: "src",
        javascript: "src/**/*.js",
        templates: "src/**/*.tpl.html",
        styles: "src/**/*.css"
    },
    dist: {
        root: "dist",
        javascript: "dist/",
        styles: "dist/",
        reports: 'reports'
    }
};

var handleError = function (taskName) {
    return function (err) {
        gutil.log(gutil.colors.bgRed("ERROR: " + taskName), gutil.red(err));
    };
};

var tasks = {
    
    clean: function (cb) {
        del([paths.dist.root, paths.dist.reports], cb);
    },
    
    compileScripts: function () {
        return es.merge(
            gulp.src(paths.src.javascript),
            tasks.compileTemplates()
        )
        .pipe(sourcemaps.init())
        .pipe(babel()).on("error", handleError("babel"))
        .pipe(concat(project.name + ".js"))
        .pipe(ngAnnotate()).on("error", handleError("ngAnnotate"))
        .pipe(iife({ useStrict: false }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.dist.javascript))
    },
    
    uglifyScripts: function () {
        return gulp.src(paths.dist.javascript + "**/*.js")
        .pipe(concat(project.name + ".min.js"))
        .pipe(uglify()).on("error", handleError("uglify"))
        .pipe(gulp.dest(paths.dist.javascript))
    },
    
    compileTemplates: function () {
        return gulp.src(paths.src.templates)
        .pipe(templateCache({
            base: __dirname + "/" + paths.src.root,
            module: "ui-listView.templates",
            standalone: true
        }))
    },
    
    compileStyles: function () {
        return gulp.src(paths.src.styles)
        .pipe(gulp.dest(paths.dist.styles))
    },
    
    lintjs: function () {
        return gulp.src(paths.src.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter("fail"))
    },
    
    test: function (cb) {
        new karma.start({
            configFile: __dirname + '/karma.conf.js'
        }, cb);
    }
    
}
 
/**
 * This task removes all files inside the "dist" directory.
 */
gulp.task("clean", tasks.clean);
gulp.task("lintjs", tasks.lintjs);
gulp.task("compileScripts", ["lintjs"], tasks.compileScripts);
gulp.task("compileStyles", tasks.compileStyles);
gulp.task("uglify", ["compileScripts"], tasks.uglifyScripts);
gulp.task("test", tasks.test);

gulp.task("build", function (cb) {
    return runSequence(
        "clean",
        "test",
        ["compileScripts", "compileStyles"],
        "uglify",
        cb
    );
});

gulp.task("default", ["build"]);