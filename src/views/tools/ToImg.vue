<script setup lang="ts">
  import { ref } from 'vue'

import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import 'highlight.js/styles/a11y-dark.min.css'; // 可以选择你喜欢的主题样式
  
  const text = ref('');
  const img = ref('')
  const router = useRouter()
  const placeholder = import.meta.env.VITE_IMG_PLACEHOLDER || '请输入16进制'

  //转换报文
  const submit = async ()=> {

    if(text.value!==''){
      const arrayBuffer = hexToBuffer(text.value);
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // 假设图片格式为JPEG
      const url = URL.createObjectURL(blob);
      console.log(blob);
      
      img.value = url
      // errorMessage.value =  formattedData(text.value);
    }else{
      ElMessage.warning('请输入报文！')
    }

  }

  function hexToBuffer(hexString: string): ArrayBuffer {
    const byteArray = new Uint8Array(hexString.length / 2);
    
    for (let i = 0; i < hexString.length; i += 2) {
        byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }
    return byteArray.buffer;
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
      <el-button @click="submit()">转换</el-button>
    </div>
  
    <img :src="img" title="这是一张图片" alt="这是一张图片" class=" card">
  
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
