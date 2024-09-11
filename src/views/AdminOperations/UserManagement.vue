<template>
  <Starfield />

  <Dashboard>
    <template #left-content>
      <div class="userManagement">
        <div class="main-content">
          <h2>User Management</h2>
          <table class="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Nickname</th>
                <th>Birthday</th>
                <th>Sex</th>
                <th>Description</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td v-if="editingIndex === index">
                  <input v-model="editUserData.username" readonly />
                </td>
                <td v-else>{{ user.username }}</td>

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
                  <input
                    v-model="editUserData.Sex"
                    placeholder="Sex not specified"
                  />
                </td>
                <td v-else>{{ user.sex || "N/A" }}</td>

                <td v-if="editingIndex === index">
                  <input v-model="editUserData.description" />
                </td>
                <td v-else>{{ user.description || "N/A" }}</td>

                <td>
                  <button
                    v-if="editingIndex === index"
                    @click="saveUser(index)"
                  >
                    Store
                  </button>
                  <button v-else @click="editUser(index)">Edit</button>

                  <!-- 删除用户按钮 -->
                  <button
                    v-if="editingIndex !== index"
                    @click="deleteUser(index)"
                  >
                    Delete
                  </button>

                  <button
                    v-if="editingIndex === index"
                    @click="cancelEdit(index)"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
const users = ref([]);

// 当前正在编辑的行索引
const editingIndex = ref(null);

// 存储编辑的数据
const editUserData = ref({
  username: "",
  email: "",
  nickname: "",
  birthday: "",
  Sex: "",
  description: "",
});

const api = {
  get_user_info: API_ENDPOINTS.get_user_info,
  edit_user_info: API_ENDPOINTS.edit_user_info,
  delete_user: API_ENDPOINTS.delete_user,
};

let url = ref(api.get_user_info);
const token = localStorage.getItem("jwtToken"); // 从 localStorage 获取 JWT 令牌

// 从后端获取用户数据
const fetchUsers = async () => {
  try {
    const response = await axios.get(url.value, {
      headers: {
        Authorization: `Bearer ${token}`, // 添加 Authorization 头部
      },
    });

    if (response.data.code === 0) {
      users.value = response.data.data; // 将返回的数据赋值给 users
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

    const formData = new FormData();
    formData.append("username", users.value[index].username);
    formData.append("email", users.value[index].email);
    formData.append("nickname", users.value[index].nickname);
    formData.append(
      "sex",
      !users.value[index].Sex ? 3 : users.value[index].Sex
    );
    formData.append("description", users.value[index].description);
    formData.append(
      "birthday",
      !users.value[index].birthday ? "2000-01-01" : users.value[index].birthday
    );

    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 添加 Authorization 头部
        },
        body: formData,
      });

      const result = await response.json();
      if (result.code === 0) {
        editingIndex.value = null;
        alert("User information has been updated!");
      } else {
        console.error("Edit failed", result.message);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  }
};

let url3 = api.delete_user;
// 删除用户
const deleteUser = async (index) => {
  if (confirm("Are you sure you want to delete this user?")) {
    alert("User has been deleted!");
    if (editingIndex.value === index) {
      editingIndex.value = null;
      editUserData.value = {};
    }

    const urlEncodedParams = new URLSearchParams(
      Object.entries(users.value[index])
    );

    try {
      const response = await fetch(url3, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 添加 Authorization 头部
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedParams.toString(),
      });

      const result = await response.json();

      if (response.ok) {
        editingIndex.value = null;
        fetchUsers();
      } else {
        console.error("Edit failed", result.message);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  }
};

// 取消编辑
const cancelEdit = (index) => {
  if (confirm("Are you sure you want to cancel the modification?")) {
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
    router.push("/");
  } else {
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
  height: fit-content;
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: 780px;
}

.user-table {
  border-radius: 18px;
  box-shadow: 1px 1px 8px 0 grey;
  height: 90%;
  margin-bottom: 20px;
  padding: 20px 25px 20px 25px;
  width: 90%;
  color: rgba(255, 255, 255, 0.8);
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.user-table th,
.user-table td {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  text-align: left;
}

.user-table th {
  background-color: rgba(62, 62, 95, 0.6);
}

.user-table th:nth-child(7),
.user-table td:nth-child(7) {
  width: 200px; /* 设置 Operation 列的宽度为100px，可以根据需要调整 */
  text-align: center; /* 使内容居中 */
}

.user-table button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: #0dbe83;
  width: 40%;
  height: 100%;
  margin-left: 5px;
  margin-right: 5px;
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
