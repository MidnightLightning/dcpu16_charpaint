$(document).ready(function() {
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
				console.log("painting off");
				$svg.data('paint', 'off');
				$rect.attr('class', '');
				$('span#b'+$rect.attr('id')).html('0');
			} else {
				console.log("painting on");
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
	function rectToHex(object) {
		var high = parseInt(object.substr(0,1));
		var low = parseInt(object.substr(1,1));
		if (high == 1) {
			if (low <= 4) {
				return '11';
			} else {
				return '12';
			}
		} else if (high == 2) {
			if (low <= 4) {
				return '13';
			} else {
				return '14';
			}
		} else if (high == 3) {
			if (low <= 4) {
				return '21';
			} else {
				return '22';
			}
		} else if (high == 4) {
			if (low <= 4) {
				return '23';
			} else {
				return '24';
			}
		}
		return false;
	}
	function recalcHex() {
		var $bins = $('span.code span[id^="b"]');
		var hex = parseInt($bins.filter('#b11').html())*8 + parseInt($bins.filter('#b12').html())*4 + parseInt($bins.filter('#b13').html())*2 + parseInt($bins.filter('#b14').html());
		$('span#h11').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b15').html())*8 + parseInt($bins.filter('#b16').html())*4 + parseInt($bins.filter('#b17').html())*2 + parseInt($bins.filter('#b18').html());
		$('span#h12').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b21').html())*8 + parseInt($bins.filter('#b22').html())*4 + parseInt($bins.filter('#b23').html())*2 + parseInt($bins.filter('#b24').html());
		$('span#h13').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b25').html())*8 + parseInt($bins.filter('#b26').html())*4 + parseInt($bins.filter('#b27').html())*2 + parseInt($bins.filter('#b28').html());
		$('span#h14').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b31').html())*8 + parseInt($bins.filter('#b32').html())*4 + parseInt($bins.filter('#b33').html())*2 + parseInt($bins.filter('#b34').html());
		$('span#h21').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b35').html())*8 + parseInt($bins.filter('#b36').html())*4 + parseInt($bins.filter('#b37').html())*2 + parseInt($bins.filter('#b38').html());
		$('span#h22').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b41').html())*8 + parseInt($bins.filter('#b42').html())*4 + parseInt($bins.filter('#b43').html())*2 + parseInt($bins.filter('#b44').html());
		$('span#h23').html(hex.toString(16));
		var hex = parseInt($bins.filter('#b45').html())*8 + parseInt($bins.filter('#b46').html())*4 + parseInt($bins.filter('#b47').html())*2 + parseInt($bins.filter('#b48').html());
		$('span#h24').html(hex.toString(16));
		console.log($bins);
	}
});