$(function() {
	// 初始化侧边栏导航
	$('#navAside').navAside({ 
		url: 'vendor/easybootstrap/json/navAside.json'
		//data: navAsideDatas
	});

	// 初始化模块对象（所有的模块函数都在此命名下）
	window.modules = { };

	// 移动端
	if (window.SIZE === 'S') { 
		// 点击切换左侧导航菜单
		$(document).on('click', '#asideWrap-toggle1', function() { 
			$('#aside-wrap').toggleClass('screen-left-in');
		});
	// pc端点
	} else { 
		// 点击切换左侧导航菜单
		$(document).on('click', '#asideWrap-toggle2', function() { 
			var width = $('#aside-wrap').width();
			if (width > 40) { 
				$('#aside-wrap').animate({ 
					width: '40px'
				}, 200);
				$('#content').animate({ 
					marginLeft: '55px'
				}, 200);
			} else { 
				$('#aside-wrap').animate({ 
					width: '200px'
				}, 200);
				$('#content').animate({ 
					marginLeft: '215px'
				}, 200);
			}
		});
	}
});