import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "Slider", // 默认主题
  }),
  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme;
    },
  },
});