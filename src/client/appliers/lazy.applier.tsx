const lazyPictures = document.querySelectorAll('.lazy-picture');

const options = {
	rootMargin: '0px',
	threshold: 0.1
};

const loadPicture = (picture: any): void => {
	lazyPictures.forEach(pic => {
		Array
			.from(pic.getElementsByTagName('source'))
			.forEach((source: any) => {
				source.setAttribute('srcset', picture.getAttribute('data-srcset'));
			});
	});
};

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver(entries => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0) {
				const picture = entry.target;
				observer.unobserve(picture);
				loadPicture(picture);
			}
		});
	}, options);

	lazyPictures.forEach(picture =>{
		observer.observe(picture);
	});

} else {
	lazyPictures.forEach(picture => {
		loadPicture(picture);
	});
}