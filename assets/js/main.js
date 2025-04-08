const windowIsReady = window.addEventListener('DOMContentLoaded', () => {
	const $ = (selector) => document.querySelectorAll(selector);

	// Navegación tabs
	const tabs = $('.documentacion__tabs .documentacion__item ');
	const tabContents = $('.documentacion__informacion .documentacion__informacion--item');

	tabs.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			// Evitar el comportamiento por defecto del enlace
			e.preventDefault();

			// Obtener el contenido del tab y el elemento correspondiente
			const tab = e.target;
			const tabContent = tab.dataset.content;
			const tabContentElement = document.querySelector(tabContent);

			// Remover la clase 'activo' de todos los tabs y agregarla al tab actual
			tabs.forEach((tab) => tab.classList.remove('activo'));
			tab.classList.add('activo');

			// Remover la clase 'activo' de todos los contenidos y agregarla al contenido actual
			tabContents.forEach((content) => {
				content.classList.remove('activo');
			});

			tabContentElement.classList.add('activo');
		});
	});

	// Date
	const year = new Date().getFullYear();
	const yearElement = document.querySelector('#fecha');
	yearElement.innerHTML = year;
});
