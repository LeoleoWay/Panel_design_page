<template>
    <div>
        <div class="tab-buttons">
            <button :class="{ active: showComponent === 'fileUploader' }" @click="showComponent = 'fileUploader'">Upload file</button>
            <button :class="{ active: showComponent === 'textArea' }" @click="showComponent = 'textArea'">Paste/Type input</button>
        </div>

        <div class="content">
            <FileUploaderComponent v-if="showComponent === 'fileUploader'" @fileUploaded="handleFileUpload" />
            <TextAreaComponent v-if="showComponent === 'textArea'" @textUpdated="handleTextUpdate" />
        </div>
    </div>
</template>

<script>
import TextAreaComponent from '@/components/TextAreaComponent.vue';
import FileUploaderComponent from '@/components/FileUploaderComponent.vue';

export default {
    components: {
        TextAreaComponent,
        FileUploaderComponent
    },
    methods: {
        handleTextUpdate(text) {
            this.parentData = text;
            this.$emit('parentTextUpdated', text);
        },
        handleFileUpload(file) {
            this.$emit('parentFileUploaded', file);
        }
    },
    data() {
        return {
            parentData: '',
            showComponent: 'textArea'
        };
    }
};
</script>

<style scoped>
.tab-buttons {
    display: flex;
    border: none;
    margin: 0;
}

.content {
    margin: 0; /* 添加这一行来取消默认的间距 */
}

button {
    font-family: 'HarmonyOS_Sans_regular', sans-serif;
    font-weight: normal;
    font-style: normal;
    padding: 10px 15px;
    border: none;
    background: #f5f5f5;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
} 

button.active {
    background: #fff;
    border: 2px solid #aaa ;
    border-bottom: 0;
}

/* 取消文件上传组件的外边距 */
.file-uploader-component {
    margin: 0 !important;
}

/* 取消文本区域组件的外边距 */
.textarea-component {
    margin: 0 !important;
}
</style>
