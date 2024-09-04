<template>
  <canvas id="starfield"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const canvas = ref(null);
let context;
let alpha = 6.0;
let cX, cY, tX, tY, density;
let stars = [];
let cameraDepth = 0;
let enterWarp = false, warpStartDepth, warpTime = 0, velocity;

const cameraTrick = 1;
const starCount = 1024;
let initVelocity = -1.0;
let termVelocity = -10.0;
const topleft = 0;
const focalPoint = 256;
const sparcity = 1.0;
const tailLength = 20;

function modulo(a) {
  const b = 1024;
  return a - b * Math.floor(a / b);
}

function modulo2(a, b) {
  return a - b * Math.floor(a / b);
}

function Star(index) {
  this.x = (Math.random() * 2048 - 1024) * sparcity;
  this.y = (Math.random() * 2048 - 1024) * sparcity;
  this.z = ((starCount - 1) - index) / density;

  if (topleft == 1) {
    this.x = this.x + 1024;
    this.y = this.y + 1024;
  }
}

Star.prototype.move = function() {
  this.z = modulo(this.z + velocity);
};

Star.prototype.draw = function() {
  const depth = focalPoint / (modulo(this.z + cameraDepth) + 1);
  const x = this.x * depth + cX;
  const y = this.y * depth + cY;
  const sz = 5 * depth;

  context.beginPath();
  context.rect(x, y, sz, sz);
  context.fillStyle = 'white';
  context.fill();
  context.lineWidth = 0;
  context.strokeStyle = 'black';
  context.stroke();
};

Star.prototype.warpline = function() {
  const depth = modulo(this.z + cameraDepth) + 1;
  const depthStart = modulo(this.z + warpStartDepth) + 1;

  const invDepth = focalPoint / depth;
  const invDepthStart = focalPoint / depthStart;

  const x = this.x * invDepth + cX;
  const y = this.y * invDepth + cY;
  const sz = 5 * invDepth;

  const wx = this.x * invDepthStart + cX;
  const wy = this.y * invDepthStart + cY;
  const wsz = 5 * invDepthStart;

  const top = this.y < 0 ? sz : 0;
  const left = this.x < 0 ? sz : 0;
  const alpha = (sz / 5.0 + 0.1) * 0.7;

  context.beginPath();
  context.moveTo(wx, wy);
  context.lineTo(x + sz, y + top);
  context.lineTo(x, y + top);
  context.moveTo(wx, wy);
  context.lineTo(x + left, y + sz);
  context.lineTo(x + left, y);
  context.closePath();
  context.fillStyle = termVelocity < 0 ? 'rgba(64,128,192,' + alpha + ')' : 'rgba(192,64,32,' + alpha + ')';
  context.fill();
};

function init() {
  canvas.value = document.getElementById('starfield');
  context = canvas.value.getContext('2d');
  resize();
  window.addEventListener('resize', resize);

  tX = cX = canvas.value.width / 2;
  tY = cY = canvas.value.height / 4;

  if (topleft == 1) {
    cX = 0;
    cY = 0;
  }

  density = starCount / 1024;
  for (let i = 0; i < starCount; i++) {
    stars[i] = new Star(i);
  }

  velocity = initVelocity;
}

function animate() {
  move();
  render();
  requestAnimationFrame(animate);
}

function move() {
  if (enterWarp) {
    velocity *= 1.02;
    if (velocity < termVelocity && termVelocity < 0) velocity = termVelocity;
    if (velocity > termVelocity && termVelocity > 0) velocity = termVelocity;
    warpTime += 1;
    if (warpTime > 140) enterWarp = false;
    if (warpTime > tailLength) warpStartDepth = modulo(warpStartDepth + velocity);
    if (warpTime > 130) {
      warpStartDepth = modulo(warpStartDepth + (cameraDepth - warpStartDepth) * 0.3);
    }
  } else {
    const dv = velocity - initVelocity;
    velocity -= dv * 0.01;
  }

  if (cameraTrick == 0) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].move();
    }
  } else {
    cameraDepth = modulo(cameraDepth + velocity);
  }

  let dx = tX - cX;
  let dy = tY - cY;
  let dist = Math.sqrt(dx * dx + dy * dy);

  if (dist != 0) {
    dx /= dist;
    dy /= dist;
  }
  dist = Math.min(dist, 512.0);

  cX = cX + (dist * dx * 0.06125);
  cY = cY + (dist * dy * 0.06125);
}

function render() {
  context.clearRect(0, 0, canvas.value.width, canvas.value.height);

  for (let i = 0; i < stars.length; i++) {
    const index = cameraTrick == 1 ? modulo2((i + 1 + Math.floor(cameraDepth) * density), stars.length) : i;
    if (enterWarp && termVelocity <= 0) stars[index].warpline();
    stars[index].draw();
    if (enterWarp && termVelocity > 0) stars[index].warpline();
  }

  alpha -= 0.008;
  if (alpha <= 0) return;
}

function resize() {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

onMounted(() => {
  init();
  animate();
});
</script>

<style>
canvas {
  position: fixed;
  background-color: black;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
}
</style>
