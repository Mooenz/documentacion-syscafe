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

	// Navegación interna
	const tabsInternos = $('.documentacion__informacion--contenedor li');
	tabsInternos.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			tabsInternos.forEach((tab) => tab.classList.remove('activo'));
			tab.classList.add('activo');
		});
	});

	// Cuando Documentación esté en la pantalla, agregamos el activo al link flotante
	const documentacion = document.querySelector('.documentacion');
	const documentacionLink = document.querySelector('.link-encuesta');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						documentacionLink.classList.add('activo');
					}, 5000);

					observer.unobserve(documentacion);
				}
			});
		},
		{
			threshold: 0.2,
		}
	);

	observer.observe(documentacion);

	// Botón de cerrar el enlace flotante
	const closeButton = document.querySelector('#link-encuesta-cerrar');

	closeButton.addEventListener('click', () => {
		documentacionLink.classList.remove('activo');
	});

	// Botón de volver al inicio de la documentación
	const backToTopButton = document.querySelector('#volver-arriba');
	backToTopButton.addEventListener('click', () => {
		documentacion.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	});

	// Si el usuario esta en el inicio de la documentación, ocultamos el botón de volver al inicio
	const inicio = document.querySelector('#hero');
	const observer2 = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					backToTopButton.classList.remove('activo');
				} else {
					backToTopButton.classList.add('activo');
				}
			});
		},
		{
			threshold: 0.2,
		}
	);

	observer2.observe(inicio);

	// Date
	const year = new Date().getFullYear();
	const yearElement = document.querySelector('#fecha');
	yearElement.innerHTML = year;
});
