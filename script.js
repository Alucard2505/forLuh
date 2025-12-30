const btnAbrir = document.getElementById('btn-abrir');
const overlay = document.getElementById('overlay');
const universo = document.getElementById('universo');
const foto = document.getElementById('foto-casal');
const mainCard = document.getElementById('main-card');
const btnTeAmo = document.getElementById('btn-teamo');
const containerBolhas = document.getElementById('bolhas-container');
const musicaFundo = document.getElementById('musicaFundo');
const progressBar = document.getElementById('progress');
const playPauseIcon = document.getElementById('play-pause-icon');

const dataInicio = new Date('2025-12-08T18:36:00').getTime();

// Abrir e Tocar
btnAbrir.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.opacity = "0";
    musicaFundo.play();
    setTimeout(() => {
        overlay.classList.add('hidden');
        universo.classList.remove('hidden');
        foto.classList.add('animar-foto');
        atualizarTimer();
        setInterval(atualizarTimer, 1000);
    }, 1000);
});

// Lógica da Barra de Progresso
musicaFundo.ontimeupdate = function() {
    const percentage = (musicaFundo.currentTime / musicaFundo.duration) * 100;
    progressBar.style.width = percentage + "%";
};

// Play/Pause Manual no Player
playPauseIcon.addEventListener('click', () => {
    if (musicaFundo.paused) {
        musicaFundo.play();
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        musicaFundo.pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    }
});

function atualizarTimer() {
    const agora = new Date().getTime();
    const dif = agora - dataInicio;
    const d = Math.floor(dif / (1000 * 60 * 60 * 24));
    const h = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dif % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = `
        <div style="color:#33d9ff; font-size:0.75rem; letter-spacing:2px; margin-bottom:5px;">ESTAMOS JUNTOS HÁ:</div>
        <div style="font-size:2.2rem; font-weight:bold;">${d}d ${h}h ${m}m ${s}s</div>
    `;
}

btnTeAmo.addEventListener('click', (e) => {
    e.preventDefault();
    mainCard.classList.add('tremar');
    for (let i = 0; i < 15; i++) { criarCoracaoExplosao(); }
    setTimeout(() => mainCard.classList.remove('tremar'), 300);
});

function criarCoracaoExplosao() {
    const coracao = document.createElement('div');
    coracao.classList.add('coracao-explosao');
    coracao.innerHTML = '❤';
    const rect = btnTeAmo.getBoundingClientRect();
    coracao.style.left = `${rect.left + rect.width / 2}px`;
    coracao.style.top = `${rect.top + rect.height / 2}px`;
    coracao.style.setProperty('--x', `${(Math.random() - 0.5) * 400}px`);
    coracao.style.setProperty('--y', `${(Math.random() - 0.5) * 300 - 50}px`);
    document.body.appendChild(coracao);
    setTimeout(() => coracao.remove(), 2000);
}

function criarBolha() {
    if (overlay.classList.contains('hidden')) return; 
    const b = document.createElement('div');
    b.classList.add('bolha-botao');
    b.style.width = b.style.height = Math.random() * 8 + 4 + 'px';
    b.style.top = '50%'; b.style.left = '50%';
    b.style.setProperty('--x', (Math.random() - 0.5) * 500 + 'px');
    b.style.setProperty('--y', (Math.random() - 0.5) * 500 + 'px');
    containerBolhas.appendChild(b);
    setTimeout(() => b.remove(), 4000);
}
setInterval(criarBolha, 150);
