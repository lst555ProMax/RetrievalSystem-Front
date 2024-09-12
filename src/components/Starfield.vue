<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: "Starfield",
  data() {
    return {
      STAR_COLOR: "#fff", // 星星的颜色
      STAR_SIZE: 3, // 星星的大小
      STAR_MIN_SCALE: 0.2, // 星星的最小缩放比例
      OVERFLOW_THRESHOLD: 50, // 星星溢出边界的阈值
      STAR_COUNT: (window.innerWidth + window.innerHeight) / 8, // 星星的数量
      scale: 1, // 画布缩放比例
      width: 0, // 画布宽度
      height: 0, // 画布高度
      stars: [], // 星星数组
      pointerX: null, // 指针的X坐标
      pointerY: null, // 指针的Y坐标
      velocity: { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 }, // 星星的速度
      touchInput: false, // 是否为触摸输入
    };
  },
  mounted() {
    this.initialize(); // 初始化画布
    window.addEventListener("resize", this.resize); // 监听窗口大小变化
    document.addEventListener("mousemove", this.onMouseMove); // 监听鼠标移动
    document.addEventListener("touchmove", this.onTouchMove); // 监听触摸移动
    document.addEventListener("touchend", this.onMouseLeave); // 监听触摸结束
    document.addEventListener("mouseleave", this.onMouseLeave); // 监听鼠标移出
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize); // 移除窗口大小变化监听
    document.removeEventListener("mousemove", this.onMouseMove); // 移除鼠标移动监听
    document.removeEventListener("touchmove", this.onTouchMove); // 移除触摸移动监听
    document.removeEventListener("touchend", this.onMouseLeave); // 移除触摸结束监听
    document.removeEventListener("mouseleave", this.onMouseLeave); // 移除鼠标移出监听
  },
  methods: {
    async initialize() {
      await this.$nextTick(); // 等待 DOM 渲染完成后再初始化
      if (!this.$refs.canvas) {
        console.error("Canvas element is not found"); // 错误提示：未找到画布元素
        return;
      }

      this.generate(); // 生成星星
      this.resize(); // 调整画布大小
      this.step(); // 开始动画
    },
    generate() {
      for (let i = 0; i < this.STAR_COUNT; i++) {
        this.stars.push({
          x: 0,
          y: 0,
          z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE), // 随机生成星星的位置和缩放比例
        });
      }
    },
    placeStar(star) {
      star.x = Math.random() * this.width; // 设置星星的X坐标
      star.y = Math.random() * this.height; // 设置星星的Y坐标
    },
    recycleStar(star) {
      let direction = "z"; // 星星的回收方向
      let vx = Math.abs(this.velocity.x),
        vy = Math.abs(this.velocity.y);

      if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }

        if (axis === "h") {
          direction = this.velocity.x > 0 ? "l" : "r";
        } else {
          direction = this.velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * this.width;
        star.y = Math.random() * this.height;
      } else if (direction === "l") {
        star.x = -this.OVERFLOW_THRESHOLD;
        star.y = this.height * Math.random();
      } else if (direction === "r") {
        star.x = this.width + this.OVERFLOW_THRESHOLD;
        star.y = this.height * Math.random();
      } else if (direction === "t") {
        star.x = this.width * Math.random();
        star.y = -this.OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = this.width * Math.random();
        star.y = this.height + this.OVERFLOW_THRESHOLD;
      }
    },
    resize() {
      this.scale = window.devicePixelRatio || 1; // 获取设备的像素比例
      this.width = window.innerWidth * this.scale; // 设置画布的宽度
      this.height = window.innerHeight * this.scale; // 设置画布的高度

      const canvas = this.$refs.canvas;
      if (canvas) {
        canvas.width = this.width;
        canvas.height = this.height;
      }

      this.stars.forEach(this.placeStar); // 设置每个星星的位置
    },
    step() {
      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error("Canvas element is not found"); // 错误提示：未找到画布元素
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get 2D context"); // 错误提示：获取2D上下文失败
        return;
      }

      context.clearRect(0, 0, this.width, this.height); // 清空画布
      this.update(); // 更新星星的位置
      this.render(); // 绘制星星

      requestAnimationFrame(this.step); // 循环调用step函数
    },
    update() {
      this.velocity.tx *= 0.96; // 更新速度
      this.velocity.ty *= 0.96;

      this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8;
      this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8;

      this.stars.forEach((star) => {
        star.x += this.velocity.x * star.z; // 更新星星的X坐标
        star.y += this.velocity.y * star.z; // 更新星星的Y坐标

        star.x += (star.x - this.width / 2) * this.velocity.z * star.z; // 调整星星的X坐标
        star.y += (star.y - this.height / 2) * this.velocity.z * star.z; // 调整星星的Y坐标
        star.z += this.velocity.z; // 更新星星的缩放比例

        // 超出边界时回收星星
        if (
          star.x < -this.OVERFLOW_THRESHOLD ||
          star.x > this.width + this.OVERFLOW_THRESHOLD ||
          star.y < -this.OVERFLOW_THRESHOLD ||
          star.y > this.height + this.OVERFLOW_THRESHOLD
        ) {
          this.recycleStar(star);
        }
      });
    },
    render() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      this.stars.forEach((star) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = this.STAR_SIZE * star.z * this.scale; // 设置星星的宽度
        context.globalAlpha = 0.5 + 0.5 * Math.random(); // 设置星星的透明度
        context.strokeStyle = this.STAR_COLOR; // 设置星星的颜色

        context.moveTo(star.x, star.y); // 设置星星的起点

        let tailX = this.velocity.x * 2,
          tailY = this.velocity.y * 2;

        // stroke() 无法绘制不可见的线
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY); // 设置星星的终点
        context.stroke(); // 绘制星星
      });
    },
    movePointer(x, y) {
      if (
        typeof this.pointerX === "number" &&
        typeof this.pointerY === "number"
      ) {
        let ox = x - this.pointerX,
          oy = y - this.pointerY;

        this.velocity.tx =
          this.velocity.tx +
          (ox / (8 * this.scale)) * (this.touchInput ? 1 : -1); // 更新速度的X方向
        this.velocity.ty =
          this.velocity.ty +
          (oy / (8 * this.scale)) * (this.touchInput ? 1 : -1); // 更新速度的Y方向
      }

      this.pointerX = x; // 更新指针的X坐标
      this.pointerY = y; // 更新指针的Y坐标
    },
    onMouseMove(event) {
      this.touchInput = false; // 设置为非触摸输入
      this.movePointer(event.clientX, event.clientY); // 移动指针
    },
    onTouchMove(event) {
      this.touchInput = true; // 设置为触摸输入
      this.movePointer(event.touches[0].clientX, event.touches[0].clientY); // 移动指针
      event.preventDefault(); // 阻止默认事件
    },
    onMouseLeave() {
      this.pointerX = null; // 重置指针的X坐标
      this.pointerY = null; // 重置指针的Y坐标
    },
  },
};
</script>

<style scoped>
canvas {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0d1117; /* 画布背景色 */
  z-index: -2; /* 画布层级 */
  pointer-events: none; /* 禁止鼠标事件 */
}
</style>
