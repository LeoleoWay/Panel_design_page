<template>
    <div class="input-container">
        <i class="info-icon" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">i</i>
        <div class="tooltip" v-if="showTooltip">{{ tooltipContent }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            tooltipContent: {
            required: true
            }
    },
        data() {
            return {
            showTooltip: false
            };
        }
    }
</script>
<style scoped>
    .input-container {
  position: relative;  /* 设置父容器为相对定位，使我们可以在其内部进行绝对定位 */
}

.info-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgba(0, 0, 255, 0.82);
  color: white;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;

  cursor: pointer;
}

.tooltip {
  position: absolute;    /* 绝对定位，使提示浮动在其父容器上 */
  top: 50%;              /* 使其垂直居中 */
  transform: translateY(-50%);  /* 使用 transform 进行微调，确保完全垂直居中 */
  left: 34px;            /* 使其从左侧与 .info-icon 对齐 */

  background-color: white;
  padding: 10px;         /* 提供一些内部空间，使内容不会太拥挤 */
  border: 1px solid #ccc;  /* 提供一个轻微的边界，使其更容易分辨 */
  z-index: 2000;            /* 确保提示始终在其他内容的顶部 */

  width: 400px; /* 设置固定宽度 */
  white-space: normal; /* 允许文本自动换行 */
  overflow: hidden; /* 隐藏超出的内容 */
  font-size: 16px;
  line-height: 1.4;
  color: #6a6a6a;

  text-align: left;
}
</style>  
