// stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 定义状态
  const username = ref('');

  // 设置用户名的函数
  const setUsername = (newUsername: string) => {
    username.value = newUsername;
    console.log('设置的用户名:', newUsername); // 调试输出
  };

  return { username, setUsername };
});
