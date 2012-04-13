$(document).ready(function() {
	$('svg#charmap rect')
		.css('cursor', 'pointer')
		.on('mouseover', function(e) {
			$('span#b'+this.id).addClass('highlight');
			$('span#h'+rectToHex(this.id)).addClass('highlight');
			
			// See if we're painting
			var $rect = $(this);
			var $svg = $rect.parent();
			console.log($rect, $svg.data('painting'));
			if ($svg.data('painting') == true) {
				if ($svg.data('paint') == 'on') {
					$rect.attr('class', 'on');
				} else {
					$rect.attr('class', '');
				}
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
			} else {
				console.log("painting on");
				$svg.data('paint', 'on');
				$rect.attr('class', 'on');
			}
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
});