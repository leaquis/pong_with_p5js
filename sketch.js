//Variaveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 13;
let rBolinha = dBolinha / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variaveis Raquete
let xRaquete = 5;
let yRaquete = 150;
let lRaquete = 10;
let aRaquete = 90;

//Variaveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar
let meusPontos = 0;
let pontosDoOponente = 0;

let colidiu = false;

//sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("sons/trilha.mp3");
  ponto = loadSound("sons/ponto.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha() {
    circle(xBolinha,yBolinha,dBolinha)
  
  }

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;  
}

function verificaColisaoBorda() {
  if(xBolinha + rBolinha > width || xBolinha - rBolinha < 0){
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha + rBolinha > height || yBolinha - rBolinha < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x, y){
  rect(x, y, lRaquete, aRaquete); 
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 5;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - rBolinha < xRaquete + lRaquete && yBolinha - rBolinha < yRaquete + aRaquete && yBolinha + rBolinha > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function colisaoRaqueteBiblioteca(x, y) {
  colidiu =
  collideRectCircle(x, y, lRaquete, aRaquete, xBolinha, yBolinha, rBolinha);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
   velocidadeYOponente = yBolinha - yRaqueteOponente - lRaquete /2 - 30;
  yRaqueteOponente +=  velocidadeYOponente + chanceDeErrar; 
  calculaChanceDeErrar();
  
 /* if (keyIsDown(87)) {
    yRaqueteOponente -= 5;
  }

  if (keyIsDown(83)) {
    yRaqueteOponente += 5;
  } */
}

function incluiPlacar(){
  stroke(255);
  textSize = 16;
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
 if (xBolinha > 590) {
   meusPontos += 1;
   ponto.play();
 }
 if (xBolinha < 10) {
   pontosDoOponente += 1;
   ponto.play();
 }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}







