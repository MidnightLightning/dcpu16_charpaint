$(document).ready(function() {
	// Handle external links
	$("a[rel*='external']").click(function(event) {
		event.preventDefault(); // Keep from following standard href of link
		new_win = window.open($(this).attr('href'), 'offsite_popup') // Pop up a window to that URL
		if (window.focus) { new_win.focus() } // Give it focus if possible
	});
	
	// Code sample customizations
	$('select#glyphslot').on('change', function(e) {
		var $this = $(this);
		var val = parseInt($this.val());
		var hex = val.toString(16);
		$('span.charslot').html(("00"+hex).substring(hex.length, hex.length+2));
		$('span.slotname').html($this.find('option:selected').text());

		var memloc = 0x8180 + 2*val;
		$('span#charmem1').html(memloc.toString(16));
		$('span#charmem2').html((memloc+1).toString(16));
	});
	$('select#fgcolor').on('change', setColor);
	$('select#bgcolor').on('change', setColor);
	setColor(); // Set to initial state
	
	function setColor() {
		var $fg = $('select#fgcolor');
		var fgnum = parseInt($fg.val());
		var fgname = $fg.find('option:selected').text();
		
		var $bg = $('select#bgcolor')
		var bgnum = parseInt($bg.val());
		var bgname = $bg.find('option:selected').text();
		
		var hex = (fgnum << 4) + bgnum
		$('span#charcol').html(hex.toString(16));
		$('span#fgname').html(fgname);
		$('span#bgname').html(bgname);
	}
	
	
	// Setup events
	$('svg#charmap rect')
		.css('cursor', 'pointer')
		.on('mouseover', function(e) {
			var $bin = $('span#b'+this.id);
			$bin.addClass('highlight');
			$('span#h'+rectToHex(this.id)).addClass('highlight');
			
			// See if we're painting
			var $rect = $(this);
			var $svg = $rect.parent();
			if ($svg.data('painting') == true) {
				if ($svg.data('paint') == 'on') {
					$rect.attr('class', 'on');
					$bin.html('1');
				} else {
					$rect.attr('class', '');
					$bin.html('0');
				}
				recalcHex();
			}
		})
		.on('mouseout', function(e) {
			$('span#b'+this.id).removeClass('highlight');
			$('span#h'+rectToHex(this.id)).removeClass('highlight');
		})
		.on('mousedown', function(e) {
			e.preventDefault();
			var $rect = $(this);
			var $svg = $rect.parent();
			if ($rect.attr('class') == 'on') {
				$svg.data('paint', 'off');
				$rect.attr('class', '');
				$('span#b'+$rect.attr('id')).html('0');
			} else {
				$svg.data('paint', 'on');
				$rect.attr('class', 'on');
				$('span#b'+$rect.attr('id')).html('1');
			}
			recalcHex();
			$svg.data('painting', true);
		})
	$('body').on('mouseup', function(e) { // Capture mouseup anywhere on the body
		$('svg#charmap').data('painting', false);
	});
	
	// See if there's a valid charcode in the hash string
	if (window.location.hash && window.location.hash.length == 9) {
		loadHash(window.location.hash.substr(1));
	}
	if (Modernizr.hashchange) {
		$(window).on('hashchange', function(e) {
			if (window.location.hash && window.location.hash.length == 9) {
				loadHash(window.location.hash.substr(1));
			}
		});
	}
	
	function loadHash(hash) {
		var $bins = $('span.code span[id^="b"]');
		$bins.each(function(i) {
			$(this).html('0');
		});
		var $rects = $('svg rect');
		$rects.each(function(i) {
			$(this).attr('class', '');
		});

		var i = 0;
		var hex = 0;
		while (i <= 7) {
			hex = parseInt(hash.substr(i,1), 16);
			n = i/2+1;
			if ((hex & 8) > 0) {
				$bins.filter('#b'+n+'1').html('1');
				$rects.filter('#'+n+'1').attr('class', 'on');
			}
			if ((hex & 4) != 0) {
				$bins.filter('#b'+n+'2').html('1');
				$rects.filter('#'+n+'2').attr('class', 'on');
			}
			if ((hex & 2) != 0) {
				$bins.filter('#b'+n+'3').html('1');
				$rects.filter('#'+n+'3').attr('class', 'on');
			}
			if ((hex & 1) != 0) {
				$bins.filter('#b'+n+'4').html('1');
				$rects.filter('#'+n+'4').attr('class', 'on');
			}
			i++;
			
			hex = parseInt(hash.substr(i,1), 16);
			if ((hex & 8) != 0) {
				$bins.filter('#b'+n+'5').html('1');
				$rects.filter('#'+n+'5').attr('class', 'on');
			}
			if ((hex & 4) != 0) {
				$bins.filter('#b'+n+'6').html('1');
				$rects.filter('#'+n+'6').attr('class', 'on');
			}
			if ((hex & 2) != 0) {
				$bins.filter('#b'+n+'7').html('1');
				$rects.filter('#'+n+'7').attr('class', 'on');
			}
			if ((hex & 1) != 0) {
				$bins.filter('#b'+n+'8').html('1');
				$rects.filter('#'+n+'8').attr('class', 'on');
			}
			i++;
		}
		recalcHex();
	}
	
	// Utility functions
	function rectToHex(object) {
		var high = parseInt(object.substr(0,1));
		var low = parseInt(object.substr(1,1));
		if (parseInt(object.substr(1,1)) <= 4) {
			var low = '1';
		} else {
			var low = '2';
		}
		
		if (high == 1) {
			return '1'+low;
		} else if (high == 2) {
			return '2'+low;
		} else if (high == 3) {
			return '3'+low;
		} else if (high == 4) {
			return '4'+low;
		}
		
		return false;
	}
	
	function recalcHex() {
		var $bins = $('span.code span[id^="b"]');
		var hash = '';
		
		for (var i=1; i<=4; i++) {
			var hex = parseInt($bins.filter('#b'+i+'1').html())*8 + parseInt($bins.filter('#b'+i+'2').html())*4 + parseInt($bins.filter('#b'+i+'3').html())*2 + parseInt($bins.filter('#b'+i+'4').html());
			$('span#h'+i+'1').html(hex.toString(16));
			hash += hex.toString(16);
		
			var hex = parseInt($bins.filter('#b'+i+'5').html())*8 + parseInt($bins.filter('#b'+i+'6').html())*4 + parseInt($bins.filter('#b'+i+'7').html())*2 + parseInt($bins.filter('#b'+i+'8').html());
			$('span#h'+i+'2').html(hex.toString(16));
			hash += hex.toString(16);
		}
		
		$('span#code1').html(hash.substr(0,4));
		$('span#code2').html(hash.substr(4,4));
		window.location.hash = hash;
		$('span#share_link').html(window.location.href);
	}
});