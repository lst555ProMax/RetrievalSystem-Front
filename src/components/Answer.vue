<template>
    <div v-if="isVisible" class="answer-overlay">
      <div class="faq-container">
        <header class="feedback-header">
          <h2>常见问题与解答</h2>
          <button class="close-button" @click="close">×</button>
        </header>
        <div class="lr-container">
          <!-- Sidebar for questions -->
          <aside class="faq-sidebar">
            <ul>
              <li v-for="(question, index) in questions" :key="index" @click="selectQuestion(index)">
                {{ question.title }}
              </li>
            </ul>
          </aside>
  
          <!-- Main content for answers -->
          <main class="faq-content">
            <h2>{{ selectedQuestion.title }}</h2>
            <p>{{ selectedQuestion.answer }}
                <span class="icon-container">
      <button class="icon-button like-button" @click="likeContent">👍</button>
      <button class="icon-button copy-button" @click="copyContent">📋</button>
    </span>
            </p>
          </main>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isVisible: Boolean,
  });
  
  const emit = defineEmits(['update:isVisible']);
  
  const close = () => {
    emit('update:isVisible', false);
  };
  
  // Placeholder data
  const questions = ref([
  { title: 'How does a text-to-image model work?', answer: 'A text-to-image model generates images based on textual descriptions. It involves training a neural network with large datasets of images and corresponding textual descriptions. The model learns to understand the relationship between text and images and can then create images that match the input text. For example, if the text input describes a “sunset over the ocean,” the model uses patterns it learned during training to generate an image that depicts a sunset over the ocean. The model’s capability to generate realistic images depends on its training data and architecture.' },
  { title: 'What is the difference between a text-to-image model and a text generation model?', answer: 'Text-to-image models and text generation models serve different purposes. A text-to-image model generates images from textual descriptions, while a text generation model produces text based on given input or context. Text-to-image models learn to associate textual descriptions with visual features to create corresponding images. On the other hand, text generation models focus on understanding language patterns and context to produce coherent and contextually relevant text. For instance, a text generation model might generate a story based on a prompt, whereas a text-to-image model would create an image based on a description provided.' },
  { title: 'What are some common use cases for text-to-image models?', answer: 'Text-to-image models are used in various applications, including creative content generation, advertising, virtual environments, and assistive technologies. In creative content generation, these models help artists and designers by providing visual representations of their ideas. In advertising, they generate product images based on descriptions, enhancing marketing materials. In virtual environments, text-to-image models create realistic graphics for games and simulations based on textual input. Additionally, they can assist individuals with visual impairments by providing visual content based on text descriptions.' },
  { title: 'What is a text generation model?', answer: 'A text generation model is an AI model designed to produce human-like text based on input or context. These models are trained on large datasets of text to understand language patterns, grammar, and context. They can generate coherent and contextually relevant sentences, paragraphs, or even entire articles. Text generation models are used in applications such as chatbots, content creation, translation services, and summarization tools. For instance, a text generation model might generate responses in a conversational AI system or create content for blogs and social media based on given prompts.' },
  { title: 'How do text generation models handle context?', answer: 'Text generation models handle context by using advanced neural network architectures that are designed to understand and remember the input context. These models, such as transformers, utilize mechanisms like attention to focus on different parts of the input text and generate relevant output. The model processes the input text, captures the context, and generates responses that are contextually appropriate. For instance, in a conversation, the model can keep track of previous messages to ensure its responses are coherent and relevant to the ongoing dialogue.' },
  { title: 'What are the key challenges in text-to-image generation?', answer: 'Key challenges in text-to-image generation include ensuring the generated images accurately represent the textual description, handling diverse and complex descriptions, and maintaining image quality and realism. Models must learn to generate images that match the details provided in the text, which can be difficult with vague or complex descriptions. Additionally, achieving high-quality and realistic images requires sophisticated model architectures and large datasets for training. Balancing these factors while ensuring that generated images are diverse and creative remains a significant challenge in this field.' },
  { title: 'Can text-to-image models generate images of abstract concepts?', answer: 'Text-to-image models can generate images of abstract concepts, but the results may vary in quality and accuracy. Abstract concepts are often challenging because they lack concrete visual representations. The model relies on its training data and learned patterns to create images that represent the abstract idea, but the generated images may be more interpretative or artistic rather than literal. For example, generating an image of “happiness” might result in various creative representations, such as bright colors or smiling faces, depending on the model’s understanding and training.' },
  { title: 'What is the role of training data in text-to-image models?', answer: 'Training data plays a crucial role in text-to-image models as it provides the examples from which the model learns. The quality, quantity, and diversity of the training data affect the model’s ability to generate accurate and realistic images. A well-curated dataset with diverse textual descriptions and corresponding images helps the model learn various visual features and their associations with text. The more comprehensive and representative the training data, the better the model can understand and generate images based on different textual inputs.' },
  { title: 'How do text-to-image models evaluate image quality?', answer: 'Text-to-image models evaluate image quality using various metrics and techniques, including human judgment, objective metrics, and adversarial evaluations. Human evaluators assess the generated images based on criteria such as realism, coherence with the text, and visual appeal. Objective metrics, like Inception Score or Fréchet Inception Distance, measure aspects such as image clarity and diversity. Adversarial evaluation involves comparing the model’s outputs with real images to determine how closely they match. Combining these approaches helps ensure that the generated images meet quality standards.' },
  { title: 'What are the privacy considerations in using text-to-image models?', answer: 'Privacy considerations in using text-to-image models include protecting user data, ensuring data anonymization, and avoiding the generation of sensitive or identifiable information. Users’ textual inputs and generated images should be handled with confidentiality and security to prevent unauthorized access or misuse. Additionally, models should be designed to avoid creating images that could reveal personal information or violate privacy. Implementing strong data protection measures and ethical guidelines helps address these privacy concerns and ensures responsible use of text-to-image technology.' }
]);

  
  const selectedQuestion = ref(questions.value[0]);
  
  function selectQuestion(index) {
    selectedQuestion.value = questions.value[index];
  }
  </script>
  
  <style scoped>
  .answer-overlay {
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
  
  .faq-container {
    height: 80vh; /* Viewport height */
    width: 60vw; /* Viewport width */
    display: flex;
    background-color: #1a1c2d;
    border-radius: 10px;
    color: #fff;
    flex-direction: column;
    overflow: hidden;
  }
  
  .feedback-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    background-color: #262938;
    border-bottom: 1px solid #2c2f45;
    position: relative;
    flex: 1;
  }
  
  .feedback-header H2 {
    margin: 0;
    font-size: 18px;
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .close-button {
    background: none;
    border: none;
    color: #ccc;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
  
  .lr-container {
    display: flex;
    flex-direction: row;
    flex: 20;
    overflow: hidden; /* Hide scrollbars for main container */
  }
  
  .faq-sidebar {
    width: 250px;
    background-color: #262938;
    padding: 10px;
    overflow-y: auto; /* Enable vertical scrolling */
    flex:1;
  }

  /* Hide scrollbar for WebKit browsers */
.faq-sidebar::-webkit-scrollbar {
  width: 0; /* Hide scrollbar */
  background: transparent; /* Optional: make scrollbar background transparent */
}
  
  .faq-sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .faq-sidebar li {
    cursor: pointer;
    padding: 15px 5px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    font-weight: 800;
    overflow-wrap: break-word;
    word-break: break-word; 
  }
  
  .faq-sidebar li:hover {
    background-color: #ddd;
  }
  
  .faq-content {
  flex: 4;
  padding: 20px;
  background-color: #1a1c2c;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: space-between; /* 分配子元素的空间 */
  height: 100%; /* 确保父容器高度占满可用空间 */
}

.faq-content h2 {
    width:60%;
  margin: 0; /* 去除默认的margin */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center; 
  flex: 2; /* 标题在 70%-80% 的位置 */
}

.faq-content p {
  margin: 0; /* 去除默认的margin */
  text-align: left;
  font-size: large;
  display: flex;
  flex: 3; /* 内容在 20%-50% 的位置 */
  align-items: flex-start; /* 垂直对齐到顶部 */
}

/* 图标容器样式 */
.icon-container {
  position: relative;
  bottom: 10px; /* 位置在右下角 */
  right: 10px;
  display: flex;
  gap: 10px; /* 图标之间的间距 */
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px; /* 图标大小 */
  color: #ccc;
  transition: color 0.3s;
}

.icon-button:hover {
  color: #fff; /* 鼠标悬停效果 */
}

  </style>
  