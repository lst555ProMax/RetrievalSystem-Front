<template>
    <Starfield />

    <div class="userManagement">
      <HeadbarAdmin></HeadbarAdmin>
      <div class="non-header">
        <SidebarAdmin></SidebarAdmin>
  
        <div class="main-content">
          <h2>用户管理</h2>
          <table class="user-table">
            <thead>
              <tr>
                <th>用户名</th>
                <th>密码</th>
                <th>邮箱</th>
                <th>昵称</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td v-if="editingIndex === index">
                  <input v-model="editUserData.username" />
                </td>
                <td v-else>{{ user.username }}</td>
  
                <td v-if="editingIndex === index">
                  <input v-model="editUserData.password" />
                </td>
                <td v-else>{{ user.password }}</td>
  
                <td v-if="editingIndex === index">
                  <input v-model="editUserData.email" />
                </td>
                <td v-else>{{ user.email }}</td>
  
                <td v-if="editingIndex === index">
                  <input v-model="editUserData.nickname" />
                </td>
                <td v-else>{{ user.nickname }}</td>
  
                <td>
                  <button v-if="editingIndex === index" @click="saveUser(index)">保存</button>
                  <button v-else @click="editUser(index)">修改</button>
                  <button @click="deleteUser(index)">删除</button>
                  <button v-if="editingIndex === index" @click="cancelEdit(index)">取消</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  import SidebarAdmin from "../../components/SidebarAdmin.vue";
  import HeadbarAdmin from "../../components/HeadbarAdmin.vue";
  import Starfield from "@/components/Starfield.vue"
  
  const router = useRouter();
  const route = useRoute();
  
  // 预定义一些用户信息
  const users = ref([
    {
      username: "user1",
      password: "password1",
      email: "user1@example.com",
      nickname: "用户一",
    },
    {
      username: "user2",
      password: "password2",
      email: "user2@example.com",
      nickname: "用户二",
    },
    {
      username: "user3",
      password: "password3",
      email: "user3@example.com",
      nickname: "用户三",
    },
  ]);
  
  // 当前正在编辑的行索引
  const editingIndex = ref(null);
  
  // 存储编辑的数据
  const editUserData = ref({
    username: "",
    password: "",
    email: "",
    nickname: "",
  });
  
  // 开始编辑用户信息
  const editUser = (index) => {
    editingIndex.value = index;
    editUserData.value = { ...users.value[index] };
  };
  
  // 保存用户信息
  const saveUser = (index) => {
    if (editingIndex.value !== null) {
      users.value[index] = { ...editUserData.value };
      editingIndex.value = null;
      alert("用户信息已更新！");
    }
  };
  
  // 删除用户
  const deleteUser = (index) => {
    if (confirm("确定要删除这个用户吗？")) {
      users.value.splice(index, 1);
      alert("用户已删除！");
      // 如果删除的是当前正在编辑的用户，重置编辑状态
      if (editingIndex.value === index) {
        editingIndex.value = null;
        editUserData.value = {};
      }
    }
  };

  const cancelEdit =(index)=>{
    if (confirm("确定取消修改吗？")) {
        editingIndex.value = null;
    }
  }
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: "Montserrat", sans-serif;
    background-color: #001f3f;
    color: #d3d3d3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .userManagement {
    display: flex;
    height: calc(100vh - 10px);
    margin: 5px;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  
  .non-header {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #2e2e4d;
    color: #d3d3d3;
  }
  
  .user-table th,
  .user-table td {
    border: 1px solid #444;
    padding: 10px;
    text-align: left;
  }
  
  .user-table th {
    background-color: #3e3e5f;
  }
  
  .user-table button {
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    background-color: #0dbe83;
    width:30%;
  }

  
  .user-table button:hover {
    background-color: #0dbe83;
  }
  
  .user-table button:active {
    background-color: #0056b3;
  }
  
  .user-table input {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #444;
    background-color: #1f1f3f;
    color: #d3d3d3;
  }
  </style>
  