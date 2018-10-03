	// const pull_data = () => {
		fetch('/public/js/projects.json')
		.then((Response) => {
			return Response.json();
		}).then((data) => {
			const projects = data.projects;
			console.log(projects);

			// 

			projects.map((project, index) => {
				const container = document.getElementById('projects');
				const project_img = project.img

				const markup = `
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
				`				
				container.innerHTML += markup;
			})

			return projects
		}).then((projects) => {
			projects.map((project, index) => {
				const current_project = document.querySelectorAll(`.project`);
				const images = [].slice.call(current_project[index].querySelectorAll('.image_container img'));
				const arrows = current_project[index].querySelectorAll('.arrows');
				const current = current_project[index].querySelector('.current');

				images[0].classList.add('active');

				arrows.forEach((arrow) => {
					arrow.addEventListener('click', (e) => {
						

						let num;
						images.map((image, index)=> {
							
							if (image.classList.contains('active')){
								image.classList.remove('active');	
								
								if (e.target.className == 'right'){
									num = index + 1
								} else {
									num = index - 1
								}	

								if (num >= images.length){
									num = 0;							
								} 
								else if (num <= -1 ){
									num = images.length - 1
								}
								

								console.log(num)
								return num;
							}
							return num;
						})

						images[num].classList.add('active');
						current.innerHTML = num + 1;
						
						
						
					});
				})
			})
		})
	// }

	const expand = () => {
		let nav = document.querySelector('nav').getAttribute('aria-expended');
		if (nav == 'true'){
			nav = 'false';
		} else {
			nav = 'true';
		}
		document.querySelector('nav').setAttribute("aria-expanded", nav);
	}


	document.querySelector('#menu_icon').addEventListener('click', (e) => {
		document.querySelector('html').classList.toggle('disable_scroll')
		document.querySelector('#menu_icon').classList.toggle('close');
		expand();
	});


	const nav_buttons = document.querySelectorAll('nav li');

	nav_buttons.forEach((item) => {
	  item.addEventListener('click', (e) => {
	    document.querySelector('html').classList.remove('disable_scroll')
		document.querySelector('#menu_icon').classList.remove('close');
		expand();
	  });
	})
    



	document.getElementById('header').classList.add('in-view');

    const isScrolledIntoView = (elem) => {
	    var docViewTop = window.scrollTop;
	    var docViewBottom = docViewTop + window.innerHeight;

	    var elemTop = elem.offsetTop + 200;
	    var elemBottom = elemTop;
	    //  + $(elem).height() - 200

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	window.addEventListener('scroll', (e) => {
	  document.querySelectorAll('.section').forEach((item) => {
	        
	        if ((window.pageYOffset + window.innerHeight - 300) >= item.offsetTop) {
	            item.classList.add('in-view');
	        } else {
	        	$(this).removeClass('in-view');
	        }
	    });
	}); 