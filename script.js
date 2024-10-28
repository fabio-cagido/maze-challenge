let isDrawing = false;
let lastColor = null;
let pathValid = true;

const labirintoData = [
    [0,0, 0,0,'A',0,0,0,0,0,0,0,0,'V',0,0],
    [0,1, 1,0,1,1,0,1,1,1,1,1,0,1,1,0],
    ['V',1, 1,'V',1,1,0,1,1,1,1,1,0,1,1,0],
    [0,'A', 0,0,'V',0,0,0,0,0,'A',0,0,0,0,0],
    [0,1, 1,0,1,1,0,1,1,0,1,1,1,1,1,'A'],
    [0,1, 1,0,1,1,'V',1,1,'A',1,1,1,1,1,0],
    [0,0,'V',0,0,0,0,0,0,0,0,0,'V',0,0,0],
    ['A',1,1,1,1,1,1,1,'V',1,1,1,1,1,1,1]
];

const labirintoElement = document.getElementById("labirinto");

// Função para criar o labirinto
function createLabirinto() {
    labirintoData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");

            // Adiciona classes de estilo conforme o tipo de célula
            if (cell === 1) {
                cellElement.classList.add("block");
            } else if (cell === 'A') {
                cellElement.classList.add("amarela");
            } else if (cell === 'V') {
                cellElement.classList.add("verde");
            }

            // Adiciona a classe de entrada e saída
            if (rowIndex === 7 && colIndex === 0) {
                cellElement.classList.add("entrada"); // Entrada na última linha, primeira coluna
            }
            if (rowIndex === 7 && colIndex === 8) {
                cellElement.classList.add("saida"); // Saída na última linha, nona coluna
            }

            // Eventos para começar e desenhar o caminho
            cellElement.addEventListener("mousedown", () => startPath(cellElement, cell));
            cellElement.addEventListener("mouseenter", () => tracePath(cellElement, cell));
            cellElement.addEventListener("mouseup", endPath);

            labirintoElement.appendChild(cellElement);
        });
    });
}

function startPath(cellElement, cell) {
    // Verifica se o usuário está iniciando o traçado a partir da entrada
    if (!cellElement.classList.contains("entrada")) {
        alert("Por favor, comece o traçado a partir da célula de entrada.");
        
        // Reset do caminho e recarrega a página
        location.reload();
        return; // Impede o início do traçado em outras células
    }

    // Reinicia o estado do caminho e variáveis de controle
    isDrawing = true;
    lastColor = null;
    pathValid = true;

    // Remove a classe "selected" de todas as células para um novo início
    document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"));
    
    tracePath(cellElement, cell); // Marca a primeira célula no caminho
}



function tracePath(cellElement, cell) {
    if (isDrawing && cell !== 1) { // Evita blocos
        if (cell === 'A' || cell === 'V') {
            // Verifica a alternância de cores
            if (lastColor && lastColor === cell) {
                pathValid = false;
            }
            lastColor = cell;
        }
        cellElement.classList.add("selected"); // Marca o caminho visualmente
    }
}

function endPath() {
    isDrawing = false;
    
    // Verifica se o caminho terminou na célula de saída
    const endCell = document.querySelector(".saida.selected");

    if (endCell && pathValid) {
        alert("Parabéns! Caminho válido e alternância correta!");
        location.reload();
    } else if (endCell) {
        alert("Erro: Caminho não respeitou a alternância de cores.");
        location.reload();
    } else {
        alert("Caminho incompleto. Certifique-se de chegar à saída.");
        location.reload();
    }
}


createLabirinto();
