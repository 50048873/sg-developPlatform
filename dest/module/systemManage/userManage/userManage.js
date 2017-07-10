$(function() {
	window.modules.userManage = function() { 
		var $table = $('#table'),
			$remove = $('#remove');

		// 表格功能操作按钮html
		function operateFormatter(value, row, index) {
	        return [
	            '<a class="lock" href="javascript:void(0)" title="锁定用户">',
	            	'<i class="glyphicon glyphicon-lock"></i>',
	            '</a> ',
	            '<a class="unlock" href="javascript:void(0)" title="激活用户">',
	            	'<i class="glyphicon glyphicon-user"></i>',
	            '</a> ',
	            '<a class="edit" href="javascript:void(0)" title="用户编辑">',
	            	'<i class="glyphicon glyphicon-edit"></i>',
	            '</a> ',
	            '<a class="remove confirmation-callback" href="#" title="删除此行">',
	            	'<i class="glyphicon glyphicon-remove"></i>',
	            '</a>'
	        ].join('');
	    }

	    // 表格功能操作按钮html绑定的事件
	    var operateEvents = {
	        'click .lock': function (e, value, row, index) {
	        	BootstrapDialog.confirm({
		            title: '确认',
		            message: '确定锁定用户吗？',
		            //type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
		            closable: true,
		            draggable: true,
		            btnCancelLabel: '取消', 
		            btnOKLabel: '确定', 
		            callback: function(result) {
		                if(result) {
		                    alert('You click like lock, row: ' + JSON.stringify(row));
		                }
		            }
		        });
	        },
	        'click .unlock': function (e, value, row, index) {
	        	BootstrapDialog.confirm({
		            title: '确认',
		            message: '确定激活用户吗？',
		            closable: true,
		            draggable: true,
		            btnCancelLabel: '取消', 
		            btnOKLabel: '确定', 
		            callback: function(result) {
		                if(result) {
		                    alert('You click like unlock, row: ' + JSON.stringify(row));
		                }
		            }
		        });
	        },
	        'click .edit': function (e, value, row, index) {
	            $('#userManageModal').modal('show');
	        },
	        //删除此行
	        'click .remove': function (e, value, row, index) {
	        	BootstrapDialog.confirm({
		            title: '确认',
		            message: '确定要删除吗？',
		            closable: true,
		            draggable: true,
		            btnCancelLabel: '取消', 
		            btnOKLabel: '确定', 
		            callback: function(result) {
		                if(result) {
		                    $table.bootstrapTable('remove', {
				                field: 'id',
				                values: [row.id]
				            });
		                }
		            }
		        });
		        /*
	        	BootstrapDialog.show({
		            title: '删除确认',
		            message: '确定要删除吗？',
		            draggable: true,
		            buttons: [{
		                label: '取消',
		                action: function(dialog) {
				            dialog.close();
		                }
		            }, {
		                label: '确定',
		                action: function(dialog) {
		                    $table.bootstrapTable('remove', {
				                field: 'id',
				                values: [row.id]
				            });
				            dialog.close();
		                }
		            }]
		        });

	        	$('#userManageModal').modal('show');
	        	$(document).on('click', '#confirm', function() { 
	        		$table.bootstrapTable('remove', {
		                field: 'id',
		                values: [row.id]
		            });
	        		$('#userManageModal').modal('hide');
	        	});
				*/
	        }
	    };

	    //初始化表格
		$table.bootstrapTable({
			url: "json/data1.json",
			//data: userManageDatas,
			height: CF.getHeight(),
			responseHandler: function(res) { 
				for (var i = 0; i < res.length; i++) { 
					var userOrgList = res[i].userOrgList;
					if (userOrgList && userOrgList.length) { 
						for (var j = 0; j < userOrgList.length; j++) { 
							var tsDepart = userOrgList[j].tsDepart;
							if (tsDepart && tsDepart.departname) { 
								res[i].departname = tsDepart.departname;
							}
						}
					}
				}
				return res;
			},
		    columns: [{
		        field: 'state',
		        //radio: true //单选
		        checkbox: true //单选或多选
		    },{
		        field: 'id',
		        title: 'Item ID',
		        sortable: true
		    }, {
		        field: 'name',
		        title: 'Item Name',
		        sortable: true
		    }, {
		        field: 'price',
		        title: 'Item price',
		        sortable: true
		    }, {
	            field: 'operate',
	            title: 'Item Operate',
	            align: 'center',
	            formatter: operateFormatter,
	            events: operateEvents
	        }],
		    pagination: true,
		    pageList: [10, 25, 50, 100, 'ALL'],
		    //search: true, //搜索框
		    showColumns: true, //内容列下拉框
		    showRefresh: true,
		    //showToggle: true, //切换试图（table/card）按钮 
		    //showPaginationSwitch: true, //分页显示隐藏
		    toolbar: '#toolbar',
		    rowStyle: function(row,index) { 
		        if (index % 2 === 0) {
		            return {
		                /*css: { 
		                	'background-color': '#f8fcfd'
		                }*/
		                classes: 'oddrow'
		            };
		        }
		        return {};
		    },
		    //clickToSelect: true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		    //singleSelect: true, // 设置True 将禁止多选
		    sortName: 'id',
		    sortOrder: 'asc'
		});
	
		//批量删除
		$remove.click(function () {
	        var ids = getIdSelections();
	        $table.bootstrapTable('remove', {
	            field: 'id',
	            values: ids
	        });
	        $remove.prop('disabled', true);
	    });

		// 监听选中、取消复选框事件
	    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
	        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

	        // save your data, here just save the current page
	        selections = getIdSelections();
	        // push or splice the selections if you want to save all data selections
	    });

	    //获取选中行的id
	    function getIdSelections() {
	        return $.map($table.bootstrapTable('getSelections'), function (row) {
	            return row.id
	        });
	    }

	    //当窗口尺寸改变时，重绘表格
	    CF.resize($table);
    }
});