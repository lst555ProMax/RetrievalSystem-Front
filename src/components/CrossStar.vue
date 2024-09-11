<template>
  <canvas id="starfield"></canvas>
</template>

<script setup>
import { onMounted, ref } from "vue";

const canvas = ref(null);
let context;
let alpha = 6.0; // 初始透明度
let cX, cY, tX, tY, density; // 画布中心点坐标、目标点坐标和密度
let stars = []; // 星星数组
let cameraDepth = 0; // 相机深度
let enterWarp = false,
  warpStartDepth,
  warpTime = 0,
  velocity; // 启动传送门、传送门开始深度、传送门时间和速度

const cameraTrick = 1; // 相机技巧标志
const starCount = 1024; // 星星数量
let initVelocity = -1.0; // 初始速度
let termVelocity = -10.0; // 终极速度
const topleft = 0; // 是否左上角对齐标志
const focalPoint = 256; // 焦点
const sparcity = 1.0; // 稀疏度
const tailLength = 20; // 尾巴长度

// 模运算函数，结果范围为 [0, b)
function modulo(a) {
  const b = 1024;
  return a - b * Math.floor(a / b);
}

// 模运算函数，结果范围为 [0, b)
function modulo2(a, b) {
  return a - b * Math.floor(a / b);
}

// 星星类
function Star(index) {
  this.x = (Math.random() * 2048 - 1024) * sparcity; // 星星的 x 坐标
  this.y = (Math.random() * 2048 - 1024) * sparcity; // 星星的 y 坐标
  this.z = (starCount - 1 - index) / density; // 星星的 z 坐标

  if (topleft == 1) {
    this.x = this.x + 1024;
    this.y = this.y + 1024;
  }
}

// 星星移动方法
Star.prototype.move = function () {
  this.z = modulo(this.z + velocity);
};

// 星星绘制方法
Star.prototype.draw = function () {
  const depth = focalPoint / (modulo(this.z + cameraDepth) + 1); // 深度计算
  const x = this.x * depth + cX; // 星星在画布上的 x 坐标
  const y = this.y * depth + cY; // 星星在画布上的 y 坐标
  const sz = 5 * depth; // 星星大小

  context.beginPath();
  context.rect(x, y, sz, sz); // 绘制星星
  context.fillStyle = "white"; // 星星颜色
  context.fill();
  context.lineWidth = 0;
  context.strokeStyle = "black"; // 星星轮廓颜色
  context.stroke();
};

// 星星绘制传送门线条
Star.prototype.warpline = function () {
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
  const alpha = (sz / 5.0 + 0.1) * 0.7; // 线条透明度

  context.beginPath();
  context.moveTo(wx, wy);
  context.lineTo(x + sz, y + top);
  context.lineTo(x, y + top);
  context.moveTo(wx, wy);
  context.lineTo(x + left, y + sz);
  context.lineTo(x + left, y);
  context.closePath();
  context.fillStyle =
    termVelocity < 0
      ? "rgba(64,128,192," + alpha + ")"
      : "rgba(192,64,32," + alpha + ")"; // 线条颜色
  context.fill();
};

// 初始化函数
function init() {
  canvas.value = document.getElementById("starfield");
  context = canvas.value.getContext("2d");
  resize();
  window.addEventListener("resize", resize); // 窗口大小变化时重新调整画布大小

  tX = cX = canvas.value.width / 2; // 初始化目标点 x 坐标
  tY = cY = canvas.value.height / 4; // 初始化目标点 y 坐标

  if (topleft == 1) {
    cX = 0;
    cY = 0;
  }

  density = starCount / 1024; // 计算星星密度
  for (let i = 0; i < starCount; i++) {
    stars[i] = new Star(i); // 创建星星
  }

  velocity = initVelocity; // 设置初始速度
}

// 动画函数
function animate() {
  move();
  render();
  requestAnimationFrame(animate); // 循环调用动画函数
}

// 星星移动和相机更新
function move() {
  if (enterWarp) {
    velocity *= 1.02; // 加速
    if (velocity < termVelocity && termVelocity < 0) velocity = termVelocity;
    if (velocity > termVelocity && termVelocity > 0) velocity = termVelocity;
    warpTime += 1;
    if (warpTime > 140) enterWarp = false;
    if (warpTime > tailLength)
      warpStartDepth = modulo(warpStartDepth + velocity);
    if (warpTime > 130) {
      warpStartDepth = modulo(
        warpStartDepth + (cameraDepth - warpStartDepth) * 0.3
      );
    }
  } else {
    const dv = velocity - initVelocity;
    velocity -= dv * 0.01;
  }

  if (cameraTrick == 0) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].move(); // 移动星星
    }
  } else {
    cameraDepth = modulo(cameraDepth + velocity); // 更新相机深度
  }

  let dx = tX - cX;
  let dy = tY - cY;
  let dist = Math.sqrt(dx * dx + dy * dy);

  if (dist != 0) {
    dx /= dist;
    dy /= dist;
  }
  dist = Math.min(dist, 512.0);

  cX = cX + dist * dx * 0.06125; // 更新画布中心 x 坐标
  cY = cY + dist * dy * 0.06125; // 更新画布中心 y 坐标
}

// 渲染函数
function render() {
  context.clearRect(0, 0, canvas.value.width, canvas.value.height); // 清除画布

  for (let i = 0; i < stars.length; i++) {
    const index =
      cameraTrick == 1
        ? modulo2(i + 1 + Math.floor(cameraDepth) * density, stars.length)
        : i;
    if (enterWarp && termVelocity <= 0) stars[index].warpline(); // 绘制传送门线条
    stars[index].draw(); // 绘制星星
    if (enterWarp && termVelocity > 0) stars[index].warpline(); // 绘制传送门线条
  }

  alpha -= 0.008;
  if (alpha <= 0) return; // 透明度降低到 0 时停止
}

// 调整画布大小
function resize() {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

// 组件挂载后初始化和开始动画
onMounted(() => {
  init();
  animate();
});
</script>

<style>
canvas {
  position: fixed; /* 固定位置 */
  background-color: black; /* 背景颜色 */
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2; /* 背景层级 */
}
</style>
