<template>
  <Starfield />

  <Dashboard>
    <template #left-content>
      <div class="systemManagement">
      <div class="non-header">  
        <div class="main-content">
        </div>
      </div>
    </div>
    </template>
  </Dashboard>
  </template>
  
  <script setup>
  import { ref,onMounted} from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  import SidebarAdmin from "../../components/SidebarAdmin.vue";
  import HeadbarAdmin from "../../components/HeadbarAdmin.vue";
  import Starfield from "@/components/Starfield.vue"
  import {getUsername} from "@/utils/Auth";
  import Dashboard from "@/components/DashboardAdmin.vue";

  const router = useRouter();
  const route = useRoute();
  
  
  // 当前正在编辑的行索引
  const editingIndex = ref(null);
  
  // 存储编辑的数据
  const editUserData = ref({
    username: "",
    password: "",
    email: "",
    nickname: "",
  });
  
  onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  }
})
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

  </style>
  