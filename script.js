function personalizarInvitacion() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('n'); // n = nombre
    const pases = params.get('p');  // p = pases

    if (nombre) {
        // Reemplazamos los guiones bajos por espacios para que se vea limpio
        const nombreLimpio = nombre.replace(/_/g, ' ');
        const elementoNombre = document.getElementById('nombre-invitado');
        if (elementoNombre) elementoNombre.innerText = nombreLimpio;
    }
    if (pases) {
        const elementoPases = document.getElementById('cantidad-pases');
        if (elementoPases) elementoPases.innerText = pases;
    }
}

function iniciarAnimacion() {
    const envelope = document.getElementById('main-envelope');
    const wrapper = document.getElementById('envelope-wrapper');
    const content = document.getElementById('main-content');
    const sello = document.querySelector('.seal-header'); 
    const musica = document.getElementById('musica-boda');

    envelope.classList.add('open-flap');
    sello.style.opacity = "0";
    sello.style.pointerEvents = "none";
    if (musica) musica.play().catch(() => {});

    // Salida del sobre hacia el contenido
    setTimeout(() => {
        wrapper.style.transition = "opacity 2s, transform 2s";
        wrapper.style.opacity = "0";
        wrapper.style.transform = "scale(1.2)";
        content.classList.remove('hidden');
        
        setTimeout(() => {
            content.classList.add('opacity-100');
            document.body.style.overflowY = "auto";
            
            // LLAMAMOS A LA PERSONALIZACIÓN AQUÍ
            personalizarInvitacion();
            
            // Iniciar máquina de escribir del HERO
            const l1 = document.querySelector('.typing-line-1');
            const l2 = document.querySelector('.typing-line-2');
            const l3 = document.querySelector('.typing-line-3');

            setTimeout(() => l1.classList.add('start-typing'), 500);
            setTimeout(() => l2.classList.add('start-typing'), 3500);
            setTimeout(() => l3.classList.add('start-typing'), 6500);

            
            // DESVANECER Y APARECER DE NUEVO CON SCROLL
            setTimeout(() => { wrapper.remove(); }, 2000);
            AOS.init({ 
                duration: 1000, 
                once: false, // Esto permite que la animación se repita al subir y bajar
                mirror: true }); //Esto asegura que se anime al hacer scroll hacia arriba también
        }, 100);
    }, 11500); 
}

// RELOJ
function actualizarReloj() {
    const boda = new Date('April 25, 2026 16:00:00').getTime();
    const ahora = new Date().getTime();
    const dif = boda - ahora;
    if (dif <= 0) return;

    document.getElementById('days').innerText = Math.floor(dif / (1000*60*60*24)).toString().padStart(2,'0');
    document.getElementById('hours').innerText = Math.floor((dif % (1000*60*60*24)) / (1000*60*60)).toString().padStart(2,'0');
    document.getElementById('minutes').innerText = Math.floor((dif % (1000*60*60)) / (1000*60)).toString().padStart(2,'0');
    document.getElementById('seconds').innerText = Math.floor((dif % (1000*60)) / 1000).toString().padStart(2,'0');
}
setInterval(actualizarReloj, 1000);

// SCROLL & PARALLAX
window.addEventListener('scroll', function() {
    const scroll = window.pageYOffset;
    const bg = document.querySelector('.parallax-bg');
    const hero = document.querySelector('.hero-content');
    
    if (bg) bg.style.transform = `translateY(${scroll * 0.5}px)`;
    if (hero) hero.style.opacity = Math.max(1 - scroll/600, 0);

// --- SE VUELVE A ESCRIBIR EL NOMBRE DE LUCIA Y JULIO AL INCIO CUANDO SUBO EL SCROLL / NUEVO: REINICIO DE MÁQUINA DE ESCRIBIR EN EL HERO (Lucia & Julio) ---
    const l1 = document.querySelector('.typing-line-1');
    const l2 = document.querySelector('.typing-line-2');
    const l3 = document.querySelector('.typing-line-3');

    // Si estamos hasta arriba (scroll cerca de 0), aseguramos que se activen
    if (scroll < 100) {
        if (l1 && !l1.classList.contains('start-typing')) {
            l1.classList.add('start-typing');
            setTimeout(() => l2.classList.add('start-typing'), 3000);
            setTimeout(() => l3.classList.add('start-typing'), 6000);
        }
    } else if (scroll > 800) { 
        // Si el usuario ya bajó bastante, quitamos las clases para que 
        // al volver a subir se disparen de nuevo
        if (l1) l1.classList.remove('start-typing');
        if (l2) l2.classList.remove('start-typing');
        if (l3) l3.classList.remove('start-typing');
    }

    // --- CUENTA REGRESIVA DEL RELOJ PARALLAX RELOJ ---
    const bgReloj = document.querySelector('.parallax-bg-reloj');
    if (bgReloj) {
        const parent = document.getElementById('cuenta-regresiva-parallax');
        const offsetTop = parent.offsetTop;
        const relativeScroll = scroll - offsetTop;
        bgReloj.style.transform = `translateY(${relativeScroll * 0.3}px)`;
    }

    const v1 = document.querySelector('.line-v-1');
    const v2 = document.querySelector('.line-v-2');
    const v3 = document.querySelector('.line-v-3');

    if (v1 && v1.getBoundingClientRect().top < window.innerHeight * 0.8) {
        if (!v1.classList.contains('start-typing')) {
            setTimeout(() => v1.classList.add('start-typing'), 0);
            setTimeout(() => v2.classList.add('start-typing'), 2000);
            setTimeout(() => v3.classList.add('start-typing'), 4000);
        }
    } else {
        // Reiniciar para que se vuelvan a escribir al regresar
        if(v1) v1.classList.remove('start-typing');
        if(v2) v2.classList.remove('start-typing');
        if(v3) v3.classList.remove('start-typing');
    }
});

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 25; // Cantidad de pétalos al mismo tiempo

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Tamaños aleatorios
        const size = Math.random() * 15 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        
        // Posición horizontal aleatoria
        petal.style.left = Math.random() * 100 + 'vw';
        
        // Duración y retraso de la animación aleatorios
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 10 + 's';
        
        petal.style.animationDuration = duration;
        petal.style.animationDelay = delay;
        
        // Desenfoque opcional para dar profundidad (3D)
        const blur = Math.random() * 2 + 'px';
        petal.style.filter = `blur(${blur})`;

        container.appendChild(petal);
    }
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', createPetals);