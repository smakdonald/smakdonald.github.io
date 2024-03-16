function loadMenu() {
	// Fetch HTML content from text file
	$.get("menu.txt", function(data) {
		// Insert the content into the designated div
		$("#menu").html(data);

		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		$menu_openers.each(function() {
			var $this = $(this);
			$this.on('click', function(event) {
				// Prevent default.
					event.preventDefault();
				// Toggle.
					$menu_openers.not($this).removeClass('active');
					$this.toggleClass('active');
				// Trigger resize (sidebar lock).
					$window.triggerHandler('resize.sidebar-lock');
			});
		});
	});
});
