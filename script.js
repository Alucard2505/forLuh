const btnAbrir = document.getElementById('btn-abrir');
const overlay = document.getElementById('overlay');
const universo = document.getElementById('universo');
const foto = document.getElementById('foto-casal');
const mainCard = document.getElementById('main-card');
const btnTeAmo = document.getElementById('btn-teamo');
const containerBolhas = document.getElementById('bolhas-container');

const dataInicio = new Date('2025-12-08T18:36:00').getTime();

// Iniciar Experiência
btnAbrir.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.classList.add('hidden');
        universo.classList.remove('hidden');
        foto.classList.add('animar-foto');
        atualizarTimer();
        setInterval(atualizarTimer, 1000);
    }, 1000);
});

// Contador
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

// Efeito de Tremor no TE AMO
btnTeAmo.addEventListener('click', (e) => {
    e.preventDefault();
    mainCard.classList.add('tremar');
    setTimeout(() => mainCard.classList.remove('tremar'), 300);
});

// Bolhas que saem do centro (Botão ABRA)
function criarBolha() {
    if (overlay.classList.contains('hidden')) return; // Para de criar bolhas após abrir
    
    const b = document.createElement('div');
    b.classList.add('bolha-botao');
    
    const tam = Math.random() * 8 + 4 + 'px';
    b.style.width = tam; 
    b.style.height = tam;
    
    // Nascem no meio do overlay (Botão ABRA)
    b.style.top = '50%'; 
    b.style.left = '50%';
    
    b.style.setProperty('--x', (Math.random() - 0.5) * 500 + 'px');
    b.style.setProperty('--y', (Math.random() - 0.5) * 500 + 'px');
    
    containerBolhas.appendChild(b);
    setTimeout(() => b.remove(), 4000);
}

setInterval(criarBolha, 150);