<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    DocumentCopy
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.min.css'; // 可以选择你喜欢的主题样式
  
  const text = ref('');
  const errorMessage = ref('');
  const router = useRouter()
  const placeholder = import.meta.env.VITE_JSON_PLACEHOLDER || '请输入JSON'

    //解码
    const decode = async ()=> {

      if(text.value!==''){        
        errorMessage.value =  formattedData(decodeURL(text.value));
      }else{
        ElMessage.warning('请输入报文！')
      }

    }
    
    //编码
    const encode = async ()=> {

      if(text.value!==''){        
        errorMessage.value =  formattedData(encodeURL(text.value));
      }else{
        ElMessage.warning('请输入报文！')
      }

    }

/**
* 对给定的编码过的字符串进行 URL 解码
* @param encodedUrl - 编码后的 URL 字符串
* @returns - 解码后的 URL 字符串
*/
function decodeURL(encodedUrl: string): string {
return decodeURIComponent(encodedUrl);
}

/**
* 对给定的字符串进行 URL 编码
* @param url - 要编码的 URL 字符串
* @returns - 编码后的 URL 字符串
*/
function encodeURL(url: string): string {
return encodeURIComponent(url);
}

    const formattedData = ((errorMessage : any) => {
      try {
        // 尝试解析 JSON 字符串
        const jsonObject = JSON.parse(errorMessage);
        const jsonString = JSON.stringify(jsonObject, null, 4); // 美化 JSON 字符串
        return hljs.highlight('json', jsonString).value; // 使用 highlight.js 进行高亮
      } catch (error) {
        // 如果 JSON 格式不正确，返回错误提示
        return hljs.highlightAuto(errorMessage).value;
      }
    });

    onMounted(() => {
      // 在组件挂载时，手动应用高亮效果
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    });

//复制操作
function copy() {
  if(errorMessage.value.length>0){

    const textarea = document.createElement('textarea')
    textarea.value = document.getElementsByClassName("header-left")[0].innerText
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
      </div>
      <el-input type="textarea" class="textarea" v-model="text" :placeholder="placeholder"
            style="width: 470px" input-style="background-color: rgb(73, 70, 92);color: white;overflow-y: 0;border-radius: 17px;padding: 1rem;box-shadow: none;height:637px"
            :rows="30"/>
    </div>
  
    <div class="item-mid">
      <el-button @click="decode()">解码</el-button>
      <el-button @click="encode()">编码</el-button>
    </div>
  
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
    .item-mid .el-button{
      margin-top: 1rem;
      margin-left: 0px;
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
