// 初始化公共方法（所有的公共方法都在此命名下）
var CF = { 
	// 获取表格可用高底
	getHeight : function () {
        return $(window).height() - $('.navbar').outerHeight(true) - 75 - $('.searchArea').outerHeight(true);
    },
    // 当窗口尺寸改变时，重绘表格
    resize: function($table) { 
    	$(window).resize(function () {
	        $table.bootstrapTable('resetView', {
	            height: CF.getHeight()
	        });
	    });
    },
    //设置content的高
    setContentHeight: function() { 
    	$('#content').height($(window).height() - 80);
    	$(window).resize(function () {
	        $('#content').height($(window).height() - 80);
	    });
    }
};