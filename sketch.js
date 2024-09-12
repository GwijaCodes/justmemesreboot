let x, y, skyR, enemyDist, count;

function preload() {
  sky = loadImage('./assets/sky.png')
  img = loadImage('./assets/tiles.jpg')
  steve = loadImage('./assets/chark.jpg')
  enemy = loadImage('./assets/enemy.png')
  enemy1 = loadImage('./assets/enemy1.png')
  char = loadModel('./assets/char.obj')
  stage = loadModel('./assets/stage.obj')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  x = 0;
  y = -90;
  z = 0;
  skyR = 0;
  enemyDist = -300

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
  scale(1, .8, 1)
  rotateY(radians(-180))
  texture(img)
  model(stage)
  pop()
  //skybox
  push()
  texture(sky)
  rotateY(radians(skyR++ / 10))
  box(width * 6, width * 6, width * 6)
  pop()
  pop()

  //character
  push()
  texture(steve)
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
  translate(0, -30, enemyDist)
  box(90, 60, 20)
  pop()

  pop()

  enemyDist = enemyDist + .1

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
  line(0, -20, 0, 0, -25, -800)




  //game camera
  // camera(10, -50, 100, 20, -40, 0)

  //editing camera
  camera(10, -50, 100, 20, -40, 0)

  //player movements
  console.log(y)
  y = y + count * 8;

} //closing draw

function keyPressed() {
  if (keyCode === LEFT_ARROW || key === 'a' && y != 0) {
    count++
    setTimeout(() => { y = 0; count = 0 }, 200)
    charR = radians(10)
  } else if (keyCode === RIGHT_ARROW || key === 'd' && y != -90) {
    count--
    setTimeout(() => { y = -90; count = 0 }, 200)

    charR = radians(-10)
  } else if (key === 'k') {
    enemyDist = -300
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}