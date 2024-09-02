<script setup>
import { ref, onMounted, nextTick } from 'vue';

const typedTextLeft = ref('');
const typedTextRight = ref('');
const showLeft = ref(true);
const showRight = ref(true);
const showMatrixLeft = ref(false);
const showMatrixRight = ref(false);
const showLoading = ref(false);
const loadingText = ref('Loading...'); 

const textLeft = 'text = "xiaoming"';
const textRight = 'image = "xiaoming.jpg"';

const matrixLatexLeft = '\\begin{matrix}\\boldsymbol{t}_{00} & \\boldsymbol{t}_{01} & \\cdots & \\boldsymbol{t}_{0d}\\\\\\boldsymbol{t}_{10} & \\boldsymbol{t}_{11} & \\cdots & \\boldsymbol{t}_{1d}\\\\\\vdots & \\vdots & \\ddots & \\vdots\\\\\\boldsymbol{t}_{m0} & \\boldsymbol{t}_{m1} & \\cdots & \\boldsymbol{t}_{md}\\end{matrix}';
const matrixLatexRight = '\\begin{matrix}\\boldsymbol{i}_{00} & \\boldsymbol{i}_{01} & \\cdots & \\boldsymbol{i}_{0d}\\\\\\boldsymbol{i}_{10} & \\boldsymbol{i}_{11} & \\cdots & \\boldsymbol{i}_{1d}\\\\\\vdots & \\vdots & \\ddots & \\vdots\\\\\\boldsymbol{i}_{n0} & \\boldsymbol{i}_{n1} & \\cdots & \\boldsymbol{i}_{nd}\\end{matrix}';

const matrixLeftHtml = ref('');
const matrixRightHtml = ref('');

const finalImageLeft = ref(false);
const finalTextRight = ref(false);
const showTitle = ref(false); // 新增：用于控制标题和副标题的显示

const typeText = (text, typedText, onComplete) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      typedText.value += text[index];
      index++;
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 50);
};

const renderMathJax = () => {
  if (window.MathJax) {
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
  }
};

const fadeOut = (showRef, showMatrixRef, matrixLatex, matrixHtmlRef) => {
  showRef.value = false;
  nextTick(() => {
    setTimeout(() => {
      showMatrixRef.value = true;
      matrixHtmlRef.value = `\\[ ${matrixLatex} \\]`;
      nextTick(() => {
        renderMathJax();
        setTimeout(() => {
          if (showMatrixRef === showMatrixLeft) {
            document.querySelector('.matrix-container.left').classList.add('move-to-center-left');
          } else {
            document.querySelector('.matrix-container.right').classList.add('move-to-center-right');
          }
          setTimeout(() => {
            showLoading.value = true;
            updateLoadingText();
          }, 1000);
        }, 1000);
      });
    }, 1000);
  });
};

const updateLoadingText = () => {
  setTimeout(() => {
    loadingText.value = 'Preassign attention...';
  }, 1000);
  setTimeout(() => {
    loadingText.value = 'Identify irrelevant fragments...';
  }, 2000);
  setTimeout(() => {
    loadingText.value = 'Reassign attention...';
  }, 3000);
  setTimeout(() => {
    loadingText.value = "Calculate similarity...";
  }, 4000)
  setTimeout(() => {
    loadingText.value = "Done!";
  }, 5000);
  setTimeout(() => {
    showLoading.value = false;
    setTimeout(() => {
      document.querySelector('.matrix-container.left').classList.add('move-to-right');
      document.querySelector('.matrix-container.right').classList.add('move-to-left');
      fadeOutMatrixAndShowFinal();
    }, 1000);
  }, 6000);
};

// 新增函数：矩阵淡出后显示最终内容
const fadeOutMatrixAndShowFinal = () => {
  setTimeout(() => {
    showMatrixLeft.value = false;
    showMatrixRight.value = false;
    setTimeout(() => {
      finalImageLeft.value = true;
      finalTextRight.value = true;
      setTimeout(() => {
        showTitle.value = true; // 显示标题和副标题
      }, 1000);
    }, 1000); // 矩阵淡出后再等1秒显示最终内容
  }, 1000); // 等待1秒再淡出矩阵
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
  script.onload = () => {
    typeText(textLeft, typedTextLeft, () => {
      fadeOut(showLeft, showMatrixLeft, matrixLatexLeft, matrixLeftHtml);
    });
    typeText(textRight, typedTextRight, () => {
      fadeOut(showRight, showMatrixRight, matrixLatexRight, matrixRightHtml);
    });
  };
  document.head.appendChild(script);
});
</script>

