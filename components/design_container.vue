<template>
    <div class="container">
      <div class="input-section">
        <div class="split-half">
          <div class="right-align">
            <label>Panel name</label>
          </div>

          <div class="left-align">
            <InputRow label="Name" id="name" v-model="formData.panelName" :placeholder="input_placeholder" @input="clearWarning" />
            <Info :tooltip-content="info_name" />
          </div>
        </div>

        <div class="split-half">
          <div class="right-align">
            <label>Input format</label>
          </div>

          <div class="left-align">
            <Dropdown class="dropdownClasses" :options="dropdownOptions_inputformat" @selected="value => handleSelection(value, 'inputFormat')" />
            <Info :tooltip-content="info_format" />
          </div>
        </div>

        <div class="split-half" v-if="formData.inputFormat === 'Gene symbol'">
          <div class="right-align">
            <label>Target definition</label>
          </div>

          <div class="left-align">
            <Dropdown class="dropdownClasses" :options="dropdownOptions_definition" @selected="value => handleSelection(value, 'definition')" />
            <Info :tooltip-content=info_def />
            </div>
        </div>

        <div class="split-half">
          <div class="right-align">
            <label>Species</label>
          </div>

          <div class="left-align">
            <Dropdown class="dropdownClasses" :options="dropdownOptions_species" @selected="value => handleSelection(value, 'species')" />
            <Info :tooltip-content=info_species />
            </div>
        </div>
        <!-- <div class="split-half">
          <div class="right-align">
            <label>Run Probe QC</label>
          </div>

          <div class="left-align">
            <Dropdown class="dropdownClasses" :options="dropdownOptions_qc" @selected="value => handleSelection(value, 'qc')" @input="clearWarning" />
            <Info :tooltip-content=info_qc />
          </div>
        </div> -->

        <div class="split-half">
          <div class="right-align">
            <label>Probe length</label>
          </div>

          <div class="left-align">
            <Dropdown class="dropdownClasses no-click" :options="dropdownOptions_probelen" @selected="value => handleSelection(value, 'len')" />
            <Info :tooltip-content=info_len />
          </div>
        </div>

        <div class="split-half">
          <div class="right-align">
            <label>Probe tiling density</label>
          </div>

          <div class="left-align">
            <Dropdown class="dropdownClasses" :options="dropdownOptions_density" @selected="value => handleSelection(value, 'density')" />
            <Info :tooltip-content=info_den />
          </div>
        </div>

        <div class="block_para">
          <ParentComponent @parentTextUpdated="handleParentTextUpdate" @parentFileUploaded="handleParentFileUpload" />
        </div>
      </div>

      <div class="display-section">
        <h2><strong>Review and submit your requirments:</strong></h2>
        <div class="display-container">
          <label class="label_display">Panel name:</label>
          <span class="limited-lines">{{ formData.panelName ? formData.panelName : "Undefined" }}</span>
        </div>
        <div class="display-container">
          <label class="label_display">Input Format:</label>
          <span class="limited-lines">{{ formData.inputFormat }}</span>
        </div>
        <div class="display-container" v-if="formData.inputFormat === 'Gene symbol'">
          <label class="label_display">Target definition:</label>
          <span class="limited-lines">{{ formData.targetDefinition }}</span>
        </div>
        <div class="display-container">
          <label class="label_display">Species:</label>
          <span class="limited-lines">{{ formData.genomeSpecies }}</span>
        </div>
        <!-- <div class="display-container">
          <label class="label_display">Run Probe QC:</label>
          <span class="limited-lines">{{ formData.selectedQc }}</span>
        </div> -->
        <div class="display-container">
          <label class="label_display">Probe length:</label>
          <span class="limited-lines">{{ formData.probeLength }}</span>
        </div>
        <div class="display-container">
          <label class="label_display">Probe tiling density:</label>
          <span class="limited-lines">{{ formData.probeDensity }}</span>
        </div>
        <div class="display-container">
          <label class="label_display">Uploaded File:</label>
          <span class="limited-lines">{{ formData.inputFile ? formData.inputFile.name : 'None' }}</span>
        </div>
        <div class="display-container">
          <label class="label_display">Typein-squences:</label>
          <span class="limited-lines">{{ formData.inputPaste ? formData.inputPaste : "None" }}</span>
        </div>

        <div class="display-container_email">
          <label class="label_display">Email:</label>
          <div class="display-container_email1">
            <Email label="Email" id="email" v-model="formData.userEmail" :placeholder="email_placeholder" @input="clearWarning" />
          </div>
        </div>

        <div class="button-container">
          <button class="send-button" @click="sendDataToBackend">Click to design your panel</button>
        </div>

        <p v-if="missingDataWarning" class="warning">{{ missingDataWarning }}</p>
        <p v-if="isDataSentSuccessfully" class="success-message">{{ PostSuccess }}</p>

        <button @click="goToNewComponent">跳转到新界面</button>

      </div>
    </div>
 
