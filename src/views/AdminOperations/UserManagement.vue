<template>
  <Starfield />

  <Dashboard>
    <template #left-content>
      <div class="userManagement">
        <div class="non-header">
          <div class="main-content">
            <h2>用户管理</h2>
            <table class="user-table">
              <thead>
                <tr>
                  <th>用户名</th>
                  <th>密码</th>
                  <th>邮箱</th>
                  <th>昵称</th>
                  <th>生日</th>
                  <th>性别</th>
                  <th>描述</th>
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
                    <input v-model="editUserData.password" placeholder="暂时无密码" disabled />
                  </td>
                  <td v-else>{{ user.password || "N/A" }}</td>

                  <td v-if="editingIndex === index">
                    <input v-model="editUserData.email" />
                  </td>
                  <td v-else>{{ user.email }}</td>

                  <td v-if="editingIndex === index">
                    <input v-model="editUserData.nickname" />
                  </td>
                  <td v-else>{{ user.nickname || "N/A" }}</td>

                  <td v-if="editingIndex === index">
                    <input type="date" v-model="editUserData.birthday" />
                  </td>
                  <td v-else>{{ formatDate(user.birthday) || "N/A" }}</td>

                  <td v-if="editingIndex === index">
                    <input v-model="editUserData.sex" placeholder="暂时无性别" disabled />
                  </td>
                  <td v-else>{{ user.sex || "N/A" }}</td>

                  <td v-if="editingIndex === index">
                    <input v-model="editUserData.description" />
                  </td>
                  <td v-else>{{ user.description || "N/A" }}</td>

                  <td>
                    <button v-if="editingIndex === index" @click="saveUser(index)">
                      保存
                    </button>
                    <button v-else @click="editUser(index)">修改</button>
                    <button @click="deleteUser(index)">删除</button>
                    <button v-if="editingIndex === index" @click="cancelEdit(index)">
                      取消
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </Dashboard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios"; // 引入axios用于发送请求

import Starfield from "@/components/Starfield.vue";
import { getUsername } from "@/utils/Auth";
import { API_ENDPOINTS } from "../../config/apiConfig";
import Dashboard from "@/components/DashboardAdmin.vue";

const router = useRouter();
const route = useRoute();

// 用户数据
const users = ref([
]);

// 当前正在编辑的行索引
const editingIndex = ref(null);

// 存储编辑的数据
const editUserData = ref({
  username: "",
  password: "",
  email: "",
  nickname: "",
  birthday: "",
  sex: "",
  description: "",
});

const api = {
  get_user_info: API_ENDPOINTS.get_user_info,
  edit_user_info: API_ENDPOINTS.edit_user_info,
  delete_user: API_ENDPOINTS.delete_user,
};

let url = ref(api.get_user_info);
const token = localStorage.getItem('jwtToken'); // 从 localStorage 获取 JWT 令牌

// 从后端获取用户数据
const fetchUsers = async () => {
  try {
    const response = await axios.get(url.value, {
      headers: {
        'Authorization': `Bearer ${token}`, // 添加 Authorization 头部
      }
    });

    if (response.data.code === 0) {
      users.value = response.data.data; // 将返回的数据赋值给 users
      console.log(response.data.data);
    } else {
      console.error("获取用户数据失败:", response.data.message);
    }
  } catch (error) {
    console.error("获取用户数据失败:", error);
  }
};
// 开始编辑用户信息
const editUser = (index) => {
  editingIndex.value = index;
  editUserData.value = { ...users.value[index] };
};

let url2 = api.edit_user_info;
// 保存用户信息
const saveUser = async (index) => {
  if (editingIndex.value !== null) {
    users.value[index] = { ...editUserData.value };

    const urlEncodedParams = new URLSearchParams(Object.entries(users.value[index]));

    console.log(Object.entries(users.value[index]).toString())

    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // 添加 Authorization 头部
        },
        body: urlEncodedParams.toString(),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("修改成功", result);
        console.log(urlEncodedParams.toString());
        editingIndex.value = null;
        alert("用户信息已更新！");
      } else {
        console.error("修改失败", result.message);
      }
    }
    catch (error) {
      console.error("请求失败", error);
    }
  }
};

let url3 = api.delete_user;
// 删除用户
const deleteUser = async (index) => {
  if (confirm("确定要删除这个用户吗？")) {
    alert("用户已删除！");
    if (editingIndex.value === index) {
      editingIndex.value = null;
      editUserData.value = {};
    }
  }

  const urlEncodedParams = new URLSearchParams(Object.entries(users.value[index]));

  try {
    const response = await fetch(url3, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`, // 添加 Authorization 头部
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedParams.toString(),
    });

    console.log(urlEncodedParams.toString());
    const result = await response.json();

    if (response.ok) {
      console.log("删除成功", result);
      console.log(urlEncodedParams.toString());
      editingIndex.value = null;
      fetchUsers();
    } else {
      console.error("修改失败", result.message);
    }
  }
  catch (error) {
    console.error("请求失败", error);
  }
};

// 取消编辑
const cancelEdit = (index) => {
  if (confirm("确定取消修改吗？")) {
    editingIndex.value = null;
  }
};

// 格式化日期
const formatDate = (date) => {
  if (!date) return null;
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString();
};

// 页面加载时获取用户数据
onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/")
  }
  else {
    fetchUsers();
  }
});
</script>

<style scoped>
/* 样式保持不变 */
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
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
  width: 30%;
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
