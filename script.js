// ==========================================
// 1. BASE DE DATOS (Provincias)
// ==========================================
const infoDestinos = {
    lapampa:       { provincia: "La Pampa",           descripcion: "Nuestra casa. Desde el caldenal hasta las salinas.",  lugares: [{ nombre: "Parque Luro",            distancia: "150 km"  }], img: "lapampa.jpg" },
    buenosaires:   { provincia: "Buenos Aires",        descripcion: "Sierras, mar y campo.",                               lugares: [{ nombre: "Tandil",                 distancia: "420 km"  }], img: "buenosaires.jpg" },
    cordoba:       { provincia: "Córdoba",             descripcion: "Sierras y ríos cristalinos.",                         lugares: [{ nombre: "Villa General Belgrano", distancia: "440 km"  }], img: "cordoba.jpg" },
    santafe:       { provincia: "Santa Fe",            descripcion: "Historia y río Paraná.",                              lugares: [{ nombre: "Rosario",                distancia: "550 km"  }], img: "santafe.jpg" },
    mendoza:       { provincia: "Mendoza",             descripcion: "Tierra del sol y del buen vino.",                    lugares: [{ nombre: "Valle de Uco",           distancia: "720 km"  }], img: "mendoza.jpg" },
    sanjuan:       { provincia: "San Juan",            descripcion: "Valles y paisajes lunares.",                          lugares: [{ nombre: "Ischigualasto",          distancia: "950 km"  }], img: "sanjuan.jpg" },
    larioja:       { provincia: "La Rioja",            descripcion: "Cañones rojos majestuosos.",                         lugares: [{ nombre: "Talampaya",              distancia: "900 km"  }], img: "larioja.jpg" },
    sanluis:       { provincia: "San Luis",            descripcion: "Sierras y microclima.",                               lugares: [{ nombre: "Merlo",                  distancia: "380 km"  }], img: "sanluis.jpg" },
    neuquen:       { provincia: "Neuquén",             descripcion: "Lagos y volcanes.",                                   lugares: [{ nombre: "San Martín de los Andes",distancia: "980 km"  }], img: "neuquen.jpg" },
    rionegro:      { provincia: "Río Negro",           descripcion: "Montañas y mar azul.",                                lugares: [{ nombre: "Bariloche",              distancia: "1150 km" }], img: "rionegro.jpg" },
    chubut:        { provincia: "Chubut",              descripcion: "Ballenas y cordillera.",                              lugares: [{ nombre: "Puerto Madryn",          distancia: "1050 km" }], img: "chubut.jpg" },
    santacruz:     { provincia: "Santa Cruz",          descripcion: "Glaciares infinitos.",                                lugares: [{ nombre: "El Calafate",            distancia: "2400 km" }], img: "santacruz.jpg" },
    tierradelfuego:{ provincia: "Tierra del Fuego",    descripcion: "El fin del mundo.",                                   lugares: [{ nombre: "Ushuaia",                distancia: "3100 km" }], img: "tierradelfuego.jpg" },
    salta:         { provincia: "Salta",               descripcion: "Cultura y colores únicos.",                          lugares: [{ nombre: "Cafayate",               distancia: "1350 km" }], img: "salta.jpg" },
    jujuy:         { provincia: "Jujuy",               descripcion: "La magia de la Quebrada.",                           lugares: [{ nombre: "Humahuaca",              distancia: "1520 km" }], img: "jujuy.jpg" },
    tucuman:       { provincia: "Tucumán",             descripcion: "El jardín de la República.",                         lugares: [{ nombre: "Tafí del Valle",         distancia: "1150 km" }], img: "tucuman.jpg" },
    catamarca:     { provincia: "Catamarca",           descripcion: "Adobe y volcanes.",                                   lugares: [{ nombre: "Fiambalá",               distancia: "1250 km" }], img: "catamarca.jpg" },
    santiago:      { provincia: "Santiago del Estero", descripcion: "Termas y folklore.",                                  lugares: [{ nombre: "Río Hondo",              distancia: "980 km"  }], img: "santiago.jpg" },
    misiones:      { provincia: "Misiones",            descripcion: "Selva y Cataratas.",                                  lugares: [{ nombre: "Iguazú",                 distancia: "1750 km" }], img: "misiones.jpg" },
    corrientes:    { provincia: "Corrientes",          descripcion: "Esteros y chamamé.",                                  lugares: [{ nombre: "Iberá",                  distancia: "1300 km" }], img: "corrientes.jpg" },
    entrerios:     { provincia: "Entre Ríos",          descripcion: "Termas y carnavales.",                                lugares: [{ nombre: "Colón",                  distancia: "780 km"  }], img: "entrerios.jpg" },
    chaco:         { provincia: "Chaco",               descripcion: "El Impenetrable.",                                    lugares: [{ nombre: "Resistencia",            distancia: "1100 km" }], img: "chaco.jpg" },
    formosa:       { provincia: "Formosa",             descripcion: "Naturaleza pura.",                                    lugares: [{ nombre: "Bañado La Estrella",     distancia: "1550 km" }], img: "formosa.jpg" }
};


