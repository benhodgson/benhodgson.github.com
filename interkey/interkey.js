var delays = [];
$(function() {
	var last = 0;
	
	var i = 0;
	
	var ic = $("#interkey").keypress(function() {
		var now = (new Date).getTime();
		delays[i] = now - last;
		last = now;
		i++;
	});
	
	$("#done").click(function() {
		var j;
		var dump = "[";
		
		for(j=1; j<delays.length; j++) {
			dump += delays[j]+",";
		}
		dump += "]";
		
		delays=[]; i=0;
		
		ic.val(dump);
	});
});