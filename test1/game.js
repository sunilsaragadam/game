function preload() {
  this.load.image('bug1', 'imgs/bug_1.png');
  this.load.image('bug2', 'imgs/bug_2.png');
  this.load.image('bug3', 'imgs/bug_3.png');
  this.load.image('platform', 'imgs/platform.png');
  //this.load.image('codey', 'imgs/codey.png');
  this.load.spritesheet('arrows', 'imgs/arrows.png',{frameWidth:100, frameHeight:102.5});
  this.load.spritesheet('man', 'imgs/player.png',{frameWidth:64, frameHeight:64});
}

const gameState = {
  score: 0,
    gravity: 200
};

function create() {
    
   // let up = this.physics.add.sprite(240,450, 'arrows', 1).setOrigin(.5);
    let left = this.physics.add.sprite(100,550, 'arrows', 3).setOrigin(.5);
   // let down = this.physics.add.sprite(240,550, 'arrows', 4).setOrigin(.5);
    let right = this.physics.add.sprite(340,550, 'arrows', 5).setOrigin(.5);

    left.setCollideWorldBounds(true);
    right.setCollideWorldBounds(true);
    
   /*** up.setInteractive();
    up.on('pointerup',() => {
             console.log('clicked');
        gameState.man.anims.play('up', true);
        gameState.man.setVelocityY(-180);
         });***/
    right.setInteractive();
    left.setInteractive();
    right.on('pointerup',() => {
             console.log('clicked');
        gameState.man.anims.play('right', true);
        gameState.man.setVelocityX(150);
         });
    left.on('pointerup',() => {
             console.log('clicked');
        gameState.man.anims.play('left', true);
        gameState.man.setVelocityX(-150);
         });
    
   /*** down.setInteractive();
    down.on('pointerup',() => {
             console.log('clicked');
        gameState.man.anims.play('down', true);
        gameState.man.setVelocityY(180);
         });***/
    
    
gameState.man = this.physics.add.sprite(225, 450, 'man').setScale(.5);

   this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('man', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('man', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('man', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('man', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
        key:'idle',
        frames: [{ key:'man',frame: 0 }],
        frameRate: 10
    });
    
//gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);
  
  const platforms = this.physics.add.staticGroup();

  platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

  gameState.scoreText = this.add.text(195, 485, 'Score: 0', { fontSize: '15px', fill: '#be34fa' });

  //gameState.player.setCollideWorldBounds(true);
    gameState.man.setCollideWorldBounds(true);

  //this.physics.add.collider(gameState.player, platforms);
  
	gameState.cursors = this.input.keyboard.createCursorKeys();

  const bugs = this.physics.add.group();

  const bugList = ['bug1', 'bug2', 'bug3']

		const bugGen = () => {
			const xCoord = Math.random() * 640
			let randomBug = bugList[Math.floor(Math.random() * 3)]
			bugs.create(xCoord, 10, randomBug)
		}

  const bugGenLoop = this.time.addEvent({
    delay: 100,
    callback: bugGen,
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })
  
  this.physics.add.overlap(gameState.man, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();
    this.add.text(180, 250, 'Game Over', { fontSize: '25px', fill: '#ff0000' });
    this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
    
		// Add your code below:
    this.input.on('pointerup', () =>{
      gameState.score = 0;
    	this.scene.restart();
    });
  });
    this.physics.add.collider(gameState.man, platforms);
    gameState.man.setBounce(.1);
}

function update() {
/*** if (gameState.cursors.left.isDown) {
     gameState.man.anims.play('left', true);
    //gameState.player.setVelocityX(-160);
     gameState.man.setVelocityX(-180);
  } else if (gameState.cursors.right.isDown) {
    //gameState.player.setVelocityX(160);
      gameState.man.setVelocityX(180);
      gameState.man.anims.play('right', true);
  }else if (gameState.cursors.up.isDown) {
      gameState.man.anims.play('down', true);
      gameState.man.setVelocityY(-150);
  }else if(gameState.cursors.down.isDown) {
  gameState.man.anims.play('up', true);
      gameState.man.setVelocityY(150)
  }else {
   // gameState.player.setVelocityX(0);
     // gameState.man.setVelocityY(0);
      gameState.man.setVelocityX(0);
      gameState.man.anims.play('idle', true);
  }
    //speed increaser
    if(gameState.score % 50 === 0) {
        gameState.gravity += 1000;
    }
    ****/
}

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 600,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: gameState.gravity },
      enableBody: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
