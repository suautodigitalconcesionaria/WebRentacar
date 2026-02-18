// ==========================================
// 1. BASE DE DATOS (Provincias)
// ==========================================
const infoDestinos = {
    lapampa: { provincia: "La Pampa", descripcion: "Nuestra casa. Desde el caldenal hasta las salinas.", lugares: [{ nombre: "Parque Luro", distancia: "150 km", link: "#" }], img: "lapampa.jpg" },
    buenosaires: { provincia: "Buenos Aires", descripcion: "Sierras, mar y campo.", lugares: [{ nombre: "Tandil", distancia: "420 km", link: "#" }], img: "buenosaires.jpg" },
    cordoba: { provincia: "Córdoba", descripcion: "Sierras y ríos cristalinos.", lugares: [{ nombre: "Villa General Belgrano", distancia: "440 km", link: "#" }], img: "cordoba.jpg" },
    santafe: { provincia: "Santa Fe", descripcion: "Historia y río Paraná.", lugares: [{ nombre: "Rosario", distancia: "550 km", link: "#" }], img: "santafe.jpg" },
    mendoza: { provincia: "Mendoza", descripcion: "Tierra del sol y del buen vino.", lugares: [{ nombre: "Valle de Uco", distancia: "720 km", link: "#" }], img: "mendoza.jpg" },
    sanjuan: { provincia: "San Juan", descripcion: "Valles y paisajes lunares.", lugares: [{ nombre: "Ischigualasto", distancia: "950 km", link: "#" }], img: "sanjuan.jpg" },
    larioja: { provincia: "La Rioja", descripcion: "Cañones rojos majestuosos.", lugares: [{ nombre: "Talampaya", distancia: "900 km", link: "#" }], img: "larioja.jpg" },
    sanluis: { provincia: "San Luis", descripcion: "Sierras y microclima.", lugares: [{ nombre: "Merlo", distancia: "380 km", link: "#" }], img: "sanluis.jpg" },
    neuquen: { provincia: "Neuquén", descripcion: "Lagos y volcanes.", lugares: [{ nombre: "San Martín", distancia: "980 km", link: "#" }], img: "neuquen.jpg" },
    rionegro: { provincia: "Río Negro", descripcion: "Montañas y mar azul.", lugares: [{ nombre: "Bariloche", distancia: "1150 km", link: "#" }], img: "rionegro.jpg" },
    chubut: { provincia: "Chubut", descripcion: "Ballenas y cordillera.", lugares: [{ nombre: "Puerto Madryn", distancia: "1050 km", link: "#" }], img: "chubut.jpg" },
    santacruz: { provincia: "Santa Cruz", descripcion: "Glaciares infinitos.", lugares: [{ nombre: "El Calafate", distancia: "2400 km", link: "#" }], img: "santacruz.jpg" },
    tierradelfuego: { provincia: "Tierra del Fuego", descripcion: "El fin del mundo.", lugares: [{ nombre: "Ushuaia", distancia: "3100 km", link: "#" }], img: "tierradelfuego.jpg" },
    salta: { provincia: "Salta", descripcion: "Cultura y colores únicos.", lugares: [{ nombre: "Cafayate", distancia: "1350 km", link: "#" }], img: "salta.jpg" },
    jujuy: { provincia: "Jujuy", descripcion: "La magia de la Quebrada.", lugares: [{ nombre: "Humahuaca", distancia: "1520 km", link: "#" }], img: "jujuy.jpg" },
    tucuman: { provincia: "Tucumán", descripcion: "El jardín de la República.", lugares: [{ nombre: "Tafí del Valle", distancia: "1150 km", link: "#" }], img: "tucuman.jpg" },
    catamarca: { provincia: "Catamarca", descripcion: "Adobe y volcanes.", lugares: [{ nombre: "Fiambalá", distancia: "1250 km", link: "#" }], img: "catamarca.jpg" },
    santiago: { provincia: "Santiago del Estero", descripcion: "Termas y folklore.", lugares: [{ nombre: "Río Hondo", distancia: "980 km", link: "#" }], img: "santiago.jpg" },
    misiones: { provincia: "Misiones", descripcion: "Selva y Cataratas.", lugares: [{ nombre: "Iguazú", distancia: "1750 km", link: "#" }], img: "misiones.jpg" },
    corrientes: { provincia: "Corrientes", descripcion: "Esteros y chamamé.", lugares: [{ nombre: "Iberá", distancia: "1300 km", link: "#" }], img: "corrientes.jpg" },
    entrerios: { provincia: "Entre Ríos", descripcion: "Termas y carnavales.", lugares: [{ nombre: "Colón", distancia: "780 km", link: "#" }], img: "entrerios.jpg" },
    chaco: { provincia: "Chaco", descripcion: "El Impenetrable.", lugares: [{ nombre: "Resistencia", distancia: "1100 km", link: "#" }], img: "chaco.jpg" },
    formosa: { provincia: "Formosa", descripcion: "Naturaleza pura.", lugares: [{ nombre: "Bañado La Estrella", distancia: "1550 km", link: "#" }], img: "formosa.jpg" }
};

