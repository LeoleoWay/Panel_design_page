<template>
  <div id="app">
    <div class="logo-float">
      <img src="@/assets/logo.png" alt="Logo" class="logo-image">
    </div>

    <div class="gif-background">
      <span class="overlay-text">DNA Panel Design Tool</span>
    </div>

    <router-view class="main_area"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
    font-family: 'HarmonyOS_Sans';
    src: url('./assets/fonts/HarmonyOS_Sans/HarmonyOS_Sans_Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}
@font-face {
    font-family: 'HarmonyOS_Sans_Medium';
    src: url('./assets/fonts/HarmonyOS_Sans/HarmonyOS_Sans_Medium.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}
@font-face {
    font-family: 'HarmonyOS_Sans_Regular';
    src: url('./assets/fonts/HarmonyOS_Sans/HarmonyOS_Sans_Regular.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}
@font-face {
    font-family: 'HarmonyOS_Sans_Thin';
    src: url('./assets/fonts/HarmonyOS_Sans/HarmonyOS_Sans_Thin.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;  /* 将边距设置为0 */
  height: 100vh; /* 设置高度为视口的100% */
  width: 100vw;  /* 设置宽度为视口的100% */
}

.logo-image {
  width: 10%;
  width: 10%;
  display: block;           /* 使图片块级显示，使其在中心 */
  margin-left: auto;        /* 与下一行结合，将图片居中 */
  margin-right: auto;       /* 与上一行结合，将图片居中 */
}

.logo-float {
  position: fixed;
  left: 7%;
  transform: translateX(-50%);
  margin-top: 50px;
  z-index: -2;  /* 使 logo 位于其他元素的上方 */
}

.gif-background {
  background-image: url("./assets/DNA_1.gif");
  background-repeat: repeat-x;  /* 使 gif 在 x 轴方向重复 */
  background-position: center center;  /* 将图片居中 */
  background-size: auto 100%; 
  height: 200px; 
  width: 100%;
  padding: 0px;
  margin: 0px;
  position: relative;
  background-color: rgba(219, 226, 228, 1); /* 蓝绿色 */
  mix-blend-mode: multiply;
  z-index: -2;
}

.gif-background::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(219, 226, 228, 0.5), white);
    pointer-events: none; /* 以防止伪元素拦截鼠标事件 */
    z-index: -1;
}

.overlay-text {
  font-family: 'HarmonyOS_Sans', sans-serif;
  font-weight: normal;
  font-style: normal;
  position: absolute; /* 绝对定位元素 */
  top: 50%;  /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 偏移文本，确保完全居中 */
  color: var(--e-global-color-primary);
  font-size: 60px; /* 文本大小 */
}

.main_area {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 25%;  /* 添加左边距 */
  padding-right: 25%; /* 添加右边距 */
  background-image: url('./assets/background.png');
  background-size: cover; /* 使图片完全覆盖容器 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  height: 100%;
  position: relative; /* 添加此属性以确保z-index有效 */
  z-index: -2;
}

.main_area::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(white, rgba(219, 226, 228, 0.5));
    pointer-events: none; /* 以防止伪元素拦截鼠标事件 */
    z-index: -1;
}
</style>
