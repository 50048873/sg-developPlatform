'use strict';

module.exports = function (grunt) { 
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({ 
		pkg: grunt.file.readJSON('package.json'),

		uglify: { 
			options: { 
				mangle: true,	//安全压缩，不压缩参数变量
				compress: { 
					drop_console: true //去掉js中的console.*语句
				}
			},
			dist: { 
				src: [ 
						'dist/js/built.js'
					],
		    	dest: 'dist/js/built.min.js',
			}
		},

		concat: {
			options: {
		    	stripBanners: { 
					block: true,
					line: true
				},
				banner: '/* <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },
		    js: {
			    options: {
			    	separator: ';\n'
			    },
		    	src: [ 
						'./js/screenWidth.js',
						'./vendor/jquery/dist/jquery.min.js',
						'./vendor/bootstrap/dist/js/bootstrap.min.js',
						'./vendor/bootstrap-table/dist/bootstrap-table.min.js',
						'./vendor/bootstrap-table/dist/locale/bootstrap-table-zh-CN.js',
						'./vendor/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js',
						'./vendor/bootstrap-table/dist/extensions/export/tableExport.js',
						'./vendor/bootstrap3-dialog/dist/js/bootstrap-dialog.js',
						'./vendor/easybootstrap/js/jquery.parser.js',
						'./vendor/easybootstrap/js/jquery.navAside.js',
						'./vendor/q/q.js',
						'./js/commonFn.js',
						'./js/index.js',
						'./js/route.js',
						'./module/systemManage/userManage/userManage.js'
					],
		    	dest: 'dist/js/built.js',
		    }
		  },

		clean: { 
			dist: ['dist']
		}
	});

	//grunt.registerTask('watch', ['watch']);
	grunt.registerTask('build', ['clean', 'concat', 'uglify']);

	grunt.registerTask('default', ['build']);
};