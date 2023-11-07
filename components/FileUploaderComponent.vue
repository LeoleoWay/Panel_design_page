<template>
    <div class="file-uploader-component">
      <label for="file-upload" class="file-upload-btn">
        <span class="myfont">
          Selected file: {{ fileName ? fileName : 'Drop or click to choose your BED/TXT file' }}
        </span>
        <input type="file" id="file-upload" @change="uploadFile" />
      </label>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileName: null  // 初始化文件名为null
      };
    },

    methods: {
      uploadFile(event) {
        const file = event.target.files[0];
        this.fileName = file.name;  // 将文件名存储在fileName中
        this.$emit('fileUploaded', file);
      }
    }
  };
  </script>
  
  <style scoped>
  .file-uploader-component {
    margin: 20px 0;
    width: 100%;
  }
  
  .file-upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100%;
    padding: 10px 20px;
    background: #f5f5f5;
    cursor: pointer;
    border: 2px dashed #aaa;
    position: relative;
    overflow: hidden;
    text-align: center;
    border-radius: 5px;
  }
  
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .myfont {
    font-family: 'HarmonyOS_Sans_Regular', sans-serif;
    font-weight: normal;
    font-style: normal;
  }
  </style>
  