<template>
    <div class="dropdown">
        <div class="button-wrapper" ref="dropdownButton">
            <button @click="toggleDropdown">
                {{ selectedOption || defaultOption }}
            </button>
        </div>
        <ul v-if="isOpen" class="dropdown-list" ref="dropdownList">
            <li v-for="option in options" :key="option" @click="selectOption(option)">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            options: {
                type: Array,
                required: true
            }
        },
        name: 'Dropdown',
        data() {
            return {
            isOpen: false,
            selectedOption: null,
            };
        },
        computed: {
            defaultOption() {
                return this.options[0]; // 返回options数组的第一个元素
            }
        },
        mounted() {
            // 当组件挂载完成后，设置selectedOption为defaultOption
            this.selectedOption = this.defaultOption;
            document.addEventListener('click', this.outsideClick);
        },
        beforeDestroy() {
            // 在组件销毁前移除事件监听器
            document.removeEventListener('click', this.outsideClick);
        },
        methods: {
            toggleDropdown() {
                this.isOpen = !this.isOpen;
    
                if (this.isOpen) {  // 只有在下拉列表可见时执行以下代码
                    this.$nextTick(() => {
                        const buttonWidth = this.$refs.dropdownButton.offsetWidth;
                        const listWidth = this.$refs.dropdownList.offsetWidth;
                        
                        if (listWidth < buttonWidth) {
                            this.$refs.dropdownList.style.width = `${buttonWidth}px`;
                        }
                    });
                }
            },
            selectOption(option) {
            this.selectedOption = option;
            this.isOpen = false;
            this.$emit('selected', option);  // 发出一个事件，以便父组件知道所选的选项
            },
            outsideClick(event) {
                // 如果点击事件不是在Dropdown组件内发生的
                if (!this.$el.contains(event.target)) {
                    this.isOpen = false;
                }
            }
        }
    };
</script>

<style scoped>
    .dropdown {
        position: relative;
    }
    .button-wrapper {
        position: relative;
        display: inline-block; /* 这将使 wrapper 的宽度与其内容匹配 */
        align-items: center;   /* 垂直居中 */
        height: 1.4; 
        z-index: 1;
    }

    .button-wrapper::after {
        content: '\2304';  /* 这是向下的箭头的Unicode表示 */
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-65%);  /* 垂直居中 */
        font-size: 16px;  /* 调整大小 */
        color: #aaa;  
        z-index: 1;
    }

    .dropdown-list {
        font-family: 'HarmonyOS_Sans_Regular', sans-serif;
        font-weight: normal;
        font-style: normal;
        display: inline-block;
        position: absolute;
        top: 100%;
        left: 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        background-color: white;
        min-width: 1px; 
        z-index: 2;
    }

    .dropdown-list li {
        padding: 8px 12px;
        cursor: pointer;
    }

    .dropdown-list li:hover {
        background-color: #f5f5f5;
    }
</style>
  