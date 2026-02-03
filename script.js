// 1. EFECTO DE PÉTALOS CAYENDO
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.width = Math.random() * 15 + 10 + 'px';
    petal.style.height = petal.style.width;
    petal.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.getElementById('petals-container').appendChild(petal);
    
    setTimeout(() => { petal.remove(); }, 5000);
}
setInterval(createPetal, 300); // Crea un pétalo cada 300ms

// 2. PASES POR URL (?p=3)
const pases = new URLSearchParams(window.location.search).get('p') || "2";
document.getElementById('guest-pases').innerText = pases;

// 3. MÚSICA
const btn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
btn.onclick = () => {
    audio.paused ? audio.play() : audio.pause();
    btn.style.transform = audio.paused ? "scale(1)" : "scale(1.2)";
};

// 4. GOOGLE SHEETS (Pega aquí tu URL de Apps Script del paso anterior)
const SCRIPT_URL = 'AQUÍ_PEGA_TU_URL_DE_GOOGLE';
const form = document.getElementById('rsvp-form');

form.onsubmit = e => {
    e.preventDefault();
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            asistencia: document.getElementById('asistencia').value,
            pases: pases
        })
    }).then(() => alert("¡Gracias por confirmar!"));
};