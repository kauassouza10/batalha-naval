let tamanho = 5;

let tabuleiroJogador = [];
let tabuleiroInimigo = [];

let tiros = 10;

function criarTabuleiro() {
    let tabuleiro = [];
    for (let i = 0; i < tamanho; i++) {
        let linha = [];
        for (let j = 0; j < tamanho; j++) {
            linha.push(0);
        }
        tabuleiro.push(linha);
    }
    return tabuleiro;
}

function colocarNavios(tabuleiro, quantidade) {
    for (let n = 0; n < quantidade; n++) {
        let x = Math.floor(Math.random() * tamanho);
        let y = Math.floor(Math.random() * tamanho);
        tabuleiro[x][y] = 1;
    }
}

function desenharTabuleiro(id, clicavel) {
    let grade = document.getElementById(id);
    grade.innerHTML = "";
    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");
            if (clicavel) {
                celula.addEventListener("click", function () {
                    atirar(i, j);
                });
            } else {
                if (tabuleiroJogador[i][j] === 1) {
                    celula.classList.add("navio");
                }
            }
            grade.appendChild(celula);
        }
    }
}

function atirar(x, y) {
    if (tiros <= 0) {
        escreverLog("Você não tem mais tiros!");
        return;
    }

    let grade = document.getElementById("tabuleiroInimigo");
    let index = x * tamanho + y;
    let celula = grade.children[index];

    if (celula.classList.contains("acerto") || celula.classList.contains("erro")) {
        escreverLog("Você já atirou aqui!");
        return;
    }

    if (tabuleiroInimigo[x][y] === 1) {
        celula.classList.add("acerto");
        escreverLog("Acertou um navio em (" + x + "," + y + ")");
    } else {
        celula.classList.add("erro");
        escreverLog("Água em (" + x + "," + y + ")");
    }

    tiros--;
    document.getElementById("tirosRestantes").innerText = "Tiros restantes: " + tiros;

    if (tiros === 0) {
        escreverLog("Fim de jogo! Reinicie para tentar de novo.");
    }
}

function escreverLog(texto) {
    let log = document.getElementById("log");
    let linha = document.createElement("p");
    linha.innerText = texto;
    log.appendChild(linha);
}

function reiniciar() {
    tiros = 10;
    tabuleiroJogador = criarTabuleiro();
    tabuleiroInimigo = criarTabuleiro();
    colocarNavios(tabuleiroJogador, 3);
    colocarNavios(tabuleiroInimigo, 3);
    desenharTabuleiro("tabuleiroJogador", false);
    desenharTabuleiro("tabuleiroInimigo", true);
    document.getElementById("tirosRestantes").innerText = "Tiros restantes: " + tiros;
    document.getElementById("log").innerHTML = "";
}

document.getElementById("botaoAtirar").addEventListener("click", function () {
    let entrada = document.getElementById("entradaManual").value.trim();
    if (entrada === "") return;

    let x, y;
    if (entrada.includes(" ")) {
        let partes = entrada.split(" ");
        x = parseInt(partes[0]);
        y = parseInt(partes[1]);
    } else {
        let letra = entrada[0].toUpperCase();
        let numero = parseInt(entrada[1]) - 1;
        x = letra.charCodeAt(0) - 65;
        y = numero;
    }

    if (!isNaN(x) && !isNaN(y) && x >= 0 && y >= 0 && x < tamanho && y < tamanho) {
        atirar(x, y);
    } else {
        escreverLog("Entrada inválida! Use A1 ou 2 3");
    }
    document.getElementById("entradaManual").value = "";
});

document.getElementById("botaoReiniciar").addEventListener("click", reiniciar);

reiniciar();
