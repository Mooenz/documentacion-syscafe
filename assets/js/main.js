const windowIsReady = window.addEventListener('DOMContentLoaded', () => {
	const $ = (selector) => document.querySelectorAll(selector);

	// Navegación tabs
	const tabs = $('.documentacion__tabs .documentacion__item ');
	const tabContents = $('.documentacion__informacion .documentacion__informacion--item');

	tabs.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			const tab = e.target;
			const tabContent = tab.dataset.content;
			const tabContentElement = document.querySelector(tabContent);

			tabs.forEach((tab) => tab.classList.remove('activo'));
			tab.classList.add('activo');

			tabContents.forEach((content) => {
				content.classList.remove('activo');
			});

			tabContentElement.classList.add('activo');
		});
	});
});
