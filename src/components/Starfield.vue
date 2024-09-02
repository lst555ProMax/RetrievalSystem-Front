<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'Starfield',
  data() {
    return {
      STAR_COLOR: '#fff',
      STAR_SIZE: 3,
      STAR_MIN_SCALE: 0.2,
      OVERFLOW_THRESHOLD: 50,
      STAR_COUNT: (window.innerWidth + window.innerHeight) / 8,
      scale: 1,
      width: 0,
      height: 0,
      stars: [],
      pointerX: null,
      pointerY: null,
      velocity: { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 },
      touchInput: false,
    };
  },
  mounted() {
    this.initialize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onMouseLeave);
    document.addEventListener('mouseleave', this.onMouseLeave);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onMouseLeave);
    document.removeEventListener('mouseleave', this.onMouseLeave);
  },
  methods: {
    initialize() {
      this.generate();
      this.resize();
      this.step();
    },
    generate() {
      for (let i = 0; i < this.STAR_COUNT; i++) {
        this.stars.push({
          x: 0,
          y: 0,
          z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE),
        });
      }
    },
    placeStar(star) {
      star.x = Math.random() * this.width;
      star.y = Math.random() * this.height;
    },
    recycleStar(star) {
      let direction = 'z';
      let vx = Math.abs(this.velocity.x),
          vy = Math.abs(this.velocity.y);

      if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
          axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }

        if (axis === 'h') {
          direction = this.velocity.x > 0 ? 'l' : 'r';
        } else {
          direction = this.velocity.y > 0 ? 't' : 'b';
        }
      }

      star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE);

      if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * this.width;
        star.y = Math.random() * this.height;
      } else if (direction === 'l') {
        star.x = -this.OVERFLOW_THRESHOLD;
        star.y = this.height * Math.random();
      } else if (direction === 'r') {
        star.x = this.width + this.OVERFLOW_THRESHOLD;
        star.y = this.height * Math.random();
      } else if (direction === 't') {
        star.x = this.width * Math.random();
        star.y = -this.OVERFLOW_THRESHOLD;
      } else if (direction === 'b') {
        star.x = this.width * Math.random();
        star.y = this.height + this.OVERFLOW_THRESHOLD;
      }
    },
    resize() {
      this.scale = window.devicePixelRatio || 1;
      this.width = window.innerWidth * this.scale;
      this.height = window.innerHeight * this.scale;

      const canvas = this.$refs.canvas;
      canvas.width = this.width;
      canvas.height = this.height;

      this.stars.forEach(this.placeStar);
    },
    step() {
      const context = this.$refs.canvas.getContext('2d');
      context.clearRect(0, 0, this.width, this.height);

      this.update();
      this.render();

      requestAnimationFrame(this.step);
    },
    update() {
      this.velocity.tx *= 0.96;
      this.velocity.ty *= 0.96;

      this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8;
      this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8;

      this.stars.forEach((star) => {
        star.x += this.velocity.x * star.z;
        star.y += this.velocity.y * star.z;

        star.x += (star.x - this.width / 2) * this.velocity.z * star.z;
        star.y += (star.y - this.height / 2) * this.velocity.z * star.z;
        star.z += this.velocity.z;

        // recycle when out of bounds
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
      const context = this.$refs.canvas.getContext('2d');
      this.stars.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = this.STAR_SIZE * star.z * this.scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = this.STAR_COLOR;

        context.beginPath();
        context.moveTo(star.x, star.y);

        let tailX = this.velocity.x * 2,
            tailY = this.velocity.y * 2;

        // stroke() wont work on an invisible line
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);

        context.stroke();
      });
    },
    movePointer(x, y) {
      if (typeof this.pointerX === 'number' && typeof this.pointerY === 'number') {
        let ox = x - this.pointerX,
            oy = y - this.pointerY;

        this.velocity.tx = this.velocity.tx + (ox / (8 * this.scale)) * (this.touchInput ? 1 : -1);
        this.velocity.ty = this.velocity.ty + (oy / (8 * this.scale)) * (this.touchInput ? 1 : -1);
      }

      this.pointerX = x;
      this.pointerY = y;
    },
    onMouseMove(event) {
      this.touchInput = false;
      this.movePointer(event.clientX, event.clientY);
    },
    onTouchMove(event) {
      this.touchInput = true;
      this.movePointer(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
    },
    onMouseLeave() {
      this.pointerX = null;
      this.pointerY = null;
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
  background-color: #0d1117;
  z-index: -1;
  pointer-events: none;
}
</style>
