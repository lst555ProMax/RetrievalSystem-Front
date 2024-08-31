<template>
  <div v-if="isVisible" class="pay-overlay">
    <div class="pay-container">
        <header class="pay-header">
          <h2>会员权益</h2>
          <button class="close-button" @click="close">×</button>
        </header>
        <div class="lr-container">
      <!-- 左侧：会员权益比较 -->
      <div class="benefits-section">
        <div class="benefits-header">
          <!--           <img src="path/to/your/icon.png" alt="会员图标" class="benefits-icon" /> -->
          <h2>会员权益对比</h2>
        </div>
        <div class="benefits-table">
          <div class="benefits-row">
            <div class="benefit-item">权益</div>
            <div class="benefit-item">普通用户</div>
            <div class="benefit-item">充值用户</div>
            <div class="benefit-item">会员用户</div>
          </div>
          <div
            class="benefits-row"
            v-for="(benefit, index) in benefits"
            :key="index"
          >
            <div class="benefit-item" >{{ benefit.name }}</div>
            <div class="benefit-item">{{ benefit.normal }}</div>
            <div class="benefit-item">{{ benefit.recharged }}</div>
            <div class="benefit-item">{{ benefit.member }}</div>
          </div>
        </div>
        <button class="open-membership-btn">立即开通Boser AI会员</button>
      </div>

      <!-- 右侧：积分和会员购买 -->
      <div class="purchase-section">
        <!-- 积分选项 -->
        <div class="points-section">
 <!--          <h6>积分</h6> -->
          <div class="points-options">
            <div
              class="point-option"
              v-for="(point, index) in points"
              :key="index"
            >
              <div class="point-value" style="font-size: 10px;">{{ point.value }}积分</div>
              <div class="point-price" style="font-size: 10px;">¥ {{ point.price }}</div>
              <div class="point-original" style="font-size: 10px;">¥ {{ point.original }}</div>
              <div class="point-per-cost" style="font-size: 10px;">仅需{{ point.perCost }}</div>
            </div>
          </div>
        </div>

        <!-- 会员选项 -->
        <div class="membership-section">
          <div class="membership-options">
            <div
              class="membership-option"
              v-for="(membership, index) in memberships"
              :key="index"
            >
              <div class="membership-duration" style="font-size: 10px;">{{ membership.duration }}</div>
              <div class="membership-price" style="font-size: 10px;">¥ {{ membership.price }}</div>
              <div class="membership-original" style="font-size: 10px;">¥ {{ membership.original }}</div>
              <div class="membership-per-day" style="font-size: 10px;">{{ membership.perDay }}</div>
            </div>
          </div>
        </div>

        <!-- 扫码支付 -->
        <div class="payment-section">
          <p>扫码支付：<span class="total-price">¥ 99.90</span></p>
          <div class="payment-methods">
            <button class="wechat-pay-btn">使用微信扫码支付</button>
          </div>
          <p class="payment-warning">
            提示：虚拟产品不支持退款，最终解释权归图灵不灵组所有
          </p>
          <div class="agreements">
            <input type="checkbox" id="agreement" />
            <label for="agreement">
              同意《<a href="#">充值协议</a>》和《<a href="#">隐私协议</a>》
            </label>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

const close = () => {
  emit("update:isVisible", false);
};

// 模拟数据：会员权益
const benefits = ref([
  { name: "多模型切换", normal: "✔", recharged: "✔", member: "✔" },
  { name: "高速通道", normal: "✘", recharged: "✔", member: "✔" },
  { name: "无限绘图", normal: "✘", recharged: "✔", member: "✔" },
  { name: "批量绘图", normal: "✔", recharged: "✔", member: "✔" },
  { name: "无限问答", normal: "✘", recharged: "✔", member: "✔" },
  { name: "绘图离线设置", normal: "✘", recharged: "✔", member: "✔" },
]);

// 模拟数据：积分选项
const points = ref([
  {
    discount: "限时7折",
    value: 300,
    price: 5.9,
    original: 20,
    perCost: "0.02元/积分",
  },
  {
    discount: "",
    value: 500,
    price: 4.9,
    original: 38,
    perCost: "0.01元/积分",
  },
  {
    discount: "",
    value: 1000,
    price: 7.9,
    original: 60,
    perCost: "0.01元/积分",
  },
  {
    discount: "",
    value: 5000,
    price: 14.9,
    original: 250,
    perCost: "0.01元/积分",
  },
]);

// 模拟数据：会员选项
const memberships = ref([
  {
    discount: "已减50元",
    duration: "6个月",
    price: 99.9,
    original: 150,
    perDay: "仅需0.56元/天",
  },
  {
    discount: "已减60元",
    duration: "3个月",
    price: 39.9,
    original: 100,
    perDay: "仅需0.44元/天",
  },
  {
    discount: "",
    duration: "1个月",
    price: 29.9,
    original: 40,
    perDay: "仅需1.00元/天",
  },
  {
    discount: "限时7折",
    duration: "1天",
    price: 5,
    original: 8,
    perDay: "仅需5.00元/天",
  },
]);
</script>

<style scoped>
.pay-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.pay-container {
    height: 80vh; /* 修改为使用视口高度，便于调整适应不同屏幕 */
  max-width: 90vw; /* 确保在小屏幕上不会超出视口宽度 */
  display: flex;
  background-color: #1a1c2d;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  flex-direction: column;
  overflow: hidden; /* 防止内容溢出 */
}

.pay-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #262938;
    border-bottom: 1px solid #2c2f45;
  }
  
  .pay-header h2 {
    margin: 0;
    font-size: 18px;
    color: #fff;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #ccc;
    font-size: 20px;
    cursor: pointer;
  }

.lr-container{
    display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: auto; /* 当内容超出高度时显示滚动条 */
  max-height: calc(100% - 40px); /* 确保高度不超过父级，减去 padding */
  margin:10px;
}

/* 左侧会员权益 */
.benefits-section {
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #24273a;
  border-radius: 10px;
  height:100%;
}

.benefits-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.benefits-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.benefits-table {
  display: flex;
  flex-direction: column;
}

.benefits-row {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.benefit-item {
  flex: 1;
  text-align: center;
}

.open-membership-btn {
  width: 100%;
  padding: 10px;
  background-color: #901bf5;
  border: none;
  border-radius: 5px;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
}

/* 右侧购买区域 */
.purchase-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.points-section,
.membership-section {
  background-color: #24273a;
  padding: 10px;
  border-radius: 10px;
  height:30%;
}

.points-options,
.membership-options {
  display: flex;
  gap: 10px;
}

.point-option,
.membership-option {
  flex: 1;
  background-color: #33354a;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  height:60%;
}

.point-discount,
.membership-discount {
  color: #ff4747;
  font-size: 12px;
}

.point-value,
.membership-duration {
  font-size: 16px;
  margin: 5px 0;
}

.point-price,
.membership-price {
  font-size: 20px;
  font-weight: bold;
}

.point-original,
.membership-original {
  text-decoration: line-through;
  font-size: 12px;
  color: #aaa;
}

.point-per-cost,
.membership-per-day {
  font-size: 12px;
  color: #ddd;
}

.payment-section {
  background-color: #24273a;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.total-price {
  font-size: 24px;
  font-weight: bold;
  color: #ff4747;
}

.payment-methods {
  margin: 10px 0;
}

.wechat-pay-btn {
  background-color: #07c160;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.payment-warning {
  font-size: 12px;
  color: #aaa;
}

.agreements {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;
}

.agreements a {
  color: #ff4747;
  text-decoration: none;
}
</style>
