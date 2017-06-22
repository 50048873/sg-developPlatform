

(function($){
	function create(target){
		var state = $.data(target, 'navAside');
		$(target).addClass('navAside');
		$(target).html(createLis(state.options));
		return $(target);
	}

	function createLis(options) { 
		var data = options.data;
		if (data.length) { 
			var len = data.length,
				arr = [];
			for (var i = 0; i < len; i++) { 
				var d = data[i];
				arr.push('<li>');
				arr.push(
							'<a>' +
								'<i class="' + d.iconCls + '"></i>' + 
								'<span>' + d.text + '</span>' +
								'<i class="pull-right ' + (d.children ? options.collapsibleIcon : '') + '"></i>' + 
							'</a>'
						);
					(function fn(d) { 
						var child = d.children;
						if (child) { 
							var jlen = child.length;
							arr.push('<ul>')
							for (var j = 0; j < jlen; j++) { 
								arr.push('<li>');
								if (child[j].children) { 
									arr.push(
												'<a>' +
													'<i class="' + d.iconCls + '"></i>' + 
													'<span>' + d.text + '</span>' +
													'<i class="pull-right ' + options.collapsibleIcon + '"></i>' + 
												'</a>'
											);
									fn(child[j]);
								} else { 
									arr.push('<a>' + child[j].text + '</a>');
								}
								arr.push('</li>');
							}
							arr.push('</ul>');
						}
					})(d);
				arr.push('</li>');
			}
			return arr.join(' ');
		}
	}

	function toggleNav(options) { 
		$(document).on('click', '.navAside li a', function(e) { 
			e.preventDefault();
			var $ul = $(this).siblings('ul');
			if (!$ul.length) return; 
			$ul.slideToggle();
			$(this).children().last().toggleClass(options.collapsibleIcon + ' ' +  options.expandIcon);
		});
	}

	$.fn.navAside = function(options, param){
		//如果第一个参数是字符串，说明用户在调用progressbar原型上的方法
		if (typeof options == 'string'){
			console.log('调用方法分支');
			return;
		}
		
		options = options || {};
		return this.each(function(){
			/*
			 * 获取当前元素上键值为'navAside'的缓存对象
			 * state对象最终保存了合并后的参数options，和初始化后的组件jq元素
			*/
			var state = $.data(this, 'navAside');
			if (state){
				//如果当前元素上有缓存参数对象，把用户传参options合并到state上的options
				$.extend(state.options, options);
			} else {
				//如果没有缓存，则在当前元素上设置键为'navAside'，值为一个新对象，并返回结果
				state = $.data(this, 'navAside', {
					/*
						*键名options为合并后的参数
						*第2个参数$.fn.navAside.defaults为组件默认参数
						*第3个参数$.fn.navAside.parseOptions(this)的返回值为用户在元素上定义的参数
						*第4个参数options为用户js调用时传入的对象参数
						*第4个参数覆盖第3个参数同名属性值，第3个参数覆盖第2个参数同名属性值
					*/
					options: $.extend({}, $.fn.navAside.defaults, $.fn.navAside.parseOptions(this), options)
				});
			}
			create(this);
			toggleNav(state.options);
		});
	};
	
	$.fn.navAside.methods = {
		options: function(jq){
			
		}
	};
	
	$.fn.navAside.parseOptions = function(target){
			/*
			　* $.ebParser.parseOptions(target)没有传第2个参数properties，是禁用了非data-options的传参形式
			*/
		var obj = $.extend({}, $.ebParser.parseOptions(target));
		return obj;
	};
	
	$.fn.navAside.defaults = {
		url: null,
		method: 'post',
		animate: false,
		data: null,
		collapsibleIcon: 'glyphicon glyphicon-plus',
		expandIcon: 'glyphicon glyphicon-minus',
		formatter: function(node) { //定义如何渲染节点的文本
		},
		loader: function(param,success,error) { //定义如何从远程服务器加载数据
		}
	};
})(jQuery);
