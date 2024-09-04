<template>
    <main>
  <ul class='slider'>
    <li class='item' style="background-image: url('../../public/fe.svg')">
      <div class='content'>
        <h2 class='title'>Accurate Feature Extract</h2>
        <p class='description'> We use state-of-the-art models for feature extraction and perform secondary training to pursue optimal performance. </p>
        <button>Read More</button>
      </div>
    </li>
    <li class='item' style="background-image: url('../../public/fa.svg')">
      <div class='content'>
        <h2 class='title'>Focal Attention</h2>
        <p class='description'> Cross attention to key details and capture the most relevant graphic and textual features. </p>
        <button>Read More</button>
      </div>
    </li>
    <li class='item' style="background-image: url('../../public/retrieval.svg')">
      <div class='content'>
        <h2 class='title'>Fast and Slow</h2>
        <p class='description'> We use OpenCLIP as the foundation to provide high-speed preliminary queries, and then use our Focal Attention to perform slow but precise secondary filtering on this basis. </p>
        <button>Read More</button>
      </div>
    </li>
  </ul>
  <nav class='nav'>
    <ion-icon class='btn prev' name="arrow-back-outline" @click="prevSlide"></ion-icon>
    <ion-icon class='btn next' name="arrow-forward-outline" @click="nextSlide"></ion-icon>
  </nav>
</main>
</template>
<script>
export default {
  methods: {
    prevSlide() {
      const slider = this.$el.querySelector('.slider');
      const items = slider.querySelectorAll('.item');
      slider.prepend(items[items.length - 1]);
    },
    nextSlide() {
      const slider = this.$el.querySelector('.slider');
      const items = slider.querySelectorAll('.item');
      slider.append(items[0]);
    }
  }
};

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);
  </script>
  
<style scoped>
  * {
  margin: 0;
  padding: 0px;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.slider {
  width: 100%;
  margin: 0 auto;
}

.item {
  width: 100px;
  height: 100px;
  list-style-type: none;
  position: absolute;
  top: 5%;
  left: 5%;
  transform: translateX(-50%);
  z-index: 1;
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(255,255,255,0.3) inset;
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;

  &:nth-child(1), &:nth-child(2) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: none;
    border-radius: 0;
    box-shadow: none;
    opacity: 1;
  }
}

.content {
  width: min(30vw,400px);
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  font: 400 0.85rem helvetica,sans-serif;
  color: white;
  text-shadow: 0 3px 8px rgba(0,0,0,0.5);
  opacity: 0;
  display: none;

  & .title {
    font-family: 'arial-black';
    text-transform: uppercase;
  }

  & .description {
    line-height: 1.7;
    margin: 1rem 0 1.5rem;
    font-size: 0.8rem;
  }

  & button {
    width: fit-content;
    background-color: rgba(0,0,0,0.1);
    color: white;
    border: 2px solid white;
    border-radius: 0.25rem;
    padding: 0.75rem;
    cursor: pointer;
  }
}

.item:nth-of-type(2) .content {
  display: block;
  animation: show 0.75s ease-in-out 0.3s forwards;
}

@keyframes show {
  0% {
    filter: blur(5px);
    transform: translateY(calc(-50% + 75px));
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  user-select: none;

  & .btn {
    background-color: rgba(255,255,255,0.5);
    color: rgba(0,0,0,0.7);
    border: 2px solid rgba(0,0,0,0.6);
    margin: 0 0.25rem;
    padding: 0.75rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: rgba(255,255,255,0.3);
    }
  }
}

@media (width > 650px) and (width < 900px) {
  .content {
    & .title        { font-size: 1rem; }
    & .description  { font-size: 0.7rem; }
    & button        { font-size: 0.7rem; }
  }
  .item {
    width: 160px;
    height: 270px;

  }
}

@media (width < 650px) {
  .content {
    & .title        { font-size: 0.9rem; }
    & .description  { font-size: 0.65rem; }
    & button        { font-size: 0.7rem; }
  }
  .item {
    width: 130px;
    height: 220px;

  }
}
  </style>
  