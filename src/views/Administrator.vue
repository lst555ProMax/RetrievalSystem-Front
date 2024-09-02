<template>
<Starfield />

  <div class="administrator">
    <HeadbarAdmin></HeadbarAdmin>
    <div class="non-header">
      <SidebarAdmin></SidebarAdmin>

      <div class="main-content">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import SidebarAdmin from "../components/SidebarAdmin.vue";
import HeadbarAdmin from "../components/HeadbarAdmin.vue";
import Starfield from "@/components/Starfield.vue"


const router = useRouter();
const route = useRoute();

</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.administrator {
  display: flex;
  height: calc(100vh - 10px);
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
}

.non-header {
  display: flex;
  height: 100%;
  flex-direction: row;
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
