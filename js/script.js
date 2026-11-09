
// Lista com os 12 gatinhos
const gatinhos = [
    "😺", "😸", "😹", "😻",
    "😼", "😽", "🙀", "😿",
    "😾", "🐱", "🐈", "🐈‍⬛"
];

// Elementos do HTML
const tabuleiro = document.getElementById("tabuleiro");
const contadorJogadas = document.getElementById("jogadas");
const contadorPares = document.getElementById("pares");
const mensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");

// Variáveis do jogo
let primeiraCarta = null;
let segundaCarta = null;
let jogadas = 0;
let paresEncontrados = 0;
let bloqueado = false;
let temporizador = null;

// Função para embaralhar as cartas
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Função para criar o tabuleiro
function criarTabuleiro() {

    // Limpa o tabuleiro
    tabuleiro.innerHTML = "";

    // Duplica os gatinhos para formar 12 pares
    let cartas = [...gatinhos, ...gatinhos];

    // Embaralha as cartas
    cartas = embaralhar(cartas);

    // Cria as 24 cartas
    cartas.forEach((gatinho) => {

        const carta = document.createElement("div");

        carta.classList.add("carta");

        carta.dataset.gatinho = gatinho;

        carta.innerHTML = `
            <div class="carta-conteudo">

                <div class="verso">
                    ?
                </div>

                <div class="frente">
                    ${gatinho}
                </div>

            </div>
        `;

        // Evento de clique
        carta.addEventListener("click", () => {
            virarCarta(carta);
        });

        tabuleiro.appendChild(carta);

    });
}

// Função para virar a carta
function virarCarta(carta) {

    // Impede cliques inválidos
    if (
        bloqueado ||
        carta.classList.contains("virada") ||
        carta.classList.contains("encontrada")
    ) {
        return;
    }

    // Revela a carta
    carta.classList.add("virada");

    // Verifica se é a primeira carta
    if (primeiraCarta === null) {

        primeiraCarta = carta;

        return;
    }

    // Seleciona a segunda carta
    segundaCarta = carta;

    // Conta uma jogada
    jogadas++;

    contadorJogadas.textContent = jogadas;

    // Verifica se formou um par
    verificarPar();
}

// Função para verificar os pares
function verificarPar() {

    const gatinho1 = primeiraCarta.dataset.gatinho;
    const gatinho2 = segundaCarta.dataset.gatinho;

    // Se os gatinhos forem iguais
    if (gatinho1 === gatinho2) {

        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        paresEncontrados++;

        contadorPares.textContent = paresEncontrados + " / 12";

        // Limpa as cartas selecionadas
        primeiraCarta = null;
        segundaCarta = null;

        // Verifica se o jogador venceu
        verificarVitoria();

    } else {

        // Bloqueia os cliques enquanto as cartas fecham
        bloqueado = true;

        temporizador = setTimeout(() => {

            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            primeiraCarta = null;
            segundaCarta = null;

            bloqueado = false;
            temporizador = null;

        }, 1000);
    }
}

// Função para verificar a vitória
function verificarVitoria() {

    if (paresEncontrados === 12) {

        mensagem.textContent =
            "🎉 Parabéns! Você encontrou todos os gatinhos! 🐱💗";

    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {

    // Cancela o temporizador anterior, se existir
    clearTimeout(temporizador);
    temporizador = null;

    // Zera as variáveis
    jogadas = 0;
    paresEncontrados = 0;

    primeiraCarta = null;
    segundaCarta = null;

    bloqueado = false;

    // Atualiza os contadores
    contadorJogadas.textContent = "0";
    contadorPares.textContent = "0 / 12";

    // Limpa a mensagem
    mensagem.textContent = "";

    // Cria um novo tabuleiro embaralhado
    criarTabuleiro();
}

// Evento do botão reiniciar
botaoReiniciar.addEventListener("click", reiniciarJogo);

// Inicia o jogo automaticamente
criarTabuleiro();
