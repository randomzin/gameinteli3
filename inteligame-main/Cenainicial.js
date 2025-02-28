class Cenainicial extends Phaser.Scene {
    constructor() {
        super({ key: "Cenainicial" });
    }

    preload() {
        // Carrega o fundo da cena
        this.load.image("Cena1", "assets/imagens/fundocenaini.png");

        // Carrega as imagens individuais do personagem andando para os lados
        this.load.image("bonecodir0", "assets/personagens/bonecodir0.png"); // Idle lateral
        this.load.image("bonecodir1", "assets/personagens/bonecodir1.png");
        this.load.image("bonecodir2", "assets/personagens/bonecodir2.png");
        this.load.image("bonecodir3", "assets/personagens/bonecodir3.png");
        this.load.image("bonecodir4", "assets/personagens/bonecodir4.png");
        this.load.image("bonecodir5", "assets/personagens/bonecodir5.png");
        this.load.image("bonecodir6", "assets/personagens/bonecodir6.png");

        // Carrega as imagens individuais do personagem andando para baixo
        this.load.image("bonecobax0", "assets/personagens/bonecobax0.png"); // Idle para baixo
        this.load.image("bonecobax1", "assets/personagens/bonecobax1.png");
        this.load.image("bonecobax2", "assets/personagens/bonecobax2.png");
        this.load.image("bonecobax3", "assets/personagens/bonecobax3.png");
        this.load.image("bonecobax4", "assets/personagens/bonecobax4.png");
        this.load.image("bonecobax5", "assets/personagens/bonecobax5.png");
        this.load.image("bonecobax6", "assets/personagens/bonecobax6.png");

        // Carrega as imagens individuais do personagem andando para cima
        this.load.image("bonecocim0", "assets/personagens/bonecocim0.png"); // Idle para cima
        this.load.image("bonecocim1", "assets/personagens/bonecocim1.png");
        this.load.image("bonecocim2", "assets/personagens/bonecocim2.png");
        this.load.image("bonecocim3", "assets/personagens/bonecocim3.png");
        this.load.image("bonecocim4", "assets/personagens/bonecocim4.png");
        this.load.image("bonecocim5", "assets/personagens/bonecocim5.png");
        this.load.image("bonecocim6", "assets/personagens/bonecocim6.png");
    }

    create() {
        // Calcula o centro da tela para posicionar os elementos corretamente
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
    
        // Ajustar a câmera para estar mais próxima do personagem (zoom)
        this.cameras.main.setZoom(1.5);  // Zoom 1.5 para aproximar
    
        // Adiciona o fundo da cena ajustando a proporção para 16:9
        const background = this.add.image(centerX, centerY, "Cena1")
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width * 1.5, this.cameras.main.height * 1.5);
    
        // Adiciona o sprite do personagem (começa parado de frente)
        this.player = this.add.sprite(centerX, centerY, "bonecobax0")
            .setOrigin(0.5)
            .setScale(1.7);
    
        // Criar animações de andar para os lados
        this.anims.create({
            key: 'walk-right',
            frames: [
                { key: 'bonecodir1' }, { key: 'bonecodir2' }, { key: 'bonecodir3' },
                { key: 'bonecodir4' }, { key: 'bonecodir5' }, { key: 'bonecodir6' }
            ],
            frameRate: 10, repeat: -1
        });
    
        this.anims.create({
            key: 'walk-left',
            frames: [
                { key: 'bonecodir1' }, { key: 'bonecodir2' }, { key: 'bonecodir3' },
                { key: 'bonecodir4' }, { key: 'bonecodir5' }, { key: 'bonecodir6' }
            ],
            frameRate: 10, repeat: -1
        });
    
        // Criar animação de andar para baixo
        this.anims.create({
            key: 'walk-down',
            frames: [
                { key: 'bonecobax1' }, { key: 'bonecobax2' }, { key: 'bonecobax3' },
                { key: 'bonecobax4' }, { key: 'bonecobax5' }, { key: 'bonecobax6' }
            ],
            frameRate: 10, repeat: -1
        });
    
        // Criar animação de andar para cima
        this.anims.create({
            key: 'walk-up',
            frames: [
                { key: 'bonecocim1' }, { key: 'bonecocim2' }, { key: 'bonecocim3' },
                { key: 'bonecocim4' }, { key: 'bonecocim5' }, { key: 'bonecocim6' }
            ],
            frameRate: 10, repeat: -1
        });
    
        // Criar animações de idle
        this.anims.create({ key: 'idle-down', frames: [{ key: 'bonecobax0' }], frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'idle-up', frames: [{ key: 'bonecocim0' }], frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'idle-side', frames: [{ key: 'bonecodir0' }], frameRate: 10, repeat: -1 });
    
        // Definir controles do teclado - captura as setas do teclado para movimentação.
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Definir a velocidade de movimentação
        this.speed = 270;
    
        // Direção anterior do personagem
        this.lastDirection = "down";
    
        // Configurar a câmera para seguir o personagem
        this.cameras.main.startFollow(this.player);
    
        // Limitar os limites da câmera para o tamanho do fundo
        this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight);
    }
    

    update() {
        let moving = false;

        // Movimento horizontal
        if (this.cursors.left.isDown) {
            this.player.x -= this.speed * this.game.loop.delta / 1000; // Movimenta para a esquerda
            this.player.setFlipX(true); // Inverte o sprite para esquerda
            this.player.play('walk-left', true); // Ativa animação de andar para a esquerda
            this.lastDirection = "side";
            moving = true;
        } else if (this.cursors.right.isDown) {
            this.player.x += this.speed * this.game.loop.delta / 1000; // Movimenta para a direita
            this.player.setFlipX(false); // Não inverte o sprite
            this.player.play('walk-right', true); // Ativa animação de andar para a direita
            this.lastDirection = "side";
            moving = true;
        }

        // Movimento para baixo
        if (this.cursors.down.isDown) {
            this.player.y += this.speed * this.game.loop.delta / 1000;
            this.player.play('walk-down', true);
            this.lastDirection = "down";
            moving = true;
        }

        // Movimento para cima
        if (this.cursors.up.isDown) {
            this.player.y -= this.speed * this.game.loop.delta / 1000;
            this.player.play('walk-up', true);
            this.lastDirection = "up";
            moving = true;
        }

        // Se não estiver se movendo, ativa a animação de idle correspondente
        if (!moving) {
            if (this.lastDirection === "down") {
                this.player.play('idle-down', true);
            } else if (this.lastDirection === "up") {
                this.player.play('idle-up', true);
            } else {
                this.player.play('idle-side', true);
            }
        }
    }
}

// Registrar a cena
window.Cenainicial = Cenainicial;
