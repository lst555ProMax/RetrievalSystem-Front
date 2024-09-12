<template>
  <div id="large-header" class="large-header">
    <canvas id="demo-canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { TweenLite, Circ } from "gsap";

let width,
  height,
  largeHeader,
  canvas,
  ctx,
  points,
  target,
  animateHeader = true;

// 初始化Header
function initHeader() {
  width = window.innerWidth;
  height = window.innerHeight;
  target = { x: width / 2, y: height / 2 };

  largeHeader = document.getElementById("large-header");
  largeHeader.style.height = height + "px";

  canvas = document.getElementById("demo-canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  // 创建点
  points = [];
  for (var x = 0; x < width; x = x + width / 20) {
    for (var y = 0; y < height; y = y + height / 20) {
      var px = x + (Math.random() * width) / 20;
      var py = y + (Math.random() * height) / 20;
      var p = { x: px, originX: px, y: py, originY: py };
      points.push(p);
    }
  }

  // 为每个点找到5个最近的点
  for (var i = 0; i < points.length; i++) {
    var closest = [];
    var p1 = points[i];
    for (var j = 0; j < points.length; j++) {
      var p2 = points[j];
      if (!(p1 == p2)) {
        var placed = false;
        for (var k = 0; k < 5; k++) {
          if (!placed) {
            if (closest[k] == undefined) {
              closest[k] = p2;
              placed = true;
            }
          }
        }

        for (var k = 0; k < 5; k++) {
          if (!placed) {
            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
              closest[k] = p2;
              placed = true;
            }
          }
        }
      }
    }
    p1.closest = closest;
  }

  // 为每个点分配一个圆
  for (var i in points) {
    var c = new Circle(
      points[i],
      2 + Math.random() * 2,
      "rgba(255,255,255,0.3)"
    );
    points[i].circle = c;
  }
}

// 事件处理
function addListeners() {
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("scroll", scrollCheck);
  window.addEventListener("resize", resize);
}

// 鼠标移动事件
function mouseMove(e) {
  target.x = e.pageX;
  target.y = e.pageY;
}

// 滚动事件检查
function scrollCheck() {
  if (document.body.scrollTop > height) animateHeader = false;
  else animateHeader = true;
}

// 窗口尺寸变化事件
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  largeHeader.style.height = height + "px";
  canvas.width = width;
  canvas.height = height;
}

// 动画初始化
function initAnimation() {
  animate();
  for (var i in points) {
    shiftPoint(points[i]);
  }
}

// 动画函数
function animate() {
  if (animateHeader) {
    ctx.clearRect(0, 0, width, height);
    for (var i in points) {
      // 检测范围内的点
      if (Math.abs(getDistance(target, points[i])) < 4000) {
        points[i].active = 0.3;
        points[i].circle.active = 0.6;
      } else if (Math.abs(getDistance(target, points[i])) < 20000) {
        points[i].active = 0.1;
        points[i].circle.active = 0.3;
      } else if (Math.abs(getDistance(target, points[i])) < 40000) {
        points[i].active = 0.02;
        points[i].circle.active = 0.1;
      } else {
        points[i].active = 0;
        points[i].circle.active = 0;
      }

      drawLines(points[i]);
      points[i].circle.draw();
    }
  }
  requestAnimationFrame(animate);
}

// 移动点位置
function shiftPoint(p) {
  TweenLite.to(p, 1 + 1 * Math.random(), {
    x: p.originX - 50 + Math.random() * 100,
    y: p.originY - 50 + Math.random() * 100,
    ease: Circ.easeInOut,
    onComplete: function () {
      shiftPoint(p);
    },
  });
}

// 画线函数
function drawLines(p) {
  if (!p.active) return;
  for (var i in p.closest) {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.closest[i].x, p.closest[i].y);
    ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
    ctx.stroke();
  }
}

// 圆类
function Circle(pos, rad, color) {
  var _this = this;

  // 构造函数
  (function () {
    _this.pos = pos || null;
    _this.radius = rad || null;
    _this.color = color || null;
  })();

  // 绘制圆
  this.draw = function () {
    if (!_this.active) return;
    ctx.beginPath();
    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
    ctx.fill();
  };
}

// 计算两个点之间的距离
function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

// 组件挂载时的生命周期
onMounted(() => {
  initHeader();
  initAnimation();
  addListeners();
});

// 组件卸载前的生命周期
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", mouseMove);
  window.removeEventListener("scroll", scrollCheck);
  window.removeEventListener("resize", resize);
});
</script>

<style scoped>
.large-header {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #333;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: -2;
}

#large-header {
  background-color: #000;
}

.main-title {
  margin: 0;
  padding: 0;
  color: #f9f1e9;
  text-align: center;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
</style>
