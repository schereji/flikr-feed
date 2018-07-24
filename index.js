(()=> {
	const QUERY_STRING = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=puppies&format=json&nojsoncallback=true';
	const CORS_URL = 'https://cors-anywhere.herokuapp.com';
	const gridContainer = document.querySelector('.grid-container');
	const lightBoxContainerImage = document.querySelector('.lightbox-container img');
	const closeButton = document.querySelector('.close');
	const blackOverlay = document.querySelector('.black-overlay');
	
	const updateContainerData = (src, alt, shouldHide) => {
		lightBoxContainerImage.src=src;
		lightBoxContainerImage.alt=alt;
		if(shouldHide) {
			blackOverlay.classList.add('hidden');
			lightBoxContainerImage.parentNode.classList.add('hidden');
		} else {
			blackOverlay.classList.remove('hidden');
			lightBoxContainerImage.parentNode.classList.remove('hidden');
		}
		
	};
	
	const handleOpen = (event) => {
		if(event.target.nodeName.toLowerCase() === 'img') {
			updateContainerData(event.target.src, event.target.alt, false);
		}
	};
	
	const handleClose = () => {
		updateContainerData('', '', true);
	};
	
	gridContainer.addEventListener('click', handleOpen);
	closeButton.addEventListener('click', handleClose);
	fetch(`${CORS_URL}/${QUERY_STRING}`)
		.then(res => res.json())
		.then(res => {
			res.items.forEach((item) => {
				document.querySelector('.loader').classList.add('hidden');
				const el = document.createElement('section');
				el.classList.add('grid-item');
				el.innerHTML = `<img tabindex='0' src='${item.media.m}' alt='${item.title}'/>`;
				gridContainer.append(el);
			});
		})
		.catch(() => {
			document.querySelector('.loader').classList.add('hidden');
			const el = document.createElement('section');
			el.classList.add('error');
			el.innerHTML = `<p>Unable To Load Images. Please Refresh The Page.</p>`;
			gridContainer.append(el);
		});
})();
