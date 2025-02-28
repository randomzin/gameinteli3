class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    preload() {
        this.load.font('Rainyhearts', 'assets/fonts/rainyhearts.ttf');
        this.load.font("guardioes_dados", "assets/fonts/vhs-gothic.ttf");
        this.load.image("fundo", "assets/imagens/fundooriginal.png");
        this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");
        this.load.image("titulo", "assets/imagens/MainMenuTitulo.png");
    }

    create() {
        const largura = this.cameras.main.width;
        const altura = this.cameras.main.height;

        //  Garante que o fundo cubra toda a tela
        this.fundo = this.add.image(0, 0, "fundo")
            .setOrigin(0, 0)
            .setDisplaySize(largura, altura);

        //this.add.image(largura / 2, altura - 465, "titulo")
           // .setOrigin(0.5)
           // .setScale(0.8);
        
        // Adicionando o grande título com a fonte vhs-gothic
        this.add.text(largura / 2, altura / 4, "Guardiões de Dados", {
            fontSize: "50px",  // Tamanho grande para o título
            fill: "#000080",   // Cor do texto
            fontFamily: "guardioes_dados", // Usando a fonte vhs-gothic
            align: "center",
            stroke: "#ADD8E6",  // Cor da borda (azul)
            strokeThickness: 6 
        }).setOrigin(0.5);

        // Movendo os botões um pouco para baixo
        this.createButton(largura / 2, altura - 260, "Jogar", () => this.iniciarJogo());
        this.createButton(largura / 2, altura - 170, "Configurações", () => console.log("Abrir configurações..."));
        this.createButton(largura / 2, altura - 80, "Acessibilidade", () => console.log("Fechando o jogo..."));

        // Adiciona evento para atualizar o fundo quando a tela for redimensionada
        this.scale.on('resize', this.atualizarFundo, this);
    }

    createButton(x, y, text, callback) {
        let botao = this.add.image(x, y, "botao_retangular")
            .setInteractive()
            .setScale(0.62); // Ajuste para melhor encaixe

        let texto = this.add.text(x, y, text, {
            fontSize: "28px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            align: "center",
            letterSpacing: 10
        }).setOrigin(0.5);

        botao.on("pointerover", () => botao.setTint(0xaaaaaa));
        botao.on("pointerout", () => botao.clearTint());
        botao.on("pointerdown", callback);
    }

    iniciarJogo() {
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.scene.start("Conversation");
            }
        });
    }

    atualizarFundo(gameSize) {
        this.cameras.main.setSize(gameSize.width, gameSize.height);
        this.fundo.setDisplaySize(gameSize.width, gameSize.height);
    }
}

window.MainMenu = MainMenu;
