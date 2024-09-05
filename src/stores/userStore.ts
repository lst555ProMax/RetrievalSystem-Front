// stores/userStore.ts
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

export const useAvatarStore = defineStore('avatar', ()=>{

    // 定义状态
  const userAvatar = ref('');
    // 设置用户名的函数
  const setUserAvatar = (newUserAvatar: string) => {
    userAvatar.value = newUserAvatar;
    console.log('设置的用户名:', newUserAvatar); // 调试输出
  };

  return { userAvatar, setUserAvatar };
});
