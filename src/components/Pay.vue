<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="main flow modal-content">
      <button class="modal-close-button" @click="close">✖</button>

      <h1 class="main__heading">Pricing</h1>
      <div class="main__cards cards">
        <div class="cards__inner">
          <div class="cards__card card">
            <h2 class="card__heading">Basic</h2>
            <p class="card__price">¥9.99 per month</p>
            <ul role="list" class="card__bullets flow">
              <li>1000 call permissions</li>
              <li>Regular feedback support</li>
            </ul>
            <a href="#basic" class="card__cta cta" @click="basicPurchase">Get Started</a>
          </div>

          <div class="cards__card card">
            <h2 class="card__heading">Pro</h2>
            <p class="card__price">¥29.99 per month</p>
            <ul role="list" class="card__bullets flow">
              <li>5000 call permissions</li>
              <li>500 downloads</li>
              <li>Priority feedback support</li>
            </ul>
            <a href="#pro" class="card__cta cta">Upgrade to Pro</a>
          </div>

          <div class="cards__card card">
            <h2 class="card__heading">Ultimate</h2>
            <p class="card__price">¥49.99 per month</p>
            <ul role="list" class="card__bullets flow">
              <li>Unlimited call permissions</li>
              <li>Unlimited downloads</li>
              <li>7/24 feedback support</li>
              <li>Experience in advance</li>
              <li>Intelligent dialogue, automatic summarization</li>
            </ul>
            <a href="#ultimate" class="card__cta cta">Go Ultimate</a>
          </div>
        </div>

        <div class="overlay cards__inner"></div>
      </div>
    </div>
  </div>
</template>


<script setup>
/* import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

const close = () => {
  emit("update:isVisible", false);
};

const cardsContainer = ref(null); // 使用ref代替直接查询
const overlay = ref(null); // 使用ref代替直接查询
const cards = ref([]); // 存储所有卡片元素

const api = {
  pay: "http://172.20.10.7:8000/user/pay",
};

let url = api.pay

const basicPurchase = async () => {  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedParams.toString(),
    })
  }
  catch(error) {
    console.error("请求失败", error);
  }
}

// 在mounted阶段查询DOM
onMounted(() => {
  // 监听 pointermove 事件
  const applyOverlayMask = (e) => {
    // 在使用前检查是否已正确获取
    if (!cardsContainer.value || !overlay.value) return;

    const x = e.pageX - cardsContainer.value.offsetLeft;
    const y = e.pageY - cardsContainer.value.offsetTop;
    
    overlay.value.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
  };

  // 在 mounted 时获取所有 .card 元素并初始化 overlay
  cards.value = Array.from(cardsContainer.value.querySelectorAll(".card"));
  overlay.value = document.querySelector(".overlay");

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const cardIndex = cards.value.indexOf(entry.target);
      if (cardIndex >= 0) {
        const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
        overlay.value.children[cardIndex].style.width = `${width}px`;
        overlay.value.children[cardIndex].style.height = `${height}px`;
      }
    });
  });

  const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    overlayCard.textContent = cardEl.querySelector(".cta").textContent;
    overlay.value.append(overlayCard);
    observer.observe(cardEl);
  };

  cards.value.forEach(initOverlayCard);

  // 绑定事件监听器，确保在获取元素后才进行
  document.body.addEventListener("pointermove", applyOverlayMask);
});
 */
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&display=swap");

*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  min-height: 100vh;
}

body {
  font-family: "League Spartan", system-ui, sans-serif;
  font-size: 1.1rem;
  line-height: 1.2;
  background-color: #212121;
  color: #ddd;
}

ul {
  list-style: none;
}

.main__heading {
  font-weight: 600;
  font-size: 2.25em;
  margin-bottom: 0.75em;
  text-align: center;
  color: #eceff1;
}

.cards {
  position: relative;
}

.cards__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5em;
}

.card {
  --flow-space: 0.5em;
  --hsl: var(--hue), var(--saturation), var(--lightness);
  flex: 1 1 14rem;
  padding: 1.5em 2em;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  align-items: start;
  gap: 1.25em;
  color: #eceff1;
  background-color: #2b2b2b;
  border: 1px solid #eceff133;
  border-radius: 15px;
}

.card:nth-child(1) {
  --hue: 165;
  --saturation: 82.26%;
  --lightness: 51.37%;
}

.modal-close-button {
  background: none;
  border: none;
  color: #eceff1;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.card:nth-child(2) {
  --hue: 291.34;
  --saturation: 95.9%;
  --lightness: 61.76%;
}

.card:nth-child(3) {
  --hue: 338.69;
  --saturation: 100%;
  --lightness: 48.04%;
}

.card__bullets {
  line-height: 1.4;
}

.card__bullets li::before {
  display: inline-block;
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='16' title='check' fill='%23dddddd'%3E%3Cpath d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' /%3E%3C/svg%3E");
  transform: translatey(0.25ch);
  margin-right: 1ch;
}

.card__heading {
  font-size: 1.05em;
  font-weight: 600;
}

.card__price {
  font-size: 1.75em;
  font-weight: 700;
}

.flow > * + * {
  margin-top: var(--flow-space, 1.25em);
}

.cta {
  display: block;
  align-self: end;
  margin: 1em 0 0.5em 0;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #0d0d0d;
  padding: 0.7em;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
}

.overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  opacity: var(--opacity, 0);
  -webkit-mask: radial-gradient(
    25rem 25rem at var(--x) var(--y),
    #000 1%,
    transparent 50%
  );
  mask: radial-gradient(
    25rem 25rem at var(--x) var(--y),
    #000 1%,
    transparent 50%
  );
  transition: 400ms mask ease;
  will-change: mask;
}

.overlay .card {
  background-color: hsla(var(--hsl), 0.15);
  border-color: hsla(var(--hsl), 1);
  box-shadow: 0 0 0 1px inset hsl(var(--hsl));
}

.overlay .cta {
  display: block;
  grid-row: -1;
  width: 100%;
  background-color: hsl(var(--hsl));
  box-shadow: 0 0 0 1px hsl(var(--hsl));
}

:not(.overlay) > .card {
  transition: 400ms background ease;
  will-change: background;
}

:not(.overlay) > .card:hover {
  --lightness: 95%;
  background: hsla(var(--hsl), 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2b2b2b;
  padding: 2rem;
  border-radius: 15px;
  max-width: 75rem;
  width: 90%;
  overflow: auto;
  max-height: 90vh;
}
</style>
