$(function() {
	$('#login').click(function(e) { 
		e.preventDefault();
		var fatherWin = window.parent;
		var fatherDoc = fatherWin.document;
		var $fatherIframe = $('#fatherIframe', fatherDoc);
		$fatherIframe.attr('src', 'main.html');
		//console.log(fatherWin.father)
	});
});