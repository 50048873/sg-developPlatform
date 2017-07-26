// 扩展easyui
$.parser.plugins.push('navAside');

$(function() {
	// 初始化模块对象（所有的模块函数都在此命名下）
	window.modules = { };

	var moduleName;

	// 初始化侧边栏导航
	$('#navAside').navAside({ 
		url: 'vendor/easybootstrap/json/navAside.json',
		onClick: function(node) { 
			var url, attributes = node.attributes;
			if (attributes) { 
				url = attributes.url;
				moduleName = attributes.moduleName;
			}

			if (url) { 
				if ($('#tabs').tabs('exists', node.text)) { 
					$('#tabs').tabs('select', node.text)
				} else { 

					$('#tabs').tabs('add', { 
						title: node.text,
						closable: true,
						href: url
					});
				}
			} else { 
				if (node.iconCls) return;
				if ($('#tabs').tabs('exists', node.text)) { 
					$('#tabs').tabs('select', node.text)
				} else { 
					$('#tabs').tabs('add', { 
						title: node.text,
						closable: true,
						content: '<div class="pd-trl"><div id="organizeManageTable">' + node.text + '</div></div>'
					});
				}
			}
		}
	});

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

	//设置content的高
	CF.setContentHeight();

	$('#tabs').tabs({  
	    border:false,    
	    fit: true,
		onLoad: function(panel) { 
			moduleName && window.modules[moduleName] && window.modules[moduleName]();
		}
	});  

	$('#tabs').tabs('add',{    
	    title:'首页',    
	    href:'module/welcome/welcome.html',    
	    closable:true
	});

	$(window).resize(function () {
       $('#tabs').tabs('resize');
    });
});