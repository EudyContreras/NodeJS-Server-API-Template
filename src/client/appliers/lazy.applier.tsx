const lazyImages = document.querySelectorAll('.lazy-image');

const options = {
	rootMargin: '0px',
	threshold: 0.1
};

const loadPicture = (image: any): void => {
	lazyImages.forEach((img) => {
		Array.from(img.getElementsByTagName('source')).forEach((source: any) => {
			source.setAttribute('srcset', image.getAttribute('data-srcset'));
		});
	});
};

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0) {
				const picture = entry.target;
				observer.unobserve(picture);
				loadPicture(picture);
			}
		});
	}, options);

	lazyImages.forEach((image) => {
		observer.observe(image);
	});
} else {
	lazyImages.forEach((image) => {
		loadPicture(image);
	});
}
