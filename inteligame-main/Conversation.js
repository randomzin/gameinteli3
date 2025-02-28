class Conversation extends Phaser.Scene {
    constructor() {
        super({ key: "Conversation" });
    }

    preload() {
        this.load.font('Rainyhearts', 'assets/fonts/rainyhearts.ttf');
        this.load.image("caixa_dialogo", "assets/imagens/caixadialogo.png");
        this.load.image("fundoconversation", "assets/imagens/fundoconversation.png");
        this.load.image("homemcabelopreto", "assets/imagens/homemcabelopreto.png");
        this.load.image("cientista", "assets/imagens/cientistacientista.png");
        this.load.image("fundodezmand", "assets/imagens/fundo.webp");
        this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");
        this.load.image("celular", "assets/imagens/celularasset.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(centerX, centerY, "fundoconversation")
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.celular = this.add.image(this.cameras.main.width - 190, 70, "celular")
            .setOrigin(0.5)
            .setScale(1.1)
            .setVisible(false)
            .setInteractive();

        // Registrar a cena antes de ir para 'dezmand.html'
        this.celular.on("pointerdown", () => {
            // Registra a cena atual antes de redirecionar para 'dezmand.html'
            if (window.game) {
                registrarCenaAtual();
            }
            window.location.href = "dezmand.html";
        });

        this.dialogos = [
            { personagem: "Agente P.", texto: "Bem-vindo à Agência Global de Proteção de Dados recruta. A partir de hoje, você não é mais um civil qualquer.", img: "cientista" },
            { personagem: "Agente P.", texto: "Seu codinome agora é DPO Hero.", img: "cientista" },
            { personagem: "Agente H.", texto: "É um grande prazer ser selecionado para trabalhar em prol da sociedade.", img: "homemcabelopreto" },
            { personagem: "Agente P.", texto: "Cada dia, milhões de pessoas têm suas informações expostas.", img: "cientista" },
            { personagem: "Agente P.", texto: "Aqui nossa missão é garantir que a Lei de Proteção de Dados seja respeitada em todos os lugares.", img: "cientista" },
            { personagem: "Agente P.", texto: "No canto superior você tem acesso aos 10 mandamentos.", img: "cientista" },
            { personagem: "Agente P.", texto: "Podendo consultar a qualquer momento as diretrizes da Lei Geral de Proteção de Dados que garante a segurança e privacidade dos dados.", img: "cientista"},
            { personagem: "Agente P.", texto: "Antes de ir para a ação vamos aprender um pouco mais sobre dados.", img: "cientista" }
        ];

        this.indice = 0;

        this.personagemEsquerda = this.add.image(centerX - 300, centerY + 30, "homemcabelopreto").setOrigin(0.5).setScale(0.8);
        this.personagemDireita = this.add.image(centerX + 440, centerY, "cientista").setOrigin(0.5).setScale(0.9);

        const caixaDialogo = this.add.image(centerX, centerY + 130, "caixa_dialogo").setOrigin(0.5).setScale(0.85);

        this.personagemTexto = this.add.text(centerX - 260, centerY + 50, "", {
            fontSize: "34px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",  
        }).setOrigin(0, 0.5);

        this.textoAtual = this.add.text(centerX - 260, centerY + 90, "", {
            fontSize: "27px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            wordWrap: { width: 450, useAdvancedWrap: true }
        }).setOrigin(0, 0);

        this.atualizarTexto();

        this.botaoVoltar = this.add.text(centerX - 280, centerY + 200, "VOLTAR", {
            fontSize: "24px",
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
        }).setInteractive().on("pointerdown", () => this.dialogoAnterior());

        let botaoContinuar = this.add.text(centerX + 170, centerY + 200, "CONTINUAR", {
            fontSize: "24px",
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
        }).setInteractive().on("pointerdown", () => this.proximoDialogo());

        let botaoMenu = this.add.image(100, this.cameras.main.height - 560, "botao_retangular").setInteractive().setOrigin(0.5).setScale(0.5);
        let textoMenu = this.add.text(100, this.cameras.main.height - 60, "MENU", {
            fontSize: "35px",
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            fontStyle: "bold"
        })
        .setInteractive().setOrigin(0.5, 14.78);

        botaoMenu.on("pointerdown", () => this.scene.start("MainMenu"));
        textoMenu.on("pointerdown", () => this.scene.start("MainMenu"));

        // Atualizar a visibilidade do botão "VOLTAR"
        this.atualizarVisibilidadeVoltar();
    }

    atualizarTexto() {
        let fala = this.dialogos[this.indice];
        this.personagemTexto.setText(fala.personagem);
        this.textoAtual.setText(fala.texto);

        this.personagemEsquerda.setVisible(fala.img === "homemcabelopreto");
        this.personagemDireita.setVisible(fala.img === "cientista");
    }

    atualizarVisibilidadeVoltar() {
        if (this.indice > 0) {  
            this.botaoVoltar.setVisible(true);
        } else {
            this.botaoVoltar.setVisible(false);
        }
    }

    proximoDialogo() {
        if (this.indice < this.dialogos.length - 1) {
            this.indice++;
            this.atualizarTexto();
            this.atualizarVisibilidadeVoltar(); 

            if (this.indice === 6) {
                this.celular.setVisible(true); 
            }

        } else {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start("Gameinicial");
            });
        }
    }

    dialogoAnterior() {
        if (this.indice > 0) { 
            this.indice--;
            this.atualizarTexto();
        }
        this.atualizarVisibilidadeVoltar();  
    }
}

window.Conversation = Conversation;
