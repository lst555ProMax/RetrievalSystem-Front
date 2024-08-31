<template>
  <div v-if="isVisible" class="overlay">
    <div class="MoneyHistory-dialog">
      <div class="dialog-header">
        <h3>积分记录</h3>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="dialog-body">
        <ul class="menu">
          <li
            class="menu-item"
            :class="{ active: localTab === 'score' }"
            @click="changeTab('score')"
          >
            充值记录
          </li>
          <li
            class="menu-item"
            :class="{ active: localTab === 'recharge' }"
            @click="changeTab('recharge')"
          >
            积分记录
          </li>
        </ul>
        <div v-if="localTab === 'score'">
          <table class="record-table">
            <thead>
              <tr>
                <th>消费场景</th>
                <th>消费积分</th>
                <th>消费时间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>问答</td>
                <td>1</td>
                <td>2024-08-30 11:16:24</td>
              </tr>
              <tr>
                <td>问答</td>
                <td>1</td>
                <td>2024-08-29 21:29:56</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="localTab === 'recharge'">
          <table class="record-table">
            <thead>
              <tr>
                <th>积分场景</th>
                <th>积分获取</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>问答</td>
                <td>1</td>
                <td>2024-08-30 11:16:24</td>
              </tr>
              <tr>
                <td>问答</td>
                <td>1</td>
                <td>2024-08-29 21:29:56</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button class="pagination-btn" disabled>‹</button>
          <span>1</span>
          <button class="pagination-btn">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

/* const currentTab = ref("score"); */

const props = defineProps({
  isVisible: Boolean,
  currentTab: {
    type: String,
    default: "score", // 默认显示积分记录
  },
});

// 定义 emits
const emit = defineEmits(["update:isVisible"]);

// 本地的 currentTab 状态
const localTab = ref(props.currentTab);

// 监视 props 传入的 currentTab 并更新本地状态
watch(
  () => props.currentTab,
  (newVal) => {
    localTab.value = newVal;
  }
);

// 点击事件来改变 localTab 并通知父组件更新
const changeTab = (tab) => {
  localTab.value = tab;
};

const close = () => {
  emit("update:isVisible", false);
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明遮罩 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 遮罩层 */
}

.MoneyHistory-dialog {
  background-color: #1a1c2d;
  border-radius: 10px;
  padding: 20px;
  width: 600px;
  z-index: 1000; /* 对话框内容 */
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dialog-header h3 {
  font-size: 18px;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  gap: 10px;
}

.menu-item {
  padding: 10px 20px;
  cursor: pointer;
  color: #ffffff;
  border-radius: 5px;
  background-color: #1a1c2d;
}

.menu-item.active {
  background-color: #2d2f43;
  font-weight: bold;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.record-table th,
.record-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #3e4157;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination-btn {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 3px;
}

.pagination-btn[disabled] {
  color: #555;
  cursor: not-allowed;
}
</style>
