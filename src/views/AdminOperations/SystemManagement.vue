<template>
  <Starfield />

  <Dashboard>
    <template #left-content>
      <div class="systemManagement">
        <div class="main-content">
          <h2>System Management</h2>

          <div class="backup-settings">
            <h4>Backup settings</h4>
            <div class="settings-row">
              <select v-model="backupSettings.frequency" :disabled="!isEditing">
                <option value="week">week</option>
                <option value="two weeks">two weeks</option>
                <option value="month">month</option>
                <option value="two months">two months</option>
                <option value="six mouths">six mouths</option>
                <option value="year">year</option>
              </select>
              <input
                v-model="backupSettings.path"
                :disabled="!isEditing"
                type="text"
              />
              <button v-if="!isEditing" @click="startEditing" class="btn">
                Change
              </button>
              <div v-if="isEditing" class="edit-buttons">
                <button @click="saveSettings" class="btn">Ensure</button>
                <button @click="cancelEditing" class="btn cancel-btn">
                  Cancel
                </button>
              </div>
              <!-- 备份按钮 -->
              <button @click="Backup" class="edit-buttons btn">Backup</button>
            </div>
          </div>

          <table class="backup-records">
            <thead>
              <tr>
                <th>Backup Personnel</th>
                <th>Backup Time</th>
                <th>Backup File Name</th>
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
      console.error(
        "Failed to retrieve administrator backup data:",
        response.message
      );
    }
  } catch (error) {
    console.error("Request failed:", error);
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
      alert("Backup settings have been modified!");
    } else {
      alert("Modification failed!");
    }
  } catch (error) {
    console.error("Request failed", error);
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
    } else {
      console.error(
        "Failed to retrieve administrator backup records:",
        response.data.message
      );
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

// 执行备份操作
const Backup = async () => {
  try {
    const response = await axios.get(api.create_backup, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.code === 0) {
      alert("Backup completed successfully");
      getRecord();
    } else {
      console.error("Backup failed:", response.data.message);
    }
  } catch (error) {
    console.error("Request failed:", error);
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
  alert("Backup operation in progress...");
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
  height: fit-content;
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 10px;
  overflow-y: auto;
  box-sizing: border-box;
  height: 780px;
  width: 100%;
}

h3 {
  color: #f0f0f0;
  margin-top: 20px;
}

.backup-settings {
  border-radius: 18px;
  box-shadow: 1px 1px 8px 0 grey;
  margin-bottom: 20px;
  padding: 10px 25px 20px 25px;
  width: 90%;
  height: 22%;
  color: rgba(255, 255, 255, 0.8);
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
}

.settings-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

select,
input {
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background-color: rgba(62, 62, 95, 0.6);
  color: #fff;
  width: 45%;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #0dbe83;
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

.backup-records th,
.backup-records td {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  text-align: left;
}

.backup-records th {
  background-color: rgba(62, 62, 95, 0.6);
}

.backup-btn {
  background: #e94e77;
  margin-top: 20px;
}

.backup-btn:hover {
  background: #d73760;
}
</style>
