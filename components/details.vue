<template>
    <div class="details-container">
        <div>
            <span class="default1">designRunID: </span> 
            <span class="default2">{{ this.designDetails.designRunID }}</span>
        </div>

        <span class="default3">{{ this.assistant_info }}</span>

        <div class="table-header">
            <div class="header-item">
                <label>Panel name</label>
                <Info :tooltip-content="info_name" />
            </div>
            <div class="header-item">
                <label>Design Date&Time</label>
                <Info :tooltip-content="info_date" />
            </div>
            <div class="header-item">
                <label>Species</label>
                <Info :tooltip-content="info_species" />
            </div>
            <div class="header-item">
                <label>Design info</label>
                <Info :tooltip-content="info_info" />
            </div>
            <div class="header-item">
                <label>Target base count</label>
                <Info :tooltip-content="info_tbc" />
            </div>
            <div class="header-item">
                <label>Probe count</label>
                <Info :tooltip-content="info_pb" />
            </div>
            <div class="header-item">
                <label>Precent covered</label>
                <Info :tooltip-content="info_pc" />
            </div>
            <div class="header-item">
                <label>Output files</label>
                <Info :tooltip-content="info_of" />
            </div>
        </div>

        <div class="table-row">
            <div class="row-item">{{ this.designDetails.panelName }}</div>
            <div class="row-item">{{ this.designDetails.designDate }}</div>
            <div class="row-item">{{ this.designDetails.species }}</div>
            <div class="row-item">{{ this.designDetails.ncbiInfo }}</div>
            <div class="row-item">{{ this.designDetails.targetBaseCount }}</div>
            <div class="row-item">{{ this.designDetails.probeCount }}</div>
            <div class="row-item">{{ this.designDetails.percentCovered }}</div>
            <div class="row-item">{{ this.designDetails.outputFileLink }}</div>
            <div class="row-item actions">
                <!-- 这里可以添加每行的操作按钮或链接 -->
                <button class="button-actions" @click="doAction(item.id)">Review</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            info_name: 'The name of the panel that was specified when the design request was submitted.',
            info_date: 'The origin of the probe sequences and associated design files: IDT Quote-- the customer supplied the probe sequences as part of the quote request; IDT Design--a member of the IDT NGS Design Team performed the design and uploaded the design files; Design Tool--the customer performed the design themselves using the Target Capture Probe Design Tool.',
            info_species: 'The date and time the design was created.',
            info_info: 'The number of probes in the panel. Designs can have multiple iterations. Select ACTIONS - Review Design(s) for more details.',
            info_tbc: 'Review Design(s) - Review design details and initiate a quote request. Delete - removes the design from the dashboard.',
            info_pb: 'The name of the panel that was specified when the design request was submitted.',
            info_pc: 'The origin of the probe sequences and associated design files: IDT Quote-- the customer supplied the probe sequences as part of the quote request; IDT Design--a member of the IDT NGS Design Team performed the design and uploaded the design files; Design Tool--the customer performed the design themselves using the Target Capture Probe Design Tool.',
            info_of: 'The date and time the design was created.',
            
            designDetails: {
                designRunID: "XGEN.D0D21F4DC56E4F02872EE209FFBBFDC4.g",
                designTeam: "Custom Design",
                panelName: "My Panel",
                designDate: "Thu, 02 Nov 2023 06:40:56 GMT",
                species: "Homo sapiens (Human)",
                ncbiInfo: "NCBI GRCh37.p13 (hg19)",
                designInfoLink: "#",
                targetBaseCount: 14537645,
                probeCount: 95243,
                percentCovered: 81.5,
                outputFileLink: "#"
            },
            assistant_info: "Need design assistance? Contact BOKEBiotech or have our Design Team assist with a Custom Design."
        };
    }
};
</script>

<style scoped>
.details-container {
    width: 90%; /* 设置宽度为父容器的 90% */
    border: 2px solid #ccc; /* 边框 */
    position: relative; /* 使得伪元素可以相对于这个元素定位 */
    padding: 10px; /* 内部间距，使内容不紧贴边框 */
    box-sizing: border-box; /* 使内部间距和边框不增加元素的总宽度 */
    margin-left: 20px; /* 左侧边距为0，使容器向左对齐 */
    margin-right: auto; /* 右侧空间自动填充 */

    display: flex; /* 使用flex布局 */
    flex-direction: column; /* 子元素垂直排列 */
    gap: 10px;
}

.default1 {
    font-family: 'HarmonyOS_Sans_Medium', sans-serif;
    font-size: 15px;
}

.default2 {
    font-family: 'HarmonyOS_Sans_Medium', sans-serif;
    font-size: 17px;
}

.default3 {
    font-family: 'HarmonyOS_Sans_Regular', sans-serif;
    font-size: 12px; 
}

.table-header {
    height: 46px;
    display: flex;
    width: 100%;
    min-width: 200px;
}
</style>
