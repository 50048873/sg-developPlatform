$(function() { 
	var $content = $('#content');
	/* 注册 userManage URL 无期待参数 */
	Q.reg('userManage',function(){
		$.ajax({ 
			url: 'module/systemManage/userManage/userManage.html'
		}).done(function(data) { 
			$content.html(data);
			window.modules.userManage();
		}).fail(function() { 
			console.log(arguments)
		});
	});

	/* 注册 roleManage URL 在回调里期待接收两个参数*/
	Q.reg('roleManage',function(str1,str2){
		console.log(str1,str2)
		$content.html('roleManage');
	})

	/* 注册其它情况 */
	Q.reg('otherwise',function(){
		alert('没有匹配的路由，确定返回用户管理页',arguments)
		Q.go('userManage');
		$('#navAside').navAside('select', $('#_easyBootstrap_navAside_41')[0]);
	})

	/* 启动函数 */
	Q.init({
		//key:'!',/* url里#和url名之间的分割符号 默认为感叹号 */
		index:'userManage',/* 首页地址 如果访问到不能访问页面也会跳回此页 */
		pop:function(L,arg){/* 每次有url变更时都会触发pop回调 */
			console.log('pop 当前参数是:',arguments);
		}
	});
});