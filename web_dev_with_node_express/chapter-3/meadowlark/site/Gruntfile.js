module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);


    var config = {
        src: 'src',
        src_css: 'src/css',
        src_js: 'src/js',
        src_vendors: 'bower_components',

        dist: 'dist',
        dist_js: 'dist/js',
        dist_css: 'dist/css',
        dist_vendors: 'dist/vendors',

        tmp: 'tmp',
        lessed: 'tmp/lessed',
        prefixed: 'tmp/prefixed',
        cssmined: 'tmp/cssmined',

        vendors: 'bower_components'
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        less: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src_css %>',
                    src: '**/*.less',
                    dest: '<%= config.lessed %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
            // ,
            // serve:{
            //  files:[{
            //      expand: true,
            //      cwd: '<%= config.src %>/css/',
            //      src: '**/*.less',
            //      dest: '<%= config.tmp %>/css/',
            //      ext: '.css',
            //      extDot: 'last'
            //  }]
            // }
        },
        autoprefixer: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= config.lessed %>/',
                    src: '**/*.css',
                    dest: '<%= config.dist_css %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            serve: {
                files: [{
                    expand: true,
                    cwd: '<%= config.lessed %>/',
                    src: '**/*.css',
                    dest: '<%= config.prefixed %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.prefixed %>/',
                    src: '**/*.css',
                    dest: '<%= config.dist_css %>/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        jshint: {
            options: {
                eqeqeq: true,
                eqnull: true,
                curly: true,
                undef: true,
                devel: true,
                debug: true,
                node: true,
                browser: true,
                globals: {
                    jQuery: true,
                    nodejs: true,
                }
            },
            sc: {
                src: ['<%= config.src_js %>/**/*.js', 'meadowlark.js']
            },
            gcfg: {
                src: 'Gruntfile.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            targets: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src_js %>/',
                    src: '**/*.js',
                    dest: '<%= config.dist_js %>/',
                    ext: '.js',
                    extDot: 'last'
                }, {
                    expand: true,
                    cwd: './',
                    src: 'meadowlark.js',
                    dest: './',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },
        clean: {
            js: {
                src: '<%= config.dist_js %>/**/*.js'
            },
            css: {
                src: ['<%= config.dist_css %>/**/*.css', '<%= config.cssmined %>/**/*.css', '<%= config.prefixed %>/**/*.css', '<%= config.lessed %>/**/*.css']
            },
            vendors: {
                src: ['<%= config.dist_vendors %>/*', '<%= config.vendors %>/*']
            }
        },
        copy: {
            vendors: {
                files: [{
                    expand: true,
                    cwd: '<%= config.vendors %>',
                    src: ['**/*/dist/**/*'],
                    filter: function(d) {
                        if (d.indexOf('src') > -1) {
                            return false;
                        }
                        return true;
                    },
                    dest: '<%= config.dist_vendors %>/',
                }],

            }
        },
        watch: {
            options: {
                interrupt: false,
                livereload: false,
                reload: false
            },
            gruntconfig: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js'],
                events: 'all',
                tasks: ['jshint:gcfg']
            },
            js: {
                options: {
                    livereload: true,
                    spawn: true
                },
                files: ['<%= config.src_js %>/**/*.js', 'meadowlark.js'],
                tasks: ['newer:jshint', 'newer:uglify']
            },
            vendors: {
                options: {
                    livereload: true,
                    spawn: true
                },
                files: ['<%= config.src_vendors %>/**/dist/*'],
                events: ['add', 'change'],
                tasks: ['copy:vendors']
            },
            css: {
                options: {
                    livereload: true,
                    spawn: true
                },
                files: {
                    src: '<%= config.src_css %>/**/*.less',
                    tasks: ['newer:less:dev', 'newer:autoprefixer:dev']
                }
            }
        }

    });

    grunt.registerTask('dev', ['clean', 'copy:vendors', 'less', 'autoprefixer:dev', 'jshint', 'watch']);
    grunt.registerTask('serve', ['clean', 'copy:vendors', 'less', 'autoprefixer:serve', 'cssmin', 'jshint', 'uglify']);
    grunt.registerTask('default', 'dev');
};
