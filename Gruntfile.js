'use strict';

module.exports = function (grunt) { 
	// 智能加载grunt任务插件
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({ 
		pkg: grunt.file.readJSON('package.json'),

		// 清除dest目录
		clean: { 
			dest: ['dest']
		},

		// 拷贝开发文件到布署文件
		copy: { 
			index: { 
				options: { 
					process: function (content, srcpath) {
			    		return content
			    				.replace(/<link[\s\S]*.css">/g, '<link type="text/css" rel="stylesheet" href="css/built.min.css">')
			    				.replace(/<script[\s\S]*><\/script>/g, '<script src="js/built.min.js"></script>');
			    	}
				},
				files: [ 
					{src: 'index.html', dest: 'dest/'}
				]
			},
			others: { 
				files: [ 
					{src: ['module/**'], dest: 'dest/', expand: true},
					{src: ['json/**'], dest: 'dest/'},
					{src: ['img/**'], dest: 'dest/'},
					{src: ['vendor/bootstrap/dist/fonts/**'], dest: 'dest/fonts', expand: true, flatten: true, filter: 'isFile'},
					{src: ['vendor/easybootstrap/json/*.json'], dest: 'dest/'}
				]
			}
		},

		// 合并文件
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
		    	dest: 'dest/js/built.js',
		    },
		    css: {
		      src: [
					'./vendor/bootstrap/dist/css/bootstrap.min.css', 
					'./vendor/bootstrap-table/dist/bootstrap-table.min.css',
					'./vendor/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css',
					'./vendor/easybootstrap/css/navAside.css',
					'./css/developPlatform.css'
				],
		      dest: 'dest/css/built.css',
		    }
		},


		// 压缩css
		cssmin: { 
			dest: { 
				src: 'dest/css/built.css',
				dest: 'dest/css/built.min.css'
			}
		},

		// 压缩js
		uglify: { 
			options: { 
				mangle: true,	//安全压缩，不压缩参数变量
				compress: { 
					drop_console: true //去掉js中的console.*语句
				}
			},
			dest: { 
				src: [ 
						'dest/js/built.js'
					],
		    	dest: 'dest/js/built.min.js',
			}
		},

		// 连接一个本地的静态服务器
		connect: {
			options: {
				port: 9000,
				hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
				livereload: 35729  //声明给 watch 监听的端口
			},

			server: {
				options: {
					open: true, //自动打开网页 http://
					base: [
						'dest'  //主目录
					]
				}
			}
		},

		// 监听指定的目录
		watch: {
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
				},

				files: [  //下面文件的改变就会实时刷新网页
					'dest/*.html',
					'dest/css/{,*/}*.css',
					'dest/js/{,*/}*.js',
					'dest/img/{,*/}*.{png,jpg}'
				]
			}
		}
	});

	grunt.registerTask('serve', [
		'connect:server',
		'watch'
	]);

	grunt.registerTask('build', ['clean', 'concat', 'cssmin', 'uglify','copy']);
};