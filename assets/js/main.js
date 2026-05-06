// Script para el menú móvil
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Script for the 'Nosotros' image carousel
const carouselImages = document.querySelectorAll('.carousel-image');
let currentImageIndex = 0;
const totalImages = carouselImages.length;

if (totalImages > 0) {
    setInterval(() => {
        carouselImages[currentImageIndex].classList.add('opacity-0');
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        carouselImages[currentImageIndex].classList.remove('opacity-0');
    }, 4000); // Change image every 4 seconds
}

// Script para el nuevo carrusel de ofertas
document.addEventListener('DOMContentLoaded', function() {
    // Datos de las ofertas (imágenes de promoción)
    const ofertasData = [
        { image: 'assets/images/promotions/promo1.webp', alt: 'Promoción 1' },
        { image: 'assets/images/promotions/promo2.webp', alt: 'Promoción 2' },
        { image: 'assets/images/promotions/promo3.webp', alt: 'Promoción 3' }
    ];

    const ofertasCardsContainer = document.querySelector('.ofertas-cards-container');
    const ofertasIndicatorsContainer = document.querySelector('.ofertas-indicators');
    const ofertasPrevBtn = document.querySelector('.ofertas-prev-btn');
    const ofertasNextBtn = document.querySelector('.ofertas-next-btn');

    let currentOfertaIndex = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0; // Para el scroll vertical
    let currentX = 0;

    // Crear las cartas de ofertas
    ofertasData.forEach((oferta, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'ofertas-card';
        cardElement.innerHTML = `
            <img src="${oferta.image}" alt="${oferta.alt}">
        `;

        // Añadir evento de clic a cada carta
        cardElement.addEventListener('click', () => {
            goToOferta(index);
        });

        ofertasCardsContainer.appendChild(cardElement);

        // Crear indicadores
        const indicator = document.createElement('div');
        indicator.className = 'ofertas-indicator';
        if (index === 0) indicator.classList.add('active');

        indicator.addEventListener('click', () => {
            goToOferta(index);
        });

        ofertasIndicatorsContainer.appendChild(indicator);
    });

    // Actualizar las posiciones de las cartas
    function updateOfertas() {
        const ofertasCards = document.querySelectorAll('.ofertas-card');
        const ofertasIndicators = document.querySelectorAll('.ofertas-indicator');

        ofertasCards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'hidden', 'hidden-right');

            // Calcular la posición relativa respecto a la carta actual
            let position = index - currentOfertaIndex;

            // Ajustar para comportamiento circular
            const totalCards = ofertasCards.length;
            if (position < -Math.floor(totalCards / 2)) position += totalCards;
            if (position > Math.floor(totalCards / 2)) position -= totalCards;


            // Aplicar clases según la posición
            if (position === 0) {
                card.classList.add('active');
            } else if (position === -1 || (position === totalCards - 1 && totalCards > 2)) {
                card.classList.add('prev');
            } else if (position === 1 || (position === -(totalCards - 1) && totalCards > 2)) {
                card.classList.add('next');
            } else if (position < -1) {
                card.classList.add('hidden');
            } else if (position > 1) {
                card.classList.add('hidden-right');
            }
        });

        // Actualizar indicadores
        ofertasIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentOfertaIndex);
        });
    }

    // Ir a una oferta específica
    function goToOferta(index) {
        currentOfertaIndex = index;
        updateOfertas();
    }

    // Navegación anterior
    function prevOferta() {
        currentOfertaIndex = (currentOfertaIndex - 1 + ofertasData.length) % ofertasData.length;
        updateOfertas();
    }

    // Navegación siguiente
    function nextOferta() {
        currentOfertaIndex = (currentOfertaIndex + 1) % ofertasData.length;
        updateOfertas();
    }

    // Eventos de los botones
    ofertasPrevBtn.addEventListener('click', prevOferta);
    ofertasNextBtn.addEventListener('click', nextOferta);

    // Inicializar
    updateOfertas();

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevOferta();
        if (e.key === 'ArrowRight') nextOferta();
    });

    // Navegación táctil
    ofertasCardsContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
    }, { passive: true });

    ofertasCardsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    ofertasCardsContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        handleSwipe(startX, endX);
    });

    function handleSwipe(start, end) {
        const swipeThreshold = 50; // Umbral de deslizamiento
        const diffX = start - end;

        if (diffX > swipeThreshold) {
            nextOferta();
        } else if (diffX < -swipeThreshold) {
            prevOferta();
        }
    }
});
