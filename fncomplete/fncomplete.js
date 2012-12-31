(function($) {
	$.fn.fadeRemove = function(s, fn) {
		return this.fadeOut(s, function() {
			$(this).remove();
			if(fn) fn();
		});
	};
})(jQuery);

$(function() {

	var cont =  $("#fnc_cont");
	var tags =  $(".tags", cont);
	var entry = $(".entry", tags);
	var input = $("input.new_tag", entry);
	var testWidth = $("<div>").addClass("new_tag").hide().appendTo(entry);
	
	var closeClick = function() {
		$(this).parent().fadeRemove(50);
		return false;
	};
	
	var tagClick = function(e) {
		e.stopPropagation();
	};

	var updateWidth = function(e) {
		testWidth.html(input.val().replace(/ /g,"&nbsp;"));
		var width = testWidth.width();
		input.width(width+30);
	};
	
	var makeTag = function(label) {
		tag = $('<div class="tag"><span class="label">'+label+'</span><span class="close"></span></div>');
		tag.click(tagClick);
		$(".close", tag).click(closeClick);
		entry.before(tag);
	};
	
	updateWidth();
	input.keypress(updateWidth).keyup(updateWidth);
	
	input.keypress(function(e) {
		var el = $(this);
		var k = e.which;
		var v = $.trim(el.val());
		v = $.trim(v);
		if(k == 32 && v.length == 0 ) return false;
		if(k == 13 || k == 44 || k == 9) {
			if(v.length > 0) {
				makeTag(input.val());
				input.val("");
			}
			return false;
		} else {
			return true;
		}
	});
	
	input.keydown(function(e) {
		var el = $(this);
		var k = e.which;
		if(k == 8) {
			if(el.val().length == 0) {
				el.parent().prev().fadeRemove(50);
				return false;
			} else {
				return true;
			}
		} else if(k == 46) {
			if(el.val().length == 0) {
				var next = entry.next();
				if(input.val() == "" && !next.hasClass("clear")) {
					next.fadeRemove(50);
				}
				return false;
			} else {
				return true;
			}
		} else if(k == 37 && input.val() == "") {
			entry.insertBefore(entry.prev());
			$("input",entry).focus();
		} else if(k == 39) {
			var next = entry.next();
			if(input.val() == "" && !next.hasClass("clear")) {
				entry.insertAfter(entry.next());
				input.focus();
			}
		}
	});
	
	input.blur(function() {
		input.val("");
		entry.insertAfter($(".tag:last", tags));
		$(".selected", tags).removeClass("selected");
		selected = null;
	});
	
	cont.click(function(e) {
		input.focus();
	});
	
	$(".close", cont).click(closeClick);
	
	$("#fnc_cont .tag").click(tagClick);
	
});