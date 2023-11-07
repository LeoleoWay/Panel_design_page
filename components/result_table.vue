<template>
    <div class="table-container">
        <div class="table-header">
            <div class="header-item">
                <label>Panel name</label>
                <Info :tooltip-content="info_name" />
            </div>
            <div class="header-item">
                <label>Source</label>
                <Info :tooltip-content="info_source" />
            </div>
            <div class="header-item">
                <label>Date & Time</label>
                <Info :tooltip-content="info_time" />
            </div>
            <div class="header-item">
                <label>Probe count</label>
                <Info :tooltip-content="info_count" />
            </div>
            <div class="header-item">
                <label>Status</label>
            </div>
            <div class="header-item">
                <label>Info</label>
                <Info :tooltip-content="info_info" />
            </div>
        </div>
  
            <!-- ... 动态生成的行 ... -->
        <div v-for="item in tableData" :key="item.id">
            <div class="table-row">
                <div class="row-item">{{ item.panelName }}</div>
                <div class="row-item">{{ item.source }}</div>
                <div class="row-item">{{ item.dateTime }}</div>
                <div class="row-item">{{ item.probeCount }}</div>
                <div class="row-item">{{ item.status }}</div>
                <div class="row-item actions">
                    <!-- 这里可以添加每行的操作按钮或链接 -->
                    <button class="button-actions" @click="doAction(item.id)">Review</button>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <div v-if="item.showdetails" key="details">
                    <Details :style="{ width: '90%' }" />
                </div>
            </transition>
        </div>
        
    </div>
</template>
  
<script>
import Info from '@/components/info.vue';
import Details from '@/components/details.vue';

export default {
    components: {
        Info,
        Details
    },
  data() {
    return {
        info_name: 'The name of the panel that was specified when the design request was submitted.',
        info_source: 'The origin of the probe sequences and associated design files: IDT Quote-- the customer supplied the probe sequences as part of the quote request; IDT Design--a member of the IDT NGS Design Team performed the design and uploaded the design files; Design Tool--the customer performed the design themselves using the Target Capture Probe Design Tool.',
        info_time: 'The date and time the design was created.',
        info_count: 'The number of probes in the panel. Designs can have multiple iterations. Select ACTIONS - Review Design(s) for more details.',
        info_info: 'Review Design(s) - Review design details and initiate a quote request. Delete - removes the design from the dashboard.',
        
        tableData: [],  // 从后端获取的数据将存放在这里
    };
  },
  mounted() {
    // 模拟从后端获取数据的操作
    // this.$http.get('/path-to-your-api-endpoint').then(response => {
    //   this.tableData = response.data;
    // });
    this.tableData = [
        {
            id: "123123123",
            panelName: "My Panel",
            source: "Design Tool",
            dateTime: "2023/11/01 20:40:57",
            probeCount: "N/A",
            status: "In process",
            showdetails: false
        },
        {
            id: "21443512412",
            panelName: "sampleFileFastaClean",
            source: "Design Tool",
            dateTime: "7/12/2021, 11:29:45",
            probeCount: "1400",
            status: "Design complete",
            showdetails: false
        }
        // ... 可以添加更多的模拟数据项
    ];
  },
  methods: {
    doAction(id) {
        // 根据id执行某些操作，如跳转到另一页面或弹出一个对话框等
        let item = this.tableData.find(item => item.id === id);
        if (item) {
            item.showdetails = !item.showdetails;
        }
    }
  }
}
</script>

<style scoped>
label {
  font-family: 'HarmonyOS_Sans_Medium', sans-serif; /* 使用Arial字体，如果不可用，则使用sans-serif字体 */
  font-size: 16px; 
  color: black; /* 字体颜色为深灰色 */
  padding: 2px 10px; /* 顶部和底部各有2像素的内边距 */
  align-items: center; /* 垂直方向上居中 */
  font-weight: 700;
}

.table-header, .table-row {
    height: 46px;
    display: flex;
    width: 100%;
    min-width: 200px;
}

.header-item {
    display: flex;       /* 设置为Flex容器 */
    justify-content: center; /* 水平居中对齐子元素 */
    align-items: center;    /* 垂直居中对齐子元素 */
    flex-direction: row;    /* 使子元素水平排列 */
    flex: 1;
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
}

.row-item {
    flex: 1;
    padding: 8px 12px;
    width: 180px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;  /* 使内容在水平方向上居中 */
}

.row-item.actions button {
    height: 30px;  /* 设置明确的高度 */
    display: flex;
    align-items: center;  /* 使按钮的文本在垂直方向上居中 */
    justify-content: center;  /* 使按钮的文本在水平方向上居中，此行可选 */
}

.button-actions {
    background-color: #57B6E6; /* 按钮背景色 */
    border: none; /* 无边框 */
    border-radius: 20px; /* 圆角效果 */
    color: white; /* 文字颜色 */
    font-weight: bold; /* 文字加粗 */
    padding: 10px 20px; /* 内边距 */
    text-transform: uppercase; /* 文字全部大写 */
    cursor: pointer; /* 当鼠标悬停时显示手形图标 */
    transition: 0.3s; /* 过渡效果 */
}

.button-actions:hover {
    background-color: #3F9ACD; /* 悬停时的背景颜色 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 添加稍微的阴影效果 */
}

.button-actions:active {
    background-color: #307BA0; /* 按下时的背景颜色，比 hover 时还要深 */
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.2); /* 添加内部阴影来模拟按钮被按下 */
    transform: translateY(2px); /* 轻微下移按钮，给人按下去的感觉 */
}

/* 定义进入和离开的活动状态 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}

/* 定义进入的开始状态和离开的结束状态 */
.fade-enter, .fade-leave-to /* .fade-leave-active 在 Vue 2.1.8+ 中 */ {
    opacity: 0;
}

.header-item:last-child, .row-item:last-child {
    border-right: none;
}
</style>

<!-- 下午添加按钮的点击效果 -->