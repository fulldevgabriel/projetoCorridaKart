const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};
const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getFinalPoints() {
    let block = await getRandomBlock();
    let dicePlayer1 = await rollDice();
    let dicePlayer2 = await rollDice();
    let finalPoints1;
    let finalPoints2;

    console.log(`Pista sorteada: ${block}`);

    switch (true) {
        case block === "RETA":
            finalPoints1 = player1.VELOCIDADE + dicePlayer1;
            finalPoints2 = player2.VELOCIDADE + dicePlayer2;
            break;
        case block === "CURVA":
            finalPoints1 = player1.MANOBRABILIDADE + dicePlayer1;
            finalPoints2 = player2.MANOBRABILIDADE + dicePlayer2;
            break;
        case block === "CONFRONTO":
            finalPoints1 = player1.PODER + dicePlayer1;
            finalPoints2 = player2.PODER + dicePlayer2;
            break;
    }

    return { finalPoints1, finalPoints2 };
}

async function getWinner() {
    let { finalPoints1, finalPoints2 } = await getFinalPoints(); 
    const nomePlayer1 = player1.NOME;
    const nomePlayer2 = player2.NOME;

    console.log(`O jogador ${nomePlayer1} rolou um dado e obteve um total de ${finalPoints1} pontos!`);
    console.log(`O jogador ${nomePlayer2} rolou um dado e obteve um total de ${finalPoints2} pontos!`);

    if (finalPoints1 > finalPoints2) {
        player1.PONTOS += 1
        player2.PONTOS -= 1
        console.log(`${nomePlayer1} venceu!`);
    } else if (finalPoints2 > finalPoints1) {
        player2.PONTOS += 1
        player1.PONTOS -= 1
        console.log(`${nomePlayer2} venceu!`);
    } else {
        console.log("A corrida empatou!");
    }
}

async function main() {
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando!`);

    for (let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`);
        await getWinner();
    }

    if(player1.PONTOS < 0){
        player1.PONTOS = 0
    }
    if(player2.PONTOS < 0){
        player2.PONTOS = 0
    }

    console.log("\nResultado Final da Corrida:");
    console.log(`${player1.NOME} acumulou ${player1.PONTOS} pontos.`);
    console.log(`${player2.NOME} acumulou ${player2.PONTOS} pontos.`);

    if (player1.PONTOS > player2.PONTOS) {
        console.log(`${player1.NOME} venceu a corrida!`);
    } else if (player2.PONTOS > player1.PONTOS) {
        console.log(`${player2.NOME} venceu a corrida!`);
    } else {
        console.log("A corrida terminou empatada!");
    }
}

main();
