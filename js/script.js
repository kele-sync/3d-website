$(document).ready(function (a) {
	var D = a(window);
	var b = a(".iso-call");
	var c = a(".filter");
	try {
		b.imagesLoaded(function () {
			b.trigger("resize");
			b.isotope({
				filter: "*",
				layoutMode: "masonry",
				animationOptions: {
					duration: 750,
					easing: "linear"
				}
			});
			setTimeout(Resize, 1500)
		})
	} catch (g) { }
	D.on("resize", function () {
		var F = c.find("a.active").attr("data-filter");
		try {
			b.isotope({
				filter: F,
				animationOptions: {
					duration: 750,
					easing: "linear",
					queue: false,
				}
			})
		} catch (E) { }
		return false
	});
	c.find("a").on("click", function () {
		var F = a(this).attr("data-filter");
		try {
			b.isotope({
				filter: F,
				animationOptions: {
					duration: 750,
					easing: "linear",
					queue: false,
				}
			})
		} catch (E) { }
		return false
	});
	var j = a(".filter li a");
	j.on("click", function () {
		var E = a(this);
		if (!E.hasClass("active")) {
			j.removeClass("active");
			E.addClass("active")
		}
	});
	var n, B = a(".navigation-menu-list"), q = B.find("a"), x = q.map(function () {
		var E = a(a(this).attr("href"));
		if (E.length) {
			return E
		}
	});
	a(".single-occ-list ul li a").on("click", function (E) {
		E.preventDefault();
		var F = a(this).attr("href")
			, G = F === "#" ? 0 : a(F).offset().top + 1;
		a("html, body").stop().animate({
			scrollTop: G
		}, 500)
	});
	a(window).scroll(function () {
		var F = a(this).scrollTop() + 10;
		var E = x.map(function () {
			if (a(this).offset().top < F) {
				return this
			}
		});
		E = E[E.length - 1];
		var G = E && E.length ? E[0].id : "";
		if (n !== G) {
			n = G;
			q.parent().removeClass("active").end().filter("[href='#" + G + "']").parent().addClass("active")
		}
	});
	var r = a("a.open-menu-toggle")
		, l = a("header");
	r.on("click", function (E) {
		E.preventDefault();
		a(this).toggleClass("active");
		l.toggleClass("showed")
	});
	a(".menu-item-has-children > a").on("click", function (F) {
		F.preventDefault();
		var E = a(this);
		if (!E.hasClass("opened")) {
			a(".menu-item-has-children a.opened").next("ul.sub-menu").slideUp();
			a(".menu-item-has-children a.opened").removeClass("opened");
			E.next("ul.sub-menu").slideDown();
			E.addClass("opened")
		} else {
			E.next("ul.sub-menu").slideUp();
			E.removeClass("opened")
		}
	});
	var C = a("ul.unique-list li h4 a")
		, w = a("a.prev-active")
		, t = a("a.next-active");
	C.on("click", function (E) {
		E.preventDefault();
		var F = a(this).closest("li");
		if (!F.hasClass("active")) {
			a("ul.unique-list li.active").removeClass("active");
			F.addClass("active")
		}
	});
	w.on("click", function (F) {
		F.preventDefault();
		var E = a("ul.unique-list li.active");
		if (E.index() > 0) {
			E.removeClass("active");
			E.prev().addClass("active")
		} else {
			E.removeClass("active");
			a("ul.unique-list li:last-child").addClass("active")
		}
	});
	t.on("click", function (F) {
		F.preventDefault();
		var E = a("ul.unique-list li.active")
			, G = a("ul.unique-list li:last-child").index();
		if (E.index() < G) {
			E.removeClass("active");
			E.next().addClass("active")
		} else {
			E.removeClass("active");
			a("ul.unique-list li:first-child").addClass("active")
		}
	});
	a(".zoom").magnificPopup({
		type: "image",
		gallery: {
			enabled: true
		}
	});
	a(".statistic-post").appear(function () {
		a(".timer").countTo({
			speed: 4000,
			refreshInterval: 60,
			formatter: function (F, E) {
				return F.toFixed(E.decimals)
			}
		})
	});
	var v = a(".owl-wrapper, .owl-scroller");
	if (v.length > 0) {
		if (jQuery().owlCarousel) {
			v.each(function () {
				var E = a(this).find(".owl-carousel"), F = a(this).find(".owl-carousel").attr("data-num"), G, H;
				if (F == 1) {
					G = 1;
					H = 1
				} else {
					if (F == 2) {
						G = 1;
						H = F - 1
					} else {
						if (F > 3) {
							G = F - 2;
							H = F - 3
						} else {
							G = F - 1;
							H = F - 2
						}
					}
				}
				E.owlCarousel({
					autoPlay: 10000,
					navigation: true,
					loop: true,
					nav: true,
					responsive: {
						0: {
							items: H
						},
						768: {
							items: G
						},
						960: {
							items: G
						},
						1200: {
							items: F
						}
					}
				})
			})
		}
	}
	try {
		var i = [37.7940035, -122.2463581];
		var p = [37.7940035, -122.2463581];
		a("#map").gmap3({
			center: i,
			zoom: 12,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}).marker({
			position: p,
			icon: "images/marker.png"
		})
	} catch (h) { }
	var z = a("#submit_contact")
		, s = a("#msg");
	z.on("click", function (F) {
		F.preventDefault();
		var E = a(this);
		a.ajax({
			type: "POST",
			url: "contact.php",
			dataType: "json",
			cache: false,
			data: a("#contact-form").serialize(),
			success: function (G) {
				if (G.info !== "error") {
					E.parents("form").find("input[type=text],textarea").filter(":visible").val("");
					s.hide().removeClass("alert-success").removeClass("alert-danger").addClass("alert-success").html(G.msg).fadeIn("slow").delay(5000).fadeOut("slow")
				} else {
					s.hide().removeClass("alert-success").removeClass("alert-danger").addClass("alert-danger").html(G.msg).fadeIn("slow").delay(5000).fadeOut("slow")
				}
			}
		})
	});
	a(window).on("load", function () {
		var E = a(window).outerHeight();
		a(".photo-box .photo-post").height(E - 100)
	});
	a(window).on("resize", function () {
		var E = a(window).outerHeight();
		a(".photo-box .photo-post").height(E - 100)
	});
	var A = {
		animations: Modernizr.cssanimations
	}
		, f = document.getElementById("ip-container")
		, k = f.querySelector("div.ip-header")
		, o = new PathLoader(document.getElementById("ip-loader-circle"))
		, e = {
			WebkitAnimation: "webkitAnimationEnd",
			OAnimation: "oAnimationEnd",
			msAnimation: "MSAnimationEnd",
			animation: "animationend"
		}
		, d = e[Modernizr.prefixed("animation")];
	function m() {
		var E = function () {
			if (A.animations) {
				this.removeEventListener(d, E)
			}
			y()
		};
		window.addEventListener("scroll", u);
		classie.add(f, "loading");
		if (A.animations) {
			f.addEventListener(d, E)
		} else {
			E()
		}
	}
	function y() {
		var E = function (F) {
			var H = 0
				, G = setInterval(function () {
					H = Math.min(H + Math.random() * 0.1, 1);
					F.setProgress(H);
					if (H === 1) {
						classie.remove(f, "loading");
						classie.add(f, "loaded");
						clearInterval(G);
						var I = function (J) {
							if (A.animations) {
								if (J.target !== k) {
									return
								}
								this.removeEventListener(d, I)
							}
							classie.add(document.body, "layout-switch");
							window.removeEventListener("scroll", u)
						};
						if (A.animations) {
							k.addEventListener(d, I)
						} else {
							I()
						}
					}
				}, 30)
		};
		o.setProgressFn(E)
	}
	function u() {
		window.scrollTo(0, 0)
	}
	m()
});
function Resize() {
	$(window).trigger("resize")
}
