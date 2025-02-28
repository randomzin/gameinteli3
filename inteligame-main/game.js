let cenaAnterior = null; // Variável global para armazenar a cena anterior

// Função para registrar a cena atual no localStorage
function registrarCenaAtual() {
    const cenasAtivas = game.scene.getScenes(true); // Obtém todas as cenas ativas
    if (cenasAtivas.length > 0) {
        const cenaAtual = cenasAtivas[0].scene.key; // Pega o nome da primeira cena ativa
        localStorage.setItem('cenaAnterior', cenaAtual); // Armazena no localStorage
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainMenu, Conversation, Gameinicial, Cenainicial],
    scale: {
        mode: Phaser.Scale.RESIZE, // Redimensiona automaticamente
        autoCenter: Phaser.Scale.CENTER_BOTH // Mantém centralizado
    }
};

// Instanciando o jogo
const game = new Phaser.Game(config);