// ==========================================
// 2. FUNCIONES REUTILIZABLES
// ==========================================

// Muestra elementos al hacer scroll (animación de entrada)
const reveal = () => {
    const windowHeight = window.innerHeight;
    const revealPoint  = 100;

    document.querySelectorAll('.card, .req-item, .card-auto, .destino-card').forEach(item => {
        if (item.getBoundingClientRect().top < windowHeight - revealPoint) {
            item.classList.add('active');
        }
    });

    // Pasos: se encienden en secuencia con delay
    document.querySelectorAll('.paso').forEach((paso, index) => {
        if (
            paso.getBoundingClientRect().top < windowHeight - revealPoint &&
            !paso.classList.contains('active')
        ) {
            setTimeout(() => paso.classList.add('active'), index * 300);
        }
    });
};

// Contador animado para la sección de Stats
const startCounters = () => {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const update = () => {
            const count = +counter.innerText;
            const inc   = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
};

// Configura los botones de un carrusel de scroll horizontal
function initCarousel(wrapperSelector, nextSelector, prevSelector, step) {
    const wrapper = document.querySelector(wrapperSelector);
    const nextBtn = document.querySelector(nextSelector);
    const prevBtn = document.querySelector(prevSelector);
    if (!wrapper || !nextBtn || !prevBtn) return;

    nextBtn.addEventListener('click', () => wrapper.scrollBy({ left: step,  behavior: 'smooth' }));
    prevBtn.addEventListener('click', () => wrapper.scrollBy({ left: -step, behavior: 'smooth' }));
}


// ==========================================
// 3. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // — Reveal inicial + listener de scroll —
    reveal();
    window.addEventListener('scroll', reveal);

    // — Contadores animados (se activan al entrar en pantalla) —
    const stats = document.querySelector('.stats');
    if (stats) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                startCounters();
                observer.unobserve(stats);
            }
        }, { threshold: 0.5 });
        observer.observe(stats);
    }

    // — Menú Hamburguesa —
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });
        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });
    }

    // — FAQ Acordeón —
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            // Cierra todos los demás
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // — Carrusel Flota —
    initCarousel('.flota-carousel-wrapper', '.control-btn.next', '.control-btn.prev', 305);

    // — Carrusel Destinos —
    initCarousel('.destinos-viewport', '.dest-next', '.dest-prev', 260);

});


// ==========================================
// 4. MODAL DE DESTINOS (llamado desde el HTML)
// ==========================================
function openModal(id) {
    const data = infoDestinos[id];
    if (!data) return;

    const modal     = document.getElementById('destino-modal');
    const contenido = document.getElementById('modal-dinamico');

    const lugaresHTML = data.lugares.map(l => `
        <div class="lugar-destacado">
            <div class="lugar-info">
                <strong>${l.nombre}</strong>
                <span>📍 ${l.distancia} desde Pico</span>
            </div>
        </div>`
    ).join('');

    contenido.innerHTML = `
        <img src="${data.img}" alt="${data.provincia}" class="modal-img-main" loading="lazy">
        <span class="badge-provincia">${data.provincia}</span>
        <h2 style="margin-top:12px">${data.provincia}</h2>
        <p class="modal-desc">${data.descripcion}</p>
        <div class="destacados-section">
            <h4>Lugares destacados:</h4>
            ${lugaresHTML}
        </div>`;

    modal.style.display        = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('destino-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
