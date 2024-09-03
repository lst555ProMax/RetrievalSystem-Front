// stores/userStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePasswordStore = defineStore('password', () => {
  // 定义状态
  const password = ref('');

  // 设置用户名的函数
  const setPassword = (newPassword: string) => {
    password.value = newPassword;
    console.log('设置的用户名:', newPassword); // 调试输出
  };

  return { password, setPassword };
});