// ==========================================
// 2. FUNCIONES DE APOYO (Reveal, Contadores, Modales)
// ==========================================

// Función para mostrar elementos al hacer scroll
const reveal = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    // Items normales
    const items = document.querySelectorAll('.card, .req-item, .card-auto, .destino-card');
    items.forEach(item => {
        if (item.getBoundingClientRect().top < windowHeight - revealPoint) {
            item.classList.add('active');
        }
    });

    // Pasos secuenciales (el efecto de encendido que querías)
    const pasos = document.querySelectorAll('.paso');
    pasos.forEach((paso, index) => {
        if (paso.getBoundingClientRect().top < windowHeight - revealPoint) {
            if (!paso.classList.contains('active')) {
                setTimeout(() => {
                    paso.classList.add('active');
                }, index * 300);
            }
        }
    });
};

// Motor de los números que suben (Stats)
const startCounters = () => {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const update = () => {
            const count = +counter.innerText;
            const inc = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(update, 20);
            } else { counter.innerText = target; }
        };
        update();
    });
};

// Carruseles
const moveCarousel = (viewport, nextBtn, prevBtn, amount) => {
    const v = document.querySelector(viewport);
    if (!v) return;
    document.querySelector(nextBtn)?.addEventListener('click', () => v.scrollLeft += amount);
    document.querySelector(prevBtn)?.addEventListener('click', () => v.scrollLeft -= amount);
};

// ==========================================
// 3. INICIALIZACIÓN (Cuando carga la página)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
   const enterBtn = document.getElementById('enter-btn');
const introScreen = document.getElementById('intro-screen');

if (enterBtn && introScreen) {
    enterBtn.addEventListener('click', () => {
        introScreen.classList.add('intro-hidden');
        // Activamos los contadores o el reveal apenas entra
        setTimeout(reveal, 500); 
    });
} 
    // Ejecutar reveal al cargar por si ya estamos abajo
    reveal();
    window.addEventListener('scroll', reveal);

    // Observer para los contadores
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

    // Menú Hamburguesa
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (menuBtn && navMenu) {
        menuBtn.onclick = () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('open');
        };
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.onclick = () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('open');
            };
        });
    }

    // FAQ Acordeón
    document.querySelectorAll('.faq-question').forEach(q => {
        q.onclick = () => {
            const item = q.parentElement;
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        };
    });

    // Iniciar Carruseles
    moveCarousel('.flota-carousel-wrapper', '.control-btn.next', '.control-btn.prev', 300);
    moveCarousel('.destinos-viewport', '.dest-next', '.dest-prev', 260);
});

// Funciones globales para el modal (se llaman desde el HTML)
function openModal(id) {
    const data = infoDestinos[id];
    if (!data) return;
    const modal = document.getElementById('destino-modal');
    const contenido = document.getElementById('modal-dinamico');
    const lugaresHTML = data.lugares.map(l => `
        <div class="lugar-destacado">
            <div class="lugar-info"><strong>${l.nombre}</strong><span>📍 ${l.distancia} desde Pico</span></div>
        </div>`).join('');
    
    contenido.innerHTML = `
        <img src="${data.img}" class="modal-img-main">
        <span class="badge-provincia">${data.provincia}</span>
        <h2>${data.provincia}</h2>
        <p class="modal-desc">${data.descripcion}</p>
        <div class="destacados-section"><h4>Lugares destacados:</h4>${lugaresHTML}</div>`;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById('destino-modal').style.display = "none";
    document.body.style.overflow = "auto";
}