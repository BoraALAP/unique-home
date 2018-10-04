(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
			}var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
				var n = t[o][1][e];return s(n ? n : e);
			}, f, f.exports, e, t, n, r);
		}return n[o].exports;
	}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {

		fetch('./public/js/projects.json').then(Response => {
			return Response.json();
		}).then(data => {
			const projects = data.projects;
			const services = data.services;

			const container_services = document.querySelector('.services_image');

			const markup_services = `
		<div class="arrow_container">
			<button class="arrows left_arrow"><img src="assets/svg/left_arrow.svg" class="left"/></button>
			<div class="numbers">
				<span class="current">1</span>
				<span class="divider">/</span>
				<span class="total">${services.length}</span>
			</div>
			<button class="arrows right_arrow"><img src="assets/svg/right_arrow.svg" class="right"/></button>
		</div>
		<div class="image_container">
			${services.map(image => `<img src="${image}" class=""/>`).join('')}
		</div>
	`;

			container_services.innerHTML += markup_services;

			projects.map((project, index) => {
				const container_projects = document.getElementById('projects');
				const project_img = project.img;

				const markup_project = `
		<div class="project" aria-label="${index}">
			<div class="project_image">
				<div class="arrow_container">
					<button class="arrows left_arrow"><img src="assets/svg/left_arrow.svg" class="left"/></button>
					<div class="numbers">
						<span class="current">1</span>
						<span class="divider">/</span>
						<span class="total">${project_img.length}</span>
					</div>
					<button class="arrows right_arrow"><img src="assets/svg/right_arrow.svg" class="right"/></button>
				</div>
				<div class="image_container">
					${project_img.map(image => `<img src="${image}" class=""/>`).join('')}
				</div>
			</div>
			<small class="project_name">${project.title}</small>
		</div>
		`;
				container_projects.innerHTML += markup_project;
			});

			return [projects, services];
		}).then(data => {

			const service_container = document.querySelector(`.services_image`);

			const images = [].slice.call(service_container.querySelectorAll('.image_container img'));
			const arrows = service_container.querySelectorAll('.arrows');
			const current = service_container.querySelector('.current');

			images[0].classList.add('active');

			arrows.forEach(arrow => {
				arrow.addEventListener('click', e => {

					let num;
					images.map((image, index) => {

						if (image.classList.contains('active')) {
							image.classList.remove('active');

							if (e.target.className == 'right') {
								num = index + 1;
							} else {
								num = index - 1;
							}

							if (num >= images.length) {
								num = 0;
							} else if (num <= -1) {
								num = images.length - 1;
							}

							console.log(num);
							return num;
						}
						return num;
					});

					images[num].classList.add('active');
					current.innerHTML = num + 1;
				});
			});

			data[0].map((project, index) => {
				const current_project = document.querySelectorAll(`.project`);
				const images = [].slice.call(current_project[index].querySelectorAll('.image_container img'));
				const arrows = current_project[index].querySelectorAll('.arrows');
				const current = current_project[index].querySelector('.current');

				images[0].classList.add('active');

				arrows.forEach(arrow => {
					arrow.addEventListener('click', e => {

						let num;
						images.map((image, index) => {

							if (image.classList.contains('active')) {
								image.classList.remove('active');

								if (e.target.className == 'right') {
									num = index + 1;
								} else {
									num = index - 1;
								}

								if (num >= images.length) {
									num = 0;
								} else if (num <= -1) {
									num = images.length - 1;
								}

								console.log(num);
								return num;
							}
							return num;
						});

						images[num].classList.add('active');
						current.innerHTML = num + 1;
					});
				});
			});
		}).catch(error => {
			console.log(error);
		});

		const expand = () => {
			let nav = document.querySelector('nav').getAttribute('aria-expended');
			if (nav == 'true') {
				nav = 'false';
			} else {
				nav = 'true';
			}
			document.querySelector('nav').setAttribute("aria-expanded", nav);
		};

		document.querySelector('#menu_icon').addEventListener('click', e => {
			document.querySelector('html').classList.toggle('disable_scroll');
			document.querySelector('#menu_icon').classList.toggle('close');
			expand();
		});

		document.querySelectorAll('[aria-label="quote"]').forEach(item => {
			item.addEventListener('click', e => {
				document.querySelector('html').classList.toggle('disable_scroll');
				document.getElementById('quote').classList.toggle('active');
			});
		});

		document.getElementById('quote_overlay').addEventListener("click", function (event) {
			// If user clicks outside the element, hide it!
			document.querySelector('html').classList.toggle('disable_scroll');
			document.getElementById('quote').classList.toggle('active');
		});

		const nav_buttons = document.querySelectorAll('nav li');

		nav_buttons.forEach(item => {
			item.addEventListener('click', e => {
				document.querySelector('html').classList.remove('disable_scroll');
				document.querySelector('#menu_icon').classList.remove('close');
				expand();
			});
		});

		document.getElementById('header').classList.add('in-view');

		const isScrolledIntoView = elem => {
			var docViewTop = window.scrollTop;
			var docViewBottom = docViewTop + window.innerHeight;

			var elemTop = elem.offsetTop + 200;
			var elemBottom = elemTop;
			//  + $(elem).height() - 200

			return elemBottom <= docViewBottom && elemTop >= docViewTop;
		};

		window.addEventListener('scroll', e => {
			document.querySelectorAll('.section').forEach(item => {

				if (window.pageYOffset + window.innerHeight - 300 >= item.offsetTop) {
					item.classList.add('in-view');
				} else {
					$(this).removeClass('in-view');
				}
			});
		});

		function after_form_submitted(data) {
			if (data.result == 'success') {
				$('form#reused_form').hide();
				$('#success_message').show();
				$('#error_message').hide();
			} else {
				$('#error_message').append('<ul></ul>');

				jQuery.each(data.errors, function (key, val) {
					$('#error_message ul').append('<li>' + key + ':' + val + '</li>');
				});
				$('#success_message').hide();
				$('#error_message').show();

				//reverse the response on the button
				$('button[type="button"]', $form).each(function () {
					$btn = $(this);
					label = $btn.prop('orig_label');
					if (label) {
						$btn.prop('type', 'submit');
						$btn.text(label);
						$btn.prop('orig_label', '');
					}
				});
			} //else
		}

		$('#reused_form').submit(function (e) {
			e.preventDefault();

			$form = $(this);
			//show some response on the button
			$('button[type="submit"]', $form).each(function () {
				$btn = $(this);
				$btn.prop('type', 'button');
				$btn.prop('orig_label', $btn.text());
				$btn.text('Sending ...');
			});

			$.ajax({
				type: "POST",
				url: 'mail.php',
				data: $form.serialize(),
				success: after_form_submitted,
				dataType: 'json'
			});
		});
	}, {}] }, {}, [1]);