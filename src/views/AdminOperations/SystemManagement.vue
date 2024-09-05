<template>
  <Starfield />

  <Dashboard>
    <template #left-content>
      <div class="systemManagement">
        <div class="non-header">
          <div class="main-content">
            <!-- 备份设置框 -->
            <div class="backup-settings">
              <h3>备份设置</h3>
              <div class="settings-row">
                <select
                  v-model="backupSettings.frequency"
                  :disabled="!isEditing"
                >
                  <option value="week">每周</option>
                  <option value="two weeks">每两周</option>
                  <option value="month">每月</option>
                  <option value="two months">每两月</option>
                  <option value="six mouths">每半年</option>
                  <option value="year">每年</option>
                </select>
                <input
                  v-model="backupSettings.path"
                  :disabled="!isEditing"
                  type="text"
                />
                <button v-if="!isEditing" @click="startEditing" class="btn">
                  修改
                </button>
                <div v-if="isEditing" class="edit-buttons">
                  <button @click="saveSettings" class="btn">保存</button>
                  <button @click="cancelEditing" class="btn cancel-btn">
                    取消
                  </button>
                </div>
              </div>
            </div>

            <!-- 备份记录表 -->
            <h3>备份记录</h3>
            <table class="backup-records">
              <thead>
                <tr>
                  <th>备份人员</th>
                  <th>备份时间</th>
                  <th>备份文件名</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, index) in backupRecords" :key="index">
                  <td>{{ record.admin }}</td>
                  <td>{{ record.backup_date }}</td>
                  <td>{{ record.backup_filename }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 备份按钮 -->
            <button @click="Backup" class="btn backup-btn">备份</button>
          </div>
        </div>
      </div>
    </template>
  </Dashboard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig";

import Starfield from "@/components/Starfield.vue";
import Dashboard from "@/components/DashboardAdmin.vue";
import { getUsername } from "@/utils/Auth";

const router = useRouter();

// 备份设置
const backupSettings = ref({
  frequency: "",
  path: "",
});

// 备份记录示例数据
const backupRecords = ref([]);

// 编辑状态
const isEditing = ref(false);

const token = localStorage.getItem("jwtToken");

const api = {
  get_setting: API_ENDPOINTS.get_setting,
  set_setting: API_ENDPOINTS.set_setting,
  get_record: API_ENDPOINTS.get_record,
  create_backup: API_ENDPOINTS.create_backup,
};

// 获取管理员备份设置
const getSetting = async () => {
  try {
    const response = await axios.get(api.get_setting, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.code === 0) {
      backupSettings.value = {
        frequency: response.data.data.backup_frequency,
        path: response.data.data.backup_path,
      };
    } else {
      console.error("获取管理员备份数据失败:", response.message);
    }
  } catch (error) {
    console.error("请求失败:", error);
  }
};

// 更改管理员备份设置
const setSetting = async () => {
  const formData = new FormData();
  formData.append("backup_frequency", backupSettings.value.frequency);
  formData.append("backup_path", backupSettings.value.path);

  try {
    const response = await fetch(api.set_setting, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // 添加 Authorization 头部
      },
      body: formData,
    });

    const result = await response.json();

    if (result.code === 0) {
      console.log("修改成功", result);
      alert("备份设置已修改！");
    } else {
      console.error("修改失败", result.message);
      alert("修改失败！");
    }
  } catch (error) {
    console.error("请求失败", error);
  }
};

// 获取管理员备份记录
const getRecord = async () => {
  try {
    const response = await axios.get(api.get_record, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.data.code === 0) {
      backupRecords.value = response.data.data;
      backupRecords.value.forEach((record) => {
        record.admin = response.data.admin_name;
      });
/*       alert("备份记录更新成功！"); */
    } else {
      console.error("获取管理员备份记录失败:", response.data.message);
    }
  } catch (error) {
    console.error("请求失败:", error);
  }
};


const Backup = async () => {
  try {
    const response = await axios.get(api.create_backup, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.code === 0) {
      alert("备份顺利进行！");
      getRecord();
    } else {
      console.error("备份失败:", response.data.message);
    }
  } catch (error) {
    console.error("请求失败:", error);
  }
};


onMounted(() => {
  const username = getUsername();
  if (!username) {
    router.push("/");
  } else {
    getSetting();
    getRecord();
  }
});

// 开始编辑
const startEditing = () => {
  isEditing.value = true;
};

// 保存设置
const saveSettings = async () => {
  isEditing.value = false;
  await setSetting(); // 调用保存设置的 API
};

// 取消编辑
const cancelEditing = () => {
  isEditing.value = false;
};

// 执行备份
const executeBackup = () => {
  alert("正在执行备份操作...");
  // 这里可以添加实际的备份操作逻辑
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  color: #d3d3d3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.systemManagement {
  display: flex;
  height: calc(100vh - 10px);
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
  background: #1c1e26;
  padding: 20px;
  border: 1px solid #444;
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

h3 {
  color: #f0f0f0;
  margin-top: 20px;
}

.backup-settings {
  margin-bottom: 20px;
  padding: 15px;
  background: #2e3038;
  border-radius: 5px;
  width: 100%;
}

.settings-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

select,
input {
  padding: 8px;
  border: 1px solid #666;
  border-radius: 4px;
  background: #333;
  color: #fff;
  flex: 1;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #4a90e2;
  color: #fff;
  cursor: pointer;
}

.btn:hover {
  background: #357abd;
}

.edit-buttons {
  display: flex;
  gap: 10px;
}

.cancel-btn {
  background: #d9534f;
}

.cancel-btn:hover {
  background: #c9302c;
}

.backup-records {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.backup-records th,
.backup-records td {
  padding: 10px;
  border: 1px solid #555;
  text-align: center;
}

.backup-records th {
  background: #333;
  color: #ddd;
}

.backup-records td {
  color: #bbb;
}

.backup-btn {
  background: #e94e77;
  margin-top: 20px;
}

.backup-btn:hover {
  background: #d73760;
}
</style>
