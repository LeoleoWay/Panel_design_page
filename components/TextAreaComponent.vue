<template>
    <div class="textarea-component">
      <textarea v-model="text" @input="updateText" placeholder="Enter or paste your content"></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialText: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        text: this.initialText
      };
    },
    methods: {
      updateText() {
        this.$emit('textUpdated', this.text);
      }
    }
  };
  </script>
  
  <style scoped>
  .textarea-component {
    margin: 20px 0;
    width: 100%;
  }
  
  textarea {
    font-family: 'HarmonyOS_Sans_Regular', sans-serif;
    font-weight: normal;
    font-style: normal;
    width: 100%;
    height: 100px;
    padding: 10px 20px;
    border: 2px solid #aaa;
    background: #f5f5f5;
    resize: none;
    border-radius: 5px;
    border: 1px solid #777;
  }
  </style>
  