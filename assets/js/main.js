const windowIsReady = window.addEventListener('DOMContentLoaded', () => {
	const $ = (selector) => document.querySelectorAll(selector);

	// Tamaño de la ventana
	const windowWidth = window.innerWidth;

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

	tabContents.forEach((contenido) => {
		const enlacesInternos = contenido.querySelectorAll('.documentacion__informacion--contenedor a');
		const select = contenido.querySelector('.documentacion__informacion--select select');
		let observer;

		// Función compartida para scroll, activar clase y reiniciar observer
		function scrollYActivar(id) {
			if (observer) observer.disconnect();

			const elemento = document.querySelector(id);
			if (!elemento) return;

			// Scroll con offset
			const offset = windowWidth < 992 ? -140 : -76;
			const rect = elemento.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			window.scrollTo({
				top: rect.top + scrollTop + offset,
				behavior: 'smooth',
			});

			// Activar clase en el <li>
			const enlace = contenido.querySelector(`a[href="${id}"]`);
			if (enlace) {
				const li = enlace.closest('li');
				const liPadre = li?.parentElement?.querySelectorAll('li') || [];
				liPadre.forEach((li) => li.classList.remove('activo'));
				li.classList.add('activo');
			}

			// Cambiar el valor del select si es necesario
			if (select && select.value !== id) {
				select.value = id;
			}

			// Reactivar observer
			setTimeout(() => {
				const contenidos = contenido.querySelectorAll('.documentacion__informacion--contenido > div > div');
				contenidos.forEach((item) => observer.observe(item));
			}, 800);
		}

		// Click en enlaces
		enlacesInternos.forEach((enlace) => {
			enlace.addEventListener('click', (e) => {
				e.preventDefault();
				const id = enlace.getAttribute('href');
				scrollYActivar(id);
			});
		});

		// Cambio en el select
		if (select) {
			select.addEventListener('change', (e) => {
				const selectedValue = e.target.value;
				if (selectedValue) {
					scrollYActivar(selectedValue);
				}
			});
		}

		// Intersection Observer
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = `#${entry.target.id}`;
						const enlace = contenido.querySelector(`a[href="${id}"]`);
						if (!enlace) return;

						// Activar clase en <li>
						const li = enlace.closest('li');
						const liPadre = li?.parentElement?.querySelectorAll('li') || [];
						liPadre.forEach((li) => li.classList.remove('activo'));
						li.classList.add('activo');

						// Cambiar valor del <select>
						if (select && select.value !== id) {
							select.value = id;
						}
					}
				});
			},
			{
				rootMargin: '-50% 0px -50% 0px',
			}
		);

		// Iniciar observación
		const contenidos = contenido.querySelectorAll('.documentacion__informacion--contenido > div > div');
		contenidos.forEach((item) => observer.observe(item));
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
			threshold: 0.01,
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
