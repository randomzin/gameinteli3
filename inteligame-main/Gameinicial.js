class Gameinicial extends Phaser.Scene {
    constructor() {
        super({ key: "Gameinicial" });
    }

    preload() {
        this.load.image("feedback_positivo", "assets/imagens/correto.png");
        this.load.image("feedback_negativo", "assets/imagens/incorreto.png");
        this.load.image("background", "assets/imagens/fundoMiniGame1.png");
        this.load.image("botao_verde", "assets/imagens/botaoverde.png");
        this.load.image("botao_vermelho", "assets/imagens/botaovermelho.png");

        // Carregar a fonte customizada
        this.load.bitmapFont('rainyhearts', 'assets/fonts/rainyhearts.png', 'assets/fonts/rainyhearts.fnt');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(centerX, centerY, "background")
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.botaoVerde = this.add.image(centerX - 250, centerY + 240, "botao_verde")
            .setScale(0.11)
            .setInteractive()
            .on("pointerdown", () => this.verificarBotao(true));

        this.botaoVermelho = this.add.image(centerX + 200, centerY + 240, "botao_vermelho")
            .setScale(0.11)
            .setInteractive()
            .on("pointerdown", () => this.verificarBotao(false));

        // Imagens de feedback
        this.feedbackPositivo = this.add.image(centerX, centerY, "feedback_positivo")
            .setScale(0.7)
            .setVisible(false);

        this.feedbackNegativo = this.add.image(centerX, centerY, "feedback_negativo")
            .setScale(0.7)
            .setVisible(false);

        // Texto de "Avançar"
        this.botaoAvancar = this.add.text(centerX, centerY + 190, ">>", {
            font: "40px rainyhearts",
            fill: "#FFFFFF",
            align: "center"
        }).setOrigin(0.5)
          .setInteractive()
          .setVisible(false)
          .on("pointerdown", () => this.avancarPergunta());

        this.gameConcluido = this.add.text(centerX, centerY, "Game concluído!", {
            font: "40px rainyhearts",
            fill: "#FFFFFF",
            fontWeight: "bold"
        }).setOrigin(0.5).setVisible(false);

        this.perguntaTexto = this.add.text(centerX - 30, 270, '', {
            fontSize: '15px',
            fill: '#000',
            wordWrap: { width: 250 },
            align: "center"
        }).setOrigin(0.5);

        this.mensagemAdicional = this.add.text(centerX, centerY + 60, '', {
            font: "31px rainyhearts", // Usando a fonte rainyhearts
            fill: '#FFFFFF',
            fontWeight: "bold", 
            wordWrap: { width: 500 },
            align: "center"
        }).setOrigin(0.5).setVisible(false);

        this.perguntas = [
            { pergunta: 'Um estudante de 18 anos faz o cadastro para um curso online gratuito e fornece os seguintes dados:\n\nNome\nIdade\nE-mail\nCidade', respostaCorreta: true },
            { pergunta: 'Uma jovem de 22 anos se inscreve para uma vaga de emprego em um site de recrutamento e preenche um formulário com as seguintes informações:\n\nNome\nIdade\nEndereço\nTelefone\nReligião\nExperiência profissional', respostaCorreta: false },
            { pergunta: 'Um adolescente de 16 anos cria uma conta em um aplicativo de exercícios e preenche um formulário com as seguintes informações:\n\nNome\nIdade\nAltura e peso\nFrequência cardíaca média\nHistórico de doenças na família', respostaCorreta: false },
            { pergunta: 'Ao fazer o cadastro em um site online um jovens de 20 anos preencheu um formulário com as seguintes informações:\n\nNome\nIdade\nCEP\nEndereço\nTelefone\nGênero\nRaça', respostaCorreta: false },
            { pergunta: 'Ao fazer parte de um sorteio online e receber o prêmio na sua casa um jovens de 14 anos preencheu um formulário com as seguintes informações:\n\nNome\nIdade\nCPF\nCEP\nEndereço\nTelefone\nGênero', respostaCorreta: false },
        ];

        this.indice = 0;
        this.mostrarPergunta();
    }

    mostrarPergunta() {
        if (this.indice < this.perguntas.length) {
            this.perguntaTexto.setText(this.perguntas[this.indice].pergunta);
            this.perguntaTexto.setVisible(true);
            this.feedbackPositivo.setVisible(false);
            this.feedbackNegativo.setVisible(false);
            this.botaoAvancar.setVisible(false);
            this.botaoVerde.setInteractive();
            this.botaoVermelho.setInteractive();
            this.mensagemAdicional.setVisible(false); // Oculta a mensagem adicional ao mudar a pergunta
        } else {
            this.perguntaTexto.setText('Game concluído!');
            this.botaoVerde.setVisible(false);
            this.botaoVermelho.setVisible(false);
            this.botaoAvancar.setVisible(false);
            this.feedbackPositivo.setVisible(false);
            this.feedbackNegativo.setVisible(false);
            this.gameConcluido.setVisible(true);
            this.mensagemAdicional.setVisible(false); // Agora a mensagem será ocultada

            // Aguardar 2 segundos antes de fazer a transição suave
            this.time.delayedCall(2000, () => {
                // Iniciar a transição de fade
                this.cameras.main.fadeOut(1000, 0, 0, 0); // FadeOut de 1 segundo

                // Quando o fadeOut for completado, troca a cena e faz o fadeIn
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start("Cenainicial");  // Muda para a cena Cenainicial

                    // Fazer o fadeIn na nova cena
                    this.cameras.main.fadeIn(1000, 0, 0, 0); // FadeIn de 1 segundo
                });
            });
        }
    }

    verificarBotao(escolhaUsuario) {
        let perguntaAtual = this.perguntas[this.indice];
        if (escolhaUsuario === perguntaAtual.respostaCorreta) {
            this.feedbackPositivo.setVisible(true);
        } else {
            this.feedbackNegativo.setVisible(true);
        }

        // Mostrando a mensagem adicional sobre dados sensíveis
        if (this.indice === 0) { // Apenas para a primeira pergunta
            this.mensagemAdicional.setText("Nenhum desses dados é sensível, mas o CPF deve ser coletado apenas se for realmente necessário.");
            this.mensagemAdicional.setVisible(true);
        }

        if (this.indice === 1) { // Apenas para a primeira pergunta
            this.mensagemAdicional.setText("Religião é um dado sensível e não deveria ser solicitado sem uma justificativa válida");
            this.mensagemAdicional.setVisible(true);
        }

        if (this.indice === 2) { // Apenas para a primeira pergunta
            this.mensagemAdicional.setText("Dados de saúde e histórico são sensíveis e, sendo menor de idade, exigem consentimento dos pais.");
            this.mensagemAdicional.setVisible(true);
        }

        if (this.indice === 3) { // Apenas para a primeira pergunta
            this.mensagemAdicional.setText("Raça é um dado sensível e sem justificativa para uso.");
            this.mensagemAdicional.setVisible(true);
        }

        if (this.indice === 4) { // Apenas para a primeira pergunta
            this.mensagemAdicional.setText("A pessoa é menor de idade e precisa de consentimento dos pais para fornecer seus dados.");
            this.mensagemAdicional.setVisible(true);
        }

        this.perguntaTexto.setVisible(false);
        this.mensagemAdicional.setVisible(true);
        this.botaoVerde.disableInteractive();
        this.botaoVermelho.disableInteractive();
        this.botaoAvancar.setVisible(true).setDepth(1);
    }

    avancarPergunta() {
        this.indice++;
        this.mostrarPergunta();
    }
}