<template>
    <div class="animated-background">
      <transition name="fade">
        <div v-if="showLeft" class="typing-container left">
          <div class="typed-text">{{ typedTextLeft }}</div>
          <div class="cursor"></div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showRight" class="typing-container right">
          <div class="typed-text">{{ typedTextRight }}</div>
          <div class="cursor"></div>
        </div>
      </transition>
  
      <transition name="fade">
        <div v-if="showMatrixLeft" class="matrix-container left" ref="matrixLeftContainer">
          <div v-html="matrixLeftHtml"></div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showMatrixRight" class="matrix-container right" ref="matrixRightContainer">
          <div v-html="matrixRightHtml"></div>
        </div>
      </transition>
  
      <transition name="fade">
        <div v-if="showLoading" class="loading-box">
          <div class="spinner"></div>
          <div class="loading-text">{{ loadingText }}</div>
        </div>
      </transition>
  
      <!-- 新增：最终显示的内容 -->
      <transition name="fade">
        <div v-if="finalImageLeft" class="typing-container left final-content">
          xiaoming.jpg
        </div>
      </transition>
      <transition name="fade">
        <div v-if="finalTextRight" class="typing-container right final-content">
          xiaoming
        </div>
      </transition>
  
      <!-- 新增：标题和副标题 -->
      <transition name="fade">
        <div v-if="showTitle" class="title-container">
          <h1 class="main-title">Image Text Retrieval</h1>
          <h2 class="subtitle">Make image and text links tighter</h2>
        </div>
      </transition>
    </div>
  </template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0d1117; /* GitHub 暗色模式背景色 */
  z-index: -2; /* 确保背景层在其他内容的下方 */
  overflow: hidden; /* 防止动画超出视图区域 */
}

.typing-container {
  position: absolute;
  font-family: 'Courier New', Courier, monospace; /* 使用等宽字体 */
  color: #ffffff; /* 打字文本颜色 */
  font-size: 24px; /* 字体大小 */
  z-index: -1; /* 确保打字效果层在背景之上但在内容层下方 */
}

.typing-container.left {
  top: 50%;
  left: 5%;
}

.typing-container.right {
  top: 50%;
  right: 5%;
}

.typed-text {
  display: inline;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #ffffff;
  animation: blink-caret 1s step-start infinite;
}

@keyframes blink-caret {
  from, to {
    background-color: transparent;
  }
  50% {
    background-color: #ffffff;
  }
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Matrix styling */
.matrix-container {
  position: absolute;
  font-family: 'Courier New', Courier, monospace; /* Use a monospace font for the matrix */
  color: #ffffff; /* Matrix color */
  font-size: 24px; /* Font size */
  z-index: -1; /* Ensure matrix is below content but above the background */
}

.matrix-container.left {
  top: 35%;
  left: 5%;
}

.matrix-container.right {
  top: 35%;
  right: 5%;
}

.matrix-container div {
  display: inline-block;
  padding: 10px;
}

/* Slide to center animation */
@keyframes slide-to-center-left {
  from {
    left: 5%;
  }
  to {
    left: 50%;
    transform: translateX(-50%);
  }
}

@keyframes slide-to-center-right {
  from {
    right: 5%;
  }
  to {
    right: 50%;
    transform: translateX(50%);
  }
}

.move-to-center-left {
  animation: slide-to-center-left 2s forwards;
}

.move-to-center-right {
  animation: slide-to-center-right 2s forwards;
}

/* Loading Box Styling */
.loading-box {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace; /* 等宽字体 */
  font-size: 18px; /* 字体大小 */
  z-index: 9999; /* 确保加载框在所有内容之上 */
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-left: 10px;
}

@keyframes slide-to-right {
  from {
      left: 50%;
  }
  to {
      left: 100%;
      transform: translateX(-140%);
  }
}

@keyframes slide-to-left {
  from {
      right: 50%;
  }
  to {
      right: 100%;
      transform: translateX(140%);
  }
}

.move-to-right {
  animation: slide-to-right 2s forwards;
}

.move-to-left {
  animation: slide-to-left 2s forwards;
}

/* 新增：标题和副标题的样式 */
.title-container {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace; /* 等宽字体 */
  z-index: 9999;
}

.main-title {
  font-size: 48px; /* 标题字号 */
  margin: 0;
}

.subtitle {
  font-size: 24px; /* 副标题字号 */
  margin: 0;
}
</style>
