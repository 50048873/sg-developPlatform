var webpack = require('webpack')
module.exports = { 
	//档案起始点从entry进入，因为是陈列，所以也可以是多个档案
	entry: [
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
	// output 产生的结果的相关参数
	output: { 
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	//devServer是webpack-dev-server设定
	devServer: { 
		port: 3007,
		inline: true
	}
}