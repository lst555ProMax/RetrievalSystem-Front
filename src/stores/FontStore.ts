// stores/fontStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFontStore = defineStore('fontStore', () => {
  const font = ref('Arial'); // 默认字体

  const setFont = (newFont:string) => {
    font.value = newFont;
    applyGlobalFont(newFont); // 调用方法应用字体
  };

  return {
    font,
    setFont,
  };
});

// 动态应用字体到全局
function applyGlobalFont(font:string) {
  document.body.style.fontFamily = font;
}
