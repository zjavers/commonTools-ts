<script setup lang="ts">
  import { ref } from 'vue'
  import {
    DocumentCopy,Plus 
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import 'highlight.js/styles/a11y-dark.min.css'; // 可以选择你喜欢的主题样式
import type { UploadProps, UploadUserFile } from 'element-plus'
  
  const errorMessage = ref('');
  const router = useRouter()

  const fileList = ref<UploadUserFile[]>([
  
])

  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)

  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }

  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  

//复制操作
function copy() {
  if(errorMessage.value.length>0){

    const textarea = document.createElement('textarea')
    textarea.value = errorMessage.value
    document.body.appendChild(textarea)
    textarea.select()

    try {
      document.execCommand('copy')
      ElMessage.success('复制成功！')
    } catch (err) {
      ElMessage.error('复制失败，请重试！')
    }

    document.body.removeChild(textarea)
  }else{
    ElMessage.warning('请输入json！')
  }
}

function handleFileSelect(event: any) {
        const file = event;
        const reader = new FileReader();

        reader.onload = function() {
            const arrayBuffer = reader.result as ArrayBuffer;
            const hexString = bufferToHex(arrayBuffer);
            errorMessage.value = hexString
        };

        reader.readAsArrayBuffer(file);
}

function bufferToHex(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    let hexString = '';
    for (let byte of byteArray) {
        hexString += ('0' + byte.toString(16)).slice(-2);
    }
    return hexString;
}
//返回home
function back(){
  router.push('/');
}
</script>
<template >
  <div class="switch">
    <el-button @click="back()">返回</el-button>
  </div>
  <div class="middle">
    
    <div class="item-left">
      <el-upload
        v-model:file-list="fileList"
        action="/api/tr"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleFileSelect"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  
    <!-- <div class="item-mid">
      <el-button @click="submit()">转换</el-button>
    </div> -->
  
    <div class=" card" id="result">
      <div class="top">
        <div class="circle">
          <span class="red circle2"></span>
        </div>
        <div class="circle">
          <span class="yellow circle2"></span>
        </div>
        <div class="circle">
          <span class="green circle2"></span>
        </div>
        <div class="title">
        </div>
        <div class="header2">
          <el-button class="copy-btn" @click="copy()" :icon="DocumentCopy" />
        </div>
      </div>
      <div class="header-left">
        <div v-html="errorMessage"></div>
      </div>
    </div>
  
  </div>
    
  </template>
  <style lang='css'>
    body{
      margin: 0;
      padding: 0;
      background-color: #e8e8e8;
    }
    .switch{
      display: flex;
      float: left;
    }
  
    .card {
      height: calc(41rem + 5px);
      text-align: left;
      float: left;
      width: 53rem;
      background-color: #24233b;
      border-radius: 8px;
      z-index: 1;
      box-shadow: 0px 10px 10px rgb(73, 70, 92);
      transition: 0.5s;
      padding: 1rem;
      white-space: pre-wrap;
      word-wrap: break-word; /* 强制长单词换行 */
    }
  
    .middle{
      display: inline;
      position: relative;
      left: 10rem;
      top: 10rem;
    }
  
    .item-left{
      float: left;
      padding: 1rem;
      background-color: #24233b;
      border-radius: 8px;
      z-index: 1;
      box-shadow: 0px 10px 10px rgb(73, 70, 92);
      transition: 0.5s;
    }
  
    .item-mid{
      float: left;
      display: flex;
      height: 40rem;
      justify-content:center;
      flex-direction: column;
      margin: 0 1rem ;
      width: 5rem;
    }
  
    .header-left{
      display: flex;
      flex-direction: column;
      overflow: auto;
      background-color: rgb(73, 70, 92);
      color: white;
      overflow-y: 0;
      border-radius: 17px;
      padding: 1rem;
      height: calc(91% + 3px);
    }
  
  .top {
    display: flex;
    align-items: center;
    padding-left: 10px;
    text-align: center;
  }
  
  .circle {
    padding: 0 4px;
  }
  
  .circle2 {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 5px;
  }
  
  .red {
    background-color: #ff605c;
  }
  
  .yellow {
    background-color: #ffbd44;
  }
  
  .green {
    background-color: #00ca4e;
  }
  
  .title{
    width: 100%;
  }
  
  .header2{
    float: right;
    /* height: 40px; */
  }
  .copy-btn{
    background-color: #24233b;
    border: none;
    margin-right: -1rem;
    margin-top: calc(-1rem - 11px);
    border-top-right-radius: 8px;
    color: white;
  }
  
    
  </style>
