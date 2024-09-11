let x, y, enemyDist;

function preload() {
  sky = loadImage('./assets/sky.png')
  img = loadImage('./assets/tiles.jpg')
  steve = loadImage('./assets/chark.jpg')
  enemy = loadImage('./assets/enemy.png')
  char = loadModel('./assets/char.obj')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  x = 0;
  y = -90;
  z = 0;
  enemyDist = -300
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
  rotateY(radians(-y * 4))
  noStroke()
  //floor
  push()
  translate(100, 2, -100)
  textureMode(NORMAL)
  textureWrap(REPEAT)
  texture(img)
  box(width / 2, 2, width / 2)
  pop()
  //walls
  push()
  texture(img)
  translate(200, -48, -200)
  box(200, 100, 200)
  pop()
  push()
  texture(img)
  translate(-200, -48, -200)
  box(2, 100, 200)
  pop()
  //skybox
  texture(sky)
  box(width * 10, width * 10, width * 10)
  pop()

  //character
  push()
  texture(steve)
  rotateY(charR)
  translate(0, -13)
  box(15, 30, 2)
  pop()


  //enemies
  push()
  rotateY(radians(-y * 4))

  //enemy north
  push()
  texture(enemy)
  translate(0, -30, enemyDist)
  box(90, 60, 20)
  pop()

  //enemy east
  push()
  texture(enemy)
  rotateY(radians(-90))
  fill(255, 100, 0)
  translate(0, -30, enemyDist)
  box(90, 60, 20)
  pop()

  pop()
  // //enemy south
  // push()
  // rotateY(radians(-y * 4))
  // texture(enemy)
  // translate(0, -30, 300)
  // box(90, 60, 20)
  // pop()

  // //enemy west
  // push()
  // rotateY(radians(-y * 4))
  // texture(enemy)
  // fill(255, 100, 0)
  // translate(-300, -30, 0)
  // box(90, 60, 20)
  // pop()

  //webcam
  // push()
  // noStroke()
  // translate(-60, -50, -40)
  // texture(capture)
  // box(60, 40, 1)
  // pop()

  //gizmo
  // stroke(255, 0, 0)
  // line(0, 0, 0, 800, 0, 0)
  // stroke(0, 255, 0)
  // line(0, 0, 0, 0, -800, 0)
  // stroke(0, 0, 255)
  // line(0, 0, 0, 0, 0, -800)

  //attack beam
  stroke(255, 0, 0)
  strokeWeight(4)
  line(0, -20, 0, 0, -25, -800)


  //player movements
  if (keyIsPressed) {

    if (keyCode === LEFT_ARROW) {
      y++
      charR = radians(10)
    } else if (keyCode === RIGHT_ARROW) {
      y--
      charR = radians(-10)
    }
  } else {
    charR = radians(0);
  }

  //game camera
  // camera(10, -50, 100, 20, -40, 0)

  //editing camera
  camera(10, -50, 100, 20, -40, 0)
  strokeWeight(1)
  debugMode(AXES)

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}