</template>

<script>
import InputRow from '@/components/input_row.vue';
import Dropdown from '@/components/Dropdown.vue';
import ParentComponent from '@/components/ParentComponent.vue';
import Info from '@/components/info.vue';
import Email from '@/components/email.vue';
import axios from 'axios';

export default {
  components: {
    InputRow,
    Dropdown,
    ParentComponent,
    Info,
    Email
  },
  name: 'design_contaioner',
  data () {
    let currentDate = new Date();
    return {
      msg_page_name: 'BOKE Panel Design Tool',
      msg_intro_of_tool: 'Welcome to the BOKE Panel design tool. Choose your personalized options and input your email to begin the design process, and the result will be delivered to email. If a consultation to address a design outside the scope of this tool is needed, please submit a request to BOKE Biotech.',
      dropdownOptions_inputformat: ["BED target coordinates", "Gene symbol"],
      dropdownOptions_definition: ["Full Region", "Exons (with UTR)", "Exons (without UTR)"],
      dropdownOptions_species: ["Homo sapiens (human) GRCh37 (hg19)", "Homo sapiens (human) GRCh38 (hg38)"],
      dropdownOptions_qc: ["Yes", "No"],
      dropdownOptions_probelen: ["120"],
      dropdownOptions_density: ["1X", "2X"],
      input_placeholder : 'input your panel name here',
      email_placeholder : 'email to receive the result',
      info_name: 'Enter a panel name for your design. If no input is detected, a random name will be automatically assigned for it.',
      info_format: 'The design tool accepts a variety of input formats including BED coordinates or gene symbols. Only one option can be selected for each design and the input format you choose may impact other design tool parameters.',
      info_def: 'info_def',
      info_species: 'The BOKE Panel Design Tool uses reference genomes to perform predictive, off-target QC on the designed probes. If your target species is not listed, you can still use the tool by selecting Other for the species selection. Inputs must be uploaded in FASTA format and no off-target QC will be performed when Other is selected for the species. Alternatively, if you would like assistance from our technical team to address custom specifications outside the scope of the publicly available tool, please complete the xGen Hyb Panel design support intake form.',
      info_qc: 'This feature allows you to turn off predictive off-target QC when you are designing to RefSeq transcripts, or FASTA inputs from genomes not pre-loaded in the design tool.',
      info_len: 'Probe length is restricted to 120 bases. For different probe lengths, please seek customized services from BOKE biotech.',
      info_den: 'Tiling refers to the number of times, on average, each base in the input is covered by a probe. 1X and 2X tiling designs can be performed on this tool. For other tiling designs, please seek customized services from BOKE biotech.',
      missingDataWarning: '',
      isDataSentSuccessfully: false,
      PostSuccess: 'Congratulations! Your data has been successfully submitted to the backend. We will promptly send the related results to your email, so please keep an eye out for them. This process typically takes about 2 minutes.',
      formData: {
        designBarcode: "",
        designUuid: this.generateUUID(),
        designDate: this.formatDateToCustomStringUTC8(new Date()),
        panelName: "",
        inputPaste: "",
        inputFile: null,
        inputFormat: null,
        targetDefinition: null,
        genomeSpecies: null,
        selectedQc: null,
        probeLength: null,
        probeDensity: null,
        userEmail: "",
      }
    }
  },
  created() {
    this.formData.inputFormat = this.dropdownOptions_inputformat[0];
    this.formData.targetDefinition = 'None';
    this.formData.genomeSpecies = this.dropdownOptions_species[0];
    this.formData.selectedQc = this.dropdownOptions_qc[0];
    this.formData.probeLength = this.dropdownOptions_probelen[0];
    this.formData.probeDensity = this.dropdownOptions_density[0];
  },
  methods: {
    goToNewComponent() {
      this.$router.push({ name: 'DashBoard' });
    },

    formatDateToCustomStringUTC8(date) {
        const options = {
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai' // 东八区的时区
        };

        const dateTimeParts = new Intl.DateTimeFormat('default', options).formatToParts(date);
        const formattedDate = dateTimeParts.map(({type, value}) => {
            switch (type) {
                case 'year': return `${value}-`;
                case 'month': return `${value}-`;
                case 'day': return `${value} `;
                case 'hour': return `${value}:`;
                case 'minute': return `${value}:`;
                case 'second': return `${value}`;
                default: return '';
            }
        }).join('');

        return formattedDate;
    },

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    handleSelection(selectedValue, dropdownType) {
      if (dropdownType === 'inputFormat') {
        this.formData.inputFormat = selectedValue;
      } else if (dropdownType === 'species') {
        this.formData.genomeSpecies = selectedValue;
      } else if (dropdownType === 'qc') {
        this.formData.selectedQc = selectedValue;
      } else if (dropdownType === 'len') {
        this.formData.probeLength = selectedValue;
      } else if (dropdownType === 'density') {
        this.formData.probeDensity = selectedValue;
      } else if (dropdownType === 'definition') {
        this.formData.targetDefinition = selectedValue;
      }
      this.clearWarning();
    },
    handleParentTextUpdate(text) {
        this.formData.inputPaste = text; // 将从ParentComponent传递的文本赋值给pdp.vue的数据属性
        this.clearWarning();
    },
    handleParentFileUpload(file) {
        this.formData.inputFile = file; // 将从ParentComponent传递的文件赋值给pdp.vue的数据属性
        console.log(this.formData.inputFile);
        this.clearWarning();
    },
    sendDataToBackend() {
      let missingFields = [];

      if (this.formData.inputPaste && this.formData.inputFile) {
        this.formData.inputPaste = '';
        missingFields.push('Only one of Input Sequence and Input File should be provided');
      } else if (!this.formData.inputPaste && !this.formData.inputFile) {
          missingFields.push('Either Input Sequence or Input File should be provided');
      }
      if (!this.formData.inputFormat) missingFields.push('Input Format');
      if (!this.formData.targetDefinition) missingFields.push('Target Definition');
      if (!this.formData.genomeSpecies) missingFields.push('Species');
      if (!this.formData.selectedQc) missingFields.push('Run Probe QC');
      if (!this.formData.probeLength) missingFields.push('Probe Length');
      if (!this.formData.probeDensity) missingFields.push('Probe Tiling Density');

      let emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
      if (!emailPattern.test(this.formData.userEmail)) {
        missingFields.push('please type in currect email address');
      }

      let currentDate = new Date();
      let formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
      this.formData.designBarcode = `BOKE_${formattedDate}_${this.generateUniqueString()}`;

      if (missingFields.length > 0) {
          this.missingDataWarning = 'Missing or incorrect data for: ' + missingFields.join(', ');
          return;
      }

      let formDataToSend = { ...this.formData };
      delete formDataToSend.inputFile;

      if (formDataToSend.panelName === '') {
        formDataToSend.panelName = formDataToSend.designBarcode;
      }

      if (formDataToSend.inputFormat === 'BED target coordinates') {
        formDataToSend.inputFormat = 'bed';
      } else if (formDataToSend.inputFormat === 'Gene symbol') {
        formDataToSend.inputFormat = 'gene';
      }
      
      if (formDataToSend.targetDefinition === 'Full Region') {
        formDataToSend.targetDefinition = 'full';
      } else if (formDataToSend.targetDefinition === "Exons (with UTR)") {
        formDataToSend.targetDefinition = 'exon_UTR';
      } else if (formDataToSend.targetDefinition === "Exons (without UTR)") {
        formDataToSend.targetDefinition = 'exon_NO_UTR';
      }

      if (formDataToSend.genomeSpecies === 'Homo sapiens (human) GRCh37 (hg19)') {
        formDataToSend.genomeSpecies = 'hg19';
      } else if (formDataToSend.genomeSpecies === 'Homo sapiens (human) GRCh38 (hg38)') {
        formDataToSend.genomeSpecies = 'hg38';
      }

      let finalFormDataToSend = new FormData();

      // 添加一个文件（如果有的话）
      if (this.formData.inputFile) {
        finalFormDataToSend.append('file', this.formData.inputFile);
      }

      // 添加其他数据作为JSON
      finalFormDataToSend.append('json_data', JSON.stringify(formDataToSend));

      console.log(formDataToSend);
      for (let pair of finalFormDataToSend.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axios.post('http://192.168.0.200:5555/submit', finalFormDataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('Data sent successfully:', response.data);
          this.isDataSentSuccessfully = true;
          this.clearWarning();
        })
        .catch(error => {
          console.error('Error sending data:', error);
          if (error.response && error.response.data) {
            console.error('Detailed error:', error.response.data);
          }
        });

      this.$router.push({ name: 'DashBoard' });
    },

    generateUniqueString() {
      // 从当前时间中获取后4位
      let uniqueTimeStr = Date.now().toString(36).slice(-4);

      // 从随机数中获取前2位
      let randomStr = Math.random().toString(36).substring(2, 4);

      // 将它们组合在一起得到6位的字符串
      return uniqueTimeStr + randomStr;
    },


    clearWarning() {
      this.missingDataWarning = '';
    },
  }
}
</script>


