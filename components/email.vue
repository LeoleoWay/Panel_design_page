<template>
    <div class="input-row">
      <input :id="id" v-model="inputValue" :placeholder="placeholder" class="input-field" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'InputRow',
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: '' 
      },
    },
    data() {
      return {
        inputValue: this.value
      };
    },
    watch: {
      inputValue(newVal) {
        this.$emit('input', newVal);
      }
    }
  };
  </script>
  
  <style scoped>
  .input-row {
    display: block;
    align-items: center;
  }
  
  
  .input-field {
    font-family: 'HarmonyOS_Sans_Regular', sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: left;
    height: 25px;
    width: 100%;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    border: 1px solid #777;
  }
  </style>
  