import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
	gallery: '#documentacion .image a',
	pswpModule: () => import('https://unpkg.com/photoswipe'),
});

lightbox.init();