<style scoped>
/* 如果你有关于这个组件的特定样式，可以在这里添加 */
</style>

<style scoped>
h1 {
  font-family: 'HarmonyOS_Sans', sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: 32px;
  margin: 0 0 16px 0;
  line-height: 1.1;
  text-align: left;
}

h2 {
  font-family: 'HarmonyOS_Sans_Medium', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

label {
  font-family: 'HarmonyOS_Sans_Medium', sans-serif; /* 使用Arial字体，如果不可用，则使用sans-serif字体 */
  font-size: 16px; 
  color: black; /* 字体颜色为深灰色 */
  padding: 2px 10px; /* 顶部和底部各有2像素的内边距 */
  align-items: center; /* 垂直方向上居中 */
  font-weight: 700;
}

.label_display {
  font-family: 'HarmonyOS_Sans_Medium', sans-serif;
  font-weight: normal;
  font-style: normal;
  margin-right: 10px; 
  font-size: 16px; 
}

.no-click {
  pointer-events: none;
}

.container {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    background-color: rgba(213, 223, 226, 0.8);
    border-radius: 10px;
    box-shadow: 0 0 15px 5px rgba(213, 223, 226, 0.8);
    min-width: 1200px;
    position: relative;
    z-index: 1;
}

.input-section {
    width: 60%; /* 或您喜欢的任何比例 */
    padding-right: -100px; /* 为了在两个部分之间增加一些间距 */
    min-width: 800px;
    position: relative;
    z-index: 3;
}

.display-section {
    width: 30%; /* 或您喜欢的任何比例 */
    min-width: 400px;
    padding: 20px;
    padding-top: 0;
    border-left: 1px solid #aaa;
    z-index: 2;
}

.display-container {
    display: flex;          /* 使用flexbox布局 */
    align-items: center;    /* 垂直居中对齐 */
    justify-content: flex-start; /* 左对齐 */
    padding: 10px;
}

.display-container > :first-child {
  flex: 1;
}

.display-container > :last-child {
  flex: 1;
}

.display-container_email {
    display: flex;          /* 使用flexbox布局 */
    align-items: center;    /* 垂直居中对齐 */
    justify-content: flex-start; /* 左对齐 */
    padding: 10px;
}

.display-container_email1 {
    display: block;
    width: 100%;
    padding-right: 10%;
}

.left-align {
  display: flex;
  justify-content: flex-start; /* 默认值，可以省略 */
  align-items: center; /* 垂直方向上居中 */ 
  z-index: 0;
}

.right-align {
  display: flex;
  justify-content: flex-end;
  height: 40;
  align-items: center; /* 垂直方向上居中 */
}

.split-half {
  display: flex;
  justify-content: space-between;
}

.split-half > :first-child {
  margin: 20px;
}

.split-half > :first-child {
  flex: 1;
}

.split-half > :last-child {
  flex: 3;
}

.split-half > div {
  flex: 1; /* 使子元素平均分配父元素的可用空间 */
  padding: 0 10px; /* 这会给每个子元素左右各添加10px的空隙，你可以根据需要调整 */
}

.split-half:nth-child(1) {
    position: relative; /* 如果元素已有定位属性，则不需要添加 */
    z-index: 6;
}

.split-half:nth-child(2) {
    position: relative; /* 如果元素已有定位属性，则不需要添加 */
    z-index: 5;
}

.split-half:nth-child(3) {
    position: relative; /* 如果元素已有定位属性，则不需要添加 */
    z-index: 4;
}

.split-half:nth-child(4) {
    position: relative; /* 如果元素已有定位属性，则不需要添加 */
    z-index: 3;
}

.split-half:nth-child(5) {
    position: relative; /* 如果元素已有定位属性，则不需要添加 */
    z-index: 2;
}

.split-half:nth-child(6) {
    position: relative; /* 如果元素已有定位属性，则不需要添加 */
    z-index: 1;
}

.dropdownClasses {
  z-index: 1;  /* 可以根据需要调整这个值 */
}

.dropdownClasses >>> button {
  font-family: 'HarmonyOS_Sans_Regular', sans-serif;
  font-weight: normal;
  font-style: normal;
  height: 1.4; /* 调整为你需要的高度 */
  font-size: 16px; /* 调整为你需要的字体大小 */
  line-height: 30px; /* 添加这一行 */
  padding-left: 25px;  /* 左边的间隙 */
  padding-right: 50px; /* 右边的间隙 */
  color: #777;
}

ul {
  list-style-type: none;
  padding: 0;
}

.block {
  display: flex; /* 设置为flex容器 */
  flex-direction: column; 
  align-items: center; /* 如果需要，垂直居中对齐 */
  justify-content: space-between; /* 如果需要，元素之间有等距离的空间 */
  width: 100%; /* 确保.block充满其父容器 */
}

.block > * {
  width: 100%; /* 确保.block的直接子元素充满.block */
}

.block_para {
  display: flex; /* 设置为flex容器 */
  flex-direction: column; 
  align-items: center; /* 如果需要，垂直居中对齐 */
  justify-content: space-between; /* 如果需要，元素之间有等距离的空间 */
  width: 100%; /* 确保.block充满其父容器 */
  padding-top: 30px;
}

.block_para > * {
  width: 80%; /* 确保.block的直接子元素充满.block */
  padding-right: 25%;
  padding-left: 18%;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

.button-container {
    display: flex;
    justify-content: center;  /* 水平居中 */
    align-items: center;      /* 垂直居中 */
    margin: 20px 0;           /* 上下外边距 */
}

.send-button {
    font-family: 'HarmonyOS_Sans', sans-serif;
    font-weight: normal;
    font-style: normal;
    padding: 12px 24px;       /* 内边距：12px上下, 24px左右 */
    border-radius: 25px;     /* 圆角 */
    background-color: #3498db;  /* 背景颜色 */
    color: white;             /* 字体颜色 */
    border: none;             /* 无边框 */
    cursor: pointer;          /* 按钮点击时的鼠标样式 */
    font-size: 16px;          /* 字体大小 */
    transition: background-color 0.3s;  /* 过渡效果 */
}

.send-button:hover {
    background-color: #2980b9;  /* 鼠标悬停时的背景颜色 */
}

.warning {
    color: red;
}

.success-message {
  color: green;
}

.limited-lines {
    font-family: 'HarmonyOS_Sans_Regular', sans-serif;
    font-weight: normal;
    font-style: normal;
    display: block; /* or inline-block */
    max-height: 60px;
    overflow: hidden;
    font-size: 16px;
    width: 100%;
}

.all {
  z-index: 1;
}
</style>
