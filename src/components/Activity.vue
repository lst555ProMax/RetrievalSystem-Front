<template>
      <div class="menu-bar">
        <div class="menu-items">
        <div class="menu-item" :class="{ active: activeTab === 'official' }" @click="setActiveTab('official')">官方通知</div>
        <div class="menu-item" :class="{ active: activeTab === 'activity' }" @click="setActiveTab('activity')">动态</div>
    </div>
        <span class="read-all" style="color:rgba(255,255,255,0.4);">一键已读</span>
      </div>
  
      <!-- 内容区域 -->
      <div class="content">
        <div class="activity-state">
            <i class="fa-solid fa-box-open fa-2xl"></i>
          <p class="activity-text">暂无动态</p>
        </div>
      </div>
      <div class="tab">
      <!-- 查看全部按钮 -->
      <el-button  round class="view-all-button"><i class="fa-regular fa-eye" style="margin-right: 5px"></i>查看全部</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 控制当前激活的标签
  const activeTab = ref('official');
  
  const setActiveTab = (tab) => {
    activeTab.value = tab;
  };
  
  // 模拟关闭菜单的方法
  const closeDropdowns = () => {
    console.log('关闭菜单');
  };
  </script>
  
  <style scoped>
  .settings-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #1e1f2b;
    border-radius: 10px;
    width: 400px;
    color: #c0c0c0;
    position: relative;
  }
  
  /* 顶部菜单栏样式 */
  .menu-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
    border-bottom: 1px solid #2c2c3c;
    margin-bottom: 20px;
    height:40px;
  }

  .menu-items{
    width: 80%;
    height:auto;
    justify-content: space-left;
height:40px;
align-items: center;
display: flex;
flex-direction: row;
  }
  
  .menu-item {
    cursor: pointer;
    padding: 10px;
    color: #c0c0c0;
    transition: color 0.3s;
    height:40px;
  }
  
  .menu-item.active {
    color: #ffffff;
    border-bottom: 2px solid #3e3e5f;
    height:40px;
  }
  
  .read-all {
    color: #c0c0c0;
    cursor: pointer;
    align-content: center;
  }
  
  /* 内容区域样式 */
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 250px;
    background:transparent;
    border-radius: 8px;
  }
  
  .activity-state {
    text-align: center;
  }
  
  .activity-image {
    width: 50px;
  
    margin-bottom: 10px;
  }
  
  .activity-text {
    font-size: 14px;
    color: #888888;
  }

  .tab {
  height: 20%;
  width:100%;
  margin-bottom: 10px;
  justify-content: center;
  display: flex;
  padding: 10px;
}
  /* 查看全部按钮样式 */
  .view-all-button {
    flex:1;
    --el-button-bg-color: rgba(30, 30, 63, 0.2); /* 设置按钮背景颜色 */
  --el-button-border-color: #252738; /* 设置按钮边框颜色 */
  }
  
  .view-all-button:hover {
    --el-button-hover-bg-color: #3e3e5f; /* 悬浮时的背景颜色 */
  --el-button-hover-border-color: #3e3e5f; /* 悬浮时的边框颜色 */
  }
  </style>
  