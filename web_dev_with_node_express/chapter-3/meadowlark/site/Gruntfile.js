module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: {
        	pkg: grunt.file.readJSON('package.json'),
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
        },
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
            // 	files:[{
            // 		expand: true,
            // 		cwd: '<%= config.src %>/css/',
            // 		src: '**/*.less',
            // 		dest: '<%= config.tmp %>/css/',
            // 		ext: '.css',
            // 		extDot: 'last'
            // 	}]
            // }
        },
        autoprefixer: {
        	dev: {
        		files:[{
        			expand: true,
        			cwd: '<%= config.lessed %>/',
        			src: '**/*.css',
        			dest: '<%= config.dist_css %>/',
        			ext: '.css',
        			extDot: 'last'
        		}]
        	},
        	serve: {
        		files:[{
        			expand: true,
        			cwd: '<%= config.lessed %>/',
        			src: '**/*.css',
        			dest: '<%= config.prefixed %>/',
        			ext: '.css',
        			extDot: 'last'
        		}]
        	}
        },
        cssmin:{
        	target: {
        		files:[{
        			expand: true,
        			cwd: '<%= config.prefixed %>/',
        			src: '**/*.css',
        			dest: '<%= config.dist_css %>/',
        			ext: '.css',
        			extDot: 'last'
        		}]
        	}
        },
        jshint:{
        	//TODO
        },
        uglify: {
            options: {
            	banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
            	files: [{
            		expand: true,
            		cwd: '<%= config.src_js %>/',
            		src: '**/*.js',
	            	dest: '<%= config.dist_js %>/',
	            	ext: '.js',
	            	extDot: 'last'
            	}]
            }
        },
        clean:{
        	js:{
        		src: '<%= config.dist_js %>/**/*.js'
        	},
        	css: {
        		src: ['<%= config.dist_css %>/**/*.css', '<%= config.cssmined %>/**/*.css', '<%= config.prefixed %>/**/*.css','<%= config.lessed %>/**/*.css']
        	},
        	vendors: {
        		src:['<%= config.dist_vendors %>/*']
        	}
        },
        copy:{

        },
        watch:{
        	config:{
        		interrupt: false,
        		livereload: false,
        		reload: false
        	},
        	gruntconfig:{
        		config:{
        			reload: true
        		},
        		src: 'Gruntfile.js',
        		events: 'all'
        	},
        	js:{
        		config:{
        			livereload: true,
        			spawn: true
        		},
        		files: [{
        			src: '<%= config.src_js %>',
        			tasks: ['uglify']
        		},{
        			src: '<%= config.src_vendors %>/**/dist/**/*.js',
        			tasks: ['copy:vendors']
        		}]
        	}
        }

    });

    grunt.loadNpmTasks();

    grunt.registerTask('default', 'watch');
};
