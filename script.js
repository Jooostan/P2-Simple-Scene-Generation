let bugs = [];
let bugs2 = [];
let trees = [];
let trees_back = [];

function setup() {
  restart();
}

class Firefly{
  constructor(x, y){
    this.x = x
    this.y = y
    this.n = noise(this.x) * width;
    this.m = noise(this.y) * width;
  }
  move(){
    this.x += 0.003;
    this.y += 0.003;
    this.n = noise(this.x) * width;
    this.m = noise(this.y) * width;
  }
  show(){
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'white';
    noStroke();
    fill('yellow');
    ellipse(this.n + xParallax(0.0625), this.m + yParallax(0.0625), 10);
  }
}

class Tree{
  constructor(x, y, w, h, p){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.p = p;
  }
  show(){
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = '#123828';
    noStroke();
    rect(this.x + xParallax(this.p), this.y + yParallax(this.p), this.w, this.h);
  }
  
}

function draw() {
  // background('#10232E');
  background('#0d0e09');
  
  // Star
  fill('#FFFF99');
  star(mouseX, mouseY, 30/5, 70/5, 5);
  
  // Background Trees
  fill('#202010');
  for(let j = 0; j < trees.length; j++){
    trees_back[j].show();
  }
  
  // Background Fireflies
  for(let i = 0; i < bugs2.length; i++){
    bugs2[i].move();
    bugs2[i].show();
  }
  
  // Bushes?
  fill('#0c291b');
  drawingContext.shadowBlur = 0;
  ellipse(350 + xParallax(0.125), 450 + yParallax(0.125), 400, 300);
  ellipse(100 + xParallax(0.125), 500 + yParallax(0.125), 400, 300);
  
  // Foreground Trees
  fill('#1C1C0C');
  for(let j = 0; j < trees.length; j++){
    trees[j].show();
  }
  
  // Foreground Fireflies
  for(let i = 0; i < bugs.length; i++){
    bugs[i].move();
    bugs[i].show();
  }
  
}

function xParallax(scale){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    return (((-width/2) + mouseX)*scale);
  }
  return 0;
}

function yParallax(scale){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)
    return (((-height/2) + mouseY)*scale);
  return 0;
}


// https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function restart(){
  createCanvas(400, 400);
  noCursor();
  
  // Firefly Maker
  // for(let i = 0; i < 100; i++){
  for(let i = 0; i < random(20, 100); i++){
    bugs[i] = new Firefly(random(0, 400),random(0,400));
    bugs2[i] = new Firefly(random(0, 400),random(0,400));
  }
  
  // Tree Maker
  for(let j = 0; j < random(3, 10); j++){
    trees[j] = new Tree(random(10, 480), -200, random(20, 30), 800, 0.5);
    trees_back[j] = new Tree(random(10, 480), -200, random(5, 10), 800, 0.25);
  }
  print(trees.length);
}

function mouseClicked() {
  restart();
}