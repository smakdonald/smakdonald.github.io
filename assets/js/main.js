/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	settings = {		
		carousels: {						// Carousels
			speed: 4,
			fadeIn: true,
			fadeDelay: 250
		},};
	
	breakpoints({							// Breakpoints.
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ],
		'xlarge-to-max':    '(min-width: 1681px)',
		'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
	});

	// Stops animations/transitions until the page has ...
		$window.on('load', function() {				// ... loaded.
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});
			var resizeTimeout;						// ... stopped resizing.
			$window.on('resize', function() {			// Mark as resizing.
				$body.addClass('is-resizing');
				clearTimeout(resizeTimeout);			// Unmark after delay.
				resizeTimeout = setTimeout(function() {
					$body.removeClass('is-resizing');
				}, 100);
			});
	// Fixes.
		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {
					var $this = $(this),
						$img = $this.children('img');
					// Hide original image.
						$img.css('opacity', '0');
					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');
				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');
		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});
			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});
		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);
		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {
					// Prevent default.
						event.preventDefault();
						event.stopPropagation();
					// Toggle.
						$sidebar.toggleClass('inactive');
				});

		// Events.
			// Link clicks.
				$sidebar.on('click', 'a', function(event) {
						if (breakpoints.active('>large'))			// >large? Bail.
							return;
						var $a = $(this),							// Vars.
							href = $a.attr('href'),
							target = $a.attr('target');
						event.preventDefault();						// Prevent default.
						event.stopPropagation();
						if (!href || href == '#' || href == '')		// Check URL.
							return;
						$sidebar.addClass('inactive');				// Hide sidebar.
						setTimeout(function() {						// Redirect to href.
							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;
						}, 500);
				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {
					// >large? Bail.
						if (breakpoints.active('>large'))
							return;
					// Prevent propagation.
						event.stopPropagation();
				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {
					// >large? Bail.
						if (breakpoints.active('>large'))
							return;
					// Deactivate.
						$sidebar.addClass('inactive');
				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {
				var sh, wh, st;
				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);
				$window
					.on('scroll.sidebar-lock', function() {
						var x, y;
						// <=large? Bail.
							if (breakpoints.active('<=large')) {
								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');
								return;
							}
						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);
						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {
								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);
							}
							else {
								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);
							}
					})
					.on('resize.sidebar-lock', function() {
						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;
						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');
					})
					.trigger('resize.sidebar-lock');
				});
	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');
		// Openers.
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

	// Carousels.
		$('.carousel').each(function() {
			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');
			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;
			// Items.
				if (settings.carousels.fadeIn) {
					$items.addClass('loading');
					
					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {
							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);
							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();
								if (x.length <= limit) {
									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;
								}
								xf.removeClass('loading');
							}, settings.carousels.fadeDelay);
						}
					});
				}
				
			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};
				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };
			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;
							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}
							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});
			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;
							if (pos >= leftLimit) {
								window.clearInterval(timerId);
								pos = leftLimit;
							}
							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});
			// Init.
				$window.on('load', function() {
					reelWidth = $reel[0].scrollWidth;
					if (browser.mobile) {
						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();
					}
					else {
						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();
					}
					$t._update();
					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');
				});
		});

})(jQuery);

$(document).ready(function() {
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
