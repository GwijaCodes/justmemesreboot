let x, y, skyR, charTex, enemyDist, enemyDist1, count, facing;

function preload() {
  sky = loadImage('./assets/skybox.png')
  img = loadImage('./assets/tiles.jpg')
  idle = loadImage('./assets/chark.jpg')
  attack = loadImage('./assets/attack.gif')
  enemy = loadImage('./assets/enemy.png')
  enemy1 = loadImage('./assets/enemy1.png')
  skybox = loadModel('./assets/skybox.obj')
  char = loadModel('./assets/char.obj')
  stage = loadModel('./assets/stage.obj')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  x = 0;
  y = -90;
  z = 0;
  skyR = 0;
  charTex = idle;
  enemyDist = -300;
  enemyDist1 = -300;
  facing = 'east';

  count = 0;
  charR = radians(0);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
}

function draw() {
  background(255, 200, 180);
  capture.hide()
  noStroke()

  //scene
  push()
  rotateY(radians(-y))
  noStroke()
  //stage
  push()
  scale(1, .4, 1)
  rotateY(radians(-180))
  texture(img)
  model(stage)
  pop()
  //skybox
  push()
  texture(sky)
  scale(10)
  rotateY(radians(skyR++ / 10))
  model(skybox)
  pop()
  pop()//closing scene

  //player
  push()
  texture(charTex)
  rotateY(charR)
  translate(0, -13)
  box(15, 30, 2)
  pop()


  //ENEMIES
  push()
  rotateY(radians(-y))

  //enemy north
  push()
  texture(enemy)
  translate(0, -30, enemyDist)
  box(90, 60, 20)
  pop()

  //enemy east
  push()
  texture(enemy1)
  rotateY(radians(-90)) //this changes which tunnel the enemy comes from
  translate(0, -30, enemyDist1)
  box(90, 60, 20)
  pop()

  pop()

  enemyDist = enemyDist + .3
  enemyDist1 = enemyDist1 + .1

  //webcam
  // push()
  // noStroke()
  // translate(-60, -50, -40)
  // texture(capture)
  // box(60, 40, 1)
  // pop()

  //gizmo
  // push()
  // rotateY(radians(-y * 10))
  // stroke(255, 0, 0)
  // line(0, 0, 0, 800, 0, 0)
  // stroke(0, 255, 0)
  // line(0, 0, 0, 0, -800, 0)
  // stroke(0, 0, 255)
  // line(0, 0, 0, 0, 0, -800)
  // pop()

  //attack beam
  stroke(255, 255, 0)
  strokeWeight(4)
  // line(0, -20, 0, 0, -25, -800)




  //game camera
  // camera(10, -50, 100, 20, -40, 0)

  //editing camera
  camera(10, -50, 90, 20, -40, 0)

  //player movements
  console.log(facing)
  y = y + count * 7;

} //closing draw

function keyPressed() {
  if (keyCode === LEFT_ARROW || key === 'a' && y != 0) {
    count++
    setTimeout(() => { y = 0; count = 0; facing = 'north' }, 200)
    charR = radians(10)
  } else if (keyCode === RIGHT_ARROW || key === 'd' && y != -90) {
    count--
    setTimeout(() => { y = -90; count = 0; facing = 'east' }, 200)

    charR = radians(-10)
  }
  if (key === 'k') {
    charTex = attack
    setTimeout(() => { charTex = idle }, 1000)

    facing == 'north' ? enemyDist = -300 : enemyDist1 = -300
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}