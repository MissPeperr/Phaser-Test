import Phaser from "phaser";
import tankImg from "./assets/PNG/Large/Background.png";
import jelly4 from "./assets/PNG/Medium/Jellyfish4.png";
import fishFoodImg from "./assets/PNG/fish-food.png";
import smFishImg from "./assets/PNG/Medium/Guppy-Small-Normal.png"
import deadSmFishImg from "./assets/PNG/Medium/Guppy-Small-Dead.png";
import tap from "./assets/snd/tap.mp3";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1164,
  height: 764,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let tapSnd;
let tank;
let jelly;
let fishFood;
let smFish;
let smDedFish;
let tapCounter = 1;
let playDead;

function preload() {
  this.load.image('jelly4', jelly4);
  this.load.image('tank', tankImg);
  this.load.image('fish-food', fishFoodImg);
  this.load.image('smFish', smFishImg);
  this.load.image('smDedFish', deadSmFishImg);
  this.load.audio('tap', tap);
}

// TODO: add fish "flakes" falling from top of tank
// maybe it's a gravity thing? so I'll need physics
function create() {
  tank = this.add.image(582, 382, 'tank');
  tapSnd = this.sound.add('tap');

  jelly = this.add.image(400, 225, 'jelly4');
  // giving the jellyfish a name so we can target that image by name later
  jelly.name = "baby jelly";

  smFish = this.add.image(700, 500, 'smFish').setFlipX(true);
  smFish.name = "smol fish"

  smDedFish = this.add.image(700, 500, 'smDedFish');
  smDedFish.visible = false;

  // fishFood.toggleVisible();


  this.tweens.add({
    targets: jelly,
    props: {
      x: {
        value: 200,
        duration: 4000,
        flipX: true
      },
      y: {
        value: 500,
        duration: 8000
      },
    },
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
  })

  this.tweens.add({
    targets: smFish,
    props: {
      x: {
        value: Math.floor((Math.random() * 480) + 1),
        duration: 10000,
        flipX: true
      },
      y: {
        value: Math.floor((Math.random() * 190) + 1),
        duration: 8000,
      },
    },
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
  })

  playDead = this.tweens.add({
    targets: smDedFish,
    props: {
      x: {
        value: 700,
        duration: 10000,
        flipX: false
      },
      y: {
        value: 100,
        duration: 10000,
      },
    },
    ease: 'Sine.easeInOut',
    yoyo: false,
    paused: true
  })


  // fishFood = this.physics.add.group({
  //   key: 'fish-food',
  //   repeat: 11,
  //   setXY: { x: 12, y: 0, stepX: 70 }
  // });

  // bounce up and down
  // this.tweens.add({
  //   targets: jelly,
  //   y: 200,
  //   duration: 2500,
  //   ease: "Power2",
  //   yoyo: true,
  //   loop: -1
  // });

  tank.setInteractive();
  jelly.setInteractive();
  smFish.setInteractive();


  //this will listen for a down event
  //on every object that is set interactive
  // ugh can't use fat arrows
  this.input.on('gameobjectdown', function (pointer, gameObject) {
    if (gameObject.name === "baby jelly") {
      gameObject.angle += 45;
    }
    if (gameObject.name === "smol fish") {
      tapCounter++;
      if (tapCounter > 10) {
        gameObject.destroy();
        smDedFish.x = gameObject.x;
        smDedFish.y = gameObject.y;
        smDedFish.visible = true;
        playDead.play();
      }
    }
    tapSnd.play();


  });

}

function update() {

}

// function onObjectClicked(pointer, gameObject) {
//   if (gameObject.name === "baby jelly") {
//     gameObject.angle += 45;
//   }
//   tapSnd.play();
// }